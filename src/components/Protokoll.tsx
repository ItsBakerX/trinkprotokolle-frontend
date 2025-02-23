import { Fragment, useEffect, useState } from "react";

import { EintragResource, ProtokollResource } from "../Resources";


import { Eintrag } from "./Eintrag";
import { deleteProtokoll, getAlleEintraege, getProtokoll } from "../backend/api";
import { LoadingIndicator } from "./LoadingIndicator";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { Button, Card, Table } from "react-bootstrap";
import { ProtokollNew } from "./ProtokollNew";
import DeleteDialog from "./DeleteDialog";
import { useLoginContext } from "./LoginContext";



//Siehe Folie 307
// Ein paar Anpassung bezüglich DeleteDialog mit Hilfe von Dimitrey Riffel
export function Protokoll() {
    const { protokollId } = useParams<{ protokollId: string }>();
    // [] ist Ausgangswert um undefined Werte zu verhindern
    const [eintraege, setEintraege] = useState<EintragResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [protokoll, setProtokoll] = useState<ProtokollResource | null>(null);
    const { showBoundary } = useErrorBoundary();
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const { loginInfo } = useLoginContext();

    async function load() {
        if (protokollId && protokollId !== "neu") {


            try {
                const prot = await getProtokoll(protokollId!);
                const eintraege = await getAlleEintraege(protokollId!);
                setEintraege(eintraege);
                setProtokoll(prot);
                // damit ich das Word "Loading ..." sehen kann :)
                setIsLoading(false);
            } catch (err) {
                showBoundary(err);
            }
        }
    }

    useEffect(() => {
        load();
    }, [protokollId]);
    if (protokollId === "neu") {
        return (
            <>
                <ProtokollNew />
            </>
        )
    }
    const handleDelete = async () => {
        if (protokollId) {
            try {
                navigate("/");
                await deleteProtokoll(protokollId)
            } catch (err) {

            } finally {
                setShowDialog(false);
            }
        }
    }

    if (isLoading) {
        return <LoadingIndicator></LoadingIndicator>
    } else {
        return (
            <div>
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <Card.Title className="cardTitle">Protokoll für {protokoll!.patient}</Card.Title>
                        <Card.Subtitle className="cardTitle">Verwalte Protokoll {protokollId}</Card.Subtitle>
                        <Card.Text>
                            <p>Datum: {protokoll!.datum}</p>
                            <p>Public: {protokoll!.public ? "yes" : "no"}</p>
                            <p>Closed: {protokoll!.closed ? "yes" : "no"}</p>
                            <p>ErstellerName: {protokoll!.erstellerName}</p>
                            <p>Erstellt von: {protokoll!.ersteller}</p>
                            <p>updatedAt: {protokoll!.updatedAt}</p>
                            <p>gesamtMenge: {protokoll!.gesamtMenge}</p>

                            {loginInfo && (
                                <>
                                    {loginInfo.id === protokoll!.ersteller && (
                                        <>
                                            <Button onClick={() => navigate(`/protokoll/${protokoll!.id}/eintrag/neu`)}>Neuer Eintrag</Button>
                                            <Button variant="warning" onClick={() => navigate(`/protokoll/${protokoll!.id}/edit`)}>Editieren</Button>
                                            <Button variant="danger" onClick={() => setShowDialog(true)}>Löschen</Button>
                                        </>
                                    )}
                                </>
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div><Link to={`/`}><Button variant="primary">zurück zum Übersicht</Button></Link></div>
                <h3>Einträge</h3>
                <div className="table">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Getränk</th>
                                <th>Menge in ml</th>
                                <th>Kommentar</th>
                                <th>Eingegangen am</th>
                                <th>Eingetragen von</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eintraege.map((eintrag) => (
                                <Fragment key={eintrag.id}>
                                    <tr>
                                        {/* <Eintrag eintrag={eintrag} /> */}
                                        <td>{eintrag!.getraenk}</td>
                                        <td>{eintrag!.menge}</td>
                                        <td>{eintrag!.kommentar}</td>
                                        <td>{eintrag!.createdAt}</td>
                                        <td>{eintrag!.erstellerName}</td>
                                        <td><Link to={`/eintrag/${eintrag.id}`}><Button variant="warning">Details</Button></Link></td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <DeleteDialog
                        show={showDialog}
                        onHide={() => setShowDialog(false)}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        )
    }
}