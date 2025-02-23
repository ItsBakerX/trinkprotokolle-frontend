import { useParams } from "react-router-dom"
import { Eintrag } from "./Eintrag";

export function PageEintrag() {
    const { eintragId } = useParams();
    return (
        <div>
            <h2>Bearbeite Eintrag {eintragId}</h2>
                <Eintrag />
        </div >
    )
}