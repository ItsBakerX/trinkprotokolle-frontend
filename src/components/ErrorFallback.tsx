import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { ErrorFromValidation, ErrorWithHTML } from "../backend/fetchWithErrorHandling";

//Quelle: https://react-bootstrap.github.io/docs/components/alerts/
export default function ErrorFallback({ error }: { error: ErrorFromValidation | ErrorWithHTML }) {
    const [show, setShow] = useState(true);
    return (
        <div>
            <Alert show={show} variant="danger">
                <Alert.Heading>Something went wrong!</Alert.Heading>
                <pre>{error.message}</pre>
                <pre>{error.stack}</pre>
                <pre>{error.status}</pre>
                <Button onClick={() => setShow(false)} variant="outline-danger">
                    Close me
                </Button>
            </Alert>
            {!show && <Button onClick={() => setShow(true)} variant="outline-danger">Show Alert</Button>}
        </div>
    )
}