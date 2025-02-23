import { useEffect, useRef, useState } from "react";
import { useLoginContext } from "./LoginContext";
import { useNavigate, useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { EintragResource, ProtokollResource } from "../Resources";
import { getLogin, getProtokoll, postEintrag } from "../backend/api";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

export function EintragNew() {
    const getraenk = useRef<HTMLInputElement>(null);
    const menge = useRef<HTMLInputElement>(null);
    const kommentar = useRef<HTMLInputElement>(null);

    const [protokoll, setProtokoll] = useState<ProtokollResource | null>(null);
    const { loginInfo, setLoginInfo } = useLoginContext();
    const { protokollId } = useParams<{ protokollId: string }>();
    const { showBoundary } = useErrorBoundary();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProtokoll() {
            if (protokollId) {
                setProtokoll(await getProtokoll(protokollId));
            }
        }
        loadProtokoll();
    }, [protokollId]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
                const currentLoginInfo = await getLogin();
                setLoginInfo(currentLoginInfo);
                let pflegerId = "";
                if (currentLoginInfo) {
                    pflegerId = currentLoginInfo.id;
                } else {
                    showBoundary(new Error("Access denied"));
                }

                const eintragResource: EintragResource = {
                    getraenk: getraenk.current!.value,
                    menge: menge.current!.value ? Number(menge.current!.value) : 0,
                    kommentar: kommentar.current!.value,
                    ersteller: pflegerId,
                    protokoll: protokollId!
                };

                await postEintrag(eintragResource);
                navigate(`/protokoll/${protokollId}`);
            
        } catch (err) {
        } 
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
        
                    <FormGroup>
                        <FormLabel>Getränk</FormLabel>
                        <FormControl
                            ref={getraenk}
                            type="text"
                            placeholder="Getränk eingeben"
                            required
                            minLength={3}
                            maxLength={100}
                        />
                        <Form.Control.Feedback type="invalid">
                            {getraenk.current?.validationMessage}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <Form.Group>
                        <FormLabel>Menge</FormLabel>
                        <FormControl
                            ref={menge}
                            type="number"
                            placeholder="0"
                            required
                            min={0}
                            max={10000}
                        />
                        <Form.Control.Feedback type="invalid">
                            {menge.current?.validationMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
       
                <FormGroup>
                    <FormLabel>Kommentar</FormLabel>
                    <FormControl
                        ref={kommentar}
                        type="text"
                        placeholder="Kommentar Eingeben"
                        minLength={3}
                        maxLength={1000}
                    />
                    <Form.Control.Feedback type="invalid">
                        {kommentar.current?.validationMessage}
                    </Form.Control.Feedback>
                </FormGroup>

                <Button variant="primary" type="submit">
                    Speichern
                </Button>
                <Button variant="danger" onClick={() => navigate(`/protokoll/${protokoll?.id}`)}>
                    Abbrechen
                </Button>
            </Form>
        </>

    );
}