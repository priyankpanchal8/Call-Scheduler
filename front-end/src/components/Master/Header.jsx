import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends Component {

    render() {
        return (
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/" style={{ color: "white" }}>Call Schedule</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {
                        this.props.isAuthenticated ?
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to="/">Home</Link>
                                    <Link to="/users">All Users</Link>
                                    <Link to="/schedule">Schedule</Link>
                                </Nav>
                                <Nav>
                                    <Link onClick={(e) => { this.props.logoutUser(this.props.userID) }}>Logout</Link>
                                </Nav>
                            </Navbar.Collapse>
                            :
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link className={`${this.props.isAuthenticated ? "hide" : ""}`} to="/login">Login</Link>
                                    <Link className={`${this.props.isAuthenticated ? "hide" : ""}`} to="/registration">Registration</Link>
                                </Nav>
                            </Navbar.Collapse>
                    }



                </Container>
            </Navbar>
        )
    }
}