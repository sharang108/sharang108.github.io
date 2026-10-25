window.HttpGuides = [
  {
    "id": "http-lifecycle",
    "title": "HTTP request lifecycle & DNS",
    "order": 0,
    "prerequisites": [],
    "intuition": "A browser request crosses name resolution, connection setup, request routing, response and rendering; a warm connection skips some setup.",
    "diagram": "URL → DNS → TCP/TLS or QUIC → proxy → app → response → browser",
    "template": "GET /items HTTP/1.1\nHost: example.test\n\nHTTP/1.1 200 OK\nContent-Type: text/html",
    "pitfalls": [
      "A DNS lookup does not fetch a page; connection reuse and cached content change the path."
    ],
    "transfer": "Compare a first visit with a reused connection and a cached resource.",
    "invariant": "A browser request crosses name resolution, connection setup, request routing, response and rendering; a warm connection skips some setup.",
    "requiredDepth": "Separate DNS lookup,transport setup,TLS,HTTP and application/database processing. A hostname is not a connection and DNS caching is not HTTP caching. DNS may return multiple addresses; connection reuse can skip setup. Latency must identify one-way versus round-trip measurements.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "A browser request crosses name resolution, connection setup, request routing, response and rendering; a warm connection skips some setup."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "URL → DNS → TCP/TLS or QUIC → proxy → app → response → browser A DNS lookup does not fetch a page; connection reuse and cached content change the path."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Compare a first visit with a reused connection and a cached resource."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "http-transport",
    "title": "TCP, TLS & HTTP versions",
    "order": 1,
    "prerequisites": [
      "http-lifecycle"
    ],
    "intuition": "Transport delivers bytes; TLS authenticates a server identity and encrypts the channel when validation succeeds.",
    "diagram": "DNS → connect → TLS certificate/name check → HTTP bytes",
    "template": "Certificate subject/SAN must match requested host; a valid chain for another host still fails the name check.",
    "pitfalls": [
      "Do not solve a certificate failure by disabling verification."
    ],
    "transfer": "A proxy terminates TLS and forwards to an app: identify each trust boundary and forwarded header.",
    "invariant": "Transport delivers bytes; TLS authenticates a server identity and encrypts the channel when validation succeeds.",
    "requiredDepth": "Know TCP stream framing, retransmission and TLS certificate/hostname verification. A successful connection does not guarantee application-level success. HTTP/1.1,HTTP/2 andHTTP/3 have different connection/multiplexing models. Encryption does not authorize access to an application object.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Transport delivers bytes; TLS authenticates a server identity and encrypts the channel when validation succeeds."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "DNS → connect → TLS certificate/name check → HTTP bytes Do not solve a certificate failure by disabling verification."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "A proxy terminates TLS and forwards to an app: identify each trust boundary and forwarded header."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "http-semantics",
    "title": "Methods, status codes & representations",
    "order": 2,
    "prerequisites": [
      "http-lifecycle"
    ],
    "intuition": "Methods describe intended effects; status codes and headers tell a caller whether and how to retry.",
    "diagram": "request method + URI + headers + body → operation → status + headers + body",
    "template": "POST /orders with Idempotency-Key: K\n201 Created + Location: /orders/42\nretry K → stored result; new payload with K → conflict",
    "pitfalls": [
      "A lost response is not proof the write failed; DELETE being idempotent does not require identical response codes."
    ],
    "transfer": "Design PATCH with If-Match to avoid overwriting a concurrent update.",
    "invariant": "Methods describe intended effects; status codes and headers tell a caller whether and how to retry.",
    "requiredDepth": "Distinguish safe/idempotent semantics, content type and accepted response formats. Idempotence concerns intended server effect, not identical response bytes. POST can support idempotency by application contract; PUT is not a partial-update synonym. 401 and403 have different meanings; status codes are not arbitrary labels.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Methods describe intended effects; status codes and headers tell a caller whether and how to retry."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "request method + URI + headers + body → operation → status + headers + body A lost response is not proof the write failed; DELETE being idempotent does not require identical response codes."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Design PATCH with If-Match to avoid overwriting a concurrent update."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "http-caching",
    "title": "HTTP caching & conditional requests",
    "order": 3,
    "prerequisites": [
      "http-semantics"
    ],
    "intuition": "A cache may reuse a representation only under its freshness and variation contract.",
    "diagram": "request → cache key/variant → fresh hit OR validator revalidation → origin",
    "template": "GET /article\nIf-None-Match: \"v7\"\n→ 304 Not Modified when selected representation still matches",
    "pitfalls": [
      "Private data must not leak through a shared cache; Vary changes cache-key matching."
    ],
    "transfer": "Serve language-specific pages with explicit Vary and test a validator after update.",
    "invariant": "A cache may reuse a representation only under its freshness and variation contract.",
    "requiredDepth": "Distinguish Cache-Control,max-age,no-cache,no-store,private,ETag and Vary. A shared cache key must account for every request dimension that changes the representation. no-cache permits storage but requires validation before reuse. Authorization and personalized responses need explicit cache policy.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "A cache may reuse a representation only under its freshness and variation contract."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "request → cache key/variant → fresh hit OR validator revalidation → origin Private data must not leak through a shared cache; Vary changes cache-key matching."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Serve language-specific pages with explicit Vary and test a validator after update."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "http-browser",
    "title": "Cookies, sessions & CORS",
    "order": 4,
    "prerequisites": [
      "http-semantics"
    ],
    "intuition": "Cookies, origin policy, CORS and CSRF address different questions: sending credentials, reading responses, and authorizing state changes.",
    "diagram": "browser → cookie rules → optional preflight → request → CORS response check",
    "template": "OPTIONS /api/items\nOrigin: https://app.test\nAccess-Control-Request-Method: POST\n→ Access-Control-Allow-Origin: https://app.test",
    "pitfalls": [
      "CORS is a browser read restriction, not server-side authentication; wildcard origin cannot authorize credentialed response access."
    ],
    "transfer": "Explain why a cross-origin credentialed fetch fails despite a successful server response.",
    "invariant": "Cookies, origin policy, CORS and CSRF address different questions: sending credentials, reading responses, and authorizing state changes.",
    "requiredDepth": "Distinguish origin from site; cookie attributes include Secure,HttpOnly,SameSite,Path and expiry. CORS is not server authentication and does not block all non-browser clients. A signed cookie protects integrity but may not encrypt its payload. Credentialed cross-origin responses cannot use wildcard allowed-origin.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Cookies, origin policy, CORS and CSRF address different questions: sending credentials, reading responses, and authorizing state changes."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "browser → cookie rules → optional preflight → request → CORS response check CORS is a browser read restriction, not server-side authentication; wildcard origin cannot authorize credentialed response access."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Explain why a cross-origin credentialed fetch fails despite a successful server response."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  },
  {
    "id": "http-connections",
    "title": "Proxies, timeouts & persistent updates",
    "order": 5,
    "prerequisites": [
      "http-transport",
      "http-browser"
    ],
    "intuition": "Pick request/response, SSE or WebSocket by direction, latency, reconnect and delivery needs.",
    "diagram": "client ⇄ proxy ⇄ service; reconnect → resume token or state resync",
    "template": "SSE: server → client events with id; reconnect uses Last-Event-ID. WebSocket: bidirectional frames on one connection.",
    "pitfalls": [
      "A long-lived connection still needs heartbeats, backpressure and reconnect semantics; proxies have timeouts."
    ],
    "transfer": "Put a bidirectional presence feature behind a reverse proxy and define reconnection.",
    "invariant": "Pick request/response, SSE or WebSocket by direction, latency, reconnect and delivery needs.",
    "requiredDepth": "Distinguish connect/read/total deadlines; explain keep-alive,pooling,reverse proxy,SSE and WebSockets. A retry must fit the remaining deadline and respect side-effect semantics. Untrusted forwarded headers must not become trusted identity. SSE is server→client; WebSocket is bidirectional and needs reconnect semantics.",
    "recall": [
      {
        "q": "What contract does this topic protect?",
        "a": "Pick request/response, SSE or WebSocket by direction, latency, reconnect and delivery needs."
      },
      {
        "q": "Trace a boundary or failure case.",
        "a": "client ⇄ proxy ⇄ service; reconnect → resume token or state resync A long-lived connection still needs heartbeats, backpressure and reconnect semantics; proxies have timeouts."
      },
      {
        "q": "How would the transfer case change your answer?",
        "a": "Put a bidirectional presence feature behind a reverse proxy and define reconnection."
      }
    ],
    "sources": [
      {
        "title": "HTTP Semantics (RFC 9110)",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
      }
    ]
  }
];
