import { Link } from "react-router-dom";
import { ProtokollResource } from "../Resources";
import { Accordion, Button } from "react-bootstrap";

type Props = {
    protokoll: ProtokollResource;
}
// https://react-bootstrap.github.io/docs/components/accordion/
export function ProtokollDescription({ protokoll }: Props) {


    return (
        <div className="accordionAlleProtokolle">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                
                <Accordion.Header>Protokoll für {protokoll.patient}</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <p>Datum: {protokoll.datum}</p>
                        <p>Public: {protokoll.public ? "yes" : "no"}</p>
                        <p>Closed: {protokoll.closed ? "yes" : "no"}</p>
                        <p>ErstellerName: {protokoll.erstellerName}</p>
                        <p>Erstellt von: {protokoll.ersteller}</p>
                        <p>updatedAt: {protokoll.updatedAt}</p>
                        <p>gesamtMenge: {protokoll.gesamtMenge}</p>
                    </div>
                    <Link to={`/protokoll/${protokoll.id}`}><Button variant="warning">Protokolldetails</Button></Link>
                    
                </Accordion.Body>
                
            </Accordion.Item>
        </Accordion>
        </div>
    )
}