/* Authored system design learning companions. */
window.HldGuides = [
  {
    "id": "hld-requirements",
    "title": "Scope and estimation",
    "intuition": "Turn an ambiguous request into operations, users, boundaries and measurable objectives before drawing a system.",
    "recognize": "Start with a core flow and one failure promise; estimate only quantities that can change an architecture choice.",
    "invariant": "The design meets stated behavior under stated assumptions, with units and a sensitivity range.",
    "diagram": "users × actions/user/day ÷ 86,400 → average QPS\npeak = average × stated factor; factor is an assumption",
    "example": "500M users × 8 reads/day ÷ 86,400 = 46,296 reads/s average. At an assumed 3× peak: 138,889 reads/s.",
    "transfer": "Ask for writes/day, read pattern, acceptable staleness and latency percentile. Vary the peak factor; how does the bottleneck move?",
    "order": 0,
    "prerequisites": [],
    "requiredDepth": "Define users,operations,latency/durability objectives; units; assumed capacity; sensitivity analysis.",
    "depth": [
      "Start with a core flow and one failure promise; estimate only quantities that can change an architecture choice.",
      "Ask for writes/day, read pattern, acceptable staleness and latency percentile. Vary the peak factor; how does the bottleneck move?"
    ],
    "trace": [
      "users × actions/user/day ÷ 86,400 → average QPS",
      "peak = average × stated factor; factor is an assumption"
    ],
    "template": "500M users × 8 reads/day ÷ 86,400 = 46,296 reads/s average. At an assumed 3× peak: 138,889 reads/s.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "The design meets stated behavior under stated assumptions, with units and a sensitivity range."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Start with a core flow and one failure promise; estimate only quantities that can change an architecture choice. Ask for writes/day, read pattern, acceptable staleness and latency percentile. Vary the peak factor; how does the bottleneck move?"
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "500M users × 8 reads/day ÷ 86,400 = 46,296 reads/s average. At an assumed 3× peak: 138,889 reads/s."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-storage",
    "title": "Storage and query shape",
    "intuition": "Choose data organization from access paths, correctness needs and measured bottlenecks.",
    "recognize": "List exact queries and update patterns before SQL/NoSQL or index choices; state hot/cold retention.",
    "invariant": "Each committed write preserves required invariants; indexes accelerate declared queries while adding write/storage cost.",
    "diagram": "request → query predicates/order → index candidate → measured plan\nwrite → table + relevant index maintenance",
    "example": "Query tenant_id=7 ordered by created_at,id: composite index can support that access path; a new unrelated index adds write work.",
    "transfer": "A schema change adds a constant default. Check actual database/version behavior, locks and application compatibility before claiming a table rewrite.",
    "order": 1,
    "prerequisites": [
      "hld-requirements"
    ],
    "requiredDepth": "Queries/schema/indexes; write amplification; migration locks; hot/cold retention; measured bottlenecks.",
    "depth": [
      "List exact queries and update patterns before SQL/NoSQL or index choices; state hot/cold retention.",
      "A schema change adds a constant default. Check actual database/version behavior, locks and application compatibility before claiming a table rewrite."
    ],
    "trace": [
      "request → query predicates/order → index candidate → measured plan",
      "write → table + relevant index maintenance"
    ],
    "template": "Query tenant_id=7 ordered by created_at,id: composite index can support that access path; a new unrelated index adds write work.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "Each committed write preserves required invariants; indexes accelerate declared queries while adding write/storage cost."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "List exact queries and update patterns before SQL/NoSQL or index choices; state hot/cold retention. A schema change adds a constant default. Check actual database/version behavior, locks and application compatibility before claiming a table rewrite."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "Query tenant_id=7 ordered by created_at,id: composite index can support that access path; a new unrelated index adds write work."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-api",
    "title": "API contracts and idempotency",
    "intuition": "Define observable operations, errors, identity and repeat behavior at the service boundary.",
    "recognize": "Use resource contracts before an API gateway diagram. Pagination, authorization and request retries change data requirements.",
    "invariant": "A repeated request with the same idempotency key and same payload yields one logical effect; different payloads conflict.",
    "diagram": "client → auth → idempotency claim → domain commit → stored outcome\nretry → same outcome; conflicting payload → reject",
    "example": "POST payment with key K: first call succeeds. Retry K+same hash returns stored result; K+different hash conflicts. An unknown provider outcome stays pending until reconciled.",
    "transfer": "Add a webhook with per-subscription sequence and bounded retries; define signature verification and replay window.",
    "order": 2,
    "prerequisites": [
      "hld-requirements"
    ],
    "requiredDepth": "Errors,idempotency scope,pagination,auth boundaries; HTTP foundations linked.",
    "depth": [
      "Use resource contracts before an API gateway diagram. Pagination, authorization and request retries change data requirements.",
      "Add a webhook with per-subscription sequence and bounded retries; define signature verification and replay window."
    ],
    "trace": [
      "client → auth → idempotency claim → domain commit → stored outcome",
      "retry → same outcome; conflicting payload → reject"
    ],
    "template": "POST payment with key K: first call succeeds. Retry K+same hash returns stored result; K+different hash conflicts. An unknown provider outcome stays pending until reconciled.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A repeated request with the same idempotency key and same payload yields one logical effect; different payloads conflict."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use resource contracts before an API gateway diagram. Pagination, authorization and request retries change data requirements. Add a webhook with per-subscription sequence and bounded retries; define signature verification and replay window."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "POST payment with key K: first call succeeds. Retry K+same hash returns stored result; K+different hash conflicts. An unknown provider outcome stays pending until reconciled."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-consistency",
    "title": "Read and write guarantees",
    "intuition": "Name the exact guarantee: freshness after my write, one global operation order, or transaction isolation across rows.",
    "recognize": "Use primary reads, session tokens, versions or waiting for replica progress according to the required scope. A quorum intersection alone is not a complete linearizability proof.",
    "invariant": "No two confirmed reservations own the same seat and interval. A read-your-write response is at least as new as the session’s committed version.",
    "diagram": "two users read free → race to reserve\nDB constraint/conditional write → one commits; other conflicts",
    "example": "Session writes version 42. A replica at version 41 must wait, route to primary, or return a declared stale response.",
    "transfer": "Show write skew under snapshot isolation, then enforce the invariant with a constraint, lock or serializable transaction.",
    "order": 3,
    "prerequisites": [
      "hld-storage"
    ],
    "requiredDepth": "Read-your-writes,linearizability vs serializability; replica lag; concurrent writes; failure assumptions.",
    "depth": [
      "Use primary reads, session tokens, versions or waiting for replica progress according to the required scope. A quorum intersection alone is not a complete linearizability proof.",
      "Show write skew under snapshot isolation, then enforce the invariant with a constraint, lock or serializable transaction."
    ],
    "trace": [
      "two users read free → race to reserve",
      "DB constraint/conditional write → one commits; other conflicts"
    ],
    "template": "Session writes version 42. A replica at version 41 must wait, route to primary, or return a declared stale response.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "No two confirmed reservations own the same seat and interval. A read-your-write response is at least as new as the session’s committed version."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use primary reads, session tokens, versions or waiting for replica progress according to the required scope. A quorum intersection alone is not a complete linearizability proof. Show write skew under snapshot isolation, then enforce the invariant with a constraint, lock or serializable transaction."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "Session writes version 42. A replica at version 41 must wait, route to primary, or return a declared stale response."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-caching",
    "title": "Caches and staleness",
    "intuition": "A cache trades fresh reads and capacity against miss latency, invalidation work and stale risk.",
    "recognize": "Compare hit, cold miss, concurrent refill and write race. Define stale serving separately from key retention.",
    "invariant": "A protected cache hit still passes authorization; a freshness SLA has an explicit bound under refresh failure.",
    "diagram": "read: L1? → L2? → origin\nwrite: commit → invalidate/update → observe race\nhot miss: one refill; others wait or serve bounded stale",
    "example": "500 concurrent reads after one hot key expires: single-flight can coalesce to one origin request. Jitter cannot separate requests to the same key at the same expiry.",
    "transfer": "Add a price update racing a miss fill. Compare version checks, commit-first invalidation and bounded stale serving.",
    "order": 4,
    "prerequisites": [
      "hld-storage",
      "hld-consistency"
    ],
    "requiredDepth": "Hit/miss/write races; expiration vs eviction; coalescing; stale bounds; L1/L2 and hot-key capacity.",
    "depth": [
      "Compare hit, cold miss, concurrent refill and write race. Define stale serving separately from key retention.",
      "Add a price update racing a miss fill. Compare version checks, commit-first invalidation and bounded stale serving."
    ],
    "trace": [
      "read: L1? → L2? → origin",
      "write: commit → invalidate/update → observe race",
      "hot miss: one refill; others wait or serve bounded stale"
    ],
    "template": "500 concurrent reads after one hot key expires: single-flight can coalesce to one origin request. Jitter cannot separate requests to the same key at the same expiry.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A protected cache hit still passes authorization; a freshness SLA has an explicit bound under refresh failure."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Compare hit, cold miss, concurrent refill and write race. Define stale serving separately from key retention. Add a price update racing a miss fill. Compare version checks, commit-first invalidation and bounded stale serving."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "500 concurrent reads after one hot key expires: single-flight can coalesce to one origin request. Jitter cannot separate requests to the same key at the same expiry."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-messaging",
    "title": "Durable handoff and consumers",
    "intuition": "Separate the database commit, publish acknowledgment and consumer side effect.",
    "recognize": "Use messaging when decoupling or buffering has a clear purpose; name the transport and its ordering/rebalance rules.",
    "invariant": "A committed outbox event survives process restart; consumer deduplication handles at-least-once redelivery.",
    "diagram": "transaction: domain row + outbox row → commit\npublisher sends → ack → mark sent\ncrash after send → same message ID may repeat",
    "example": "10 consumers × 3,600/2 jobs/h = 18,000 jobs/h. At 10,000 arrivals/h, the queue does not grow under the toy serial model. At 200,000/h, at least 112 consumers are needed before headroom.",
    "transfer": "Add delayed retries and dead letters; identify the owner, retention, redrive criteria and overload policy.",
    "order": 5,
    "prerequisites": [
      "hld-storage"
    ],
    "requiredDepth": "Commit/ack timing; crash windows; order scope; backpressure; DLQ/redrive; protocol-specific rebalance.",
    "depth": [
      "Use messaging when decoupling or buffering has a clear purpose; name the transport and its ordering/rebalance rules.",
      "Add delayed retries and dead letters; identify the owner, retention, redrive criteria and overload policy."
    ],
    "trace": [
      "transaction: domain row + outbox row → commit",
      "publisher sends → ack → mark sent",
      "crash after send → same message ID may repeat"
    ],
    "template": "10 consumers × 3,600/2 jobs/h = 18,000 jobs/h. At 10,000 arrivals/h, the queue does not grow under the toy serial model. At 200,000/h, at least 112 consumers are needed before headroom.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A committed outbox event survives process restart; consumer deduplication handles at-least-once redelivery."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use messaging when decoupling or buffering has a clear purpose; name the transport and its ordering/rebalance rules. Add delayed retries and dead letters; identify the owner, retention, redrive criteria and overload policy."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "10 consumers × 3,600/2 jobs/h = 18,000 jobs/h. At 10,000 arrivals/h, the queue does not grow under the toy serial model. At 200,000/h, at least 112 consumers are needed before headroom."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-scaling",
    "title": "Partitioning, replication and hot keys",
    "intuition": "Distribute work by ownership and demand, with an explicit routing and rebalance plan.",
    "recognize": "Use measured read/write/hot-key patterns. Stateless frontends help but stateful services can also scale through partitioning.",
    "invariant": "A given key has one declared owner at a time or an explicit conflict/merge policy; migration preserves its writes.",
    "diagram": "key → partition/router → owner\nreshard: backfill + ordered change capture + compare + cutover",
    "example": "For an even 10-node consistent-hash ring, adding one node moves roughly 1/11 of keys in expectation. Redis Cluster instead routes 16,384 hash slots.",
    "transfer": "A celebrity key gets 80K reads/s across ten 5K/s nodes; total 50K/s is insufficient, regardless of key placement.",
    "order": 6,
    "prerequisites": [
      "hld-storage",
      "hld-caching"
    ],
    "requiredDepth": "Partition keys vs replication; skew; placement; resharding; connection affinity and reconnect.",
    "depth": [
      "Use measured read/write/hot-key patterns. Stateless frontends help but stateful services can also scale through partitioning.",
      "A celebrity key gets 80K reads/s across ten 5K/s nodes; total 50K/s is insufficient, regardless of key placement."
    ],
    "trace": [
      "key → partition/router → owner",
      "reshard: backfill + ordered change capture + compare + cutover"
    ],
    "template": "For an even 10-node consistent-hash ring, adding one node moves roughly 1/11 of keys in expectation. Redis Cluster instead routes 16,384 hash slots.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A given key has one declared owner at a time or an explicit conflict/merge policy; migration preserves its writes."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use measured read/write/hot-key patterns. Stateless frontends help but stateful services can also scale through partitioning. A celebrity key gets 80K reads/s across ten 5K/s nodes; total 50K/s is insufficient, regardless of key placement."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "For an even 10-node consistent-hash ring, adding one node moves roughly 1/11 of keys in expectation. Redis Cluster instead routes 16,384 hash slots."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-reliability",
    "title": "Deadlines, overload and recovery",
    "intuition": "Protect scarce capacity with bounded queues, timeouts, retries and recovery ramps.",
    "recognize": "Budget an end-to-end deadline and distinguish average from P99. Fail-open/closed is a business decision, especially for payments.",
    "invariant": "Retries remain within the caller deadline and do not amplify offered load beyond an explicit budget.",
    "diagram": "deadline → per-hop budget → timeout\nfailure → bounded retry with jitter or terminal result\nrecovery → probe → ramp",
    "example": "A toy 95% 1ms/5% 80ms mixture has mean 4.95ms, but its P99 is 80ms, not 4.95ms.",
    "transfer": "At 200 jobs/s capacity and 1,000 simultaneous retries, choose admission and a ramp; quantify rejected or delayed work.",
    "order": 7,
    "prerequisites": [
      "hld-messaging",
      "hld-api"
    ],
    "requiredDepth": "Deadline budgeting; retry multiplication; jitter distributions; fail-open/closed business consequences.",
    "depth": [
      "Budget an end-to-end deadline and distinguish average from P99. Fail-open/closed is a business decision, especially for payments.",
      "At 200 jobs/s capacity and 1,000 simultaneous retries, choose admission and a ramp; quantify rejected or delayed work."
    ],
    "trace": [
      "deadline → per-hop budget → timeout",
      "failure → bounded retry with jitter or terminal result",
      "recovery → probe → ramp"
    ],
    "template": "A toy 95% 1ms/5% 80ms mixture has mean 4.95ms, but its P99 is 80ms, not 4.95ms.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "Retries remain within the caller deadline and do not amplify offered load beyond an explicit budget."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Budget an end-to-end deadline and distinguish average from P99. Fail-open/closed is a business decision, especially for payments. At 200 jobs/s capacity and 1,000 simultaneous retries, choose admission and a ramp; quantify rejected or delayed work."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "A toy 95% 1ms/5% 80ms mixture has mean 4.95ms, but its P99 is 80ms, not 4.95ms."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-coordination",
    "title": "Leases and fencing",
    "intuition": "A lease limits ownership time but a paused former owner can resume after it expires.",
    "recognize": "Prefer a conditional write when possible. If a lease is needed, the protected resource must reject stale fencing tokens.",
    "invariant": "Accepted writes have monotonically increasing owner tokens; stale owners cannot write even if they still believe they hold a lease.",
    "diagram": "owner A token7 pauses → lease expires\nowner B token8 writes → resource remembers8\nA resumes with7 → resource rejects",
    "example": "Lock service grants 7 then 8. Resource at 8 rejects any later write carrying 7. A lock-service check alone cannot protect a bypassed resource.",
    "transfer": "The coordinator loses quorum. Define holder behavior, lease expiry and whether an operation can continue safely.",
    "order": 8,
    "prerequisites": [
      "hld-consistency"
    ],
    "requiredDepth": "Stale owner,lease expiry,fencing enforcement,conditional writes and lock-free alternatives.",
    "depth": [
      "Prefer a conditional write when possible. If a lease is needed, the protected resource must reject stale fencing tokens.",
      "The coordinator loses quorum. Define holder behavior, lease expiry and whether an operation can continue safely."
    ],
    "trace": [
      "owner A token7 pauses → lease expires",
      "owner B token8 writes → resource remembers8",
      "A resumes with7 → resource rejects"
    ],
    "template": "Lock service grants 7 then 8. Resource at 8 rejects any later write carrying 7. A lock-service check alone cannot protect a bypassed resource.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "Accepted writes have monotonically increasing owner tokens; stale owners cannot write even if they still believe they hold a lease."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Prefer a conditional write when possible. If a lease is needed, the protected resource must reject stale fencing tokens. The coordinator loses quorum. Define holder behavior, lease expiry and whether an operation can continue safely."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "Lock service grants 7 then 8. Resource at 8 rejects any later write carrying 7. A lock-service check alone cannot protect a bypassed resource."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-components",
    "title": "Bounded service components",
    "intuition": "Design one component around its callers, state and failure semantics.",
    "recognize": "A rate limiter, scheduler or pagination layer needs a narrow contract before infrastructure picks.",
    "invariant": "A repeated call, timeout and dependency failure have specified outcomes; estimates are justified only for constrained resources.",
    "diagram": "caller → component contract → state owner → dependency\nfailed dependency → declared retry/fallback/error",
    "example": "Cursor pagination sorts by (created_at,id) and scopes by tenant. Mutating rows require a snapshot or documented drift policy.",
    "transfer": "Change one requirement (tenant fairness, region outage or retention) and describe the smallest necessary design change.",
    "order": 9,
    "prerequisites": [
      "hld-api",
      "hld-caching",
      "hld-messaging"
    ],
    "requiredDepth": "Define narrow contracts and one failure scenario; justify relevant estimates only.",
    "depth": [
      "A rate limiter, scheduler or pagination layer needs a narrow contract before infrastructure picks.",
      "Change one requirement (tenant fairness, region outage or retention) and describe the smallest necessary design change."
    ],
    "trace": [
      "caller → component contract → state owner → dependency",
      "failed dependency → declared retry/fallback/error"
    ],
    "template": "Cursor pagination sorts by (created_at,id) and scopes by tenant. Mutating rows require a snapshot or documented drift policy.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A repeated call, timeout and dependency failure have specified outcomes; estimates are justified only for constrained resources."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "A rate limiter, scheduler or pagination layer needs a narrow contract before infrastructure picks. Change one requirement (tenant fairness, region outage or retention) and describe the smallest necessary design change."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "Cursor pagination sorts by (created_at,id) and scopes by tenant. Mutating rows require a snapshot or documented drift policy."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-delivery",
    "title": "Large content and access changes",
    "intuition": "Separate metadata/authorization from bytes, then design resumable transfer and distribution.",
    "recognize": "Use object stores, chunks, checksums, CDN and variant processing according to file sizes and retrieval behavior.",
    "invariant": "A completed upload verifies its manifest and integrity; a revoked share cannot be served from an improperly scoped cache.",
    "diagram": "client → upload session → chunks/checksums → commit metadata\nviewer → auth → signed access → CDN/object bytes",
    "example": "A 5GB upload interrupted after 4GB resumes only missing chunks; the manifest commit fails if a chunk checksum differs.",
    "transfer": "Two users upload the same bytes; avoid cross-user deduplication side channels and define deletion/revocation behavior.",
    "order": 10,
    "prerequisites": [
      "hld-scaling",
      "hld-api"
    ],
    "requiredDepth": "Uploads/chunks,metadata vs blobs,index refresh,per-stream ordering,distribution and access changes.",
    "depth": [
      "Use object stores, chunks, checksums, CDN and variant processing according to file sizes and retrieval behavior.",
      "Two users upload the same bytes; avoid cross-user deduplication side channels and define deletion/revocation behavior."
    ],
    "trace": [
      "client → upload session → chunks/checksums → commit metadata",
      "viewer → auth → signed access → CDN/object bytes"
    ],
    "template": "A 5GB upload interrupted after 4GB resumes only missing chunks; the manifest commit fails if a chunk checksum differs.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "A completed upload verifies its manifest and integrity; a revoked share cannot be served from an improperly scoped cache."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use object stores, chunks, checksums, CDN and variant processing according to file sizes and retrieval behavior. Two users upload the same bytes; avoid cross-user deduplication side channels and define deletion/revocation behavior."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "A 5GB upload interrupted after 4GB resumes only missing chunks; the manifest commit fails if a chunk checksum differs."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  },
  {
    "id": "hld-systems",
    "title": "Full system synthesis",
    "intuition": "Start with a core end-to-end path, then capacity, bottlenecks, alternatives and recovery.",
    "recognize": "Use selected components rather than a checklist of every technology. Quantify where a choice actually depends on scale.",
    "invariant": "The core flow preserves invariants under normal and one stated failure condition; trade-offs are tied to user goals.",
    "diagram": "user action → API → state change → event/read model → response\nselect one bottleneck → alternative → failure drill",
    "example": "URL shortener: code creation must avoid alias races; redirect checks expiry and authorization; cache misses validate source-of-truth state.",
    "transfer": "Add regional failover with stated RPO/RTO, plus an overload recovery ramp; distinguish what is measured from assumed.",
    "order": 11,
    "prerequisites": [
      "hld-components",
      "hld-reliability",
      "hld-coordination"
    ],
    "requiredDepth": "Core flow→bottleneck→alternative→failure recovery→changed requirement.",
    "depth": [
      "Use selected components rather than a checklist of every technology. Quantify where a choice actually depends on scale.",
      "Add regional failover with stated RPO/RTO, plus an overload recovery ramp; distinguish what is measured from assumed."
    ],
    "trace": [
      "user action → API → state change → event/read model → response",
      "select one bottleneck → alternative → failure drill"
    ],
    "template": "URL shortener: code creation must avoid alias races; redirect checks expiry and authorization; cache misses validate source-of-truth state.",
    "pitfalls": [
      "A label or vendor choice does not prove the stated guarantee.",
      "Separate measured facts from scenario assumptions and show units."
    ],
    "recall": [
      {
        "q": "What contract or invariant drives this design?",
        "a": "The core flow preserves invariants under normal and one stated failure condition; trade-offs are tied to user goals."
      },
      {
        "q": "What failure or trade-off invalidates the first choice?",
        "a": "Use selected components rather than a checklist of every technology. Quantify where a choice actually depends on scale. Add regional failover with stated RPO/RTO, plus an overload recovery ramp; distinguish what is measured from assumed."
      },
      {
        "q": "Recompute or retrace the worked example with a changed assumption.",
        "a": "URL shortener: code creation must avoid alias races; redirect checks expiry and authorization; cache misses validate source-of-truth state."
      }
    ],
    "sources": [
      {
        "title": "Redis Cluster uses hash slots",
        "url": "https://redis.io/docs/latest/management/scaling/"
      },
      {
        "title": "Amazon S3 object consistency model",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
      },
      {
        "title": "PostgreSQL table changes",
        "url": "https://www.postgresql.org/docs/17/ddl-alter.html"
      }
    ]
  }
];
