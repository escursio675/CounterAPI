import { useState } from "react";

interface AdminKeyInputProps {
    onSubmit: (key: string) => void;
}

export default function AdminKeyInput({ onSubmit }: AdminKeyInputProps) {

    const [key, setKey] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        onSubmit(key)
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>

                <input type="password"
                value={key}
                onChange={(e) =>setKey(e.target.value)}
                placeholder="Enter Admin Key"
                className="border-2 rounded-md m-2"
                />

                <button type="submit"
                className="bg-[#a3a3a3] rounded-md p-2 text-black"
                >Connect</button>

            </form>
        </div>
    )

};