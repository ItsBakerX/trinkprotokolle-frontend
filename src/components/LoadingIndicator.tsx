import { Button, Spinner } from "react-bootstrap";

export function LoadingIndicator() {
    return (
        <Button variant="primary" disabled>
            <Spinner animation="grow" size="sm" />
            Loading ...
        </Button>
    )
}