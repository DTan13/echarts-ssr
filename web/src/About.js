import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Grid, Panel, Row } from 'rsuite';
import Layout from './Layout';

function About() {
    return (
        <Layout page="About">
            <div className="about">
                <center>
                    <h1 id={"docs"}>About</h1>
                </center>
                <hr />
                <Panel>
                    <Grid fluid>
                        <Row>
                            <Col mdOffset={2} md={8}>
                                <h3 id="pages">Pages</h3>
                                <Panel>
                                    This site consists of following pages
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#pages">Pages</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    The <Link to="/home">Home</Link> page has a clean and easy user interface in order to ender required details to get the chart from server.
                                    <br />
                                    <br />
                                    You have to enter appropriate details to get chart.
                                    <br />
                                    <ul>
                                        <li>
                                            <b>Length of Image</b>: This is a required property. It can take values from 50 to 3000 and more.
                                        </li>
                                        <li>
                                            <b>Width of Image</b>: This is a required property. It can take values from 50 to 3000 and more.
                                        </li>
                                        <li>
                                            <b>Unique Key</b>: This can be any value, which can be later used as a quick Identifier for your Chart. It can be duplicate.
                                        </li>
                                        <li>
                                            <b>Chart Options</b>: This must be a valid JSON data. This values are provided to renderer in order to get Chart in svg format.
                                            <br />
                                            You can <a target={"_blank"} rel="noreferrer" href="https://echarts.apache.org/examples/en/editor.html?c=mix-line-bar">Learn more here</a>
                                        </li>
                                    </ul>
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#pages">Pages</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Charts</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    The <Link to="/charts">Charts</Link> page has the complete list of all charts ever created on the server in tabular form.
                                    <br />
                                    This table also consists of other details like
                                    <ul>
                                        <li><b>Id</b>: This is the unique id of chart generated by system.</li>
                                        <li><b>Created At</b>: Creation date of chart.</li>
                                        <li><b>Chart Link</b>: This is the Link to view the chart.</li>
                                        <li><b>Key</b>: This is the key assigned by you.</li>
                                        <li><b>Image Length</b>: This is the length of Image.</li>
                                        <li><b>Image Width</b>: This is the width of image.</li>
                                        <li><b>Chart Options</b>: JSON Chart Options.</li>
                                    </ul>
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#pages">Pages</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#charts">Charts</Breadcrumb.Item>
                                    <Breadcrumb.Item active>uuid</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    This is a individual representation of each chart.
                                    <br />
                                    This can be accessed by using <b>uuid</b>.
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#pages">Pages</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Requests</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    The <Link to="/requests">Requests</Link> page has the complete list of all request ever made in tabular form.
                                    <br />
                                    This table also consists of other details like
                                    <ul>
                                        <li><b>Key</b>: This is the key assigned by you.</li>
                                        <li><b>Created At</b>: Creation date of request.</li>
                                        <li><b>IP Address</b>: This is the IP Address of the client.</li>
                                        <li><b>Request Id</b>: This is the unique id of request generated by system.</li>
                                        <li><b>Chart Link</b>: This is the Link to view the chart.</li>
                                    </ul>
                                </Panel>
                                <hr />
                            </Col>
                            <Col md={2}></Col>
                            <Col mdOffset={0} md={8}>
                                <h3 id="api">API</h3>
                                <Panel>
                                    The API consists of following endpoints
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#api">API</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Image</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    This endpoint deals with the creation of the chart.
                                    <br />
                                    <br />
                                    <b>This is a POST-only endpoint</b>
                                    <br />
                                    <br />
                                    <b>Endpoint</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <code>
                                        {`${process.env.REACT_APP_URL}/image`}
                                    </code>
                                    <br />
                                    <br />
                                    <b>Parameters</b>
                                    <br />
                                    <br />
                                    <ul>
                                        <li><b>Image Options</b><br />This is a JSON object consists of <b>width</b> and <b>length</b> of the Image.
                                            <br />
                                            <hr />
                                            <code>
                                                "imageoptions" : &#x0007b;<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;"width": 600, <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;"length": 600,<br />
                                                &#x0007d;
                                            </code>
                                            <hr />
                                        </li>
                                        <li><b>Key</b><br />This is the key assigned by you. It can be any valid string.
                                            <br />
                                            <hr />
                                            <code>
                                                "key" : "DTan13"
                                            </code>
                                            <hr />
                                        </li>
                                        <li><b>Chart Options</b><br />This must be a valid JSON data.</li>
                                        <br />
                                        <hr />
                                        <code>
                                            "chartoptions" : &#x0007b;<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"legend":  &#x0007b;<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"data": &#x0005b;<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Evaporation",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Precipitation",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Temperature"<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x0005d;<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&#x0007d;,<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"tooltip": 	&#x0005b;Object&#x0005d;, <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;... <br />
                                            &#x0007d;
                                        </code>
                                        <hr />
                                    </ul>
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#api">API</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Requests</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    This endpoint receives the list of all requests.
                                    <br />
                                    <br />
                                    <b>Endpoint</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <code>
                                        {`${process.env.REACT_APP_URL}/requests`}
                                    </code>
                                    <br /><br />
                                    <b>This is a GET-only endpoint</b>
                                    <br />
                                    <br />
                                </Panel>
                                <hr />
                                <Breadcrumb id={"charts"}>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#api">API</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Charts</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    This endpoint receives the list of all charts.
                                    <br />
                                    <br />
                                    <b>Endpoint</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <code>
                                        {`${process.env.REACT_APP_URL}/charts`}
                                    </code>
                                    <br /><br />
                                    <b>This is a GET-only endpoint</b>
                                    <br />
                                    <br />
                                </Panel>
                                <hr />
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#docs">Documentation</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#api">API</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#charts">Charts</Breadcrumb.Item>
                                    <Breadcrumb.Item active>uuid</Breadcrumb.Item>
                                </Breadcrumb>
                                <Panel>
                                    This endpoint receives the list of a single chart.
                                    <br />
                                    <br />
                                    <b>Endpoint</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <code>
                                        {`${process.env.REACT_APP_URL}/chart/:uuid`}
                                    </code>
                                    <br /><br />
                                    <b>This is a GET-only endpoint</b>
                                    <br />
                                    <br />
                                </Panel>
                                <hr />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={24}>
                                <center>
                                    By <a target={"_blank"} rel="noreferrer" href="https://dtan13.tech">Dhananjay Tanpure</a>
                                </center>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
            </div>
        </Layout>
    );
}

export default About;