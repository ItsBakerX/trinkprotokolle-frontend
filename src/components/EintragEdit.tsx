import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginContext } from "./LoginContext";
import { getEintrag, putEintrag } from "../backend/api";
import { EintragResource } from "../Resources";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

export function EintragEdit() {
    const [protokollId, setProtokollId] = useState("");
    const { eintragId } = useParams<{ eintragId: string }>();
    const { loginInfo } = useLoginContext();
    const [getraenk, setGetraenk] = useState("");
    const [menge, setMenge] = useState<number | "">("");
    const [kommentar, setKommentar] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            if (eintragId) {
                try {
                    const eintrag = await getEintrag(eintragId);
                    setGetraenk(eintrag.getraenk);
                    setMenge(eintrag.menge);
                    setKommentar(eintrag.kommentar || "");
                    setProtokollId(eintrag.protokoll);
                } catch (err) {

                }
            }
        }

        load();
    }, [eintragId]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (loginInfo) {
                const eintrag: EintragResource = {
                    id: eintragId,
                    protokoll: protokollId,
                    ersteller: loginInfo.id,
                    getraenk: getraenk,
                    menge: menge !== "" ? menge : 0,
                    kommentar: kommentar
                };
                await putEintrag(eintrag);
                navigate(`/eintrag/${eintragId}`);
            }
        } catch (err) {

        }
    };
    // methode mit Hilfe von Dimitrey Riffel
    const handleMengeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setMenge(isNaN(value) ? "" : value);
    };

    return (
        <Form onSubmit={onSubmit}>
                <FormGroup>
                    <FormLabel>Getränk</FormLabel>
                    <FormControl
                        type="text"
                        value={getraenk}
                        onChange={(e) => setGetraenk(e.target.value)}
                        minLength={3}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Menge</FormLabel>
                    <FormControl
                        type="number"
                        value={menge}
                        onChange={handleMengeChange}
                        required
                    />
                </FormGroup>
            <FormGroup>
                <FormLabel>Kommentar</FormLabel>
                <FormControl
                    type="text"
                    value={kommentar}
                    onChange={(e) => setKommentar(e.target.value)}
                    minLength={3}
                />
            </FormGroup>
            <Button variant="primary" type="submit">
                Speichern
            </Button>
            <Button variant="danger" onClick={() => navigate(`/protokoll/${protokollId}`)}>
                Abbrechen
            </Button>
        </Form>
    );
}

