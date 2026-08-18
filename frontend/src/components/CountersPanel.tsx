import { useEffect, useState } from "react";

import {
  listCounters,
  createCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
  deleteCounter,
  type Counter,
  type Site,
} from "../api/client";

interface CountersPanelProps {
  site: Site;
}

export default function CountersPanel({ site }: CountersPanelProps) {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCounterName, setNewCounterName] = useState("");

  const fetchCounters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await listCounters(site.apiKey);
      setCounters(response.data);
    } catch (err) {
      setError("Error fetching counters");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounters();
  }, [site]);

  const handleCreateCounter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCounterName) return;

    try {
      setLoading(true);
      setError(null);
      await createCounter(site.apiKey, newCounterName);
      setNewCounterName("");
      fetchCounters();
    } catch (err) {
      setError("Error creating counter");
      console.log(err);
    }
  };

  const handleIncrement = async (name: string) => {
    try {
      await incrementCounter(site.apiKey, name);
      fetchCounters();
    } catch (err) {
      setError("Could not increment the counter");
      console.log(err);
    }
  };

  const handleDecrement = async (name: string) => {
    try {
      await decrementCounter(site.apiKey, name);
      fetchCounters();
    } catch (err) {
      setError("Could not decrement the counter");
      console.log(err);
    }
  };

  const handleReset = async (name: string) => {
    try {
      await resetCounter(site.apiKey, name);
      fetchCounters();
    } catch (err) {
      setError("Could not reset the counter");
      console.log(err);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteCounter(site.apiKey, name);
      fetchCounters();
    } catch (err) {
      setError("Could not delete the counter");
      console.log(err);
    }
  };

  if (loading) return <div className="text-[0.875rem] text-[#9c9689]">Loading counters...</div>;

  if (error)
    return (
      <div className="text-[0.875rem] text-[#d1495b] bg-[#fdf0f1] border border-[#f3d7db] rounded-md px-4 py-3">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCreateCounter} className="flex items-center gap-3">
        <input
          type="text"
          value={newCounterName}
          onChange={(e) => setNewCounterName(e.target.value)}
          placeholder="e.g. homepage-visits"
          className="max-w-xs"
        />
        <button type="submit">Create counter</button>
      </form>

      {counters.length === 0 ? (
        <p className="text-[0.875rem] text-[#9c9689]">No counters yet.</p>
      ) : (
        <ul>
          {counters.map((counter) => (
            <li key={counter._id} className="justify-between">
              <span className="font-medium text-[#1a1a1a]">
                {counter.name}
                <span className="ml-2 font-display tabular-nums text-[#6c63ff]">
                  {counter.value}
                </span>
              </span>

              <span className="flex gap-2">
                <button onClick={() => handleIncrement(counter.name)}>+1</button>
                <button onClick={() => handleDecrement(counter.name)}>-1</button>
                <button onClick={() => handleReset(counter.name)}>Reset</button>
                <button onClick={() => handleDelete(counter.name)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}