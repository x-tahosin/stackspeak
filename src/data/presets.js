export const ERROR_PRESETS = [
  {
    id: 'ts-optional-chain',
    language: 'TypeScript',
    title: "TypeError: Cannot read properties of undefined (reading 'name')",
    line: 42,
    astDepth: 3,
    nodesCount: 5,
    errorCode: `// userProfile.ts:40-44
export function renderUserProfile(user?: UserAccount) {
  // Line 42: crash occurs here when user is null or undefined
  return \`Welcome back, \${user.name}! Status: \${user.membershipTier}\`;
}`,
    rawError: `TypeError: Cannot read properties of undefined (reading 'name')
    at renderUserProfile (userProfile.ts:42:24)
    at AuthGuard (authGuard.ts:18:12)
    at processRequest (server.ts:104:9)
    at emit (events.js:514:28)`,
    astFlow: [
      {
        id: 'n1',
        type: 'Identifier',
        label: 'user',
        category: 'definition',
        desc: 'Defined in function signature as optional UserAccount',
        color: '#A855F7' // Purple
      },
      {
        id: 'n2',
        type: 'Member Access',
        label: 'user.name',
        category: 'access',
        desc: 'Direct dot access attempted without null check',
        color: '#38BDF8' // Cyan
      },
      {
        id: 'n3',
        type: 'Optional Chain',
        label: 'user?.name',
        category: 'check',
        desc: 'Guarded access safely returning undefined if missing',
        color: '#06B6D4' // Teal
      }
    ],
    branches: {
      safe: {
        label: 'Exists',
        action: 'Proceed',
        desc: 'No error, evaluates string',
        color: '#34D399'
      },
      error: {
        label: 'Missing',
        action: 'Potential Error',
        desc: 'Cannot read property of undefined',
        color: '#F87171'
      }
    },
    tip: 'Optional chaining (?.) prevents runtime errors when user is undefined or null.',
    rootCause: {
      headline: "The user object is evaluated as undefined at line 42.",
      why: "The function parameter allows an optional user (user?: UserAccount), but line 42 immediately attempts member access without verifying if the object was supplied.",
      evidence: [
        "Function signature: user?: UserAccount allows undefined",
        "Stack trace originates at userProfile.ts:42:24",
        "No fallback guard or nullish coalescing applied"
      ]
    },
    voice: {
      speaker: 'Marcus (Voice)',
      style: 'Calm • Encouraging • Precise',
      duration: '00:07',
      transcript: 'Marcus, line 42 is fine... just add a ?',
      subTranscript: 'Optional chaining makes this safe and concise.',
      fullExplanation: "Hey Marcus, line 42 is fine, don't worry about rewriting your auth handler. On line 40, user was declared as optional. When you call user.name directly, the JavaScript engine halts if the session hasn't loaded yet. Just drop a question mark before the dot: user optional-chain name. It keeps your code safe, concise, and running smoothly.",
      audioUrl: null
    },
    fix: {
      description: 'Add optional chaining and nullish coalescing fallback',
      before: `return \`Welcome back, \${user.name}! Status: \${user.membershipTier}\`;`,
      after: `return \`Welcome back, \${user?.name ?? 'Guest'}! Status: \${user?.membershipTier ?? 'Standard'}\`;`,
      diff: [
        { type: 'delete', text: "-  return `Welcome back, ${user.name}! Status: ${user.membershipTier}`;" },
        { type: 'add',    text: "+  return `Welcome back, ${user?.name ?? 'Guest'}! Status: ${user?.membershipTier ?? 'Standard'}`;" }
      ]
    }
  },
  {
    id: 'api-rate-limit',
    language: 'Node.js / Express',
    title: 'HTTP 429 Too Many Requests: Plan Order Quota Exceeded',
    line: 68,
    astDepth: 4,
    nodesCount: 6,
    errorCode: `// orderService.ts:65-72
export async function processOrder(userId: string, payload: OrderPayload) {
  const userPlan = await fetchUserPlan(userId);
  const ordersThisMonth = await countMonthlyOrders(userId);
  if (ordersThisMonth > userPlan.orderLimit) {
    throw new QuotaExceededError("Monthly plan threshold crossed");
  }
  return executeOrder(payload);
}`,
    rawError: `QuotaExceededError: Order count for user usr_8f3a7c in billing cycle May 2026 reached 103 (Limit: 100).
    at validateOrderPayload (orderService.ts:68:14)
    at POST /v1/orders (orderController.ts:24:9)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)`,
    astFlow: [
      {
        id: 'n1',
        type: 'Request Ingress',
        label: 'POST /v1/orders',
        category: 'definition',
        desc: 'Incoming checkout payload received',
        color: '#38BDF8'
      },
      {
        id: 'n2',
        type: 'Validation',
        label: 'validateOrderPayload()',
        category: 'access',
        desc: 'Payload schema verified',
        color: '#06B6D4'
      },
      {
        id: 'n3',
        type: 'State Evaluation',
        label: 'fetchUser(userId)',
        category: 'check',
        desc: 'Error origin: Plan threshold check (103/100 orders)',
        color: '#A855F7'
      },
      {
        id: 'n4',
        type: 'Decision Node',
        label: 'Plan Limit Exceeded',
        category: 'check',
        desc: 'ordersThisMonth > orderLimit evaluates to true',
        color: '#F87171'
      }
    ],
    branches: {
      safe: {
        label: 'Under Limit',
        action: 'Execute Order',
        desc: 'Dispatches fulfillment pipeline',
        color: '#34D399'
      },
      error: {
        label: 'Over Limit',
        action: '429 Rejected',
        desc: 'Throws unhandled QuotaExceededError',
        color: '#F87171'
      }
    },
    tip: 'Gracefully intercept quota exhaustion by returning a 402/429 JSON response with an upgrade payload.',
    rootCause: {
      headline: "The user's current plan limit for orders was exceeded.",
      why: "The request failed because the user had already placed 103 orders this month, surpassing their Starter tier plan limit of 100.",
      evidence: [
        "Order count for user usr_8f3a7c in billing cycle: 103",
        "Plan limit for Starter tier: 100 orders per month",
        "API returned raw 429 unhandled exception instead of guided UX"
      ]
    },
    voice: {
      speaker: 'Marcus (Voice)',
      style: 'Calm • Empathetic • Instructive',
      duration: '00:11',
      transcript: 'The user hit their plan ceiling. Return an upgrade prompt instead of a crash.',
      subTranscript: 'Graceful billing handling keeps customers happy.',
      fullExplanation: "Hi Marcus! Don't worry, your database connection is perfectly fine. The issue here is simply that user usr_8f3a7c hit their monthly limit of 100 orders on their Starter plan. Instead of throwing a raw 429 crash into your logs, we can catch this check and return a clean HTTP 402 with an instant upgrade link. Takes 30 seconds to patch!",
      audioUrl: null
    },
    fix: {
      description: 'Intercept quota threshold and return structured upgrade guidance',
      before: `if (ordersThisMonth > userPlan.orderLimit) {
  throw new QuotaExceededError("Monthly plan threshold crossed");
}`,
      after: `if (ordersThisMonth >= userPlan.orderLimit) {
  return res.status(402).json({
    code: 'QUOTA_EXCEEDED',
    message: 'Monthly order quota reached. Please upgrade to Pro tier.',
    upgradeUrl: '/billing/upgrade'
  });
}`,
      diff: [
        { type: 'delete', text: "-  if (ordersThisMonth > userPlan.orderLimit) {" },
        { type: 'delete', text: '-    throw new QuotaExceededError("Monthly plan threshold crossed");' },
        { type: 'delete', text: "-  }" },
        { type: 'add',    text: "+  if (ordersThisMonth >= userPlan.orderLimit) {" },
        { type: 'add',    text: "+    return res.status(402).json({ code: 'QUOTA_EXCEEDED', upgradeUrl: '/billing/upgrade' });" },
        { type: 'add',    text: "+  }" }
      ]
    }
  },
  {
    id: 'rust-borrow-checker',
    language: 'Rust',
    title: 'error[E0499]: cannot borrow `data` as mutable more than once at a time',
    line: 19,
    astDepth: 3,
    nodesCount: 5,
    errorCode: `// worker.rs:16-22
fn process_events(data: &mut Vec<Event>) {
    let first = &mut data[0]; // first mutable borrow occurs here
    data.push(Event::new());  // second mutable borrow occurs here!
    first.process();          // first borrow used later here
}`,
    rawError: `error[E0499]: cannot borrow \`*data\` as mutable more than once at a time
  --> src/worker.rs:19:5
   |
18 |     let first = &mut data[0];
   |                 ---- first mutable borrow occurs here
19 |     data.push(Event::new());
   |     ^^^^ second mutable borrow occurs here
20 |     first.process();
   |     ----- first borrow later used here`,
    astFlow: [
      {
        id: 'n1',
        type: 'Borrow',
        label: '&mut data[0]',
        category: 'definition',
        desc: 'First mutable borrow locks the vector memory buffer',
        color: '#A855F7'
      },
      {
        id: 'n2',
        type: 'Mutation',
        label: 'data.push(...)',
        category: 'access',
        desc: 'Push may reallocate heap memory, invalidating pointer',
        color: '#F87171'
      },
      {
        id: 'n3',
        type: 'Disjoint Scope',
        label: 'Scope Separation',
        category: 'check',
        desc: 'Process first item before pushing new items',
        color: '#34D399'
      }
    ],
    branches: {
      safe: {
        label: 'Drop Borrow',
        action: 'Safe Mutation',
        desc: 'Reallocation is memory safe',
        color: '#34D399'
      },
      error: {
        label: 'Overlap',
        action: 'Dangling Pointer',
        desc: 'Rust memory safety violation',
        color: '#F87171'
      }
    },
    tip: 'Finish manipulating your borrowed element or clone the index before calling push on the vector.',
    rootCause: {
      headline: "Two concurrent mutable references to the same vector memory buffer.",
      why: "Calling data.push() can reallocate the vector in heap memory. If that happens, the first reference would point to freed memory, causing a use-after-free vulnerability.",
      evidence: [
        "First mutable borrow at line 18: let first = &mut data[0]",
        "Second mutable borrow at line 19: data.push(Event::new())",
        "Borrow used at line 20: first.process()"
      ]
    },
    voice: {
      speaker: 'Marcus (Voice)',
      style: 'Calm • Reassuring',
      duration: '00:09',
      transcript: 'The borrow checker is your safety belt, not an enemy.',
      subTranscript: 'Process the first item before appending to the list.',
      fullExplanation: "Hey Marcus, take a breath. The borrow checker is protecting you here, not fighting you. When you call data.push, Rust might move your entire vector to a new memory address. If 'first' was still holding on, it would crash. Just process 'first' or swap the order before pushing. Let's apply the one-line fix.",
      audioUrl: null
    },
    fix: {
      description: 'Process the borrowed element before mutating the parent vector',
      before: `let first = &mut data[0];
data.push(Event::new());
first.process();`,
      after: `// Process the first element before modifying vector memory
data[0].process();
data.push(Event::new());`,
      diff: [
        { type: 'delete', text: "-    let first = &mut data[0];" },
        { type: 'delete', text: "-    data.push(Event::new());" },
        { type: 'delete', text: "-    first.process();" },
        { type: 'add',    text: "+    data[0].process();" },
        { type: 'add',    text: "+    data.push(Event::new());" }
      ]
    }
  },
  {
    id: 'react-hydration-mismatch',
    language: 'React 19',
    title: 'Hydration failed because the server-rendered HTML did not match client',
    line: 14,
    astDepth: 3,
    nodesCount: 5,
    errorCode: `// ClockHeader.jsx:12-16
export function ClockHeader() {
  // Line 14: Server renders UTC or blank, client renders local time
  return <div className="time">Current: {new Date().toLocaleTimeString()}</div>;
}`,
    rawError: `Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching text node for "10:38:15 AM", but got "4:38:15 AM" on the client.
    at ClockHeader (ClockHeader.jsx:14:10)
    at Header (Header.jsx:22:5)
    at RootLayout (layout.jsx:8:1)`,
    astFlow: [
      {
        id: 'n1',
        type: 'Server Render',
        label: 'SSR HTML Stream',
        category: 'definition',
        desc: 'Server renders in UTC timezone at build/request time',
        color: '#38BDF8'
      },
      {
        id: 'n2',
        type: 'Client Hydration',
        label: 'toLocaleTimeString()',
        category: 'access',
        desc: 'Client evaluates in local user timezone during mount',
        color: '#F87171'
      },
      {
        id: 'n3',
        type: 'Mounted Guard',
        label: 'useEffect / hasMounted',
        category: 'check',
        desc: 'De-couples client time calculation from initial SSR DOM',
        color: '#34D399'
      }
    ],
    branches: {
      safe: {
        label: 'Mounted',
        action: 'Render Local Time',
        desc: 'Consistent hydration, zero mismatch',
        color: '#34D399'
      },
      error: {
        label: 'Unmounted',
        action: 'Fallback Placeholder',
        desc: 'Matches exact server HTML token',
        color: '#FBBF24'
      }
    },
    tip: 'Defer browser-specific dynamic values like timestamps and localStorage until after component mounts.',
    rootCause: {
      headline: "Dynamic client-side time calculation inside server-rendered tree.",
      why: "The server generates HTML using its own clock and timezone, while the client's browser generates HTML using the user's local clock, producing mismatched DOM text nodes during hydration.",
      evidence: [
        "Server HTML timestamp differs from client browser timestamp",
        "Direct call to new Date().toLocaleTimeString() in component body",
        "React 19 hydration recovery forced expensive full re-render"
      ]
    },
    voice: {
      speaker: 'Marcus (Voice)',
      style: 'Calm • Supportive',
      duration: '00:08',
      transcript: 'Hydration mismatches look scary, but it is just a clock sync.',
      subTranscript: 'Wait for the component to mount before reading local time.',
      fullExplanation: "Hey Marcus, hydration errors look like a huge wall of red text, but the fix is super clean. The server rendered this page in UTC, but your browser tried to display your local time. React spotted the difference and complained. All we do is wait for useEffect to mount before displaying the local clock. Let's hot-patch it.",
      audioUrl: null
    },
    fix: {
      description: 'Guard client time calculation with hasMounted flag',
      before: `return <div className="time">Current: {new Date().toLocaleTimeString()}</div>;`,
      after: `const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
return <div className="time">Current: {mounted ? new Date().toLocaleTimeString() : '--:--'}</div>;`,
      diff: [
        { type: 'delete', text: "-  return <div className=\"time\">Current: {new Date().toLocaleTimeString()}</div>;" },
        { type: 'add',    text: "+  const [mounted, setMounted] = useState(false);" },
        { type: 'add',    text: "+  useEffect(() => setMounted(true), []);" },
        { type: 'add',    text: "+  return <div className=\"time\">Current: {mounted ? new Date().toLocaleTimeString() : '--:--'}</div>;" }
      ]
    }
  }
];
