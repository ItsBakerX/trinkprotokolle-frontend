import { useParams } from "react-router-dom"
import { Protokoll } from "./Protokoll";
import { ProtokollEdit } from "./ProtokollEdit";

export function PageProtokollEdit() {
    return (
        <div>
            <ProtokollEdit/>
        </div>
    )
}