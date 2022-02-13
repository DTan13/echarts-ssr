import React from 'react';
import { Nav } from 'rsuite';

import { NavLink } from 'react-router-dom';
import { Container, Header, Content } from 'rsuite';

function Layout(props) {
    return (
        <div className="layout">
            <Container>
                <Header>
                    <center>
                        <Nav appearance="subtle">
                            <Nav.Item active={props.page === "Home"}>
                                <NavLink style={{ textDecoration: "none" }} to="/home"> Home</NavLink>
                            </Nav.Item>
                            <Nav.Item active={props.page === "Charts"}>
                                <NavLink style={{ textDecoration: "none" }} to="/charts"> Charts</NavLink>
                            </Nav.Item>
                            <Nav.Item active={props.page === "Requests"}>
                                <NavLink style={{ textDecoration: "none" }} to="/requests"> Requests</NavLink>
                            </Nav.Item>
                            <Nav.Item active={props.page === "About"}>
                                <NavLink style={{ textDecoration: "none" }} to="/about"> About</NavLink>
                            </Nav.Item>
                            <Nav.Item active={false}>
                                <center>
                                    By <a target="_blank" rel="noreferrer" href="https://dtan13.tech">Dhananjay Tanpure</a>
                                </center>
                            </Nav.Item>
                        </Nav>
                    </center>
                </Header>
                <br />
                <Content>
                    {props.children}
                </Content>
            </Container>
        </div>
    );
}

export default Layout;