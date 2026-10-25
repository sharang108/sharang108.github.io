window.SqlGuides = [
  {
    "id": "sql-schema",
    "title": "Relational modeling & constraints",
    "order": 0,
    "prerequisites": [],
    "intuition": "Keys and constraints encode ownership and invariants in the database, while normalization controls duplication and update anomalies.",
    "diagram": "entities → primary/foreign keys → uniqueness/check constraints → migration",
    "template": "CREATE TABLE loans (id bigint PRIMARY KEY, book_id bigint NOT NULL REFERENCES books(id), user_id bigint NOT NULL REFERENCES users(id));",
    "pitfalls": [
      "A JSON column does not replace relationships when queries and constraints need them; nullable fields need explicit semantics."
    ],
    "transfer": "Add reservations with a no-overlap invariant and discuss what a simple unique key cannot express.",
    "invariant": "Keys and constraints encode ownership and invariants in the database, while normalization controls duplication and update anomalies.",
    "requiredDepth": "Model entities,relationships,keys,NOT NULL,UNIQUE,CHECK and foreign keys. A foreign key protects a relationship; an index accelerates access and is not the same guarantee. Nullable uniqueness and deletion behavior need explicit semantics. Normalize before denormalizing for a measured query.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Keys and constraints encode ownership and invariants in the database, while normalization controls duplication and update anomalies."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "entities → primary/foreign keys → uniqueness/check constraints → migration A JSON column does not replace relationships when queries and constraints need them; nullable fields need explicit semantics."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Add reservations with a no-overlap invariant and discuss what a simple unique key cannot express."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  },
  {
    "id": "sql-queries",
    "title": "SELECT, joins, NULL & aggregation",
    "order": 1,
    "prerequisites": [
      "sql-schema"
    ],
    "intuition": "JOIN multiplicity changes row counts; aggregate at the grain you mean before joining independent one-to-many relations.",
    "diagram": "FROM/JOIN → WHERE → GROUP → HAVING → SELECT → ORDER/LIMIT",
    "template": "SELECT c.id, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id;",
    "pitfalls": [
      "WHERE on the right table can turn a LEFT JOIN into an effective INNER JOIN; COUNT(*) counts the null-extended row."
    ],
    "transfer": "Calculate revenue when orders have multiple items and multiple payments without double-counting.",
    "invariant": "JOIN multiplicity changes row counts; aggregate at the grain you mean before joining independent one-to-many relations.",
    "requiredDepth": "Cover inner/left joins,WHERE,HAVING,GROUP BY,DISTINCT and three-valued NULL logic. Name the grain of each intermediate result before counting or summing. WHERE filters on the nullable side can turn a left join into inner behavior. COUNT(*) differs from COUNT(nullable_column).",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "JOIN multiplicity changes row counts; aggregate at the grain you mean before joining independent one-to-many relations."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "FROM/JOIN → WHERE → GROUP → HAVING → SELECT → ORDER/LIMIT WHERE on the right table can turn a LEFT JOIN into an effective INNER JOIN; COUNT(*) counts the null-extended row."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Calculate revenue when orders have multiple items and multiple payments without double-counting."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  },
  {
    "id": "sql-advanced-queries",
    "title": "CTEs, subqueries & window functions",
    "order": 2,
    "prerequisites": [
      "sql-queries"
    ],
    "intuition": "Window functions rank or aggregate across rows without collapsing them; CTEs can express stages and recursion.",
    "diagram": "base rows → partition/order → window rank → outer filter",
    "template": "SELECT * FROM (SELECT p.*, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC,id) rn FROM purchases p) s WHERE rn<=2;",
    "pitfalls": [
      "Break ties explicitly; window aliases are normally filtered in an outer query."
    ],
    "transfer": "Find gaps in a daily series, then extend to a recursive hierarchy.",
    "invariant": "Window functions rank or aggregate across rows without collapsing them; CTEs can express stages and recursion.",
    "requiredDepth": "Practice EXISTS,NOT EXISTS,correlated subqueries,ROW_NUMBER,RANK,LAG and cumulative aggregates. Partition/order/frame jointly define each window result. NOT IN with NULL can produce unexpected unknown results. Window ordering is not a guarantee of final output order.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Window functions rank or aggregate across rows without collapsing them; CTEs can express stages and recursion."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "base rows → partition/order → window rank → outer filter Break ties explicitly; window aliases are normally filtered in an outer query."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Find gaps in a daily series, then extend to a recursive hierarchy."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  },
  {
    "id": "sql-indexes",
    "title": "Indexes & query plans",
    "order": 3,
    "prerequisites": [
      "sql-advanced-queries"
    ],
    "intuition": "An index is an access path chosen by the planner, with write/storage cost; measure a representative query and plan.",
    "diagram": "predicate/order → candidate index → EXPLAIN → measured rows/timing → decision",
    "template": "CREATE INDEX orders_user_created_id ON orders(user_id,created_at DESC,id DESC);",
    "pitfalls": [
      "A composite index order matters; selectivity and actual plan matter more than a rule of thumb."
    ],
    "transfer": "A query slows only for one tenant with many rows; compare index, statistics and pagination choice.",
    "invariant": "An index is an access path chosen by the planner, with write/storage cost; measure a representative query and plan.",
    "requiredDepth": "Practice composite/partial/covering indexes,selectivity,EXPLAIN and realistic data distributions. An index must match useful predicates/order and still justify its write overhead. An unused index is not proof the optimizer is broken. EXPLAIN ANALYZE executes the statement; use safe local fixtures.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "An index is an access path chosen by the planner, with write/storage cost; measure a representative query and plan."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "predicate/order → candidate index → EXPLAIN → measured rows/timing → decision A composite index order matters; selectivity and actual plan matter more than a rule of thumb."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "A query slows only for one tenant with many rows; compare index, statistics and pagination choice."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  },
  {
    "id": "sql-transactions",
    "title": "Transactions, isolation & locking",
    "order": 4,
    "prerequisites": [
      "sql-indexes"
    ],
    "intuition": "A transaction groups changes atomically, but isolation determines which concurrent histories are allowed.",
    "diagram": "BEGIN → read/check → guarded write → COMMIT or ROLLBACK",
    "template": "UPDATE seats SET held_by=:buyer WHERE id=:seat AND held_by IS NULL;\n-- require exactly one affected row before commit",
    "pitfalls": [
      "A read-then-write in separate statements can race; a transaction alone does not imply serializable isolation."
    ],
    "transfer": "Transfer funds with balanced entries and show rollback under a simulated failure.",
    "invariant": "A transaction groups changes atomically, but isolation determines which concurrent histories are allowed.",
    "requiredDepth": "Distinguish atomicity,durability,isolation levels,row locks,deadlocks and optimistic versions. Check-and-change must be one atomic database operation or protected transaction. A read followed by an unlocked write can lose updates. Retry serialization/deadlock failures at a safe transaction boundary.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "A transaction groups changes atomically, but isolation determines which concurrent histories are allowed."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "BEGIN → read/check → guarded write → COMMIT or ROLLBACK A read-then-write in separate statements can race; a transaction alone does not imply serializable isolation."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Transfer funds with balanced entries and show rollback under a simulated failure."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  },
  {
    "id": "sql-lifecycle",
    "title": "Connections, migrations & pagination",
    "order": 5,
    "prerequisites": [
      "sql-transactions"
    ],
    "intuition": "A database feature includes schema migration, connection limits, rollback and stable pagination as well as SQL text.",
    "diagram": "expand schema → deploy compatible app → backfill → contract old schema",
    "template": "SELECT * FROM orders WHERE (created_at,id)<(:cursor_time,:cursor_id) ORDER BY created_at DESC,id DESC LIMIT 20;",
    "pitfalls": [
      "OFFSET pagination drifts under inserts; a connection returned with an open failed transaction may poison later work."
    ],
    "transfer": "Design a zero-downtime column change and an exhausted-pool recovery check.",
    "invariant": "A database feature includes schema migration, connection limits, rollback and stable pagination as well as SQL text.",
    "requiredDepth": "Separate connection pool,session/transaction and repository ownership. Every owned connection is returned and every transaction is explicitly completed. Modern PostgreSQL constant defaults can avoid table rewrites, but locks still matter. Cursor pagination needs a unique stable ordering and a mutation policy.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "A database feature includes schema migration, connection limits, rollback and stable pagination as well as SQL text."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "expand schema → deploy compatible app → backfill → contract old schema OFFSET pagination drifts under inserts; a connection returned with an open failed transaction may poison later work."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Design a zero-downtime column change and an exhausted-pool recovery check."
      }
    ],
    "sources": [
      {
        "title": "PostgreSQL documentation",
        "url": "https://www.postgresql.org/docs/current/"
      }
    ]
  }
];
