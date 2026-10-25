/* Browser-only progress. Legacy keys are read, never changed or deleted. */
(function (root) {
  'use strict';
  const PREFIX='prep:v2:', META=PREFIX+'migration';
  const catalog=root.PrepCatalog, snapshots={}, listeners=[], memory=new Map();
  const warnings=new Set(); let persistent=true;
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  const plain=o=>o!==null&&typeof o==='object'&&!Array.isArray(o);
  const copy=o=>JSON.parse(JSON.stringify(o));
  const safeKeys=o=>Object.keys(o).filter(k=>!['__proto__','constructor','prototype'].includes(k));
  function warn(message){warnings.add(message);if(root.dispatchEvent&&root.CustomEvent)root.dispatchEvent(new CustomEvent('prep-warning'));}
  function get(key){if(memory.has(key))return memory.get(key);try{return root.localStorage.getItem(key);}catch(e){persistent=false;warn('Browser storage is unavailable. Changes last only for this tab; export progress to keep them.');return memory.get(key)??null;}}
  function set(key,value){memory.set(key,value);try{root.localStorage.setItem(key,value);return true;}catch(e){persistent=false;warn('Progress could not be saved to browser storage. Export it before leaving this tab.');return false;}}
  function keys(){try{return [...new Set([...Object.keys(root.localStorage),...memory.keys()])];}catch(e){return [...memory.keys()];}}
  function read(key){const raw=memory.has(key)?memory.get(key):get(key);if(raw===null)return undefined;try{return JSON.parse(raw);}catch(e){warn('Unreadable saved data was preserved: '+key);return undefined;}}
  const namespaces={};
  for(const track of Object.keys(catalog.tracks)){
    const ids=new Set(catalog.tracks[track].flatMap(g=>g.problems.map(p=>p.id)));
    namespaces[track+'-status']=(id,v)=>ids.has(id)&&['todo','solved','review','audited'].includes(v);
    namespaces[track+'-notes']=(id,v)=>ids.has(id)&&typeof v==='string'&&v.length<=200000;
    if(track==='dsa'||track==='lld'){
      const groups=new Set(catalog.tracks[track].map(g=>g.id));
      namespaces[track+'-level']=(id,v)=>groups.has(id)&&Number.isInteger(v)&&v>=0&&v<=4;
      namespaces[track+'-audit']=(id,v)=>groups.has(id)&&['','pending','done','due'].includes(v);
    }
  }
  const labKeys=(items,tabs)=>new Set(items.flatMap(x=>tabs.map(t=>x.id+':'+t)));
  const lldLab=labKeys(catalog.lessons.patterns,['learn','skeleton','solid','challenge']);
  const hldLab=labKeys(catalog.lessons.concepts,['overview','compare','tradeoffs','challenge']);
  namespaces['lld-lab']=(id,v)=>lldLab.has(id)&&typeof v==='boolean';
  namespaces['hld-lab']=(id,v)=>hldLab.has(id)&&typeof v==='boolean';
  const estimates=new Set(catalog.lessons.estimation.flatMap(c=>c.drills.map(d=>String(d.id))));
  namespaces['hld-estimation']=(id,v)=>estimates.has(id)&&(v===null||['done','wrong'].includes(v));
  function load(ns){if(!own(namespaces,ns))throw Error('Unknown progress section');const data={};const prefix=PREFIX+ns+':';for(const key of keys().filter(k=>k.startsWith(prefix))){let id;try{id=decodeURIComponent(key.slice(prefix.length));}catch(e){warn('Unrecognized saved key preserved.');continue;}const value=read(key);if(namespaces[ns](id,value))data[id]=value;else warn('Invalid progress entry preserved: '+ns+'/'+id);}
    snapshots[ns]=copy(data);return data;}
  function save(ns,data){if(!own(namespaces,ns)||!plain(data))throw Error('Invalid progress section');const before=snapshots[ns]||{};for(const id of safeKeys(data)){if(!namespaces[ns](id,data[id]))throw Error('Invalid progress value: '+ns+'/'+id);if(JSON.stringify(data[id])!==JSON.stringify(before[id]))set(PREFIX+ns+':'+encodeURIComponent(id),JSON.stringify(data[id]));}snapshots[ns]=copy(data);}
  function put(ns,id,value){if(namespaces[ns]?.(id,value))set(PREFIX+ns+':'+encodeURIComponent(id),JSON.stringify(value));}
  function migratePut(ns,id,value){const key=PREFIX+ns+':'+encodeURIComponent(id);if(get(key)===null)put(ns,id,value);}
  let migration=read(META);
  if(!plain(migration)||migration.version!==2){
    if(get(META)!==null){warn('Migration metadata is unreadable; it was preserved and automatic migration was skipped.');migration={version:2,raw:{},pending:[],blocked:true};}
    else {
      migration={version:2,raw:{},pending:[],createdAt:new Date().toISOString()};
      function legacy(key){const raw=get(key);if(raw===null)return{};migration.raw[key]=raw;try{const x=JSON.parse(raw);if(plain(x))return x;}catch(e){}warn('Legacy data could not be parsed; raw copy retained: '+key);return{};}
      for(const track of ['dsa','lld','hld']){
        const combined=track==='hld'?legacy('hld-idx-v1'):{};
        const statuses=track==='hld'?(plain(combined.statuses)?combined.statuses:{}):legacy(track+'-s');
        const notes=track==='hld'?(plain(combined.notes)?combined.notes:{}):legacy(track+'-n');
        for(const oldId of new Set([...safeKeys(statuses),...safeKeys(notes)])){
          const targets=catalog.legacy[track][oldId]||[];
          const ambiguous=(track==='lld'&&targets.length>1)||(track==='dsa'&&Number(oldId)<=37&&own(statuses,oldId));
          if(ambiguous||targets.length===0){migration.pending.push({key:track+':'+oldId,track,legacyId:oldId,targets:[...new Set(targets)],status:statuses[oldId]??null,note:notes[oldId]??null,reason:ambiguous?(track==='dsa'?'The old site automatically seeded this completion. Confirm it only if earned.':'This numeric ID was shared by different exercises. Choose the intended exercise.'):'No current problem matches this legacy ID.'});}
          else {migratePut(track+'-status',targets[0],statuses[oldId]);migratePut(track+'-notes',targets[0],notes[oldId]);}
        }
        if(track!=='hld'){
          const levels=legacy(track+'-pl'),audits=legacy(track+'-pa');
          for(const k of safeKeys(levels)){migratePut(track+'-level',k,levels[k]);if(track==='lld')migratePut('lld-lab',k,levels[k]);}
          for(const k of safeKeys(audits))migratePut(track+'-audit',k,audits[k]);
        }
      }
      for(const [key,ns]of [['hld-cpl','hld-lab'],['hld-est-v1','hld-estimation']]){const data=legacy(key);for(const k of safeKeys(data))migratePut(ns,k,data[k]);}
      // Write marker last. Repeating migration is harmless; raw legacy data stays intact.
      set(META,JSON.stringify(migration));
    }
  }
  function currentMigration(){const latest=read(META);return plain(latest)&&latest.version===2?latest:migration;}
  function pending(){return (currentMigration().pending||[]).filter(p=>get(PREFIX+'resolved:'+encodeURIComponent(p.key))===null);}
  function reconcile(key,target){const p=pending().find(p=>p.key===key);if(!p||!p.targets.includes(target))throw Error('Choose an available target');
    // Existing modern progress is never overwritten by reconciliation.
    for(const [ns,value]of [[p.track+'-status',p.status],[p.track+'-notes',p.note]]){const k=PREFIX+ns+':'+encodeURIComponent(target);if(get(k)!==null&&namespaces[ns](target,value))throw Error('Target already has saved data; export and review before reconciling.');}
    put(p.track+'-status',target,p.status);put(p.track+'-notes',target,p.note);set(PREFIX+'resolved:'+encodeURIComponent(key),JSON.stringify({target,at:new Date().toISOString()}));notify();}
  function exportData(){const sections={};for(const ns of Object.keys(namespaces)){const baseline=snapshots[ns];sections[ns]=load(ns);if(baseline)snapshots[ns]=baseline;}
    const recovery={};for(const key of keys().filter(k=>k.startsWith(PREFIX)))recovery[key]=memory.has(key)?memory.get(key):get(key);
    return {format:'interview-prep-progress',version:2,exportedAt:new Date().toISOString(),sections,legacy:copy(currentMigration()),recovery};}
  function previewImport(data){if(!plain(data)||data.format!=='interview-prep-progress'||data.version!==2||!plain(data.sections))throw Error('Expected a version 2 progress export.');const changes=[];for(const ns of safeKeys(data.sections)){if(!own(namespaces,ns)||!plain(data.sections[ns]))throw Error('Unknown or invalid section: '+ns);const before=snapshots[ns],current=load(ns);if(before)snapshots[ns]=before;for(const id of safeKeys(data.sections[ns])){const value=data.sections[ns][id];if(!namespaces[ns](id,value))throw Error('Invalid entry: '+ns+'/'+id);if(JSON.stringify(current[id])!==JSON.stringify(value))changes.push({ns,id,value,conflict:own(current,id)});}}
    // Recovery is exported for inspection, never executed or blindly restored as storage.
    return {changes,conflicts:changes.filter(c=>c.conflict).length,hasLegacy:plain(data.legacy)&&Array.isArray(data.legacy.pending)};}
  function importData(data,overwrite=false){const plan=previewImport(data);for(const c of plan.changes)if(!c.conflict||overwrite)put(c.ns,c.id,c.value);
    // Preserve imported legacy/recovery content as a separate exportable archive, without trusting its schema as live progress.
    if(data.legacy||data.recovery)set(PREFIX+'import-archive:'+Date.now(),JSON.stringify({legacy:data.legacy,recovery:data.recovery}));notify();return plan;}
  function notify(){for(const cb of listeners)cb();}
  if(root.addEventListener)root.addEventListener('storage',e=>{if(e.key===null||e.key.startsWith(PREFIX)){if(e.key)memory.delete(e.key);else memory.clear();notify();}});
  root.PrepStore={load,save,pending,reconcile,exportData,previewImport,importData,subscribe:fn=>listeners.push(fn),warnings:()=>[...warnings],persistent:()=>persistent};
})(typeof window==='undefined'?globalThis:window);
