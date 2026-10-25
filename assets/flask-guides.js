window.FlaskGuides = [
  {
    "id": "flask-setup",
    "title": "Application factories & configuration",
    "order": 0,
    "prerequisites": [
      "python-modules",
      "http-lifecycle"
    ],
    "intuition": "An app factory builds independent application instances from explicit configuration; extensions attach per app.",
    "diagram": "config → create_app → register extensions/blueprints → app → request",
    "template": "def create_app(config):\n    app = Flask(__name__)\n    app.config.update(config)\n    db.init_app(app)\n    app.register_blueprint(books_bp)\n    return app",
    "pitfalls": [
      "Importing a global app inside feature modules couples tests and creates circular imports."
    ],
    "transfer": "Create two apps with different databases and prove state isolation.",
    "invariant": "An app factory builds independent application instances from explicit configuration; extensions attach per app.",
    "requiredDepth": "Create two independent app instances with different configs; extension initialization must not leak state. Progression: Factory/config inspection → isolated app fixture → full app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "An app factory builds independent application instances from explicit configuration; extensions attach per app."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "config → create_app → register extensions/blueprints → app → request Importing a global app inside feature modules couples tests and creates circular imports."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Create two apps with different databases and prove state isolation."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-routing",
    "title": "Routing, blueprints & request parsing",
    "order": 1,
    "prerequisites": [
      "flask-setup",
      "http-semantics"
    ],
    "intuition": "A route maps method and URL to one handler; a blueprint groups routes without owning a separate app.",
    "diagram": "client → URL/method match → blueprint handler → response",
    "template": "@books_bp.post(\"/books\")\ndef add_book():\n    data=request.get_json()\n    # validate fields, then persist and return 201",
    "pitfalls": [
      "Path, query, form and JSON inputs have different parsing/error behavior."
    ],
    "transfer": "Version a blueprint and keep old clients working.",
    "invariant": "A route maps method and URL to one handler; a blueprint groups routes without owning a separate app.",
    "requiredDepth": "Create typed routes,query/body validation,url_for and explicit404/405 behavior in reusable blueprints. Progression: One route → blueprint feature → composed app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A route maps method and URL to one handler; a blueprint groups routes without owning a separate app."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "client → URL/method match → blueprint handler → response Path, query, form and JSON inputs have different parsing/error behavior."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Version a blueprint and keep old clients working."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-contexts",
    "title": "Application/request contexts & lifecycle",
    "order": 2,
    "prerequisites": [
      "flask-routing",
      "python-exceptions"
    ],
    "intuition": "Flask pushes request/app contexts around a request; g holds request-scoped resources that teardown must close.",
    "diagram": "request begins → context push → handler/g resource → response/error → teardown → pop",
    "template": "def get_db():\n    if \"db\" not in g: g.db=sqlite3.connect(current_app.config[\"DATABASE\"])\n    return g.db\n@app.teardown_appcontext\ndef close_db(error):\n    db=g.pop(\"db\",None)\n    if db is not None: db.close()",
    "pitfalls": [
      "A request proxy is unavailable outside the right context; teardown runs after failures too."
    ],
    "transfer": "Open a DB cursor then raise; show closure and rollback.",
    "invariant": "Flask pushes request/app contexts around a request; g holds request-scoped resources that teardown must close.",
    "requiredDepth": "Use current_app,g,request correctly; acquire/close owned resources even after exceptions. Progression: Trace context lifetime → resource cleanup → combined persistence",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Flask pushes request/app contexts around a request; g holds request-scoped resources that teardown must close."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "request begins → context push → handler/g resource → response/error → teardown → pop A request proxy is unavailable outside the right context; teardown runs after failures too."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Open a DB cursor then raise; show closure and rollback."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-templates",
    "title": "Jinja, static assets & forms",
    "order": 3,
    "prerequisites": [
      "flask-routing",
      "http-browser"
    ],
    "intuition": "Jinja renders server HTML with autoescaping; form handling needs validation and state-change protection.",
    "diagram": "GET form → render template → POST form → validate → redirect or rerender errors",
    "template": "return render_template(\"books/detail.html\", book=book, errors=errors)\n# url_for names the endpoint; static files use url_for(\"static\",filename=\"...\")",
    "pitfalls": [
      "Escaping output is distinct from CSRF protection; do not trust a hidden form field."
    ],
    "transfer": "Preserve submitted form values after validation errors.",
    "invariant": "Jinja renders server HTML with autoescaping; form handling needs validation and state-change protection.",
    "requiredDepth": "Render base/child templates,flash validation errors and preserve user input; explain escaping and redirect-after-post. Progression: One template → form workflow → complete server-rendered app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Jinja renders server HTML with autoescaping; form handling needs validation and state-change protection."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "GET form → render template → POST form → validate → redirect or rerender errors Escaping output is distinct from CSRF protection; do not trust a hidden form field."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Preserve submitted form values after validation errors."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-database",
    "title": "Database integration & migrations",
    "order": 4,
    "prerequisites": [
      "flask-contexts",
      "sql-lifecycle"
    ],
    "intuition": "A DB connection or session belongs to a request/unit of work; schema changes are separate migrations.",
    "diagram": "request → open connection → begin → write → commit/rollback → close",
    "template": "with get_db() as conn:\n    changed=conn.execute(\"UPDATE copies SET borrower=? WHERE id=? AND borrower IS NULL\",(user_id,copy_id)).rowcount\n    if changed!=1: raise Conflict()",
    "pitfalls": [
      "sqlite3 context manager commits/rolls back but does not by itself close the connection."
    ],
    "transfer": "Fail the second write of a loan and show no partial reservation.",
    "invariant": "A DB connection or session belongs to a request/unit of work; schema changes are separate migrations.",
    "requiredDepth": "Use explicit SQL or a pinned SQLAlchemy integration; session ownership,transactions,relationships,queries,migrations. Progression: Single query → transaction failure → persisted application",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A DB connection or session belongs to a request/unit of work; schema changes are separate migrations."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "request → open connection → begin → write → commit/rollback → close sqlite3 context manager commits/rolls back but does not by itself close the connection."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Fail the second write of a loan and show no partial reservation."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-sessions",
    "title": "Sessions, login & access checks",
    "order": 5,
    "prerequisites": [
      "flask-templates",
      "http-browser"
    ],
    "intuition": "A session identifies a caller; authorization rechecks ownership against trusted server state.",
    "diagram": "cookie → session identity → load row → owner check → operation",
    "template": "user_id=session.get(\"user_id\")\nif user_id is None: abort(401)\nif document.owner_id!=user_id: abort(404)",
    "pitfalls": [
      "Default Flask session data is signed client-side, not encrypted; never store secrets or trust it as an authority."
    ],
    "transfer": "Log out, rotate a session, then retry an old mutation.",
    "invariant": "A session identifies a caller; authorization rechecks ownership against trusted server state.",
    "requiredDepth": "Implement login/logout and ownership checks; distinguish signed cookie from encrypted storage and CSRF from CORS. Progression: Session lifecycle → owner-only mutation → complete app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A session identifies a caller; authorization rechecks ownership against trusted server state."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "cookie → session identity → load row → owner check → operation Default Flask session data is signed client-side, not encrypted; never store secrets or trust it as an authority."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Log out, rotate a session, then retry an old mutation."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-responses",
    "title": "Errors, JSON, files & streaming",
    "order": 6,
    "prerequisites": [
      "flask-routing",
      "http-connections"
    ],
    "intuition": "A response contract includes status, headers, content type and error shape; streams/files have lifetimes.",
    "diagram": "route → success/error handler → Response → client",
    "template": "return jsonify({\"id\":book.id}),201,{\"Location\":url_for(\"books.detail\",id=book.id)}",
    "pitfalls": [
      "Do not leak stack traces; a generator that uses a closed request resource will fail mid-stream."
    ],
    "transfer": "Return a large file with safe filename and test a client disconnect.",
    "invariant": "A response contract includes status, headers, content type and error shape; streams/files have lifetimes.",
    "requiredDepth": "Create consistent error handlers,JSON contracts,file upload limits and downloadable responses. Progression: Error case → file workflow → integration",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A response contract includes status, headers, content type and error shape; streams/files have lifetimes."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "route → success/error handler → Response → client Do not leak stack traces; a generator that uses a closed request resource will fail mid-stream."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Return a large file with safe filename and test a client disconnect."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  },
  {
    "id": "flask-composition",
    "title": "Hooks, extension boundaries & app composition",
    "order": 7,
    "prerequisites": [
      "flask-database",
      "flask-responses"
    ],
    "intuition": "Compose factories, blueprints, extension lifecycles and hooks around narrow feature contracts.",
    "diagram": "factory → blueprint/dependencies → request hook → route → after/teardown",
    "template": "def create_app(config):\n    app=Flask(__name__)\n    app.config.update(config)\n    app.register_blueprint(api_bp,url_prefix=\"/api\")\n    app.register_blueprint(web_bp)\n    return app",
    "pitfalls": [
      "A before_request hook is not a transaction boundary; background work needs its own app context."
    ],
    "transfer": "Extract a reusable feature and prove it works in two app configurations.",
    "invariant": "Compose factories, blueprints, extension lifecycles and hooks around narrow feature contracts.",
    "requiredDepth": "Compare before/after hooks,teardown,CLI commands and extension configuration; use a local client to verify routes. Progression: Hook trace → CLI data command → complete app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Compose factories, blueprints, extension lifecycles and hooks around narrow feature contracts."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "factory → blueprint/dependencies → request hook → route → after/teardown A before_request hook is not a transaction boundary; background work needs its own app context."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Extract a reusable feature and prove it works in two app configurations."
      }
    ],
    "sources": [
      {
        "title": "Flask 3.1 documentation",
        "url": "https://flask.palletsprojects.com/en/stable/"
      }
    ]
  }
];
