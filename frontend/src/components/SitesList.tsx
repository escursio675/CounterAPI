import { useState, useEffect } from "react";

import { listSites, createSite, type Site } from "../api/client";

interface SitesListProps{
    adminKey: string;
    onSelectSite: (site: Site) => void;
}

export default function SitesList({ adminKey, onSelectSite }: SitesListProps){
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newSiteName, setNewSiteName] = useState("");

    const fetchSites = async() =>{
        try{
            setLoading(true);
            setError(null);

            const response = await listSites(adminKey);
            setSites(response.data);
        }
        catch(err){
            setError("Sites fetch failed - check your admind key");
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchSites();
    }, [adminKey]);

    const handleCreateSites = async(e: React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
        if(!newSiteName) return;

        try{
            await createSite(adminKey, newSiteName);
            setNewSiteName("");
            fetchSites();
        }
        catch(err){
            setError("Failed to create site");
            console.log(err);
        }

    };

    if(loading)
        return <div>Loading...</div>

    if(error)
        return <div>Error: {error}</div>


    return(
        <div>
            <h2>Your Sites</h2>

            <form onSubmit={ handleCreateSites }>

                <input type="text"
                value={newSiteName}
                placeholder="Your new Site Name"
                onChange={(e) => setNewSiteName(e.target.value)}
                />

                <button type="submit">Create Site</button>

            </form>

            <ul>
                {sites.map((site) =>(
                    <li key={site._id}>
                        {site.name}
                        <button onClick={() => onSelectSite(site)}>Manage Counters</button>
                    </li>
                ))}

            </ul>
        </div>
    )

}