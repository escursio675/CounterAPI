import { useState } from "react";

interface AdminKeyInputProps {
  onSubmit: (key: string) => void;
}

export default function AdminKeyInput({ onSubmit }: AdminKeyInputProps) {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(key);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter admin key"
      />

      <button type="submit">Connect</button>
    </form>
  );
}