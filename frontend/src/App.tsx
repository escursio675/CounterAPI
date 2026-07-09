import { useState } from "react";

import AdminKeyInput from "./components/AdminKeyInput";

export default function App(){

    const [adminKey, setAdminKey] = useState("");

    return(
        <div>
            {(!adminKey)? (
                <AdminKeyInput onSubmit={(key) =>setAdminKey(key)} />
            ): (
                <div>
                Admin Key Successfully Set
                </div>
            )
            }
        </div>
    )
}