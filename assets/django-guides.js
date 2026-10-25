window.DjangoGuides = [
  {
    "id": "django-setup",
    "title": "Project/app layout, settings & URLs",
    "order": 0,
    "prerequisites": [
      "python-modules",
      "http-lifecycle"
    ],
    "intuition": "A Django project configures settings and URL routing; apps group reusable domain features.",
    "diagram": "settings → root URLconf → app URLconf → view",
    "template": "urlpatterns=[path(\"books/\",include((\"books.urls\",\"books\"),namespace=\"books\"))]",
    "pitfalls": [
      "An import-time query or side effect can run during commands and startup; keep configuration explicit."
    ],
    "transfer": "Resolve a named URL across two apps and two settings profiles.",
    "invariant": "A Django project configures settings and URL routing; apps group reusable domain features.",
    "requiredDepth": "Compose named/namespaced URL routes,settings and multiple apps without import side effects. Progression: URL resolution → app feature → project",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A Django project configures settings and URL routing; apps group reusable domain features."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "settings → root URLconf → app URLconf → view An import-time query or side effect can run during commands and startup; keep configuration explicit."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Resolve a named URL across two apps and two settings profiles."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-views",
    "title": "Function/class-based views & request lifecycle",
    "order": 1,
    "prerequisites": [
      "django-setup",
      "http-semantics"
    ],
    "intuition": "Views map request methods to responses; choose function or class style based on shared behavior.",
    "diagram": "middleware → URL resolver → view → response → middleware",
    "template": "def detail(request,pk):\n    book=get_object_or_404(Book,pk=pk)\n    return render(request,\"books/detail.html\",{\"book\":book})",
    "pitfalls": [
      "A class-based view method is still subject to method dispatch, auth and response rules."
    ],
    "transfer": "Support GET and POST with clear validation and redirect-after-post.",
    "invariant": "Views map request methods to responses; choose function or class style based on shared behavior.",
    "requiredDepth": "Implement equivalent FBV/CBV behavior,dispatch,redirects and error responses; explain middleware ordering. Progression: Single view → CBV variation → feature",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Views map request methods to responses; choose function or class style based on shared behavior."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "middleware → URL resolver → view → response → middleware A class-based view method is still subject to method dispatch, auth and response rules."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Support GET and POST with clear validation and redirect-after-post."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-templates",
    "title": "Templates, forms & static/media",
    "order": 2,
    "prerequisites": [
      "django-views",
      "http-browser"
    ],
    "intuition": "Templates present values; forms validate input and keep error state; static/media have distinct ownership.",
    "diagram": "GET form → template → POST → form.is_valid → save/redirect or rerender",
    "template": "form=BookForm(request.POST or None)\nif request.method==\"POST\" and form.is_valid():\n    form.save(); return redirect(\"books:list\")\nreturn render(request,\"books/form.html\",{\"form\":form})",
    "pitfalls": [
      "Template escaping is not an authorization or upload validation mechanism."
    ],
    "transfer": "Add an uploaded cover image and retain form errors on invalid POST.",
    "invariant": "Templates present values; forms validate input and keep error state; static/media have distinct ownership.",
    "requiredDepth": "Use template inheritance,Form/ModelForm validation,bound forms,CSRF and redirect-after-post; distinguish static/media. Progression: Render → invalid form → persisted form workflow",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Templates present values; forms validate input and keep error state; static/media have distinct ownership."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "GET form → template → POST → form.is_valid → save/redirect or rerender Template escaping is not an authorization or upload validation mechanism."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Add an uploaded cover image and retain form errors on invalid POST."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-orm",
    "title": "Models, QuerySets & relationships",
    "order": 3,
    "prerequisites": [
      "django-setup",
      "sql-queries"
    ],
    "intuition": "QuerySets are lazy query descriptions; relation traversal and prefetching determine query count.",
    "diagram": "view → QuerySet/filter → SQL evaluation → related rows → serialization",
    "template": "books=Book.objects.select_related(\"author\").prefetch_related(\"tags\")",
    "pitfalls": [
      "select_related joins single-valued relations; prefetch_related makes separate queries for collections."
    ],
    "transfer": "Show and fix an N+1 list view, then measure query count.",
    "invariant": "QuerySets are lazy query descriptions; relation traversal and prefetching determine query count.",
    "requiredDepth": "Model constraints/relations; explain laziness,select_related,prefetch_related,aggregation and query counts. Progression: Model/query → N+1 comparison → data-backed feature",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "QuerySets are lazy query descriptions; relation traversal and prefetching determine query count."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "view → QuerySet/filter → SQL evaluation → related rows → serialization select_related joins single-valued relations; prefetch_related makes separate queries for collections."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Show and fix an N+1 list view, then measure query count."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-transactions",
    "title": "Transactions, migrations & concurrent updates",
    "order": 4,
    "prerequisites": [
      "django-orm",
      "sql-transactions"
    ],
    "intuition": "atomic groups DB writes; concurrent updates still require constraints, conditional writes or appropriate locks.",
    "diagram": "atomic BEGIN → read/lock or conditional update → commit/rollback",
    "template": "with transaction.atomic():\n    changed=Seat.objects.filter(pk=seat_id,owner__isnull=True).update(owner=user)\n    if changed!=1: raise Conflict()",
    "pitfalls": [
      "A transaction does not make a read/check/write race safe under every isolation level."
    ],
    "transfer": "Run two competing bookings and prove exactly one succeeds.",
    "invariant": "atomic groups DB writes; concurrent updates still require constraints, conditional writes or appropriate locks.",
    "requiredDepth": "Use atomic,on_commit,select_for_update and conditional updates appropriately; design compatible schema/data migrations. Progression: Failure rollback → competing reservation → complete workflow",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "atomic groups DB writes; concurrent updates still require constraints, conditional writes or appropriate locks."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "atomic BEGIN → read/lock or conditional update → commit/rollback A transaction does not make a read/check/write race safe under every isolation level."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Run two competing bookings and prove exactly one succeeds."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-auth-admin",
    "title": "Authentication, permissions & admin",
    "order": 5,
    "prerequisites": [
      "django-templates",
      "django-orm"
    ],
    "intuition": "Authentication identifies a principal; permissions and queryset scoping authorize actions.",
    "diagram": "session → AuthenticationMiddleware → user → permission/owner check → response",
    "template": "if not request.user.is_authenticated: return redirect(\"login\")\nif document.owner_id!=request.user.id: raise Http404",
    "pitfalls": [
      "Admin is a staff tool, not a substitute for public user authorization."
    ],
    "transfer": "Try list, detail and mutation as owner, other user and anonymous caller.",
    "invariant": "Authentication identifies a principal; permissions and queryset scoping authorize actions.",
    "requiredDepth": "Implement ownership checks and useful admin/list/filter behavior; distinguish model permissions from object-level policy. Progression: Login → scoped view → admin workflow",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Authentication identifies a principal; permissions and queryset scoping authorize actions."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "session → AuthenticationMiddleware → user → permission/owner check → response Admin is a staff tool, not a substitute for public user authorization."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Try list, detail and mutation as owner, other user and anonymous caller."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-integration",
    "title": "Signals, cache, files & async boundaries",
    "order": 6,
    "prerequisites": [
      "django-transactions",
      "python-async"
    ],
    "intuition": "Signals, cache and file work cross transaction boundaries; choose a clear owner and commit timing.",
    "diagram": "DB transaction → commit → on_commit callback → cache/event/file action",
    "template": "transaction.on_commit(lambda: publish_event(order.pk))",
    "pitfalls": [
      "A signal can run before commit; external side effects cannot be rolled back with the DB transaction."
    ],
    "transfer": "Fail a transaction and prove no notification was sent.",
    "invariant": "Signals, cache and file work cross transaction boundaries; choose a clear owner and commit timing.",
    "requiredDepth": "Trace signal timing versus transaction commit,cache invalidation,file lifecycle and sync/async constraints. Progression: Signal side effect → cache correctness → complete app",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "Signals, cache and file work cross transaction boundaries; choose a clear owner and commit timing."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "DB transaction → commit → on_commit callback → cache/event/file action A signal can run before commit; external side effects cannot be rolled back with the DB transaction."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Fail a transaction and prove no notification was sent."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-drf-serializers",
    "title": "DRF serializers & validation",
    "order": 7,
    "prerequisites": [
      "django-orm",
      "http-semantics"
    ],
    "intuition": "A serializer validates external input and shapes output; distinguish full update, partial update and nested writes.",
    "diagram": "request data → serializer.is_valid → validated_data → save → representation",
    "template": "class BookSerializer(serializers.ModelSerializer):\n    class Meta:\n        model=Book\n        fields=[\"id\",\"title\",\"author\"]",
    "pitfalls": [
      "ModelSerializer does not automatically solve object-level authorization or complex nested write semantics."
    ],
    "transfer": "Accept PATCH without wiping omitted fields; reject invalid nested data.",
    "invariant": "A serializer validates external input and shapes output; distinguish full update, partial update and nested writes.",
    "requiredDepth": "Define field/object validation,read-only fields,relations and create/update behavior with explicit errors. Progression: Serializer → nested/related validation → API feature",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "A serializer validates external input and shapes output; distinguish full update, partial update and nested writes."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "request data → serializer.is_valid → validated_data → save → representation ModelSerializer does not automatically solve object-level authorization or complex nested write semantics."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Accept PATCH without wiping omitted fields; reject invalid nested data."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-drf-views",
    "title": "DRF APIView, generics, viewsets & routers",
    "order": 8,
    "prerequisites": [
      "django-drf-serializers",
      "django-views"
    ],
    "intuition": "APIView gives explicit actions; generics and viewsets add common behavior and router wiring.",
    "diagram": "router → viewset action → queryset/serializer → Response",
    "template": "class BookViewSet(viewsets.ModelViewSet):\n    serializer_class=BookSerializer\n    def get_queryset(self): return Book.objects.filter(owner=self.request.user)",
    "pitfalls": [
      "Router convenience does not choose permissions, pagination or safe queryset scope."
    ],
    "transfer": "Compare APIView with a viewset for an owner-scoped resource.",
    "invariant": "APIView gives explicit actions; generics and viewsets add common behavior and router wiring.",
    "requiredDepth": "Implement equivalent endpoint contracts with different abstractions; select parsers/renderers and exception handling. Progression: APIView → generic → router with custom action",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "APIView gives explicit actions; generics and viewsets add common behavior and router wiring."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "router → viewset action → queryset/serializer → Response Router convenience does not choose permissions, pagination or safe queryset scope."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Compare APIView with a viewset for an owner-scoped resource."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  },
  {
    "id": "django-drf-policy",
    "title": "DRF auth, permissions, filtering & pagination",
    "order": 9,
    "prerequisites": [
      "django-drf-views",
      "django-auth-admin",
      "sql-lifecycle"
    ],
    "intuition": "DRF list visibility, object permission, serialization and pagination are separate gates.",
    "diagram": "authenticate → permission → scoped queryset → object check → serialize → paginate",
    "template": "class MyDocs(generics.ListAPIView):\n    serializer_class=DocSerializer\n    def get_queryset(self): return Doc.objects.filter(owner=self.request.user)",
    "pitfalls": [
      "Object-level permissions do not automatically filter a list; a serializer field list is not an access policy."
    ],
    "transfer": "Add cursor pagination with stable ordering and test a cross-owner detail URL.",
    "invariant": "DRF list visibility, object permission, serialization and pagination are separate gates.",
    "requiredDepth": "Scope querysets,check object ownership,handle list/create separately; add filters,ordering,pagination,throttling and version/schema behavior. Progression: Owner endpoint → filtered page → complete API",
    "recall": [
      {
        "q": "Name the request/feature contract and its owner.",
        "a": "DRF list visibility, object permission, serialization and pagination are separate gates."
      },
      {
        "q": "Trace the failure or lifecycle boundary.",
        "a": "authenticate → permission → scoped queryset → object check → serialize → paginate Object-level permissions do not automatically filter a list; a serializer field list is not an access policy."
      },
      {
        "q": "What changes in the transfer feature?",
        "a": "Add cursor pagination with stable ordering and test a cross-owner detail URL."
      }
    ],
    "sources": [
      {
        "title": "Django documentation",
        "url": "https://docs.djangoproject.com/en/5.2/"
      },
      {
        "title": "Django REST framework documentation",
        "url": "https://www.django-rest-framework.org/"
      }
    ]
  }
];
