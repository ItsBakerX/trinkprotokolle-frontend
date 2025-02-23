import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import LoginDialog from './LoginDialog';
import { useLoginContext } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import { deleteLogin } from '../backend/api';

// Quelle: https://react-bootstrap.github.io/docs/components/navbar/
// https://react-bootstrap.netlify.app/docs/components/modal
function Header() {

    const { loginInfo, setLoginInfo } = useLoginContext();
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const navigate = useNavigate();

    const doLogout = async () => {
        await deleteLogin()
        setLoginInfo(false);
        // DONE: 6. Gehe zu Index nach Logout
        navigate('/');
    }
    return (
        <Navbar expand="lg" fixed="top" bg="dark" variant='dark'>
            <Container>
                <div id='headerTitle'>
                    <Navbar.Brand href="/">WE2-Trinkprotokolle</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <LinkContainer to="/">
                            <Nav.Link>Übersicht</Nav.Link>
                        </LinkContainer>
                        {loginInfo && (
                            <>
                                {loginInfo.role === "a" && (
                                    <LinkContainer to="/admin">
                                        <Nav.Link>Admin</Nav.Link>
                                    </LinkContainer>
                                )}
                                <LinkContainer to="/prefs">
                                    <Nav.Link>Preferences</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/protokoll/neu">
                                    <Nav.Link>Neues Protokoll</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                        {
                            loginInfo ? (
                                <Nav.Link onClick={() => doLogout()}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link onClick={() => setShowLoginDialog(true)}>Login</Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <LoginDialog show={showLoginDialog} onHide={() => setShowLoginDialog(false)} />
        </Navbar>
    );
}

export default Header;