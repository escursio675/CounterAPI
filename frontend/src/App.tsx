import { useState } from "react";

import AdminKeyInput from "./components/AdminKeyInput";
import SitesList from "./components/SitesList";
import CountersPanel from "./components/CountersPanel";
import type { Site } from "./api/client";

const NAV_LINKS = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#quickstart", label: "Quickstart" },
  { href: "#api", label: "API Reference" },
];

export default function App() {
  const [adminKey, setAdminKey] = useState("");
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#2b2b2b] font-sans antialiased">
      {/* Top nav */}
      <header className="sticky top-0 z-10 border-b border-[#ece8e1] bg-[#fbfaf8]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#dashboard" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6c63ff]" />
            <span className="font-display text-[1.05rem] tracking-tight text-[#1a1a1a]">
              Counter<span className="text-[#6c63ff]">API</span>
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-7 text-[0.875rem] text-[#5c5c5c]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#1a1a1a] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Dashboard */}
      <section id="dashboard" className="max-w-5xl mx-auto px-6 pt-16 pb-16">
        <h1 className="font-display text-[1.9rem] text-[#1a1a1a] mb-2">
          Dashboard
        </h1>
        <p className="text-[#5c5c5c] mb-10 max-w-2xl">
          Sign in with your admin key to manage sites and counters directly.
        </p>

        {!adminKey ? (
          <div className="max-w-sm">
            <AdminKeyInput onSubmit={(key) => setAdminKey(key)} />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <p className="text-[0.75rem] font-medium uppercase tracking-widest text-[#9c9689]">
                Sites
              </p>
              <button
                onClick={() => {
                  setAdminKey("");
                  setSelectedSite(null);
                }}
                className="text-[0.8rem] text-[#9c9689] hover:text-[#1a1a1a] transition-colors"
              >
                Sign out
              </button>
            </div>

            <SitesList
              adminKey={adminKey}
              onSelectSite={(site) => setSelectedSite(site)}
            />

            {selectedSite && (
              <div className="border-t border-[#ece8e1] pt-10">
                <p className="text-[0.75rem] font-medium uppercase tracking-widest text-[#9c9689] mb-4">
                  {selectedSite.name} / Counters
                </p>
                <CountersPanel site={selectedSite} />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Quickstart */}
      <section
        id="quickstart"
        className="border-t border-[#ece8e1] bg-white/60"
      >
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-display text-[1.75rem] text-[#1a1a1a] mb-2">
            Quickstart
          </h2>
          <p className="text-[#5c5c5c] mb-10 max-w-2xl">
            Three steps: register a site, create a counter, increment it from
            your own code.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            <DocStep
              index="01"
              title="Create a site"
              body="From the dashboard, sign in with your admin key and add a site. You'll get back a unique API key for it."
            />
            <DocStep
              index="02"
              title="Create a counter"
              body="Counters belong to a site and start at zero. Name them lowercase and hyphen-separated, e.g. page-views."
            />
            <DocStep
              index="03"
              title="Increment it"
              body="Call the increment endpoint from your site's code, using that site's API key."
            />
          </div>

          <pre className="mt-10 rounded-lg bg-[#1a1a1a] text-[#e8e6f5] text-[0.8rem] leading-relaxed p-5 overflow-x-auto">
{`await fetch(\`\${API_BASE}/api/counters/page-views/increment\`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": SITE_API_KEY,
  },
  body: JSON.stringify({ by: 1 }),
});`}
          </pre>
        </div>
      </section>

      {/* API reference */}
      <section id="api" className="border-t border-[#ece8e1]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-display text-[1.75rem] text-[#1a1a1a] mb-2">
            API reference
          </h2>
          <p className="text-[#5c5c5c] mb-10 max-w-2xl">
            All routes return JSON. Site routes need{" "}
            <code className="text-[0.85em] px-1 py-0.5 rounded bg-[#f0eefe] text-[#6c63ff]">
              x-admin-key
            </code>
            ; counter routes need{" "}
            <code className="text-[0.85em] px-1 py-0.5 rounded bg-[#f0eefe] text-[#6c63ff]">
              x-api-key
            </code>
            .
          </p>

          <ApiTable
            title="Sites"
            rows={[
              ["POST", "/api/sites", "Create a site, returns its apiKey"],
              ["GET", "/api/sites", "List all sites"],
              ["PATCH", "/api/sites/:id/rotate-key", "Regenerate a site's apiKey"],
              ["DELETE", "/api/sites/:id", "Delete a site and its counters"],
            ]}
          />

          <ApiTable
            title="Counters"
            rows={[
              ["GET", "/api/counters", "List counters for this site"],
              ["POST", "/api/counters", "Create a counter"],
              ["GET", "/api/counters/:name", "Get one counter"],
              ["PATCH", "/api/counters/:name/increment", "Increment (body: { by? })"],
              ["PATCH", "/api/counters/:name/decrement", "Decrement (body: { by? })"],
              ["PATCH", "/api/counters/:name/reset", "Set value to 0"],
              ["DELETE", "/api/counters/:name", "Delete a counter"],
            ]}
          />

          <div className="mt-8 rounded-lg border border-[#ece8e1] bg-[#fbfaf8] px-5 py-4 text-[0.875rem] text-[#5c5c5c] leading-relaxed">
            <strong className="text-[#1a1a1a]">A note on key exposure —</strong>{" "}
            if you're calling the API from a static site, your{" "}
            <code className="text-[0.85em]">x-api-key</code> will be visible
            in the shipped JS regardless of where it's stored. Each key is
            scoped to one site's counters only, and requests are rate
            limited — a reasonable tradeoff for simple counters. Proxy
            through your own server if you need a real secret.
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ece8e1] py-8">
        <div className="max-w-5xl mx-auto px-6 text-[0.8rem] text-[#9c9689]">
          CounterAPI &middot; self-hosted &middot; MERN stack
        </div>
      </footer>
    </div>
  );
}

function DocStep({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="text-[0.75rem] font-medium text-[#6c63ff]">
        {index}
      </span>
      <h3 className="font-display text-[1.05rem] text-[#1a1a1a] mt-1 mb-1.5">
        {title}
      </h3>
      <p className="text-[0.875rem] text-[#5c5c5c] leading-relaxed">{body}</p>
    </div>
  );
}

function ApiTable({
  title,
  rows,
}: {
  title: string;
  rows: [string, string, string][];
}) {
  return (
    <div className="mb-10">
      <h3 className="font-display text-[1.05rem] text-[#1a1a1a] mb-3">
        {title}
      </h3>
      <div className="rounded-lg border border-[#ece8e1] overflow-hidden">
        <table className="w-full text-[0.8rem] border-collapse">
          <tbody>
            {rows.map(([method, path, desc], i) => (
              <tr
                key={`${method}-${path}`}
                className={i !== rows.length - 1 ? "border-b border-[#ece8e1]" : ""}
              >
                <td className="px-4 py-2.5 w-20">
                  <span
                    className={
                      "font-medium " +
                      (method === "GET"
                        ? "text-[#2a9d5c]"
                        : method === "POST"
                        ? "text-[#6c63ff]"
                        : method === "DELETE"
                        ? "text-[#d1495b]"
                        : "text-[#c9862a]")
                    }
                  >
                    {method}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-[0.78rem] text-[#3a3a3a] whitespace-nowrap">
                  {path}
                </td>
                <td className="px-4 py-2.5 text-[#5c5c5c]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}