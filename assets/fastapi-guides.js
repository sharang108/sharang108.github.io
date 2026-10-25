window.FastapiGuides = [
  {
    "id": "fastapi-routing",
    "title": "Routes, parameters & request/response models",
    "order": 0,
    "prerequisites": [
      "python-typing",
      "http-semantics"
    ],
    "intuition": "Type annotations connect path/query/body parsing to validation and response contracts.",
    "diagram": "route match → parse path/query/body → validate → handler → response model",
    "template": "@app.post(\"/items\",response_model=ItemOut,status_code=201)\ndef create_item(item:ItemIn): return save(item)",
    "pitfalls": [
      "A response model can filter output; a Python type hint alone outside FastAPI is not runtime validation."
    ],
    "transfer": "Return a 422 on bad input and avoid leaking an internal field.",
    "invariant": "Type annotations connect path/query/body parsing to validation and response contracts.",
    "requiredDepth": "Separate path/query/body data,validate constraints,serialize responses and return explicit status/error contracts. Progression: Typed endpoint → response filtering → combined API",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Type annotations connect path/query/body parsing to validation and response contracts."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "route match → parse path/query/body → validate → handler → response model A response model can filter output; a Python type hint alone outside FastAPI is not runtime validation."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Return a 422 on bad input and avoid leaking an internal field."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-models",
    "title": "Pydantic models & validation",
    "order": 1,
    "prerequisites": [
      "fastapi-routing",
      "python-objects"
    ],
    "intuition": "Pydantic 2 models validate and serialize boundary data; PATCH needs an explicit unset-field policy.",
    "diagram": "JSON → model_validate → domain values → model_dump → response",
    "template": "class Patch(BaseModel):\n    name: str|None=None\nchanges=patch.model_dump(exclude_unset=True)",
    "pitfalls": [
      "None and omitted are different for partial updates; model_dump defaults matter."
    ],
    "transfer": "Apply a nested PATCH while preserving fields the client omitted.",
    "invariant": "Pydantic 2 models validate and serialize boundary data; PATCH needs an explicit unset-field policy.",
    "requiredDepth": "Use explicit Pydantic2 baseline,field/model validation,nested models,serialization and partial-update semantics. Progression: Model → nested validation → PATCH contract",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Pydantic 2 models validate and serialize boundary data; PATCH needs an explicit unset-field policy."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "JSON → model_validate → domain values → model_dump → response None and omitted are different for partial updates; model_dump defaults matter."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Apply a nested PATCH while preserving fields the client omitted."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-dependencies",
    "title": "Dependency graphs & lifecycle",
    "order": 2,
    "prerequisites": [
      "fastapi-models",
      "python-iteration"
    ],
    "intuition": "Dependencies form a request-scoped graph with explicit setup and cleanup; tests can override nodes.",
    "diagram": "request → dependency graph setup → endpoint → yield cleanup → response",
    "template": "def get_db():\n    db=SessionLocal()\n    try: yield db\n    finally: db.close()",
    "pitfalls": [
      "A yielded session lifecycle does not automatically choose transaction commit/rollback policy."
    ],
    "transfer": "Override a DB dependency in a local test and prove cleanup after an error.",
    "invariant": "Dependencies form a request-scoped graph with explicit setup and cleanup; tests can override nodes.",
    "requiredDepth": "Compose reusable dependencies,override them in local checks and use yield/finally for owned resources. Progression: Dependency graph → cleanup → database-backed feature",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Dependencies form a request-scoped graph with explicit setup and cleanup; tests can override nodes."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "request → dependency graph setup → endpoint → yield cleanup → response A yielded session lifecycle does not automatically choose transaction commit/rollback policy."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Override a DB dependency in a local test and prove cleanup after an error."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-database",
    "title": "Database integration, transactions & migrations",
    "order": 3,
    "prerequisites": [
      "fastapi-dependencies",
      "sql-lifecycle"
    ],
    "intuition": "FastAPI does not choose a database; session ownership, transaction boundaries and migrations remain application design.",
    "diagram": "dependency opens session → endpoint/domain operation → commit/rollback → close",
    "template": "def reserve(db:Session,seat_id:int,user_id:int):\n    # guarded UPDATE or DB constraint; commit only after all changes\n    ...",
    "pitfalls": [
      "Do not hold a synchronous DB call inside an async endpoint without understanding blocking behavior."
    ],
    "transfer": "Two competing reservation calls must not both succeed.",
    "invariant": "FastAPI does not choose a database; session ownership, transaction boundaries and migrations remain application design.",
    "requiredDepth": "Choose and document sync/async driver/session integration; separate session lifecycle from transaction boundary and use migrations. Progression: Query → rollback → concurrent reservation",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "FastAPI does not choose a database; session ownership, transaction boundaries and migrations remain application design."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "dependency opens session → endpoint/domain operation → commit/rollback → close Do not hold a synchronous DB call inside an async endpoint without understanding blocking behavior."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Two competing reservation calls must not both succeed."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-async",
    "title": "Sync/async execution & background work",
    "order": 4,
    "prerequisites": [
      "fastapi-dependencies",
      "python-async"
    ],
    "intuition": "Choose sync or async endpoint according to dependencies; bound concurrency and own cancellations.",
    "diagram": "request → def threadpool OR async event loop → dependency/work → response",
    "template": "sem=asyncio.Semaphore(5)\nasync with sem:\n    result=await remote_call()",
    "pitfalls": [
      "BackgroundTasks is in-process and not a durable job queue; async def does not speed CPU work."
    ],
    "transfer": "Cancel a request during aggregation and explain which remote effects might remain.",
    "invariant": "Choose sync or async endpoint according to dependencies; bound concurrency and own cancellations.",
    "requiredDepth": "Choose def/async def deliberately; bound work,cancel owned tasks and distinguish in-process background work from durable jobs. Progression: Blocking call trace → concurrent endpoint → cancellation",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Choose sync or async endpoint according to dependencies; bound concurrency and own cancellations."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "request → def threadpool OR async event loop → dependency/work → response BackgroundTasks is in-process and not a durable job queue; async def does not speed CPU work."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Cancel a request during aggregation and explain which remote effects might remain."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-auth",
    "title": "Authentication dependencies & authorization",
    "order": 5,
    "prerequisites": [
      "fastapi-dependencies",
      "http-browser"
    ],
    "intuition": "Authentication dependencies identify principals; resource access still needs ownership checks.",
    "diagram": "credential → auth dependency → principal → scoped query → authorization → result",
    "template": "def current_user(token:str=Depends(oauth2_scheme)): ...\n@app.get(\"/docs/{id}\")\ndef get_doc(id:int,user=Depends(current_user)): ...",
    "pitfalls": [
      "A token that validates cryptographically does not grant access to every object."
    ],
    "transfer": "Test missing, expired and valid credentials against another user’s document.",
    "invariant": "Authentication dependencies identify principals; resource access still needs ownership checks.",
    "requiredDepth": "Compose credential extraction,identity and owner-scoped access checks; distinguish OpenAPI auth declaration from enforcement. Progression: Identity → owner-only route → complete API",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Authentication dependencies identify principals; resource access still needs ownership checks."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "credential → auth dependency → principal → scoped query → authorization → result A token that validates cryptographically does not grant access to every object."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Test missing, expired and valid credentials against another user’s document."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-presentation",
    "title": "Templates, forms, uploads & streaming",
    "order": 6,
    "prerequisites": [
      "fastapi-routing",
      "http-connections"
    ],
    "intuition": "Templates, forms, uploads and streams have separate content types and resource lifetimes.",
    "diagram": "form/multipart → validation → store bytes → response/template/stream",
    "template": "return templates.TemplateResponse(request,\"item.html\",{\"item\":item})",
    "pitfalls": [
      "Never trust filename or content type supplied by the client; bound upload size and close files."
    ],
    "transfer": "Upload a document, render metadata HTML, and stream authorized download.",
    "invariant": "Templates, forms, uploads and streams have separate content types and resource lifetimes.",
    "requiredDepth": "Use Jinja/static mounts,form parsing,UploadFile,download/stream responses; explain body-format constraints. Progression: Template → multipart form → file feature",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Templates, forms, uploads and streams have separate content types and resource lifetimes."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "form/multipart → validation → store bytes → response/template/stream Never trust filename or content type supplied by the client; bound upload size and close files."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Upload a document, render metadata HTML, and stream authorized download."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    "id": "fastapi-application",
    "title": "Routers, middleware, lifespan & realtime",
    "order": 7,
    "prerequisites": [
      "fastapi-async",
      "fastapi-auth"
    ],
    "intuition": "Routers and lifespan organize startup/shutdown; middleware wraps HTTP requests and WebSockets need their own lifecycle.",
    "diagram": "lifespan start → router/middleware → request or WS → lifespan stop",
    "template": "@asynccontextmanager\nasync def lifespan(app):\n    await resource.open()\n    try: yield\n    finally: await resource.close()",
    "pitfalls": [
      "A process-local connection registry is not global across workers; reconnect requires resynchronization."
    ],
    "transfer": "Split a real-time feature into routers and define a multi-worker delivery plan.",
    "invariant": "Routers and lifespan organize startup/shutdown; middleware wraps HTTP requests and WebSockets need their own lifecycle.",
    "requiredDepth": "Compose APIRouters,exception handlers,lifespan resources,headers/CORS and WebSocket disconnect handling. Progression: Router → resource startup/shutdown → complete API",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Routers and lifespan organize startup/shutdown; middleware wraps HTTP requests and WebSockets need their own lifecycle."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "lifespan start → router/middleware → request or WS → lifespan stop A process-local connection registry is not global across workers; reconnect requires resynchronization."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Split a real-time feature into routers and define a multi-worker delivery plan."
      }
    ],
    "sources": [
      {
        "title": "FastAPI documentation",
        "url": "https://fastapi.tiangolo.com/"
      }
    ]
  }
];
