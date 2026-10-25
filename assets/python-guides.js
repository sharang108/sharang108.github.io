window.PythonGuides = [
  {
    "id": "python-values",
    "title": "Values, types & control flow",
    "order": 0,
    "prerequisites": [],
    "intuition": "Values flow through branches; truthiness answers “is it empty/zero?”, while equality answers “is it this value?”.",
    "diagram": "input → validate type → normalize → branch → value/error",
    "template": "def normalize_limit(v):\n    if v is None: return 20\n    if type(v) is not int or not 1 <= v <= 100: raise ValueError(\"limit\")\n    return v",
    "pitfalls": [
      "False is an int subclass; decide whether to reject it explicitly. and/or return operands, not necessarily bool."
    ],
    "transfer": "Change None to a sentinel meaning “unlimited”; can zero still be invalid?",
    "requiredDepth": "Use int,float,bool,str,None deliberately; distinguish truthiness from equality. and/or short-circuit and return operands, not necessarily booleans. Use == for values, is for identity (not string/integer equality). Floating-point rounding is not decimal arithmetic.",
    "invariant": "Use int,float,bool,str,None deliberately",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Values flow through branches; truthiness answers “is it empty/zero?”, while equality answers “is it this value?”."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "input → validate type → normalize → branch → value/error False is an int subclass; decide whether to reject it explicitly. and/or return operands, not necessarily bool."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Change None to a sentinel meaning “unlimited”; can zero still be invalid?"
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-collections",
    "title": "Collections, slicing & comprehensions",
    "order": 1,
    "prerequisites": [
      "python-values"
    ],
    "intuition": "Choose list for order, set for membership, dict for key→value; a collection choice changes duplicate and complexity behavior.",
    "diagram": "source → filter → key lookup → ordered output",
    "template": "seen=set()\nout=[]\nfor item in items:\n    if item not in seen:\n        seen.add(item); out.append(item)",
    "pitfalls": [
      "Hash lookup is expected constant time, but hashing and equality have costs; a slice creates a new outer sequence."
    ],
    "transfer": "Deduplicate unhashable records by a stable composite key.",
    "requiredDepth": "List is an ordered mutable sequence; tuple is a sequence, set membership, dict key→value. Comprehensions evaluate in their iteration order and create a new container. List membership is linear; dict/set lookup is expected constant time. Slicing copies sequence elements/references and costs proportional to slice size.",
    "invariant": "List is an ordered mutable sequence",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Choose list for order, set for membership, dict for key→value; a collection choice changes duplicate and complexity behavior."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "source → filter → key lookup → ordered output Hash lookup is expected constant time, but hashing and equality have costs; a slice creates a new outer sequence."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Deduplicate unhashable records by a stable composite key."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-references",
    "title": "References, mutability & copying",
    "order": 2,
    "prerequisites": [
      "python-collections"
    ],
    "intuition": "Names point to objects; assignment never clones an object. Draw aliases before predicting mutation.",
    "diagram": "a ─┐\n   ├→ [inner list]\nb ─┘",
    "template": "rows=[[0 for _ in range(3)] for _ in range(3)]\nrows[0][0]=1\nassert rows[1][0]==0",
    "pitfalls": [
      "list.copy makes a new outer list while nested objects remain shared."
    ],
    "transfer": "Snapshot settings with nested mutable lists but preserve one intentionally shared service object.",
    "requiredDepth": "Draw object boxes and reference arrows before predicting alias behavior. A shallow copy creates a new outer container but shares nested references. Repeated rows such as [[0]*3]*3 alias the same list. Deep copies need a policy for resources and shared identity.",
    "invariant": "Draw object boxes and reference arrows before predicting alias behavior. A shallow copy creates a new outer container but shares nested references. Repeated rows such as [[0]*3]*3 alias the same list. Deep copies need a policy for resources and shared identity.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Names point to objects; assignment never clones an object. Draw aliases before predicting mutation."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "a ─┐\n   ├→ [inner list]\nb ─┘ list.copy makes a new outer list while nested objects remain shared."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Snapshot settings with nested mutable lists but preserve one intentionally shared service object."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-functions",
    "title": "Functions, arguments & closures",
    "order": 3,
    "prerequisites": [
      "python-references"
    ],
    "intuition": "Defaults are evaluated when a def statement runs; closures usually look up a captured name when called.",
    "diagram": "define → bind defaults/closure → call → argument resolution → return",
    "template": "def make(scale):\n    return lambda x, scale=scale: x*scale\ncallbacks=[make(i) for i in range(3)]",
    "pitfalls": [
      "Mutable defaults persist; nonlocal rebinding differs from mutating an object."
    ],
    "transfer": "Create validators with positional-only and keyword-only options.",
    "requiredDepth": "Know positional-only, keyword-only, *args, **kwargs and default evaluation time. Defaults are evaluated when def executes; closures normally look up captured names when called. Mutable defaults can leak state between calls. Do not confuse nonlocal rebinding with mutation of a captured object.",
    "invariant": "Know positional-only, keyword-only, *args, **kwargs and default evaluation time. Defaults are evaluated when def executes",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Defaults are evaluated when a def statement runs; closures usually look up a captured name when called."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "define → bind defaults/closure → call → argument resolution → return Mutable defaults persist; nonlocal rebinding differs from mutating an object."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Create validators with positional-only and keyword-only options."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-exceptions",
    "title": "Exceptions & resource cleanup",
    "order": 4,
    "prerequisites": [
      "python-functions"
    ],
    "intuition": "Errors should leave resources and state consistent, and a handler should catch only failures it can address.",
    "diagram": "open → work → success/raise → finally cleanup",
    "template": "from contextlib import contextmanager\n@contextmanager\ndef opened(path):\n    f=open(path)\n    try: yield f\n    finally: f.close()",
    "pitfalls": [
      "A return in finally can suppress the original exception; avoid bare except."
    ],
    "transfer": "Continue a batch after malformed rows while ensuring each file closes and unexpected bugs surface.",
    "requiredDepth": "Use precise exception types; preserve cause with raise ... from error. finally executes during normal return and exception propagation. Avoid bare except swallowing KeyboardInterrupt/SystemExit. Returning from finally can hide the original failure.",
    "invariant": "Use precise exception types",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Errors should leave resources and state consistent, and a handler should catch only failures it can address."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "open → work → success/raise → finally cleanup A return in finally can suppress the original exception; avoid bare except."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Continue a batch after malformed rows while ensuring each file closes and unexpected bugs surface."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-iteration",
    "title": "Iteration, generators & context managers",
    "order": 5,
    "prerequisites": [
      "python-exceptions"
    ],
    "intuition": "An iterator carries traversal state; a generator suspends between yields rather than building all output.",
    "diagram": "iterable → iter() → next() → yield/StopIteration",
    "template": "def chunks(items,n):\n    it=iter(items)\n    while chunk:=list(__import__(\"itertools\").islice(it,n)):\n        yield chunk",
    "pitfalls": [
      "A generator is often one-shot; early exit requires an explicit ownership/cleanup policy."
    ],
    "transfer": "Transform a large input file without loading it all into memory.",
    "requiredDepth": "Use lazy generation when materializing every item is unnecessary. iter(iterator) returns the same iterator; independent traversals require independent iterator objects. StopIteration means exhaustion, not a yielded None. Early exit from a generator does not automatically implement every external resource policy.",
    "invariant": "Use lazy generation when materializing every item is unnecessary. iter(iterator) returns the same iterator",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "An iterator carries traversal state; a generator suspends between yields rather than building all output."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "iterable → iter() → next() → yield/StopIteration A generator is often one-shot; early exit requires an explicit ownership/cleanup policy."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Transform a large input file without loading it all into memory."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-objects",
    "title": "Classes, composition & dataclasses",
    "order": 6,
    "prerequisites": [
      "python-references",
      "python-functions"
    ],
    "intuition": "A class groups state and behavior; choose instance ownership for mutable state and a value object for immutable facts.",
    "diagram": "constructor → instance fields → method → invariant",
    "template": "from dataclasses import dataclass, field\n@dataclass\nclass Cart:\n    items: list[str]=field(default_factory=list)",
    "pitfalls": [
      "frozen dataclass blocks ordinary attribute rebinding, not deep mutation of contained objects."
    ],
    "transfer": "Model Money with currency-aware equality and addition.",
    "requiredDepth": "Understand instance/class attributes, methods, properties and dataclass-generated methods. Each instance owns its mutable state unless sharing is intentional. Use default_factory for mutable dataclass fields. frozen=True prevents ordinary rebinding, not deep mutation of contained lists.",
    "invariant": "Understand instance/class attributes, methods, properties and dataclass-generated methods. Each instance owns its mutable state unless sharing is intentional. Use default_factory for mutable dataclass fields. frozen=True prevents ordinary rebinding, not deep mutation of contained lists.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "A class groups state and behavior; choose instance ownership for mutable state and a value object for immutable facts."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "constructor → instance fields → method → invariant frozen dataclass blocks ordinary attribute rebinding, not deep mutation of contained objects."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Model Money with currency-aware equality and addition."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-object-model",
    "title": "Protocols, special methods & inheritance",
    "order": 7,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "Python operators and protocols call special methods; inheritance lookup follows the MRO.",
    "diagram": "operation → special method lookup → MRO → result",
    "template": "class Key:\n    def __init__(self,v): self.v=v\n    def __eq__(self,o): return isinstance(o,Key) and self.v==o.v\n    def __hash__(self): return hash(self.v)",
    "pitfalls": [
      "Equal hashable objects need equal hashes and stable hash-relevant state."
    ],
    "transfer": "Trace super() in a diamond hierarchy and explain one cooperative constructor.",
    "requiredDepth": "Cover __eq__,__hash__,__repr__,__iter__,__enter__, properties, descriptors and MRO. Equal hashable objects must have equal hashes, and their hash-relevant state must stay stable. super() follows MRO, not simply a hardcoded parent. An ABC does not enforce every semantic property of a contract.",
    "invariant": "Cover __eq__,__hash__,__repr__,__iter__,__enter__, properties, descriptors and MRO. Equal hashable objects must have equal hashes, and their hash-relevant state must stay stable. super() follows MRO, not simply a hardcoded parent. An ABC does not enforce every semantic property of a contract.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Python operators and protocols call special methods; inheritance lookup follows the MRO."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "operation → special method lookup → MRO → result Equal hashable objects need equal hashes and stable hash-relevant state."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Trace super() in a diamond hierarchy and explain one cooperative constructor."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-typing",
    "title": "Typing and Validation Boundary",
    "order": 8,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "Annotations describe intended types to tools; runtime input validation is a separate boundary.",
    "diagram": "external bytes → parse/validate → typed domain value → operation",
    "template": "def total(prices: list[int]) -> int:\n    if any(type(p) is not int for p in prices): raise ValueError(\"price\")\n    return sum(prices)",
    "pitfalls": [
      "A type hint does not reject a bad JSON value at runtime."
    ],
    "transfer": "Make a Protocol for a storage adapter and validate incoming payloads separately.",
    "requiredDepth": "Type annotations do not validate inputs at runtime; compare Optional,Union,Generics and Protocols.",
    "invariant": "Type annotations do not validate inputs at runtime",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Annotations describe intended types to tools; runtime input validation is a separate boundary."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "external bytes → parse/validate → typed domain value → operation A type hint does not reject a bad JSON value at runtime."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Make a Protocol for a storage adapter and validate incoming payloads separately."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-numeric",
    "title": "Numeric and String Semantics",
    "order": 9,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "Choose numeric and text representations according to exactness and encoding contracts.",
    "diagram": "bytes → decode → Unicode text → normalize; decimal text → Decimal",
    "template": "from decimal import Decimal\nprice=Decimal(\"0.10\")\nassert price+Decimal(\"0.20\")==Decimal(\"0.30\")",
    "pitfalls": [
      "bool is an int subclass; float is binary approximation; Unicode normalization can change byte identity."
    ],
    "transfer": "Parse amounts from CSV, reject invalid currency units, and preserve round-trip JSON representation.",
    "requiredDepth": "Contrast bool/int,float/Decimal,Unicode normalization,bytes/text and encoding errors.",
    "invariant": "Contrast bool/int,float/Decimal,Unicode normalization,bytes/text and encoding errors.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Choose numeric and text representations according to exactness and encoding contracts."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "bytes → decode → Unicode text → normalize; decimal text → Decimal bool is an int subclass; float is binary approximation; Unicode normalization can change byte identity."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Parse amounts from CSV, reject invalid currency units, and preserve round-trip JSON representation."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-matching",
    "title": "Pattern Matching and Unpacking",
    "order": 10,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "Pattern matching tests structure and can bind names; guards decide additional conditions after a structural match.",
    "diagram": "value → case shape → bind names → guard → branch",
    "template": "def kind(event):\n    match event:\n        case {\"type\":\"click\",\"x\":int(x),\"y\":int(y)}: return (x,y)\n        case _: raise ValueError(\"event\")",
    "pitfalls": [
      "Bare names in a case capture values; use qualified constants or literals for comparison."
    ],
    "transfer": "Extend an event parser with a nested payload and a guarded range.",
    "requiredDepth": "Explain match patterns,guards,sequence/mapping destructuring and wildcard binding.",
    "invariant": "Explain match patterns,guards,sequence/mapping destructuring and wildcard binding.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Pattern matching tests structure and can bind names; guards decide additional conditions after a structural match."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "value → case shape → bind names → guard → branch Bare names in a case capture values; use qualified constants or literals for comparison."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Extend an event parser with a nested payload and a guarded range."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-descriptors",
    "title": "Descriptor Lookup Trace",
    "order": 11,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "Attribute access first checks descriptors and instance state according to a specific precedence order.",
    "diagram": "data descriptor → instance dict → non-data descriptor → class/MRO",
    "template": "class Positive:\n    def __get__(self,obj,owner): return obj.__dict__[\"_n\"]\n    def __set__(self,obj,v):\n        if v<=0: raise ValueError(v)\n        obj.__dict__[\"_n\"]=v",
    "pitfalls": [
      "A property is a data descriptor; ordinary methods are non-data descriptors."
    ],
    "transfer": "Add an instance attribute that shadows a method, then contrast a property.",
    "requiredDepth": "Trace data descriptor,instance dictionary and non-data descriptor precedence with a minimal example.",
    "invariant": "Trace data descriptor,instance dictionary and non-data descriptor precedence with a minimal example.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Attribute access first checks descriptors and instance state according to a specific precedence order."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "data descriptor → instance dict → non-data descriptor → class/MRO A property is a data descriptor; ordinary methods are non-data descriptors."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Add an instance attribute that shadows a method, then contrast a property."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-decorators",
    "title": "Decorators & callable composition",
    "order": 12,
    "prerequisites": [
      "python-functions",
      "python-exceptions"
    ],
    "intuition": "A decorator wraps a callable; preserve arguments, return values, errors and metadata.",
    "diagram": "definition → decorator applied → wrapper call → original call",
    "template": "from functools import wraps\ndef logged(fn):\n    @wraps(fn)\n    def wrapper(*a,**kw): return fn(*a,**kw)\n    return wrapper",
    "pitfalls": [
      "A synchronous wrapper around an async function returns a coroutine and may not time its execution."
    ],
    "transfer": "Build bounded retries only for idempotent operations and retain the last exception.",
    "requiredDepth": "Use closures for parameterized decorators and functools.wraps for metadata. Arguments, return values and exception semantics remain explicit. Timing only successful calls can mislead. Async callables need async-aware wrappers.",
    "invariant": "Use closures for parameterized decorators and functools.wraps for metadata. Arguments, return values and exception semantics remain explicit. Timing only successful calls can mislead. Async callables need async-aware wrappers.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "A decorator wraps a callable; preserve arguments, return values, errors and metadata."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "definition → decorator applied → wrapper call → original call A synchronous wrapper around an async function returns a coroutine and may not time its execution."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Build bounded retries only for idempotent operations and retain the last exception."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-modules",
    "title": "Modules, imports & environments",
    "order": 13,
    "prerequisites": [
      "python-functions"
    ],
    "intuition": "Import executes module top-level code once per interpreter cache entry; entry-point work belongs behind a guard.",
    "diagram": "import → load module → execute top level → cache → bind name",
    "template": "def main():\n    print(\"run job\")\nif __name__ == \"__main__\":\n    main()",
    "pitfalls": [
      "Circular imports expose partially initialized modules; local filenames can shadow standard modules."
    ],
    "transfer": "Package a transformer with isolated configuration and a command-line entry point.",
    "requiredDepth": "Cover packages, absolute/relative imports,__main__,virtual environments and dependency declarations. Importing a library should not start a job or require unrelated configuration. Circular imports can expose partially initialized modules. A local file named json.py can shadow the standard library.",
    "invariant": "Cover packages, absolute/relative imports,__main__,virtual environments and dependency declarations. Importing a library should not start a job or require unrelated configuration. Circular imports can expose partially initialized modules. A local file named json.py can shadow the standard library.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Import executes module top-level code once per interpreter cache entry; entry-point work belongs behind a guard."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "import → load module → execute top level → cache → bind name Circular imports expose partially initialized modules; local filenames can shadow standard modules."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Package a transformer with isolated configuration and a command-line entry point."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-standard-library",
    "title": "Practical standard library",
    "order": 14,
    "prerequisites": [
      "python-iteration",
      "python-modules"
    ],
    "intuition": "Use library parsers for structured formats; choose time zones, number types and serialization rules explicitly.",
    "diagram": "CSV bytes → csv.DictReader → validate → group → timezone-aware report",
    "template": "import csv\nfrom collections import Counter\ndef counts(stream):\n    return Counter(row[\"kind\"] for row in csv.DictReader(stream))",
    "pitfalls": [
      "Splitting on commas breaks quoted/multiline CSV; naive datetime lacks a unique instant."
    ],
    "transfer": "Produce a daily event summary across time zones with malformed-row reporting.",
    "requiredDepth": "Practice collections,itertools,functools,pathlib,json,csv,re,datetime,zoneinfo,heapq and bisect. Conversions preserve the intended type,time zone and serialization contract. Use csv parsing for quoted multiline records. Naive timestamps do not identify a unique instant; Decimal is not directly JSON-serializable.",
    "invariant": "Practice collections,itertools,functools,pathlib,json,csv,re,datetime,zoneinfo,heapq and bisect. Conversions preserve the intended type,time zone and serialization contract. Use csv parsing for quoted multiline records. Naive timestamps do not identify a unique instant",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Use library parsers for structured formats; choose time zones, number types and serialization rules explicitly."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "CSV bytes → csv.DictReader → validate → group → timezone-aware report Splitting on commas breaks quoted/multiline CSV; naive datetime lacks a unique instant."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Produce a daily event summary across time zones with malformed-row reporting."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-memory",
    "title": "Runtime, memory & performance",
    "order": 15,
    "prerequisites": [
      "python-references",
      "python-iteration"
    ],
    "intuition": "A reference retained by a cache, closure or cycle keeps an object reachable; measure before optimizing.",
    "diagram": "roots → references → reachable objects; profile → hypothesis → change → remeasure",
    "template": "import tracemalloc\ntracemalloc.start()\n# run representative workload\nprint(tracemalloc.get_traced_memory())",
    "pitfalls": [
      "CPython reference counting is an implementation detail; do not rely on immediate finalization for resources."
    ],
    "transfer": "Find whether a slow transform is CPU-bound, I/O-bound or materializing too much data.",
    "requiredDepth": "Distinguish language guarantees from CPython implementation details such as reference counting. Unreachable is different from immediately finalized; resource release should be explicit. Cycles, caches and retained closures can keep objects alive. GIL/free-threading behavior depends on interpreter/build; never infer application atomicity from it.",
    "invariant": "Distinguish language guarantees from CPython implementation details such as reference counting. Unreachable is different from immediately finalized",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "A reference retained by a cache, closure or cycle keeps an object reachable; measure before optimizing."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "roots → references → reachable objects; profile → hypothesis → change → remeasure CPython reference counting is an implementation detail; do not rely on immediate finalization for resources."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Find whether a slow transform is CPU-bound, I/O-bound or materializing too much data."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-async",
    "title": "Async execution & cancellation",
    "order": 16,
    "prerequisites": [
      "python-exceptions",
      "python-iteration"
    ],
    "intuition": "Calling an async function makes a coroutine; scheduling and await drive it. Cancellation must clean owned resources.",
    "diagram": "coroutine → task → await points → completion/cancel → finally",
    "template": "import asyncio\nasync def fetch_all(urls,fetch):\n    sem=asyncio.Semaphore(5)\n    async def one(u):\n        async with sem: return await fetch(u)\n    async with asyncio.TaskGroup() as tg:\n        tasks=[tg.create_task(one(u)) for u in urls]\n    return [t.result() for t in tasks]",
    "pitfalls": [
      "async def does not make blocking CPU work parallel; timeout does not prove a remote side effect was undone."
    ],
    "transfer": "Cancel a bounded fetcher mid-flight and demonstrate cleanup.",
    "requiredDepth": "Use await for cooperative suspension; distinguish coroutine creation from scheduling. Owned tasks must be awaited/cancelled and resources released on cancellation. async def does not make CPU work parallel. Timeout does not prove a remote operation never happened.",
    "invariant": "Use await for cooperative suspension",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Calling an async function makes a coroutine; scheduling and await drive it. Cancellation must clean owned resources."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "coroutine → task → await points → completion/cancel → finally async def does not make blocking CPU work parallel; timeout does not prove a remote side effect was undone."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Cancel a bounded fetcher mid-flight and demonstrate cleanup."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-concurrency",
    "title": "Threads, processes & shared state",
    "order": 17,
    "prerequisites": [
      "python-memory",
      "python-async"
    ],
    "intuition": "Threads share memory; processes exchange serialized values. Multi-step state changes need one atomic owner or lock.",
    "diagram": "read state → check → update → publish; protect whole critical section",
    "template": "from threading import Lock\nlock=Lock()\ndef reserve(state,key):\n    with lock:\n        if state.get(key): return False\n        state[key]=True; return True",
    "pitfalls": [
      "The GIL is not a transaction, and free-threaded builds exist; protect invariants explicitly."
    ],
    "transfer": "Choose thread/process/async worker for I/O and CPU work, including shutdown and cancellation.",
    "requiredDepth": "Threads share process memory; processes have distinct memory and serialization costs. A multi-step read/check/write must be protected as one operation when shared. The GIL is not a substitute for locks or transactions. Never hold a lock around arbitrary slow callbacks without a reason.",
    "invariant": "Threads share process memory",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "Threads share memory; processes exchange serialized values. Multi-step state changes need one atomic owner or lock."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "read state → check → update → publish; protect whole critical section The GIL is not a transaction, and free-threaded builds exist; protect invariants explicitly."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Choose thread/process/async worker for I/O and CPU work, including shutdown and cancellation."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  },
  {
    "id": "python-generics",
    "title": "Generic Container Contract",
    "order": 18,
    "prerequisites": [
      "python-objects"
    ],
    "intuition": "A generic interface expresses which value types may flow in and out; mutable operations constrain variance.",
    "diagram": "producer[T] → read T; mutable store[T] ↔ read/write T",
    "template": "from typing import Generic, TypeVar\nT=TypeVar(\"T\")\nclass Box(Generic[T]):\n    def __init__(self,v:T): self.value=v\n    def get(self)->T: return self.value",
    "pitfalls": [
      "A mutable box of Cat cannot safely stand in for a mutable box of Animal if callers can insert Dog."
    ],
    "transfer": "Define a read-only covariant view and a mutable invariant store.",
    "requiredDepth": "Define a generic repository or container interface and distinguish covariance from mutable updates.",
    "invariant": "Define a generic repository or container interface and distinguish covariance from mutable updates.",
    "recall": [
      {
        "q": "Explain the central rule without looking.",
        "a": "A generic interface expresses which value types may flow in and out; mutable operations constrain variance."
      },
      {
        "q": "Trace the visual with a boundary case.",
        "a": "producer[T] → read T; mutable store[T] ↔ read/write T A mutable box of Cat cannot safely stand in for a mutable box of Animal if callers can insert Dog."
      },
      {
        "q": "What changes in the transfer case?",
        "a": "Define a read-only covariant view and a mutable invariant store."
      }
    ],
    "sources": [
      {
        "title": "Python language and library documentation",
        "url": "https://docs.python.org/3/"
      }
    ]
  }
];
