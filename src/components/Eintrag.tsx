import React, { Fragment, useEffect, useState } from 'react';
import { EintragResource } from '../Resources';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { deleteEintrag, getEintrag } from '../backend/api';
import { LoadingIndicator } from './LoadingIndicator';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import DeleteDialog from './DeleteDialog';

type EintragProps = {
    eintrag?: EintragResource;
}

export function Eintrag({ eintrag }: EintragProps) {

    const { eintragId } = useParams<{ eintragId: string }>();
    const [recEintrag, setEintrag] = useState<EintragResource>();
    const [isLoading, setIsLoading] = useState(true);
    const { showBoundary } = useErrorBoundary();
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        async function load() {
            try {
                if (eintrag) {
                    const recEintrag = await getEintrag(eintrag.id!);
                    setEintrag(recEintrag);
                } else {
                    const recEintrag = await getEintrag(eintragId!);
                    setEintrag(recEintrag);
                }
                setIsLoading(false);
            } catch (err) {
                showBoundary(err);
            }
        }
        load();
    }, []);
    // Methode mit Hilfe von Dimitrey Riffel
    const handleDelete = async () => {
        if (eintragId) {
            try {
                await deleteEintrag(eintragId);
                navigate(`/protokoll/${eintrag?.protokoll}`)
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
            <Fragment>
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
                        <tr>
                            <td>{recEintrag!.getraenk}</td>
                            <td>{recEintrag!.menge}</td>
                            <td>{recEintrag!.kommentar}</td>
                            <td>{recEintrag!.createdAt}</td>
                            <td>{recEintrag!.erstellerName}</td>
                        </tr>
                    </tbody>
                </Table >
                <Link to={`/protokoll/${recEintrag!.protokoll}`}><Button variant="primary">Zurück zur Protokolldetails</Button></Link>
                <br/>
                <div id='bearbeitenButton'>
                <Link to={`/eintrag/${recEintrag?.id}/edit`}><Button variant="success">Editieren</Button></Link>
                <Button variant="danger" onClick={() => setShowDialog(true)}>Löschen</Button>
                <DeleteDialog
                    show={showDialog}
                    onHide={() => setShowDialog(false)}
                    onDelete={handleDelete} />
                </div>
            </Fragment>
        )
    }
}