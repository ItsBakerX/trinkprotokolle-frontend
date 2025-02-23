import { useParams } from "react-router-dom"
import { Protokoll } from "./Protokoll";
import { ProtokollNew } from "./ProtokollNew";

export function PageProtokollNew() {
    return (
        <div>
            <ProtokollNew/>
        </div>
    )
}