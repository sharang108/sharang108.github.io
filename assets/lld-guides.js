/* Authored LLD companions with executable illustrative examples. */
window.LldGuides = [
  {
    "id": "lld-strategy",
    "title": "Behavior policies",
    "intuition": "Replace a varying decision without making the caller branch over every implementation.",
    "recognize": "Use a function for stateless behavior; an object when the policy has meaningful state or several related operations. Avoid a hierarchy for one formula.",
    "invariant": "Every policy accepts the agreed context and preserves the result contract.",
    "diagram": "Caller → chosen policy → result\nSame basket → policy A / policy B → comparable results",
    "template": "def price(total, policy):\n    result = policy(total)\n    if not 0 <= result <= total:\n        raise ValueError('invalid price')\n    return result\nassert price(100, lambda n: n - 10) == 90",
    "check": "Compare two policies on the same basket; reject a result outside the pricing contract.",
    "transfer": "Add customer tier and basket quantities. Explain why a single scalar price cannot express buy-two-get-one correctly.",
    "order": 0,
    "prerequisites": [],
    "requiredDepth": "Functions vs objects; runtime/static selection; composition; richer discount inputs.",
    "depth": [
      "Use a function for stateless behavior; an object when the policy has meaningful state or several related operations. Avoid a hierarchy for one formula.",
      "Compare two policies on the same basket; reject a result outside the pricing contract."
    ],
    "trace": [
      "Caller → chosen policy → result",
      "Same basket → policy A / policy B → comparable results"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Every policy accepts the agreed context and preserves the result contract."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use a function for stateless behavior; an object when the policy has meaningful state or several related operations. Avoid a hierarchy for one formula."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Compare two policies on the same basket; reject a result outside the pricing contract. Add customer tier and basket quantities. Explain why a single scalar price cannot express buy-two-get-one correctly."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-factory",
    "title": "Creation: registry vs Factory Method",
    "intuition": "Centralize selection and construction when the choice varies.",
    "recognize": "A registry factory maps keys to constructors. GoF Factory Method is an overridable creation hook used by a creator workflow. Abstract Factory creates compatible product families. Do not call all three the same pattern.",
    "invariant": "Unknown kinds fail explicitly; returned products obey the advertised operation contract.",
    "diagram": "configuration → registry lookup → constructor → product\nCreator workflow → overridden make_product() → product",
    "template": "def create(kind, registry):\n    try:\n        constructor = registry[kind]\n    except KeyError:\n        raise ValueError('unknown kind') from None\n    return constructor()\nassert create('list', {'list': list}) == []\ntry:\n    create('missing', {})\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('unknown kind accepted')",
    "check": "Select two supported kinds and one unsupported kind; constructors are not called on an invalid key.",
    "transfer": "Add a creator with an overridable construction hook and show how it differs from editing a registry.",
    "order": 1,
    "prerequisites": [],
    "requiredDepth": "Distinguish simple/registry factory, subclass creation hook and abstract family; unknown-key behavior.",
    "depth": [
      "A registry factory maps keys to constructors. GoF Factory Method is an overridable creation hook used by a creator workflow. Abstract Factory creates compatible product families. Do not call all three the same pattern.",
      "Select two supported kinds and one unsupported kind; constructors are not called on an invalid key."
    ],
    "trace": [
      "configuration → registry lookup → constructor → product",
      "Creator workflow → overridden make_product() → product"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Unknown kinds fail explicitly; returned products obey the advertised operation contract."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "A registry factory maps keys to constructors. GoF Factory Method is an overridable creation hook used by a creator workflow. Abstract Factory creates compatible product families. Do not call all three the same pattern."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Select two supported kinds and one unsupported kind; constructors are not called on an invalid key. Add a creator with an overridable construction hook and show how it differs from editing a registry."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-adapter",
    "title": "Translate a boundary",
    "intuition": "Convert a foreign interface and its meanings into the interface your caller expects.",
    "recognize": "Use when an existing provider cannot change. Translating names without units, errors, pagination and ownership is incomplete.",
    "invariant": "A provider error or unsupported capability has a documented caller-visible outcome.",
    "diagram": "Caller contract → adapter → provider API\nProvider result/error → translation → caller result/error",
    "template": "class Provider:\n    def charge_cents(self, cents):\n        return {'receipt': str(cents)}\nclass Payments:\n    def __init__(self, provider): self.provider = provider\n    def charge(self, minor_units):\n        if type(minor_units) is not int or minor_units < 0:\n            raise ValueError('nonnegative integer required')\n        return self.provider.charge_cents(minor_units)['receipt']\nassert Payments(Provider()).charge(125) == '125'",
    "check": "Run the same caller contract against two fake providers; translate a provider failure and an unsupported operation.",
    "transfer": "A provider supports cursor pagination but callers request page numbers. Choose an honest capability contract instead of inventing random access.",
    "order": 2,
    "prerequisites": [],
    "requiredDepth": "Semantic translation, provider exceptions, unsupported features, cursor models.",
    "depth": [
      "Use when an existing provider cannot change. Translating names without units, errors, pagination and ownership is incomplete.",
      "Run the same caller contract against two fake providers; translate a provider failure and an unsupported operation."
    ],
    "trace": [
      "Caller contract → adapter → provider API",
      "Provider result/error → translation → caller result/error"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "A provider error or unsupported capability has a documented caller-visible outcome."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use when an existing provider cannot change. Translating names without units, errors, pagination and ownership is incomplete."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Run the same caller contract against two fake providers; translate a provider failure and an unsupported operation. A provider supports cursor pagination but callers request page numbers. Choose an honest capability contract instead of inventing random access."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-builder",
    "title": "Construct a valid value",
    "intuition": "Collect construction choices and validate the complete result at one boundary.",
    "recognize": "Keyword arguments or a dataclass often suffice. A builder helps with staged construction and cross-field rules, not every object.",
    "invariant": "No invalid or externally mutable partial product escapes build().",
    "diagram": "inputs → validation → immutable result\nBuilder may change later; prior result must not",
    "template": "from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Config:\n    fields: tuple\n    limit: int\ndef build(fields, limit):\n    if limit <= 0: raise ValueError('positive limit required')\n    return Config(tuple(fields), limit)\nsource = ['id']\nc = build(source, 10)\nsource.append('name')\nassert c.fields == ('id',)",
    "check": "Mutate original input after construction; the built result must remain unchanged. Reject cross-field inconsistency before publication.",
    "transfer": "Define whether a builder can be reused and whether build resets it; test two builds with independent mutable inputs.",
    "order": 3,
    "prerequisites": [],
    "requiredDepth": "Immutable product, defensive copies, cross-field constraints, reset/reuse contract.",
    "depth": [
      "Keyword arguments or a dataclass often suffice. A builder helps with staged construction and cross-field rules, not every object.",
      "Mutate original input after construction; the built result must remain unchanged. Reject cross-field inconsistency before publication."
    ],
    "trace": [
      "inputs → validation → immutable result",
      "Builder may change later; prior result must not"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "No invalid or externally mutable partial product escapes build()."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Keyword arguments or a dataclass often suffice. A builder helps with staged construction and cross-field rules, not every object."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Mutate original input after construction; the built result must remain unchanged. Reject cross-field inconsistency before publication. Define whether a builder can be reused and whether build resets it; test two builds with independent mutable inputs."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-abstract-factory",
    "title": "Compatible product families",
    "intuition": "Create several related products whose compatibility matters to a caller.",
    "recognize": "Use for a real family invariant, such as matching document encoder/decoder versions. A theme that is only token data may need no factory.",
    "invariant": "Products used together share the required family/version contract.",
    "diagram": "Family v1 → encoder v1 + decoder v1\nFamily v2 → encoder v2 + decoder v2\nCross-family combination → rejected",
    "template": "from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Product:\n    family: str\n    role: str\ndef family(name):\n    return Product(name, 'encode'), Product(name, 'decode')\ndef compatible(a, b):\n    if a.family != b.family: raise ValueError('mixed family')\n    return True\nassert compatible(*family('v1'))",
    "check": "A matching pair succeeds; an explicitly incompatible mixed pair is rejected. Do not invent incompatibility merely to require a pattern.",
    "transfer": "Add a new family, then a new product role; compare which implementations must change.",
    "order": 4,
    "prerequisites": [
      "lld-factory"
    ],
    "requiredDepth": "Product-family consistency; adding family vs product type; avoid artificial factories.",
    "depth": [
      "Use for a real family invariant, such as matching document encoder/decoder versions. A theme that is only token data may need no factory.",
      "A matching pair succeeds; an explicitly incompatible mixed pair is rejected. Do not invent incompatibility merely to require a pattern."
    ],
    "trace": [
      "Family v1 → encoder v1 + decoder v1",
      "Family v2 → encoder v2 + decoder v2",
      "Cross-family combination → rejected"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Products used together share the required family/version contract."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use for a real family invariant, such as matching document encoder/decoder versions. A theme that is only token data may need no factory."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "A matching pair succeeds; an explicitly incompatible mixed pair is rejected. Do not invent incompatibility merely to require a pattern. Add a new family, then a new product role; compare which implementations must change."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-decorator",
    "title": "Compose wrappers",
    "intuition": "Add behavior around an operation while keeping its caller-facing interface.",
    "recognize": "Use for independently composable behavior. A plain function wrapper is often enough. Wrapper order is semantic, not cosmetic.",
    "invariant": "Each wrapper states when it invokes the next operation, transforms results, or stops execution.",
    "diagram": "request → retry → per-attempt limiter → provider\nRetry loops through the limiter on every provider attempt",
    "template": "def prefix(fn):\n    return lambda text: ' ' + fn(text)\ndef trim(fn):\n    return lambda text: fn(text).strip()\nidentity = lambda x: x\nassert trim(prefix(identity))('x') == 'x'\nassert prefix(trim(identity))('x') == ' x'",
    "check": "Compare two orders on the same input and trace exact underlying calls on failure.",
    "transfer": "Place retry, authorization, caching and rate limiting under a declared per-attempt or per-request budget; justify order.",
    "order": 5,
    "prerequisites": [
      "lld-strategy"
    ],
    "requiredDepth": "Wrapper contracts, semantic order, caching invalidation, per-attempt budgets.",
    "depth": [
      "Use for independently composable behavior. A plain function wrapper is often enough. Wrapper order is semantic, not cosmetic.",
      "Compare two orders on the same input and trace exact underlying calls on failure."
    ],
    "trace": [
      "request → retry → per-attempt limiter → provider",
      "Retry loops through the limiter on every provider attempt"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Each wrapper states when it invokes the next operation, transforms results, or stops execution."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use for independently composable behavior. A plain function wrapper is often enough. Wrapper order is semantic, not cosmetic."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Compare two orders on the same input and trace exact underlying calls on failure. Place retry, authorization, caching and rate limiting under a declared per-attempt or per-request budget; justify order."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-proxy",
    "title": "Control access to another object",
    "intuition": "Interpose access, lifetime, caching or remote-call policy behind the same operation shape.",
    "recognize": "A proxy controls reaching the target; an adapter translates a different contract. Wrappers alone do not grant security or consistency.",
    "invariant": "Authorization is checked before any protected result, including cache hits.",
    "diagram": "caller → authorization → cache? → target\nDenied caller → no cache data and no target call",
    "template": "class Protected:\n    def __init__(self, read): self.read = read; self.cache = {}\n    def get(self, key, allowed):\n        if not allowed: raise PermissionError(key)\n        if key not in self.cache: self.cache[key] = self.read(key)\n        return self.cache[key]\np = Protected(lambda key: key.upper())\nassert p.get('a', True) == 'A'\ntry: p.get('a', False)\nexcept PermissionError: pass\nelse: raise AssertionError('cache bypassed authorization')",
    "check": "Warm the cache as an authorized user, then request as an unauthorized user; no protected value may leak.",
    "transfer": "Add tenant identity and revocation; define cache keys, invalidation and whether cache hits consume rate budget.",
    "order": 6,
    "prerequisites": [
      "lld-adapter"
    ],
    "requiredDepth": "Access control before cache return, lazy lifetime, identities and failure transparency.",
    "depth": [
      "A proxy controls reaching the target; an adapter translates a different contract. Wrappers alone do not grant security or consistency.",
      "Warm the cache as an authorized user, then request as an unauthorized user; no protected value may leak."
    ],
    "trace": [
      "caller → authorization → cache? → target",
      "Denied caller → no cache data and no target call"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Authorization is checked before any protected result, including cache hits."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "A proxy controls reaching the target; an adapter translates a different contract. Wrappers alone do not grant security or consistency."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Warm the cache as an authorized user, then request as an unauthorized user; no protected value may leak. Add tenant identity and revocation; define cache keys, invalidation and whether cache hits consume rate budget."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-iterator",
    "title": "Traverse without exposing storage",
    "intuition": "Separate traversal state from the collection; fetch work only when requested.",
    "recognize": "Use generators or iterator objects for lazy traversal. Iterable and iterator are different contracts; independent traversals need independent cursors.",
    "invariant": "Each iterator advances its own position and remains exhausted after completion.",
    "diagram": "Iterable → iterator A → position A\n         → iterator B → position B\nResource owner closes on completion or early exit",
    "template": "class Batch:\n    def __init__(self, values): self.values = tuple(values)\n    def __iter__(self): yield from self.values\nb = Batch([1, 2]); a = iter(b); c = iter(b)\nassert next(a) == 1 and next(a) == 2\nassert next(c) == 1\nassert list(a) == [] and list(a) == []",
    "check": "Interleave two traversals, test exhaustion twice, and close a resource-backed traversal early.",
    "transfer": "Paginate with an opaque next token; an empty page with a next token need not mean exhaustion.",
    "order": 7,
    "prerequisites": [],
    "requiredDepth": "Iterable vs iterator, lazy batches, exhaustion, early cleanup, independent traversal.",
    "depth": [
      "Use generators or iterator objects for lazy traversal. Iterable and iterator are different contracts; independent traversals need independent cursors.",
      "Interleave two traversals, test exhaustion twice, and close a resource-backed traversal early."
    ],
    "trace": [
      "Iterable → iterator A → position A",
      "         → iterator B → position B",
      "Resource owner closes on completion or early exit"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Each iterator advances its own position and remains exhausted after completion."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use generators or iterator objects for lazy traversal. Iterable and iterator are different contracts; independent traversals need independent cursors."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Interleave two traversals, test exhaustion twice, and close a resource-backed traversal early. Paginate with an opaque next token; an empty page with a next token need not mean exhaustion."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-composite",
    "title": "Aggregate a tree uniformly",
    "intuition": "Let a leaf and a group expose a compatible operation; groups delegate recursively.",
    "recognize": "Use a genuine part-whole tree. Dependency DAGs need separate rules for shared nodes, cycles and critical paths.",
    "invariant": "Aggregation obeys the declared identity and ownership policy; adding an ancestor cannot create a cycle.",
    "diagram": "group → leaf(2) + group → leaf(3)\naggregate = 2 + 3 = 5",
    "template": "from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Leaf:\n    value: int\n    def total(self): return self.value\n@dataclass(frozen=True)\nclass Group:\n    children: tuple\n    def total(self): return sum(c.total() for c in self.children)\nassert Group((Leaf(2), Group((Leaf(3),)))).total() == 5\nassert Group(()).total() == 0",
    "check": "Empty and nested groups aggregate correctly; reject cycles at mutation boundaries or declare immutable construction-only scope.",
    "transfer": "Allow a shared child under two parents. Decide whether it is counted twice by occurrence or once by identity.",
    "order": 8,
    "prerequisites": [
      "lld-strategy"
    ],
    "requiredDepth": "Recursive aggregation, leaf/composite contracts, cycle/shared-node policy, money rounding.",
    "depth": [
      "Use a genuine part-whole tree. Dependency DAGs need separate rules for shared nodes, cycles and critical paths.",
      "Empty and nested groups aggregate correctly; reject cycles at mutation boundaries or declare immutable construction-only scope."
    ],
    "trace": [
      "group → leaf(2) + group → leaf(3)",
      "aggregate = 2 + 3 = 5"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Aggregation obeys the declared identity and ownership policy; adding an ancestor cannot create a cycle."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use a genuine part-whole tree. Dependency DAGs need separate rules for shared nodes, cycles and critical paths."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Empty and nested groups aggregate correctly; reject cycles at mutation boundaries or declare immutable construction-only scope. Allow a shared child under two parents. Decide whether it is counted twice by occurrence or once by identity."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-observer",
    "title": "Notify independent subscribers",
    "intuition": "A source announces a fact without owning each subscriber’s downstream behavior.",
    "recognize": "Use in-process notifications when delivery/lifecycle rules are explicit. Catching callback errors is failure isolation, not process-crash durability.",
    "invariant": "A publish uses a subscription snapshot; one callback failure follows the declared isolation policy.",
    "diagram": "publisher → snapshot[A,B,C]\nA succeeds; B fails; C still receives\nNew subscriber joins the next event",
    "template": "def publish(callbacks, event):\n    errors = []\n    for callback in tuple(callbacks):\n        try: callback(event)\n        except Exception as exc: errors.append(type(exc).__name__)\n    return errors\nseen = []\ndef bad(event): raise ValueError('failed')\nassert publish([bad, seen.append], 'x') == ['ValueError']\nassert seen == ['x']",
    "check": "A subscriber throws; later subscribers still receive. A callback that subscribes/unsubscribes changes only the next snapshot.",
    "transfer": "Add reentrant publish: choose a queued policy or explicitly reject recursion. Add durable outbox only if restart delivery is required.",
    "order": 9,
    "prerequisites": [
      "lld-strategy"
    ],
    "requiredDepth": "Subscription lifecycle, re-entrancy, event ordering, observer errors and process boundary.",
    "depth": [
      "Use in-process notifications when delivery/lifecycle rules are explicit. Catching callback errors is failure isolation, not process-crash durability.",
      "A subscriber throws; later subscribers still receive. A callback that subscribes/unsubscribes changes only the next snapshot."
    ],
    "trace": [
      "publisher → snapshot[A,B,C]",
      "A succeeds; B fails; C still receives",
      "New subscriber joins the next event"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "A publish uses a subscription snapshot; one callback failure follows the declared isolation policy."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use in-process notifications when delivery/lifecycle rules are explicit. Catching callback errors is failure isolation, not process-crash durability."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "A subscriber throws; later subscribers still receive. A callback that subscribes/unsubscribes changes only the next snapshot. Add reentrant publish: choose a queued policy or explicitly reject recursion. Add durable outbox only if restart delivery is required."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-state",
    "title": "Make transitions explicit",
    "intuition": "Behavior depends on a lifecycle state and events must preserve legal transitions.",
    "recognize": "Start with a transition table and guards. Classes per state are optional; a small enum/table may be clearer.",
    "invariant": "Only listed transitions occur; failed guards leave state unchanged.",
    "diagram": "reserved --confirm before expiry--> confirmed\nreserved --expire--> expired\nexpired --confirm--> rejected",
    "template": "TRANSITIONS = {('reserved','confirm'):'confirmed', ('reserved','expire'):'expired'}\ndef transition(state, event):\n    try: return TRANSITIONS[state, event]\n    except KeyError: raise ValueError('illegal transition') from None\nassert transition('reserved','confirm') == 'confirmed'\ntry: transition('expired','confirm')\nexcept ValueError: pass\nelse: raise AssertionError('illegal transition accepted')",
    "check": "Trace every table edge, an illegal event and a repeated event; guard failure must not partially mutate state.",
    "transfer": "Add cancellation and a racing expiry. Define an atomic transition boundary and who owns the clock.",
    "order": 10,
    "prerequisites": [
      "lld-strategy"
    ],
    "requiredDepth": "Transition matrix, guards, repeated events, state/context ownership and extensibility limits.",
    "depth": [
      "Start with a transition table and guards. Classes per state are optional; a small enum/table may be clearer.",
      "Trace every table edge, an illegal event and a repeated event; guard failure must not partially mutate state."
    ],
    "trace": [
      "reserved --confirm before expiry--> confirmed",
      "reserved --expire--> expired",
      "expired --confirm--> rejected"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Only listed transitions occur; failed guards leave state unchanged."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Start with a transition table and guards. Classes per state are optional; a small enum/table may be clearer."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Trace every table edge, an illegal event and a repeated event; guard failure must not partially mutate state. Add cancellation and a racing expiry. Define an atomic transition boundary and who owns the clock."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-command",
    "title": "Represent an intention",
    "intuition": "Package an operation and its inputs so scheduling, history or dispatch can be managed separately.",
    "recognize": "Useful for deferred work, audit and local undo. A command is a request, not a historical fact; replay may repeat side effects.",
    "invariant": "Only successfully executed reversible changes enter undo history; a new edit invalidates redo.",
    "diagram": "request → validate → execute → history\nfailed execution → no history entry\nundo → redo; new edit → clear redo",
    "template": "class Editor:\n    def __init__(self): self.text=''; self.undo_stack=[]; self.redo_stack=[]\n    def set(self, text):\n        if not isinstance(text,str): raise ValueError('text required')\n        self.undo_stack.append(self.text); self.text=text; self.redo_stack.clear()\n    def undo(self):\n        if not self.undo_stack: return\n        self.redo_stack.append(self.text); self.text=self.undo_stack.pop()\ne=Editor(); e.set('a'); e.set('b'); e.undo(); e.set('c')\nassert e.text == 'c' and e.redo_stack == []",
    "check": "A failed operation does not enter history; undo then a fresh change clears redo. External effects require compensation, not magical reversal.",
    "transfer": "Add a command ID and retry after an ambiguous response. Distinguish idempotent execution from replaying recorded events.",
    "order": 11,
    "prerequisites": [
      "lld-decorator"
    ],
    "requiredDepth": "History invalidation, failed execute, snapshots, irreversible effects, replay safety.",
    "depth": [
      "Useful for deferred work, audit and local undo. A command is a request, not a historical fact; replay may repeat side effects.",
      "A failed operation does not enter history; undo then a fresh change clears redo. External effects require compensation, not magical reversal."
    ],
    "trace": [
      "request → validate → execute → history",
      "failed execution → no history entry",
      "undo → redo; new edit → clear redo"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Only successfully executed reversible changes enter undo history; a new edit invalidates redo."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Useful for deferred work, audit and local undo. A command is a request, not a historical fact; replay may repeat side effects."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "A failed operation does not enter history; undo then a fresh change clears redo. External effects require compensation, not magical reversal. Add a command ID and retry after an ambiguous response. Distinguish idempotent execution from replaying recorded events."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-chain-of-responsibility",
    "title": "Explicit stop and continue rules",
    "intuition": "Pass a request through ordered handlers until a terminal result or all checks complete.",
    "recognize": "Use a chain only when order and continuation vary meaningfully. Approval, first-success authentication and collect-all validation are different contracts.",
    "invariant": "Every handler returns a defined terminal or continuation result; no handler silently skips a veto.",
    "diagram": "handler A: continue → handler B: reject → stop\nhandler C must not run after rejection",
    "template": "def validate(value, validators):\n    for check in validators:\n        error=check(value)\n        if error is not None: return error\n    return None\nassert validate(-1,[lambda x:'negative' if x<0 else None]) == 'negative'\nassert validate(1,[lambda x:None]) is None",
    "check": "Use a trace list to prove stop behavior. Test no-handler outcome and distinguish missing credentials from invalid supplied credentials.",
    "transfer": "Change fail-fast validation to collect-all errors. Specify what changes in return types and which effects must still be suppressed.",
    "order": 12,
    "prerequisites": [
      "lld-decorator"
    ],
    "requiredDepth": "Stop/continue/collect-all results; veto semantics; absent vs invalid credentials.",
    "depth": [
      "Use a chain only when order and continuation vary meaningfully. Approval, first-success authentication and collect-all validation are different contracts.",
      "Use a trace list to prove stop behavior. Test no-handler outcome and distinguish missing credentials from invalid supplied credentials."
    ],
    "trace": [
      "handler A: continue → handler B: reject → stop",
      "handler C must not run after rejection"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Every handler returns a defined terminal or continuation result; no handler silently skips a veto."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use a chain only when order and continuation vary meaningfully. Approval, first-success authentication and collect-all validation are different contracts."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Use a trace list to prove stop behavior. Test no-handler outcome and distinguish missing credentials from invalid supplied credentials. Change fail-fast validation to collect-all errors. Specify what changes in return types and which effects must still be suppressed."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-template-method",
    "title": "Keep a sequence, vary steps",
    "intuition": "A workflow owns step order and delegates selected steps to hooks.",
    "recognize": "Use inheritance for a genuine shared lifecycle, or compose callables for more flexible variation. Python does not prevent overriding merely because a method is described as final.",
    "invariant": "Acquired resources are released even when a step fails; failed validation prevents persistence.",
    "diagram": "open → parse → validate → persist\nany exception → finally close\nfailed validation ─X→ persist",
    "template": "def workflow(open_resource, parse, validate, persist):\n    resource=open_resource()\n    try:\n        data=parse(resource)\n        validate(data)\n        return persist(data)\n    finally:\n        resource.close()\nclass Resource:\n    closed=False\n    def close(self): self.closed=True\nr=Resource()\nassert workflow(lambda:r,lambda r:3,lambda x:None,lambda x:x+1)==4\nassert r.closed",
    "check": "Inject failure at every step; verify cleanup and that later business steps do not execute.",
    "transfer": "Compare a subclass hook implementation with the composed workflow; identify what is enforced only by convention or static checking.",
    "order": 13,
    "prerequisites": [
      "lld-strategy"
    ],
    "requiredDepth": "Sequence invariants, mandatory/optional hooks, cleanup on failure, composition alternative.",
    "depth": [
      "Use inheritance for a genuine shared lifecycle, or compose callables for more flexible variation. Python does not prevent overriding merely because a method is described as final.",
      "Inject failure at every step; verify cleanup and that later business steps do not execute."
    ],
    "trace": [
      "open → parse → validate → persist",
      "any exception → finally close",
      "failed validation ─X→ persist"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Acquired resources are released even when a step fails; failed validation prevents persistence."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use inheritance for a genuine shared lifecycle, or compose callables for more flexible variation. Python does not prevent overriding merely because a method is described as final."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Inject failure at every step; verify cleanup and that later business steps do not execute. Compare a subclass hook implementation with the composed workflow; identify what is enforced only by convention or static checking."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-mediator",
    "title": "Coordinate collaborators",
    "intuition": "Put multi-object coordination in one bounded component rather than making every participant know every other one.",
    "recognize": "Use for a specific workflow with shared rules. A central object containing all domain behavior becomes a maintenance problem.",
    "invariant": "The coordinator preserves shared invariants and does not recursively reissue the same event forever.",
    "diagram": "request → coordinator → guard shared state → chosen participant\noccupied runway → queue, never simultaneous clearance",
    "template": "class Runway:\n    def __init__(self): self.owner=None\n    def acquire(self, aircraft):\n        if self.owner is not None: return False\n        self.owner=aircraft; return True\n    def release(self, aircraft):\n        if self.owner!=aircraft: raise ValueError('not owner')\n        self.owner=None\nr=Runway(); assert r.acquire('A')\nassert not r.acquire('Emergency B')\nr.release('A'); assert r.acquire('B')",
    "check": "Two requests contend for one resource; only one owns it. Emergency priority changes queue order, not exclusion.",
    "transfer": "Add duplicated callbacks and reentrant events; bound coordinator responsibilities and define deduplication.",
    "order": 14,
    "prerequisites": [
      "lld-observer"
    ],
    "requiredDepth": "Coordination vs broadcast, event loops, state ownership, bounded coordinator.",
    "depth": [
      "Use for a specific workflow with shared rules. A central object containing all domain behavior becomes a maintenance problem.",
      "Two requests contend for one resource; only one owns it. Emergency priority changes queue order, not exclusion."
    ],
    "trace": [
      "request → coordinator → guard shared state → chosen participant",
      "occupied runway → queue, never simultaneous clearance"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "The coordinator preserves shared invariants and does not recursively reissue the same event forever."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use for a specific workflow with shared rules. A central object containing all domain behavior becomes a maintenance problem."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Two requests contend for one resource; only one owns it. Emergency priority changes queue order, not exclusion. Add duplicated callbacks and reentrant events; bound coordinator responsibilities and define deduplication."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-facade",
    "title": "Offer a focused workflow",
    "intuition": "Expose a small use-case interface over several collaborators while making failure boundaries clear.",
    "recognize": "Use to simplify a caller, not to hide every failure or declare unrelated external effects atomic.",
    "invariant": "The result distinguishes completed work, pending work and failed compensation.",
    "diagram": "reserve → commit order → request notification\nnotification failure → pending retry\nIt does not undo a sent email",
    "template": "def place_order(commit, notify):\n    order_id=commit()\n    try: notify(order_id)\n    except Exception: return {'id':order_id,'notification':'failed'}\n    return {'id':order_id,'notification':'sent'}\ndef fail(_): raise RuntimeError('offline')\nassert place_order(lambda:7, fail)=={'id':7,'notification':'failed'}",
    "check": "Fail each collaborator; the returned result must not claim committed work was rolled back. This example reports failure but is not a durable retry mechanism.",
    "transfer": "Require eventual notification after restart: atomically persist an outbox entry with the order rather than merely catching the error.",
    "order": 15,
    "prerequisites": [
      "lld-command"
    ],
    "requiredDepth": "Scope facade vs service; partial failure; compensation; explicit transaction boundary.",
    "depth": [
      "Use to simplify a caller, not to hide every failure or declare unrelated external effects atomic.",
      "Fail each collaborator; the returned result must not claim committed work was rolled back. This example reports failure but is not a durable retry mechanism."
    ],
    "trace": [
      "reserve → commit order → request notification",
      "notification failure → pending retry",
      "It does not undo a sent email"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "The result distinguishes completed work, pending work and failed compensation."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use to simplify a caller, not to hide every failure or declare unrelated external effects atomic."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Fail each collaborator; the returned result must not claim committed work was rolled back. This example reports failure but is not a durable retry mechanism. Require eventual notification after restart: atomically persist an outbox entry with the order rather than merely catching the error."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-repository",
    "title": "Persist through a domain contract",
    "intuition": "Define storage semantics the domain needs, independent of a particular persistence API.",
    "recognize": "Use when the boundary has meaningful queries, identity and transaction semantics. A repository does not automatically create cross-store transactions.",
    "invariant": "Expected-version comparison and write occur atomically; missing single entity and empty collection are distinct results.",
    "diagram": "writer A reads v1; writer B reads v1\nA saves expected1 → v2\nB saves expected1 → conflict, no overwrite",
    "template": "from threading import Lock\nclass Repo:\n    def __init__(self): self.data={}; self.lock=Lock()\n    def save(self,key,value,expected):\n        with self.lock:\n            version=self.data.get(key,(0,None))[0]\n            if version!=expected: raise ValueError('conflict')\n            self.data[key]=(version+1,value)\n            return version+1\nr=Repo(); assert r.save('x',10,0)==1\ntry: r.save('x',20,0)\nexcept ValueError: pass\nelse: raise AssertionError('stale writer accepted')",
    "check": "Two writers start with one version; only one succeeds. Test rollback with a shared transaction and recovery when independent stores cannot commit atomically.",
    "transfer": "Add durable outbox publication. Crash after send but before marking sent; explain why duplicates and consumer idempotency remain necessary.",
    "order": 16,
    "prerequisites": [
      "lld-adapter"
    ],
    "requiredDepth": "Missing result semantics, UoW, atomic optimistic update, partial write recovery.",
    "depth": [
      "Use when the boundary has meaningful queries, identity and transaction semantics. A repository does not automatically create cross-store transactions.",
      "Two writers start with one version; only one succeeds. Test rollback with a shared transaction and recovery when independent stores cannot commit atomically."
    ],
    "trace": [
      "writer A reads v1; writer B reads v1",
      "A saves expected1 → v2",
      "B saves expected1 → conflict, no overwrite"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Expected-version comparison and write occur atomically; missing single entity and empty collection are distinct results."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use when the boundary has meaningful queries, identity and transaction semantics. A repository does not automatically create cross-store transactions."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Two writers start with one version; only one succeeds. Test rollback with a shared transaction and recovery when independent stores cannot commit atomically. Add durable outbox publication. Crash after send but before marking sent; explain why duplicates and consumer idempotency remain necessary."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-systems",
    "title": "Domain modeling & complete designs",
    "intuition": "Begin with observable use cases and invariants, then implement one coherent vertical slice.",
    "recognize": "Use value objects for value semantics and entities for identity/lifecycle. Patterns are tools; complexity must buy a stated requirement.",
    "invariant": "State changes preserve ownership, validity and failure contracts; clocks and external providers are explicit dependencies.",
    "diagram": "input → domain validation → atomic transition → result\nexternal effect → explicit pending/success/failure state",
    "template": "from dataclasses import dataclass\n@dataclass(frozen=True)\nclass Money:\n    minor: int\n    currency: str\n    def __post_init__(self):\n        if type(self.minor) is not int or not self.currency: raise ValueError('invalid money')\n    def plus(self,other):\n        if self.currency!=other.currency: raise ValueError('currency mismatch')\n        return Money(self.minor+other.minor,self.currency)\nassert Money(100,'X').plus(Money(25,'X'))==Money(125,'X')",
    "check": "Write a happy path, a rejected operation and a conflicting/repeated operation before drawing classes. Frozen containers must also protect nested values.",
    "transfer": "Implement the smallest correct slice, then add one changed requirement. Remove an abstraction that no longer has a reason to exist.",
    "order": 17,
    "prerequisites": [
      "lld-state",
      "lld-command",
      "lld-repository"
    ],
    "requiredDepth": "Clarify domain, state invariants, implement one slice, then change requirement; patterns must be justified.",
    "depth": [
      "Use value objects for value semantics and entities for identity/lifecycle. Patterns are tools; complexity must buy a stated requirement.",
      "Write a happy path, a rejected operation and a conflicting/repeated operation before drawing classes. Frozen containers must also protect nested values."
    ],
    "trace": [
      "input → domain validation → atomic transition → result",
      "external effect → explicit pending/success/failure state"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "State changes preserve ownership, validity and failure contracts; clocks and external providers are explicit dependencies."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use value objects for value semantics and entities for identity/lifecycle. Patterns are tools; complexity must buy a stated requirement."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Write a happy path, a rejected operation and a conflicting/repeated operation before drawing classes. Frozen containers must also protect nested values. Implement the smallest correct slice, then add one changed requirement. Remove an abstraction that no longer has a reason to exist."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-singleton",
    "title": "Instance lifetime & shared state",
    "intuition": "Choose the lifetime and ownership of a shared dependency explicitly.",
    "recognize": "An injected process-scoped instance is often simpler than enforcing one global constructor. Neither creates global uniqueness across processes.",
    "invariant": "Initialization and operations have separate concurrency contracts; a creation lock alone does not protect later mutations.",
    "diagram": "composition root → one service → caller A\n                          ↘ caller B\nnew process → separate service",
    "template": "class Counter:\n    def __init__(self): self.value=0\n    def increment(self): self.value+=1\nclass Service:\n    def __init__(self,counter): self.counter=counter\nshared=Counter(); a=Service(shared); b=Service(shared)\na.counter.increment(); assert b.counter.value==1\nassert Service(Counter()).counter.value==0",
    "check": "Two callers share the injected object; a separate test instance starts clean. The example is single-threaded, not a thread-safe counter.",
    "transfer": "Add a synchronized sink and initialization race test; then explain why multiple worker processes still have separate state.",
    "order": 18,
    "prerequisites": [],
    "requiredDepth": "Injected process scope, initialization race, shared state and multi-process limitation.",
    "depth": [
      "An injected process-scoped instance is often simpler than enforcing one global constructor. Neither creates global uniqueness across processes.",
      "Two callers share the injected object; a separate test instance starts clean. The example is single-threaded, not a thread-safe counter."
    ],
    "trace": [
      "composition root → one service → caller A",
      "                          ↘ caller B",
      "new process → separate service"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Initialization and operations have separate concurrency contracts; a creation lock alone does not protect later mutations."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "An injected process-scoped instance is often simpler than enforcing one global constructor. Neither creates global uniqueness across processes."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Two callers share the injected object; a separate test instance starts clean. The example is single-threaded, not a thread-safe counter. Add a synchronized sink and initialization race test; then explain why multiple worker processes still have separate state."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-cqrs",
    "title": "Separate commands and queries",
    "intuition": "Give state-changing requests and read requests clear interfaces; storage can remain shared.",
    "recognize": "Use when read/write needs differ. CQRS does not require two databases, messaging or event sourcing.",
    "invariant": "Commands enforce invariants; queries do not mutate domain state. Async projections declare freshness and ordering.",
    "diagram": "command → write model → commit\nquery → read view\noptional projection delivery: duplicate/order handling required",
    "template": "class Inventory:\n    def __init__(self): self.counts={}\n    def add(self,item,quantity):\n        if quantity<=0: raise ValueError('positive quantity required')\n        self.counts[item]=self.counts.get(item,0)+quantity\n    def available(self,item): return self.counts.get(item,0)\ni=Inventory(); i.add('x',2); before=dict(i.counts)\nassert i.available('x')==2 and i.counts==before",
    "check": "A query leaves state unchanged. For async variants, deliver an event twice and out of order; verify the specified projection policy.",
    "transfer": "Add read-your-writes requirements and describe how version tokens or a synchronous path affect the design.",
    "order": 19,
    "prerequisites": [
      "lld-repository",
      "lld-command"
    ],
    "requiredDepth": "Single-store command/query split first; projection ordering, duplicates, rebuild and version checks.",
    "depth": [
      "Use when read/write needs differ. CQRS does not require two databases, messaging or event sourcing.",
      "A query leaves state unchanged. For async variants, deliver an event twice and out of order; verify the specified projection policy."
    ],
    "trace": [
      "command → write model → commit",
      "query → read view",
      "optional projection delivery: duplicate/order handling required"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "Commands enforce invariants; queries do not mutate domain state. Async projections declare freshness and ordering."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use when read/write needs differ. CQRS does not require two databases, messaging or event sourcing."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "A query leaves state unchanged. For async variants, deliver an event twice and out of order; verify the specified projection policy. Add read-your-writes requirements and describe how version tokens or a synchronous path affect the design."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "lld-event-sourcing",
    "title": "Rebuild state from recorded facts",
    "intuition": "Persist accepted domain facts and derive state by applying them in stream order.",
    "recognize": "Use when history/reconstruction merits the operational cost. Commands decide; events record; replay never sends payments or notifications.",
    "invariant": "The same ordered events rebuild the same state without clocks, random values or external calls during apply.",
    "diagram": "validate command → append events at expected version\nreplay events → pure apply → state\nexternal side effects only through separate delivery",
    "template": "def rebuild(events):\n    balance=0\n    for kind,minor in events:\n        if kind=='deposit': balance+=minor\n        elif kind=='withdraw': balance-=minor\n        else: raise ValueError('unknown event')\n    return balance\nevents=(('deposit',100),('withdraw',25))\nassert rebuild(events)==75 and rebuild(events)==rebuild(events)",
    "check": "Replay twice with external gateways replaced by failing fakes: no external call is permitted. Snapshot+tail must equal a full replay.",
    "transfer": "Add schema versions and late events: choose recorded-time versus business-time queries and a deterministic tie/order rule.",
    "order": 20,
    "prerequisites": [
      "lld-repository",
      "lld-cqrs"
    ],
    "requiredDepth": "Deterministic replay, event schema evolution, stream concurrency, snapshots and event-time semantics.",
    "depth": [
      "Use when history/reconstruction merits the operational cost. Commands decide; events record; replay never sends payments or notifications.",
      "Replay twice with external gateways replaced by failing fakes: no external call is permitted. Snapshot+tail must equal a full replay."
    ],
    "trace": [
      "validate command → append events at expected version",
      "replay events → pure apply → state",
      "external side effects only through separate delivery"
    ],
    "pitfalls": [
      "A pattern name is not evidence of a correct contract.",
      "State process,thread,transaction and external-effect boundaries before claiming guarantees."
    ],
    "recall": [
      {
        "q": "What varies, and what contract must stay stable?",
        "a": "The same ordered events rebuild the same state without clocks, random values or external calls during apply."
      },
      {
        "q": "When is a simpler design preferable?",
        "a": "Use when history/reconstruction merits the operational cost. Commands decide; events record; replay never sends payments or notifications."
      },
      {
        "q": "What failure or change would expose a weak implementation?",
        "a": "Replay twice with external gateways replaced by failing fakes: no external call is permitted. Snapshot+tail must equal a full replay. Add schema versions and late events: choose recorded-time versus business-time queries and a deterministic tie/order rule."
      }
    ],
    "sources": [
      {
        "title": "Python structural protocols",
        "url": "https://typing.python.org/en/latest/spec/protocol.html"
      },
      {
        "title": "Python condition variables",
        "url": "https://docs.python.org/3.10/library/threading.html#condition-objects"
      },
      {
        "title": "Event sourcing and replay boundaries",
        "url": "https://www.martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  }
];
