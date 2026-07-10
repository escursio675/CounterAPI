import { useState } from "react";

import AdminKeyInput from "./components/AdminKeyInput";
import SitesList from "./components/SitesList";
import type { Site } from "./api/client";

export default function App(){

    const [adminKey, setAdminKey] = useState("");
    const [selectedSite, setSelectedSites] = useState<Site | null>(null);

    return(
        <div>
            {(!adminKey)? (
                <AdminKeyInput onSubmit={(key) =>setAdminKey(key)} />
            ): (
                <div>

                Admin Key Successfully Set

                <SitesList adminKey={adminKey} onSelectSite={(site) => setSelectedSites(site)} />

                </div>
            )
            }

            {selectedSite && (
                <div>
                    Selected: {selectedSite.name}
                    Counter Panel
                </div>
            )

            }


        </div>
    )
}