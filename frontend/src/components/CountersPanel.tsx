import { use, useEffect, useState } from "react";

import { listCounters,
    getCounter,
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

    const handleCreateCounter = async(e: React.FormEvent<HTMLFormElement>){
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

}