/* Authored learning companions. Templates are illustrative, not full exercise solutions. */
window.DsaGuides = [
  {
    "id": "dsa-hashing",
    "track": "dsa",
    "title": "Arrays, strings & hashing",
    "intuition": "Store just the information needed to recognize a match without rescanning the past.",
    "recognize": "Use for membership, counts or complements. A sorted-order or range question may need something else.",
    "invariant": "Seen state describes the processed prefix, never future elements.",
    "trace": [
      "Read 2: need 7; remember 2 → index 0",
      "Read 7: need 2; found index 0",
      "Return [0,1]; never reuse the same element"
    ],
    "template": "seen = {}\nfor i, x in enumerate(values):\n    if target - x in seen:\n        return seen[target - x], i\n    seen[x] = i",
    "prerequisites": [],
    "pitfalls": [
      "Average O(1) hash lookup assumes suitable hashing; worst cases differ.",
      "Mutable values cannot generally be dictionary keys.",
      "Count all string characters when analyzing encoded keys."
    ],
    "order": 0,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Choose membership set, count map or complement→index based on the question. For anagrams with a fixed alphabet use a count tuple; sorting a word of length k costs O(k log k). Building or hashing a k-character key costs O(k).",
      "Two Sum [3,3], target6 needs two distinct indices. Looking up before insertion prevents pairing an item with itself."
    ],
    "requiredDepth": "Key design; frequency vs membership; expected vs worst-case hashing; string key/output costs.",
    "transfer": "Return all index pairs summing to target, including duplicate values. How does output size alter the bound?",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Seen state describes the processed prefix, never future elements."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use for membership, counts or complements. A sorted-order or range question may need something else. Average O(1) hash lookup assumes suitable hashing; worst cases differ."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-prefix",
    "track": "dsa",
    "title": "Prefix sums & products",
    "intuition": "A prefix summarizes everything before a position; subtract two prefixes to answer a range.",
    "recognize": "Use for repeated ranges or subarray totals. Sliding-window shrinking is unsafe for arbitrary signed sums.",
    "invariant": "prefix[j] - prefix[i] equals the sum of values in [i,j).",
    "trace": [
      "[2,-1,3] → prefix [0,2,1,4]",
      "Range [1,3): 4−2=2",
      "For target 2, count earlier prefix current−2"
    ],
    "template": "prefix = [0]\nfor x in values:\n    prefix.append(prefix[-1] + x)\ndef range_sum(left, right):\n    return prefix[right] - prefix[left]",
    "prerequisites": [
      "dsa-hashing"
    ],
    "pitfalls": [
      "Seed the empty prefix.",
      "Query before updating counts to avoid counting an empty subarray.",
      "Product variants must handle zeros; division is not always allowed."
    ],
    "order": 1,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Use a length n+1 sum array with prefix[0]=0. Inclusive query l..r becomes prefix[r+1]−prefix[l]. Signed subarray counting stores the frequency of prior sums, seeded {0:1}.",
      "For products without division, write prefix products into output then multiply by a suffix accumulator. One zero leaves only its position nonzero; two zeros force all outputs to zero."
    ],
    "requiredDepth": "Empty prefix; range boundaries; query-before-update; zero handling; auxiliary vs output space.",
    "transfer": "Allow point updates between range-sum queries. Explain why the static prefix table no longer gives cheap updates.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "prefix[j] - prefix[i] equals the sum of values in [i,j)."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use for repeated ranges or subarray totals. Sliding-window shrinking is unsafe for arbitrary signed sums. Seed the empty prefix."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-two-pointers",
    "track": "dsa",
    "title": "Two pointers & partitioning",
    "intuition": "Use order to discard candidates that cannot improve the answer.",
    "recognize": "Use sorted pairs, inward scans or in-place partitioning. Define why moving a pointer is safe.",
    "invariant": "All discarded candidates have been ruled out by a stated ordering argument.",
    "trace": [
      "[1,2,4,7], target 6: 1+7 too large → move right",
      "1+4 too small → move left",
      "2+4=6"
    ],
    "template": "left, right = 0, len(a) - 1\nwhile left < right:\n    total = a[left] + a[right]\n    if total == target:\n        return left, right\n    if total < target:\n        left += 1\n    else:\n        right -= 1",
    "prerequisites": [
      "dsa-hashing"
    ],
    "pitfalls": [
      "Do not apply the sorted-pair movement rule to unsorted input.",
      "Sorting may mutate input and consume workspace.",
      "Deduplicate values without skipping valid combinations."
    ],
    "order": 2,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "For sorted pairs, too-small sum rules out that left value with every remaining right value. In partitioning, the pointers instead delimit processed categories: use a separate invariant.",
      "For 3Sum sort, fix one value, scan the suffix, and skip equal fixed/paired values. Python sorting may require O(n) workspace; returned triples also consume memory."
    ],
    "requiredDepth": "Sorted-pair elimination; opposite/same-direction scans; three-way partition; duplicate suppression.",
    "transfer": "Return original index pairs from unsorted input without mutation. Which sorted-pointer assumption fails?",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "All discarded candidates have been ruled out by a stated ordering argument."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use sorted pairs, inward scans or in-place partitioning. Define why moving a pointer is safe. Do not apply the sorted-pair movement rule to unsorted input."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-sliding-window",
    "track": "dsa",
    "title": "Fixed & variable windows",
    "intuition": "Maintain a contiguous region and repair it when its contract becomes invalid.",
    "recognize": "Use when adding/removing an edge updates state cheaply and validity supports safe movement.",
    "invariant": "After shrinking, the window satisfies its constraint.",
    "trace": [
      "Read a → [a] valid",
      "Read b → [a,b] valid",
      "Read a → duplicate; remove first a → [b,a] valid"
    ],
    "template": "left = 0\ncounts = {}\nbest = 0\nfor right, x in enumerate(a):\n    counts[x] = counts.get(x, 0) + 1\n    while counts[x] > 1:\n        old = a[left]\n        counts[old] -= 1\n        left += 1\n    best = max(best, right - left + 1)",
    "prerequisites": [
      "dsa-hashing",
      "dsa-two-pointers"
    ],
    "pitfalls": [
      "Fixed and variable windows have different contracts.",
      "Negative sums can destroy the monotonicity needed to shrink.",
      "Minimum-cover windows update their answer before removing a required item."
    ],
    "order": 3,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Fixed width: remove the item leaving the range each step. Longest valid: shrink until valid, then update best. Minimum cover: while all requirements are met, record then shrink until invalid.",
      "Track multiplicities, not merely presence: target AAB needs two As. Signed sums can break shrink logic: [1,−1,1] has valid subarrays not captured by positive-only reasoning."
    ],
    "requiredDepth": "Fixed windows; longest-valid/minimum-cover; multiplicity; why shrinking is safe.",
    "transfer": "Count subarrays of signed integers summing to k. Give a counterexample to positive-only shrinking.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "After shrinking, the window satisfies its constraint."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use when adding/removing an edge updates state cheaply and validity supports safe movement. Fixed and variable windows have different contracts."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-binary-search",
    "track": "dsa",
    "title": "Binary search & answer-space search",
    "intuition": "Maintain a region that still contains the first feasible answer, then halve it.",
    "recognize": "Use sorted boundaries or a monotone feasibility predicate; sorted-looking data alone is insufficient.",
    "invariant": "For lower_bound, indices before lo are < target and indices at/after hi are ≥ target.",
    "trace": [
      "[1,3,3,8], target 3; [lo,hi)=[0,4)",
      "mid2 is3 → hi2",
      "mid1 is3 → hi1; mid0 is1 → lo1"
    ],
    "template": "lo, hi = 0, len(a)\nwhile lo < hi:\n    mid = lo + (hi - lo) // 2\n    if a[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid\nreturn lo",
    "prerequisites": [
      "dsa-two-pointers"
    ],
    "pitfalls": [
      "Distinguish finding any match from first/last boundary.",
      "Prove interval shrinkage to avoid infinite loops.",
      "Answer-space search cost includes the feasibility check."
    ],
    "order": 4,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "For first feasible integer, choose inclusive feasible upper bound and lower candidate bound. While lo<hi: feasible(mid) means hi=mid; otherwise lo=mid+1. Total work is predicate cost × number of halvings.",
      "For duplicates, find lower_bound(target) and upper_bound(target) separately. For shipping, lower bound is max weight and upper bound total weight; greedily count required days for a candidate capacity."
    ],
    "requiredDepth": "Half-open bounds; first true; duplicate boundaries; feasibility complexity; termination proof.",
    "transfer": "Return the first feasible capacity when the feasibility check itself costs O(n). Derive the complete bound.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "For lower_bound, indices before lo are < target and indices at/after hi are ≥ target."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use sorted boundaries or a monotone feasibility predicate; sorted-looking data alone is insufficient. Distinguish finding any match from first/last boundary."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-sorting",
    "title": "Sorting, selection & comparators",
    "intuition": "Sorting creates a reusable order. Selection discards the side that cannot contain the requested rank.",
    "recognize": "Use merge sort for predictable stable ordering; partition selection when only a rank is needed.",
    "invariant": "During merge, output is sorted and contains exactly the consumed prefixes.",
    "trace": [
      "[3a,1] + [3b,2]",
      "Sorted halves: [1,3a], [2,3b]",
      "Merge: [1,2,3a,3b]; equal keys retain input order"
    ],
    "template": "def merge_sort(a):\n    if len(a) < 2:\n        return a[:]\n    mid = len(a) // 2\n    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])\n    out = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            out.append(left[i]); i += 1\n        else:\n            out.append(right[j]); j += 1\n    return out + left[i:] + right[j:]",
    "pitfalls": [
      "Choosing the right equal key before the left breaks merge stability.",
      "A balanced recursion depth does not mean constant total workspace."
    ],
    "order": 5,
    "prerequisites": [
      "dsa-two-pointers"
    ],
    "depth": [
      "Stable merge chooses the left item on equal keys. This slicing version uses O(n) peak auxiliary space and O(n log n) time, not constant space.",
      "Quickselect preserves a partition invariant and follows only the side containing rank k. Random pivots give expected O(n), but worst-case O(n²); partitioning can mutate input."
    ],
    "requiredDepth": "Stable merge; partition invariant; comparator ties; average/worst-case quickselect.",
    "transfer": "Sort records with equal keys stably, then find only the kth key. Which work can selection avoid?",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "During merge, output is sorted and contains exactly the consumed prefixes."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use merge sort for predictable stable ordering; partition selection when only a rank is needed. Stable merge chooses the left item on equal keys. This slicing version uses O(n) peak auxiliary space and O(n log n) time, not constant space."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      },
      {
        "title": "Python sorting — stability and keys",
        "url": "https://docs.python.org/3/howto/sorting.html"
      }
    ]
  },
  {
    "id": "dsa-linked-list",
    "track": "dsa",
    "title": "Linked lists & reference ownership",
    "intuition": "Rewire references while preserving a route to the unprocessed nodes.",
    "recognize": "Use dummy nodes when the head can change and fast/slow pointers when traversal rates reveal structure.",
    "invariant": "prev is the reversed prefix; cur starts the untouched suffix.",
    "trace": [
      "None ← 1   2 → 3",
      "None ← 1 ← 2   3",
      "None ← 1 ← 2 ← 3"
    ],
    "template": "prev, cur = None, head\nwhile cur is not None:\n    nxt = cur.next\n    cur.next = prev\n    prev, cur = cur, nxt\nreturn prev",
    "prerequisites": [
      "dsa-two-pointers"
    ],
    "pitfalls": [
      "Save next before overwriting it.",
      "Fast/slow first meeting is not necessarily the cycle entry.",
      "Specify whether input nodes may be mutated."
    ],
    "order": 6,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Dummy nodes simplify removing or inserting at the head. In reorder, split after the midpoint, reverse the second half, then weave; failing to split can create a cycle.",
      "Cycle meeting is not entry. If prefix length is μ and cycle length λ, the meeting distance from head is a multiple of λ. Reset one pointer to head; equal-speed pointers meet at entry after μ moves."
    ],
    "requiredDepth": "Dummy nodes; reversal; fast/slow meeting vs entry; recursive/iterative cost; split/weave.",
    "transfer": "Detect a cycle and return its entry without a visited set; prove the reset step.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "prev is the reversed prefix; cur starts the untouched suffix."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use dummy nodes when the head can change and fast/slow pointers when traversal rates reveal structure. Save next before overwriting it."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-stack-queue",
    "track": "dsa",
    "title": "Stacks, queues & monotonic structures",
    "intuition": "Keep unresolved work in the order it must be revisited. A monotonic stack removes candidates made irrelevant by a new value.",
    "recognize": "Stack for nesting/next greater; queue for FIFO; deque for expiring extrema.",
    "invariant": "Each stored index is unresolved and values obey the chosen monotone order.",
    "trace": [
      "Temperatures [70,68,72]: push0",
      "push1: stack [0,1]",
      "72 resolves1 then0; waits [2,1,0]"
    ],
    "template": "stack = []\nanswer = [0] * len(a)\nfor i, x in enumerate(a):\n    while stack and a[stack[-1]] < x:\n        j = stack.pop()\n        answer[j] = i - j\n    stack.append(i)",
    "prerequisites": [
      "dsa-hashing"
    ],
    "pitfalls": [
      "Each element is pushed/popped at most once: amortized O(n).",
      "Equal values require an explicit strict/non-strict rule.",
      "Expire deque indices before using the front."
    ],
    "order": 7,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "A queue from two stacks transfers inbox to outbox only when outbox is empty: each item moves at most once, so operations are amortized O(1), one transfer O(n).",
      "For sliding maximum, expire indices < left; remove smaller trailing candidates before appending. For equal values decide whether to retain the older or newer index; indices are necessary to expire correctly."
    ],
    "requiredDepth": "Nesting; postfix; monotonic equal-value policy; amortization; expiring indices.",
    "transfer": "Return a sliding minimum instead of maximum and expire equal candidates correctly.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Each stored index is unresolved and values obey the chosen monotone order."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Stack for nesting/next greater; queue for FIFO; deque for expiring extrema. Each element is pushed/popped at most once: amortized O(n)."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-recursion",
    "track": "dsa",
    "title": "Recursion & divide-and-conquer",
    "intuition": "Each call promises an answer for a smaller input. Base cases stop the descent; return values combine while the stack unwinds.",
    "recognize": "Use self-similar structure and a strictly decreasing measure. Deep linear recursion may exceed Python stack limits.",
    "invariant": "power(x,n) returns x**n for integer n≥0; the recursive argument is strictly smaller.",
    "trace": [
      "power(2,5) asks power(2,2)",
      "power(2,2) asks power(2,1), then power(2,0)=1",
      "Unwind: 2,4,32; multiply once more for odd exponents"
    ],
    "template": "def power(x, n):\n    # Contract: integer n >= 0.\n    if n == 0:\n        return 1\n    half = power(x, n // 2)\n    return half * half * (x if n % 2 else 1)",
    "prerequisites": [
      "dsa-linked-list"
    ],
    "pitfalls": [
      "The recursive argument must decrease toward a valid base case.",
      "Recomputing both identical half-powers loses the intended logarithmic work.",
      "Python recursion depth is bounded; use an iterative alternative for deep linear traversals."
    ],
    "order": 8,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Write a return contract, smallest valid input and strictly decreasing measure before calling recursively. For list reversal, the call returns the new suffix head; reconnect old next back to current and clear current.next.",
      "Divide-and-conquer cost is per-level work across all calls, not just depth. Python call depth is limited; an O(n)-depth recursion can fail long before its asymptotic space limit becomes practical."
    ],
    "requiredDepth": "Return contract; base cases; call-stack trace; depth risk; split/combine work.",
    "transfer": "Replace a recursive list reversal with an iterative version and compare the live state.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "power(x,n) returns x**n for integer n≥0; the recursive argument is strictly smaller."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use self-similar structure and a strictly decreasing measure. Deep linear recursion may exceed Python stack limits."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-backtracking",
    "title": "Backtracking & search spaces",
    "intuition": "Explore one legal choice, remember it, and undo it before exploring a sibling.",
    "recognize": "Use subsets, arrangements and constraint satisfaction where the output itself may be exponential.",
    "invariant": "The path contains exactly the choices on the current root-to-node route; siblings see restored state.",
    "trace": [
      "[1,2,2]: choose []",
      "choose first 2 → [2]; second 2 → [2,2]",
      "At root skip the second 2; its sibling subtree duplicates the first"
    ],
    "template": "a = sorted(a)\nresult, path = [], []\ndef visit(start):\n    result.append(path.copy())\n    for i in range(start, len(a)):\n        if i > start and a[i] == a[i-1]:\n            continue\n        path.append(a[i])\n        visit(i + 1)\n        path.pop()\nvisit(0)",
    "pitfalls": [
      "Appending path without copying makes saved outputs share mutable state.",
      "Pruning negative remaining sums is safe only when remaining choices are positive."
    ],
    "order": 9,
    "prerequisites": [
      "dsa-recursion"
    ],
    "depth": [
      "Subsets advance start; reusable combinations recurse with i; permutations track used indices rather than start.",
      "Skip equal siblings, not equal values at every depth. Subsets cost O(n·2^n) including copied outputs; permutations can cost O(n·n!). Pruning requires a proof, not a guess."
    ],
    "requiredDepth": "Subset vs permutation trees; reusable vs single-use choices; duplicate handling; output-sensitive complexity.",
    "transfer": "Change distinct subset values to repeated ones; prevent duplicate siblings without eliminating valid repeated selections.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "The path contains exactly the choices on the current root-to-node route; siblings see restored state."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use subsets, arrangements and constraint satisfaction where the output itself may be exponential. Subsets advance start; reusable combinations recurse with i; permutations track used indices rather than start."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-trees",
    "track": "dsa",
    "title": "Binary trees & BSTs",
    "intuition": "Combine answers from subtrees; use inherited bounds when validity depends on ancestors.",
    "recognize": "Choose DFS for subtree returns and BFS for levels. BST order enables pruning, not automatic balance.",
    "invariant": "Each call returns the promised summary for its whole subtree.",
    "trace": [
      "At leaf: left0/right0 → height1",
      "At parent: left1/right0 → height2",
      "Update diameter with left_height+right_height"
    ],
    "template": "def height(node):\n    if node is None:\n        return 0\n    left = height(node.left)\n    right = height(node.right)\n    return 1 + max(left, right)",
    "prerequisites": [
      "dsa-recursion",
      "dsa-stack-queue"
    ],
    "pitfalls": [
      "A skewed tree has h=n.",
      "Local parent comparisons do not prove BST validity.",
      "A returned downward path differs from a global best path."
    ],
    "order": 10,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Separate returned downward information from global answers: diameter uses left height+right height, but a parent receives only max height+1. BST validation carries ancestor bounds, not just parent comparisons.",
      "Tree DFS uses O(h) stack, h up to n; BFS frontier uses O(w) for width w. Reconstruction needs unique values and valid traversals. Serialization needs explicit null structure, not values alone."
    ],
    "requiredDepth": "Subtree returns vs global result; inherited bounds; height; BFS width; reconstruction; serialization.",
    "transfer": "Return the actual maximum-sum path rather than only its value. What extra information is needed?",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Each call returns the promised summary for its whole subtree."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Choose DFS for subtree returns and BFS for levels. BST order enables pruning, not automatic balance. A skewed tree has h=n."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-heaps",
    "track": "dsa",
    "title": "Heaps & streaming selection",
    "intuition": "Keep the most useful frontier item accessible without sorting everything.",
    "recognize": "Use top-k, k-way merge or streaming medians. A heap is not fully sorted.",
    "invariant": "For largest k, the min-heap contains the largest k values seen so far.",
    "trace": [
      "k2: read4 → [4]",
      "read1 → [1,4]",
      "read7 → evict1; keep [4,7]"
    ],
    "template": "import heapq\nheap = []\nfor x in values:\n    heapq.heappush(heap, x)\n    if len(heap) > k:\n        heapq.heappop(heap)\nreturn heap",
    "prerequisites": [
      "dsa-sorting"
    ],
    "pitfalls": [
      "Define k=0 and k>n behavior.",
      "Use tie-break counters when payload objects cannot be compared.",
      "Merge-k complexity is O(N log k) for N total elements."
    ],
    "order": 11,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Largest k uses a min-heap of retained candidates; k-way merge holds one frontier node per list and costs O(N log k) for N total nodes. Add a counter for equal priorities with noncomparable payloads.",
      "Median uses a max-heap for the lower half (negate values) and min-heap for upper; sizes differ by at most one and every lower value ≤ every upper value. Insertion O(log n), median O(1)."
    ],
    "requiredDepth": "Top-k bounded heap; k-way frontier; two-heap balance; payload tie-breaker.",
    "transfer": "Expire old stream values while maintaining the median. Why are two ordinary heaps alone insufficient?",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "For largest k, the min-heap contains the largest k values seen so far."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use top-k, k-way merge or streaming medians. A heap is not fully sorted. Define k=0 and k>n behavior."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      },
      {
        "title": "Python heapq — priority queues",
        "url": "https://docs.python.org/3/library/heapq.html"
      }
    ]
  },
  {
    "id": "dsa-intervals",
    "track": "dsa",
    "title": "Intervals & greedy proofs",
    "intuition": "Sort by the boundary that makes one locally safe decision preserve a global solution.",
    "recognize": "Use overlap, scheduling or reachability; justify the greedy choice rather than recognizing a title.",
    "invariant": "For interval scheduling, chosen intervals are compatible and finish as early as possible.",
    "trace": [
      "[1,3],[2,4],[3,5] sorted by end",
      "Choose [1,3]; reject [2,4]",
      "Choose [3,5] if touching endpoints are allowed"
    ],
    "template": "chosen = []\nend = float('-inf')\nfor start, finish in sorted(intervals, key=lambda x: x[1]):\n    if start >= end:\n        chosen.append((start, finish))\n        end = finish\nreturn chosen",
    "prerequisites": [
      "dsa-sorting"
    ],
    "pitfalls": [
      "Closed versus half-open intervals changes overlap rules.",
      "Weighted scheduling is not solved by earliest finish alone.",
      "Sorting usually dominates the running time."
    ],
    "order": 12,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Merge closed intervals by start: start≤current end means overlap. Select compatible half-open intervals by earliest finish: start≥last end is allowed. Different objectives need different sorting keys.",
      "Exchange argument for scheduling: replacing an optimal first interval with the earliest-finishing one cannot reduce remaining room. Weighted intervals break this proof. Jump Game tracks farthest reachable; Gas Station resets after a negative segment only when total fuel is sufficient."
    ],
    "requiredDepth": "Boundary semantics; sort by start vs end; reachability; prove safe local choice; counterexample to wrong greedy.",
    "transfer": "Attach rewards to intervals. Find a counterexample to choosing the earliest finish for maximum reward.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "For interval scheduling, chosen intervals are compatible and finish as early as possible."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use overlap, scheduling or reachability; justify the greedy choice rather than recognizing a title. Closed versus half-open intervals changes overlap rules."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-graphs",
    "track": "dsa",
    "title": "Graph representation, BFS & DFS",
    "intuition": "Represent relationships explicitly, then visit each reachable state without repeating work.",
    "recognize": "BFS gives shortest edge count only for unweighted/equal-weight edges; DFS explores structure.",
    "invariant": "BFS queue holds discovered but unprocessed vertices; mark at discovery.",
    "trace": [
      "Edges A→B,A→C,B→D",
      "Queue[A] → visitA, queue[B,C]",
      "visitB, addD; distances B1,C1,D2"
    ],
    "template": "from collections import deque\ndist = {start: 0}\nqueue = deque([start])\nwhile queue:\n    u = queue.popleft()\n    for v in graph[u]:\n        if v not in dist:\n            dist[v] = dist[u] + 1\n            queue.append(v)",
    "prerequisites": [
      "dsa-trees",
      "dsa-stack-queue"
    ],
    "pitfalls": [
      "Choose graph representation and define V/E.",
      "Directed cycles need path colors or indegree logic.",
      "Disconnected graphs need an outer traversal."
    ],
    "order": 13,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Use adjacency lists for O(V+E) traversal and grid neighbors for implicit edges. Mark on enqueue, not dequeue, to avoid duplicate work. Multi-source BFS seeds all starting sources with distance0.",
      "Cloning uses old node→new node mapping before visiting neighbors, preserving cycles. Auxiliary traversal map is O(V); the copied output graph is O(V+E), not O(V)."
    ],
    "requiredDepth": "V/E representation; discovery-time marking; grid-to-graph; multi-source BFS; output copy costs.",
    "transfer": "Change equal-weight edges to unequal positive weights. Explain why FIFO discovery no longer settles shortest paths.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "BFS queue holds discovered but unprocessed vertices; mark at discovery."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "BFS gives shortest edge count only for unweighted/equal-weight edges; DFS explores structure. Choose graph representation and define V/E."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-topological",
    "title": "Directed graphs & topological order",
    "intuition": "A task becomes ready when all incoming dependencies have been discharged.",
    "recognize": "Use dependency ordering in a directed graph; it exists only when the graph is acyclic.",
    "invariant": "indegree[v] counts incoming edges from not-yet-removed vertices.",
    "trace": [
      "A→C, B→C: ready A,B",
      "Remove A: C still needs B",
      "Remove B: C becomes ready; order A,B,C"
    ],
    "template": "from collections import deque\nindegree = {u: 0 for u in graph}\nfor u in graph:\n    for v in graph[u]:\n        indegree[v] += 1\nready = deque(u for u in graph if indegree[u] == 0)\norder = []\nwhile ready:\n    u = ready.popleft()\n    order.append(u)\n    for v in graph[u]:\n        indegree[v] -= 1\n        if indegree[v] == 0:\n            ready.append(v)\nif len(order) != len(graph):\n    raise ValueError('directed cycle')",
    "pitfalls": [
      "Forgetting isolated vertices can make an incomplete ordering appear valid.",
      "If edges are deduplicated, increment indegrees only when an edge is newly inserted."
    ],
    "order": 14,
    "prerequisites": [
      "dsa-graphs"
    ],
    "depth": [
      "Graph must include isolated vertices and destination-only keys. O(V+E) time and O(V) auxiliary storage excluding adjacency.",
      "DFS alternative uses unseen/active/finished colors: only an edge into the active path proves a directed cycle. Alien words compare the first differing character; longer-before-prefix is invalid. Deduplicate edges consistently."
    ],
    "requiredDepth": "Indegree vs path-color DFS; cycle detection; multiple valid orders; invalid prefix constraints.",
    "transfer": "Return the lexicographically smallest valid order; replace FIFO readiness with an appropriate frontier.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "indegree[v] counts incoming edges from not-yet-removed vertices."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use dependency ordering in a directed graph; it exists only when the graph is acyclic. Graph must include isolated vertices and destination-only keys. O(V+E) time and O(V) auxiliary storage excluding adjacency."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-dsu",
    "track": "dsa",
    "title": "Disjoint sets & MST",
    "intuition": "Maintain a representative for each connected component and merge components cheaply.",
    "recognize": "Use incremental undirected connectivity and Kruskal; it does not give paths or handle arbitrary deletions.",
    "invariant": "Two vertices share a root exactly when processed edges connect them.",
    "trace": [
      "Start {A},{B},{C}",
      "Union A,B → {A,B},{C}",
      "Edge B,A finds same root → cycle"
    ],
    "template": "parent = list(range(n))\nsize = [1] * n\ndef find(x):\n    while parent[x] != x:\n        parent[x] = parent[parent[x]]\n        x = parent[x]\n    return x\ndef union(a, b):\n    a, b = find(a), find(b)\n    if a == b: return False\n    if size[a] < size[b]: a, b = b, a\n    parent[b] = a\n    size[a] += size[b]\n    return True",
    "prerequisites": [
      "dsa-graphs",
      "dsa-sorting"
    ],
    "pitfalls": [
      "Path compression plus union by size gives near-constant amortized operations.",
      "An MST also requires sorting edges and graph connectivity checks."
    ],
    "order": 15,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Kruskal sorts edges and accepts only edges joining different roots. Stop after V−1 successful merges; fewer means disconnected. Sorting O(E log E) dominates DSU O(E α(V)).",
      "A minimum spanning tree minimizes total connection cost, not distance from a chosen root. Complete point graphs have Θ(n²) edges; dense Prim can avoid storing them all."
    ],
    "requiredDepth": "Union by rank/size; path compression; amortized bounds; Kruskal vs shortest-path distinction.",
    "transfer": "Delete an edge after unions. Explain why ordinary DSU cannot split a component.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Two vertices share a root exactly when processed edges connect them."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use incremental undirected connectivity and Kruskal; it does not give paths or handle arbitrary deletions. Path compression plus union by size gives near-constant amortized operations."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-weighted-graphs",
    "track": "dsa",
    "title": "Weighted paths",
    "intuition": "Repeatedly settle the smallest known distance when nonnegative edges make it safe.",
    "recognize": "Dijkstra needs nonnegative weights; use other reasoning for negative edges.",
    "invariant": "A non-stale minimum popped distance is final under nonnegative weights.",
    "trace": [
      "A→B cost5, A→C cost1, C→B cost1",
      "Pop A0; candidates C1,B5",
      "Pop C1 → B2 replaces B5"
    ],
    "template": "import heapq\ndist = {start: 0}\npq = [(0, start)]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d != dist[u]: continue\n    for v, weight in graph[u]:\n        candidate = d + weight\n        if candidate < dist.get(v, float('inf')):\n            dist[v] = candidate\n            heapq.heappush(pq, (candidate, v))",
    "prerequisites": [
      "dsa-graphs",
      "dsa-heaps"
    ],
    "pitfalls": [
      "Skip stale heap entries.",
      "A shortest-path tree and minimum spanning tree optimize different things.",
      "State edge-weight assumptions explicitly."
    ],
    "order": 16,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Dijkstra must reject negative weights for its settling argument. Use (distance,counter,node) for arbitrary node objects; the compact template assumes mutually comparable node IDs. Skip stale distances when popping.",
      "With at most K stops, permit K+1 edges. Bellman-Ford layers read the previous distance array and write a copy; in-place updates can illegally traverse several edges in one layer. O((K+1)E) relaxations plus O((K+1)V) copying."
    ],
    "requiredDepth": "Dijkstra stale entries; relaxation; unreachable nodes; assumptions; bounded-edge Bellman-Ford extension.",
    "transfer": "Limit a route to K+1 edges. Show why a cheaper arrival using too many edges cannot dominate every state.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "A non-stale minimum popped distance is final under nonnegative weights."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Dijkstra needs nonnegative weights; use other reasoning for negative edges. Skip stale heap entries."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-tries",
    "track": "dsa",
    "title": "Tries & prefix indexes",
    "intuition": "Share common prefixes so walking characters locates a prefix directly.",
    "recognize": "Use prefix lookup or multiword search; an exact-match hash set is often simpler.",
    "invariant": "The node reached after i characters represents exactly that prefix.",
    "trace": [
      "Insert cat: c→a→t*",
      "Insert car: reuse c→a, branch r*",
      "Prefix ca exists; ca is not a stored word"
    ],
    "template": "root = {}\nEND = object()\nfor word in words:\n    node = root\n    for char in word:\n        node = node.setdefault(char, {})\n    node[END] = True",
    "prerequisites": [
      "dsa-hashing",
      "dsa-backtracking"
    ],
    "pitfalls": [
      "Separate terminal markers from children.",
      "Unicode/alphabet size affects space.",
      "Board search also needs visited-path restoration."
    ],
    "order": 17,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "Exact search must verify a terminal marker; a reachable prefix alone is not a complete word. Lookup takes O(L) expected dictionary operations for L characters; storage follows total distinct prefix nodes.",
      "Word Search II combines prefix pruning and path-local visited cells. Restore board/visited state after each branch; report each found word once. Worst-case search is still exponential in word length."
    ],
    "requiredDepth": "Terminal markers; shared prefixes; alphabet cost; trie/backtracking integration.",
    "transfer": "Store word frequencies and return the top three completions for a prefix. Describe added state and update costs.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "The node reached after i characters represents exactly that prefix."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use prefix lookup or multiword search; an exact-match hash set is often simpler. Separate terminal markers from children."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-dp",
    "track": "dsa",
    "title": "One-dimensional DP",
    "intuition": "Name the state before writing a recurrence. Reuse equivalent subproblems instead of recomputing them.",
    "recognize": "Use overlapping subproblems with optimal substructure or counting recurrences; compare brute force first.",
    "invariant": "Computed states equal their exact subproblem answers.",
    "trace": [
      "Rob values [2,7,9]",
      "After2: skip0/take2",
      "After7: best7; after9: best11"
    ],
    "template": "prev2 = prev1 = 0\nfor value in houses:\n    current = max(prev1, prev2 + value)\n    prev2, prev1 = prev1, current\nreturn prev1",
    "prerequisites": [
      "dsa-recursion",
      "dsa-prefix"
    ],
    "pitfalls": [
      "Define impossible states separately from zero.",
      "Loop direction distinguishes 0/1 from unbounded choices.",
      "Space optimization must preserve old states until read."
    ],
    "order": 18,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "State must say exactly what has been processed and what remains. For minimum coins initialize impossible sums to infinity and dp[0]=0. For max product keep both smallest and largest previous products, since a negative flips them.",
      "Word Break prefix DP with Python slices up to maximum length L can cost O(nL²) for copying/hashing. LIS quadratic predecessor DP teaches the recurrence; tails plus binary search reduces length-only computation to O(n log n)."
    ],
    "requiredDepth": "Recurrence/base states; forward/backward order; impossible values; rolling state; substring costs.",
    "transfer": "Reconstruct one increasing subsequence, not just its length. Explain why tails values alone are not enough.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Computed states equal their exact subproblem answers."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use overlapping subproblems with optimal substructure or counting recurrences; compare brute force first. Define impossible states separately from zero."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-knapsack",
    "title": "Resource DP: 0/1 vs unbounded",
    "intuition": "Capacity is a state dimension. Update order determines whether a choice can be reused.",
    "recognize": "Use bounded/unbounded resources or counting distinct selections; first decide whether order matters.",
    "invariant": "After processing a coin, ways[s] counts unordered combinations using processed coin types.",
    "trace": [
      "coins [1,2], amount3; ways[0]=1",
      "After1: [1,1,1,1]",
      "After2: [1,1,2,2]; amount3 has 1+1+1 and1+2"
    ],
    "template": "ways = [0] * (amount + 1)\nways[0] = 1\nfor coin in coins:\n    for total in range(coin, amount + 1):\n        ways[total] += ways[total - coin]\nreturn ways[amount]",
    "pitfalls": [
      "ways[0]=1 represents the empty combination; setting it to zero erases every count.",
      "An ascending update with a single-use item can count that same item repeatedly."
    ],
    "order": 19,
    "prerequisites": [
      "dsa-dp"
    ],
    "depth": [
      "Unlimited coins: ascending sums permit reuse. Single-use items: descend so the same item cannot feed itself. Amount-outer counting counts ordered sequences instead of combinations.",
      "For Target Sum use (index,running sum) or count subsets totaling (sum+target)/2 when parity and range permit. Zeros double the count. O(nS) is pseudopolynomial in sum S; integer arithmetic may grow with count size."
    ],
    "requiredDepth": "Reuse policy; ascending/descending capacity; combinations vs permutations; target offset.",
    "transfer": "Make each coin single-use. Change iteration direction and trace one example that exposes accidental reuse.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "After processing a coin, ways[s] counts unordered combinations using processed coin types."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use bounded/unbounded resources or counting distinct selections; first decide whether order matters. Unlimited coins: ascending sums permit reuse. Single-use items: descend so the same item cannot feed itself. Amount-outer counting counts ordered sequences instead of combinations."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-dp-2d",
    "track": "dsa",
    "title": "Grid & sequence DP",
    "intuition": "Use two coordinates when an answer depends on two positions or resources.",
    "recognize": "Use grids, subsequence matching and edit costs; distinguish substrings from subsequences.",
    "invariant": "dp[i][j] solves the first i and first j items, including empty prefixes.",
    "trace": [
      "LCS ab vs ac: empty row/column0",
      "a matches a → diagonal+1",
      "b differs c → max(top,left)=1"
    ],
    "template": "dp = [[0] * (len(b)+1) for _ in range(len(a)+1)]\nfor i, x in enumerate(a, 1):\n    for j, y in enumerate(b, 1):\n        dp[i][j] = (dp[i-1][j-1]+1 if x == y\n                    else max(dp[i-1][j], dp[i][j-1]))\nreturn dp[-1][-1]",
    "prerequisites": [
      "dsa-dp"
    ],
    "pitfalls": [
      "Avoid aliased rows from [[0]*m]*n.",
      "Reconstruction needs retained decisions or a second pass.",
      "Memory can sometimes shrink to one or two rows."
    ],
    "order": 20,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "For LCS, equal final characters use diagonal+1; otherwise skip one side. For edit distance choose insertion,left; deletion,top; replacement,diagonal, with empty-prefix costs.",
      "Rolling rows must keep the previous diagonal before overwriting. Grid obstacles reset ways to zero, including start/end. Reconstruction usually needs parent decisions or additional computation beyond a length-only table.",
      "LIS belongs to the sequence family but needs only one index: dp[i]=1+max(dp[j]) over j<i with a[j]<a[i]. The O(n log n) tails method stores the smallest possible tail for each length; tails is not necessarily an actual subsequence."
    ],
    "requiredDepth": "Two-coordinate states; empty prefixes; recurrence choices; rolling rows; path reconstruction.",
    "transfer": "Return an actual common subsequence with a deterministic tie policy, then discuss memory trade-offs.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "dp[i][j] solves the first i and first j items, including empty prefixes."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use grids, subsequence matching and edit costs; distinguish substrings from subsequences. Avoid aliased rows from [[0]*m]*n."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-palindromes",
    "title": "Palindrome methods",
    "intuition": "A palindrome grows only when its next pair of outer characters match.",
    "recognize": "Use contiguous palindrome count or longest substring. Subsequences are a different problem.",
    "invariant": "Characters between left+1 and right−1 already form a palindrome; each successful expansion adds one.",
    "trace": [
      "abba: center between b,b",
      "Match b,b → bb",
      "Expand a,a → abba; bounds stop the scan"
    ],
    "template": "count = 0\nfor center in range(len(s)):\n    for left, right in [(center, center), (center, center + 1)]:\n        while left >= 0 and right < len(s) and s[left] == s[right]:\n            count += 1\n            left -= 1\n            right += 1\nreturn count",
    "pitfalls": [
      "An odd-center-only scan misses even palindromes such as abba.",
      "Counting occurrences is not counting distinct string values."
    ],
    "order": 21,
    "prerequisites": [
      "dsa-two-pointers",
      "dsa-dp"
    ],
    "depth": [
      "Check both odd and even centers. Expansion is O(n²) worst-case time, O(1) auxiliary space; returning a sliced substring adds output space.",
      "Interval DP uses pal[i][j] = s[i]==s[j] and (j-i<2 or pal[i+1][j-1]); fill short intervals before long. O(n²) table space. Manacher is an optional O(n) extension, not needed for the core path."
    ],
    "requiredDepth": "Odd/even centers; expansion vs interval DP; output vs count; optional linear method discussion.",
    "transfer": "Count distinct palindrome values instead of occurrences. Show why center counts alone overcount.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "Characters between left+1 and right−1 already form a palindrome; each successful expansion adds one."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use contiguous palindrome count or longest substring. Subsequences are a different problem. Check both odd and even centers. Expansion is O(n²) worst-case time, O(1) auxiliary space; returning a sliced substring adds output space."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  },
  {
    "id": "dsa-bits",
    "track": "dsa",
    "title": "Bits & basic arithmetic",
    "intuition": "Treat an integer as independent binary positions and reason about the operation at each position.",
    "recognize": "Use masks, parity, subsets and compact flags; be explicit about signedness and word width.",
    "invariant": "x & (x−1) removes exactly the least significant set bit for positive x.",
    "trace": [
      "x=12: 1100",
      "x−1=11: 1011",
      "AND=1000; one set bit removed"
    ],
    "template": "count = 0\nwhile x > 0:\n    x &= x - 1\n    count += 1\nreturn count",
    "prerequisites": [
      "dsa-hashing"
    ],
    "pitfalls": [
      "Python integers have arbitrary precision; negative shifts/bitwise operations need care.",
      "Count bit length in complexity when it is not bounded."
    ],
    "order": 22,
    "source": "https://docs.python.org/3/library/collections.html",
    "depth": [
      "XOR cancels paired equal values, leaving the single odd-occurrence value only under the stated contract. For counts, bits[i]=bits[i>>1]+(i&1).",
      "Python integers are unbounded: bit operations cost by digit length when values grow. Negative integers need an explicit width/mask for fixed-word interpretations; x&(x−1) loops here are for nonnegative inputs."
    ],
    "requiredDepth": "XOR cancellation; least-significant-bit removal; counting recurrence; signed/arbitrary-precision caveats.",
    "transfer": "Let every repeated number appear three times. Explain why the paired XOR invariant fails.",
    "recall": [
      {
        "q": "What must remain true after each step?",
        "a": "x & (x−1) removes exactly the least significant set bit for positive x."
      },
      {
        "q": "When is this approach unsafe or unsuitable?",
        "a": "Use masks, parity, subsets and compact flags; be explicit about signedness and word width. Python integers have arbitrary precision; negative shifts/bitwise operations need care."
      },
      {
        "q": "Reconstruct the template from memory, then trace its smallest valid input.",
        "a": "Compare state, update order and termination against the template; syntax recall alone is insufficient."
      }
    ],
    "sources": [
      {
        "title": "MIT 6.006 lecture notes — algorithm foundations",
        "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-notes/"
      }
    ]
  }
];
