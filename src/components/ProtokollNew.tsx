import { FormEvent, useState } from "react";
import { Button, FormCheck, FormControl, FormGroup, FormLabel, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginContext } from "./LoginContext";
import { ProtokollResource } from "../Resources";
import { postProtokoll } from "../backend/api";

function formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}
export function ProtokollNew() {
    const [datum, setDatum] = useState("");
    const [patient, setPatient] = useState("");
    const [err, setErr] = useState("");
    const[isPublic, setIsPublic]= useState(false);
    const[isClosed, setIsClosed]= useState(false);
    const {loginInfo}= useLoginContext();
    const navigate= useNavigate();

    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        e.stopPropagation();
        try{
            if(loginInfo){
                const protokoll: ProtokollResource={
                    patient,
                    datum: formatDate(datum),
                    ersteller: loginInfo.id,
                    public: isPublic,
                    closed: isClosed
                }
                postProtokoll(protokoll);
                navigate("/");
            }
        }catch(err){

        }
    }
    return (
        <>
        <h3>Erstelle ein neues Protokoll</h3>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>Patient</FormLabel>
                <FormControl type="patient" 
                placeholder="Eingabe Patient" 
                value={patient} 
                onChange={e=>setPatient(e.target.value)}
                minLength={3}>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Datum</FormLabel>
                <FormControl 
                type="date" 
                placeholder="Eingabe Datum"
                value={datum}
                onChange={(e)=>setDatum(e.target.value)}>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormCheck 
                type="checkbox" 
                label="öffentlich"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}>
                </FormCheck>
            </FormGroup>
            <FormGroup>
                <FormCheck 
                type="checkbox" 
                label="geschlossen"
                checked={isClosed}
                onChange={(e)=> setIsClosed(e.target.checked)}>
                </FormCheck>
            </FormGroup>
            <Button type="submit" variant="primary">Speichern</Button>
        <Button variant="danger" onClick={()=>navigate("/")}>Abbrechen</Button>
        </Form>
        
        </>
    )
}