import { useState } from "react";

import AdminKeyInput from "./components/AdminKeyInput";
import SitesList from "./components/SitesList";
import CountersPanel from "./components/CountersPanel";
import type { Site } from "./api/client";

export default function App(){

    const [adminKey, setAdminKey] = useState("");
    const [selectedSite, setSelectedSite] = useState<Site | null>(null);

    return(
        <div className="flex flex-col items-center justify-center">
            {(!adminKey)? (
                <AdminKeyInput onSubmit={(key) =>setAdminKey(key)} />
            ): (
                <div>

                <SitesList adminKey={adminKey} onSelectSite={(site) => setSelectedSite(site)} />

                </div>
            )
            }

            {selectedSite && (
                <div className="mt-30">
                    Selected: {selectedSite.name}
                    <CountersPanel site = {selectedSite} />
                </div>
            )

            }


        </div>
    )
}