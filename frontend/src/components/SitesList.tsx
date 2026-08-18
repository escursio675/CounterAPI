import { useState, useEffect } from "react";

import { listSites, createSite, type Site } from "../api/client";

interface SitesListProps {
  adminKey: string;
  onSelectSite: (site: Site) => void;
}

export default function SitesList({ adminKey, onSelectSite }: SitesListProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSiteName, setNewSiteName] = useState("");

  const fetchSites = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listSites(adminKey);
      setSites(response.data);
    } catch (err) {
      setError("Sites fetch failed - check your admin key");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, [adminKey]);

  const handleCreateSites = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newSiteName) return;

    try {
      await createSite(adminKey, newSiteName);
      setNewSiteName("");
      fetchSites();
    } catch (err) {
      setError("Failed to create site");
      console.log(err);
    }
  };

  if (loading) return <div className="text-[0.875rem] text-[#9c9689]">Loading sites...</div>;

  if (error)
    return (
      <div className="text-[0.875rem] text-[#d1495b] bg-[#fdf0f1] border border-[#f3d7db] rounded-md px-4 py-3">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCreateSites} className="flex items-center gap-3">
        <input
          type="text"
          value={newSiteName}
          placeholder="New site name"
          onChange={(e) => setNewSiteName(e.target.value)}
          className="max-w-xs"
        />
        <button type="submit">Create site</button>
      </form>

      {sites.length === 0 ? (
        <p className="text-[0.875rem] text-[#9c9689]">No sites yet.</p>
      ) : (
        <ul>
          {sites.map((site) => (
            <li key={site._id} className="justify-between">
              <span className="flex flex-col gap-1">
                <span className="font-medium text-[#1a1a1a]">{site.name}</span>
                <code className="text-[0.75rem] px-1.5 py-0.5 rounded bg-[#f0eefe] text-[#6c63ff] w-fit">
                  {site.apiKey}
                </code>
              </span>
              <button onClick={() => onSelectSite(site)}>Manage counters</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}