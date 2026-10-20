// app/docs/auth-login/page.tsx
import { CodeBlock, DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";
import { colors } from "@/constants/colors";

const ENDPOINTS: Endpoint[] = [
  {
    method: "POST", path: "/auth/login", description: "Login and get JWT tokens",
    params: [],
    code: `const res = await fetch('https://dumdata.vercel.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 60,  // optional, default 60
  }),
});
const data = await res.json();
// {
//   id: 1, username: "emilys", email: "...", role: "admin",
//   accessToken: "eyJ...",
//   refreshToken: "eyJ...",
// }`,
  },
  {
    method: "GET", path: "/auth/me", description: "Get current authenticated user",
    params: [],
    code: `const res = await fetch('https://dumdata.vercel.app/api/auth/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  },
});
const user = await res.json();
// { id: 1, username: "emilys", email: "...", role: "admin", ... }`,
  },
  {
    method: "POST", path: "/auth/refresh", description: "Refresh access token",
    params: [],
    code: `const res = await fetch('https://dumdata.vercel.app/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refreshToken: 'YOUR_REFRESH_TOKEN',
    expiresInMins: 60,
  }),
});
const data = await res.json();
// { accessToken: "eyJ...", refreshToken: "eyJ..." }`,
  },
];

const CODE_TOKEN = `// 1. Login
const { accessToken } = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
}).then(r => r.json());

// 2. Use token in subsequent requests
const user = await fetch('/api/auth/me', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` },
}).then(r => r.json());`;

// Yeh list ke pehle 3 naam ENDPOINTS ke order mein hone chahiye
const ON_THIS_PAGE = ["Login", "Get current user", "Refresh token", "Using the token"];

// OnThisPage ke link jaisa hi id banata hai
const slug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export default function AuthDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-8 py-10 max-w-[860px]">
        <DocsPageHeader
          breadcrumb="Auth / Login"
          title="Auth / Login"
          description="Authenticate users and receive JWT access and refresh tokens. Use the access token in the Authorization header to access protected endpoints."
        />

        {/* Info box */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ background: colors.primaryLight, border: `1px solid ${colors.border}` }}
        >
          <p className="text-[16px] leading-relaxed" style={{ color: colors.black }}>
            <span className="font-semibold" style={{ color: colors.primary }}>Note:</span>{" "}
            DumData auth is simulated. Any username/password combination will work and return a valid-looking JWT token. The token is not cryptographically verified on the server.
          </p>
        </div>

        <SectionTitle title="Endpoints" />

        {ENDPOINTS.map((ep, i) => (
          <div
            key={`${ep.method}-${ep.path}`}
            id={slug(ON_THIS_PAGE[i])}
            className="scroll-mt-[140px]"
          >
            <EndpointCard endpoint={ep} />
          </div>
        ))}

        {/* Using token section */}
        <div id={slug("Using the token")} className="scroll-mt-[140px]">
          <SectionTitle title="Using the Token" />
          <CodeBlock code={CODE_TOKEN} />
        </div>
      </div>

      <OnThisPage items={ON_THIS_PAGE} />
    </div>
  );
}