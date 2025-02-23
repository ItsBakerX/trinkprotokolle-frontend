import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useLoginContext } from "./LoginContext";
import { postLogin } from "../backend/api";
// https://react-bootstrap.netlify.app/docs/forms/overview

type LoginDialogProps = {
    show: boolean;
    onHide: () => void;
}
function LoginDialog({ show, onHide }: LoginDialogProps) {
    const { setLoginInfo } = useLoginContext();
    const [loginData, setLoginData] = useState({ name: "", password: "" });
    const [loginFailed, setLoginFailed] = useState<string>("");

    function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setLoginFailed("");
    }

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        try {
            const loginInfo = await postLogin(loginData.name, loginData.password)
            setLoginInfo(loginInfo)
            setLoginFailed("")
            onHide();
        } catch (err) {
            setLoginInfo(false);
            setLoginFailed(String(err));
        } finally {
            setLoginData({ name: loginData.name, password: "" });
        }
    }
    function onCancel() {
        setLoginData({ name: loginData.name, password: "" });
        onHide();
    }
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loginFailed && <Alert variant="danger">{loginFailed}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Name eingeben" value={loginData.name} onChange={update} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Passwort" value={loginData.password} onChange={update} />
                    </Form.Group>



                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Abbrechen
                </Button>

                <Button variant="primary" onClick={handleLogin}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginDialog;