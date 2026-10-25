(function(){
  const script=document.currentScript,home=new URL('../progress.html',script.src).href;
  const box=document.createElement('aside');box.setAttribute('aria-label','Progress storage');box.style.cssText='position:relative;padding:12px 20px;background:#151d2b;color:#e6edf7;font:13px/1.5 system-ui;z-index:20;border-top:1px solid #435068';
  const link=document.createElement('a');link.href=home;link.textContent='Progress backup & recovery';link.style.color='#92c5ff';
  const message=document.createElement('span');message.style.marginLeft='12px';const sessions=document.createElement('a');sessions.href=new URL('../session.html',script.src).href;sessions.textContent='Learning & revision sessions';sessions.style.cssText='color:#92c5ff;margin-left:16px';box.append(link,sessions,message);document.body.append(box);
  function update(){const pending=PrepStore.pending().length;message.textContent=PrepStore.warnings().join(' ')||(pending?pending+' legacy records need review.':'Progress stays in this browser. Revision documents are saved wherever you choose.');}
  update();PrepStore.subscribe(update);window.addEventListener('prep-warning',update);
})();
