import { useEffect, useState } from "react";
import { Form, Row, Col, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useErrorBoundary } from "react-error-boundary";
import { useParams, useNavigate } from "react-router-dom";
import { getProtokoll, putProtokoll } from "../backend/api";
import { ProtokollResource } from "../Resources";
import { useLoginContext } from "./LoginContext";

// Quelle für Datum Format Methoden mit Hilfe von Dimitrey Riffel
function inputDate(date: string): string {
    const [day, month, year] = date.split('.');
    return `${year}-${month}-${day}`;
}
function formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

export function ProtokollEdit() {
    const [id, setId] = useState<string | undefined>();
    const [patient, setPatient] = useState("");
    const [datum, setDatum] = useState<string>("");
    const [isPublic, setIsPublic] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const { loginInfo } = useLoginContext();
    const { protokollId } = useParams<{ protokollId: string }>();
    const { showBoundary } = useErrorBoundary();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProtokoll() {
            try {
                const protokoll = await getProtokoll(protokollId!);
                setId(protokoll.id);
                setPatient(protokoll.patient);
                setDatum(inputDate(protokoll.datum));
                setIsPublic(protokoll.public!);
                setIsClosed(protokoll.closed!);
            } catch (err) {
                showBoundary(err);
            }
        }

        if (protokollId) {
            loadProtokoll();
        }
    }, [protokollId, showBoundary]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (loginInfo && id) {
                const protokoll: ProtokollResource = {
                    id,
                    patient,
                    datum: formatDate(datum),
                    ersteller: loginInfo.id,
                    public: isPublic,
                    closed: isClosed,
                };
                await putProtokoll(protokoll);
                navigate(`/protokoll/${id}`);
            }
        } catch (err) {
           
        }
    };

    return (
        <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Form.Label>Patient</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="patient Name Eingeben"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        minLength={3}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Datum</FormLabel>
                    <FormControl
                        type="date"
                        value={datum}
                        onChange={(e) => setDatum(e.target.value)}
                    />
            <FormGroup>
                <Form.Check
                    type="checkbox"
                    label="Öffentlich"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </FormGroup>
            <FormGroup>
                <Form.Check
                    type="checkbox"
                    label="Geschlossen"
                    checked={isClosed}
                    onChange={(e) => setIsClosed(e.target.checked)}
                />
            </FormGroup>
            </FormGroup>

            <Button variant="primary" type="submit">
                Speichern
            </Button>
            <Button variant="danger" onClick={() => navigate(`/protokoll/${id}`)}>
                Abbrechen
            </Button>
        </Form>
    );
}