import { Button, Form, Modal } from "react-bootstrap";

type Props = {
    onHide: () => void;
    show: boolean;
    onDelete: () => void;
}

// mit Hilfe von Dimitrey Riffel
function DeleteDialog({ onHide, show, onDelete }: Props) {
    const onClose = () => onHide();

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>möchten Sie wirklich löschen?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Button variant="primary" type="submit" onClick={onDelete}>
                            OK
                        </Button>
                        <Button variant="danger" onClick={onClose}>
                            Abbrechen
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteDialog;