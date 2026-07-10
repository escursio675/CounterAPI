import { useEffect, useState } from "react";

import { listCounters,
    createCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    deleteCounter,
    type Counter,
    type Site
 } from "../api/client";


interface CountersPanelProps {
    site: Site;
}

export default function CountersPanel({ site }: CountersPanelProps) {

    const [counters, setCounters] = useState<Counter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>("");
    const [newCounterName, setNewCounterName] = useState("")  ;


    const fetchCounters = async() =>{
        try{
            setLoading(true);
            setError(null);
            const response = await listCounters(site.apiKey);
            setCounters(response.data);
        }
        catch(err){
            setError("Error fetching Counters");
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchCounters();
    }, [site]);

    const handleCreateCounter = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newCounterName)
            return;

        try{
            setLoading(true);
            setError(null);

            await createCounter(site.apiKey, newCounterName);
            setNewCounterName("");
            fetchCounters();
        }
        catch(err){
            setError("Error in creating Counter");
            console.log(err);
        }
    };

    const handleIncrement = async(name: string) => {
        try{
            await incrementCounter(site.apiKey, name);
            fetchCounters();
        }
        catch(err){
            setError("Could not increment the counter");
            console.log(err);
        }
    };

    const handleDecrement = async(name: string) => {
        try{
            await decrementCounter(site.apiKey, name);
            fetchCounters();
        }
        catch(err){
            setError("Could not decrement the counter");
            console.log(err);
        }
    };

    const handleReset = async(name: string) =>{
        try{
            await resetCounter(site.apiKey, name);
            fetchCounters();
        }
        catch(err){
            setError("Could not reset the counter");
            console.log(err);
        }
    };

    const handleDelete = async(name: string) => {
        try{
            await deleteCounter(site.apiKey, name);
            fetchCounters();
        }
        catch(err){
            setError("Could not delete the counter");
            console.log(err);
        }
    };

    if(loading)
        return <div>Loading...</div>
    
    if(error)
        return <div>Error: {error}</div>

    return(
        <div>
            
            <h2>Counters for {site.name}</h2>

            <form onSubmit={handleCreateCounter}>

                <input type="text"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="eg, homepage-visits"
                />

                <button type="submit">Create Counter</button>

            </form>


            <ul>
                {
                    counters.map((counter) =>(
                        <li key={counter._id}>
                            {counter.name}: {counter.value}

                            <button onClick={() => handleIncrement}>+1</button>
                            <button onClick={() => handleDecrement}>-1</button>
                            <button onClick={() => handleReset}>Reset</button>
                            <button onClick={() => handleDelete}>Delete</button>
                            
                        </li>
                    ))
                }
            </ul>

        </div>
    )

}