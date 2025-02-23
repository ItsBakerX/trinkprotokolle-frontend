import { useEffect, useState } from "react";

import { ProtokollResource } from "../Resources";
import { getAlleProtokolle } from "../backend/api";
import { LoadingIndicator } from "./LoadingIndicator";
import { ProtokollDescription } from "./ProtokollDescription";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { LoginContext, LoginInfo, useLoginContext } from "./LoginContext";



//Siehe Folie 307
export function AlleProtokolle() {
    // [] ist Ausgangswert um undefined Werte zu verhindern
    const [protokolle, setProtokolle] = useState<ProtokollResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showBoundary } = useErrorBoundary();
    const { loginInfo } = useLoginContext();


    async function load() {
        try {
            const protokolle = await getAlleProtokolle();
            setProtokolle(protokolle);

            // damit ich das Word "Loading ..." sehen kann :)
            setIsLoading(false);

        } catch (err) {
            showBoundary(err)
        }
    }

    useEffect(() => {
        
        load();
    }, [loginInfo]);

    if (isLoading) {
        return <LoadingIndicator></LoadingIndicator>
    } else {
        return (

            <ol>

                {
                    protokolle.map((protokoll) => (
                        // key in li um sicherzustellen, dass jeder li ein einziges key Attribut hat
                        <li key={protokoll.id}><ProtokollDescription protokoll={protokoll} /> </li>
                    ))
                }
            </ol>
        )
    }
}