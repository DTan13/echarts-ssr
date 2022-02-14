import React from 'react';
import { Divider, Nav } from 'rsuite';

import { NavLink } from 'react-router-dom';
import { Container, Header, Content } from 'rsuite';

const MyLink = React.forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
        <a ref={ref} {...rest} >{props.children}</a>
    );
});

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
                            <Divider vertical />
                            <Nav.Item as={MyLink} href="https://dtan13.tech" active={false}>
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