// app/docs/carts/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/carts", description: "Get all carts",
    params: [
      { name: "limit", type: "number", required: false, description: "Items per page (default: 20)" },
      { name: "skip",  type: "number", required: false, description: "Items to skip" },
      { name: "delay", type: "number", required: false, description: "Simulate latency in ms" },
    ],
    code: `const res = await fetch('https://dumdata.vercel.app/api/carts');
const data = await res.json();
// { carts: [...], total: 20, skip: 0, limit: 20 }`,
  },
  {
    method: "GET", path: "/carts/:id", description: "Get single cart",
    params: [{ name: "id", type: "number", required: true, description: "Cart ID (1–20)" }],
    code: `const res = await fetch('https://dumdata.vercel.app/api/carts/1');
const cart = await res.json();
// { id: 1, products: [...], total: 1216, discountedTotal: 1080, userId: 45 }`,
  },
  {
    method: "GET", path: "/users/:id/carts", description: "Get carts by user",
    params: [{ name: "id", type: "number", required: true, description: "User ID" }],
    code: `const res = await fetch('https://dumdata.vercel.app/api/users/5/carts');
const data = await res.json();`,
  },
  {
    method: "POST", path: "/carts", description: "Add a new cart",
    params: [],
    code: `const res = await fetch('https://dumdata.vercel.app/api/carts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    products: [
      { id: 1, quantity: 2 },
      { id: 5, quantity: 1 },
    ],
  }),
});
const data = await res.json();`,
  },
  {
    method: "PATCH", path: "/carts/:id", description: "Update a cart",
    params: [{ name: "id", type: "number", required: true, description: "Cart ID" }],
    code: `const res = await fetch('https://dumdata.vercel.app/api/carts/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ products: [{ id: 1, quantity: 5 }] }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/carts/:id", description: "Delete a cart",
    params: [{ name: "id", type: "number", required: true, description: "Cart ID" }],
    code: `const res = await fetch('https://dumdata.vercel.app/api/carts/1', { method: 'DELETE' });
const data = await res.json();`,
  },
];

// Yeh list ENDPOINTS ke order mein hi honi chahiye
const ON_THIS_PAGE = ["Get all carts", "Get single cart", "By user", "Add cart", "Update cart", "Delete cart"];

// OnThisPage ke link jaisa hi id banata hai
const slug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export default function CartsDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-4 sm:px-8 py-8 sm:py-10 max-w-[860px]">
        <DocsPageHeader
          breadcrumb="Carts"
          title="Carts"
          description="20 fake shopping carts with products, quantities, totals and user associations. Supports filter by user and full CRUD."
        />

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
      </div>

      <OnThisPage items={ON_THIS_PAGE} />
    </div>
  );
}