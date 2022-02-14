import React, { useState } from 'react';
import { Button, ButtonToolbar, Col, Form, Grid, Input, Row } from 'rsuite';
import axios from 'axios';

import Layout from './Layout';

import * as demoJOSN from './demo.json';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
let url;

function Home() {
    const [imgWidthError, updateImgWidthError] = useState(false);
    const [imgLengthError, updateImgLengthError] = useState(false);
    const [jsonValidError, updateJsonValidError] = useState(false);
    const [keyError, updatekeyError] = useState(false);

    function checkInputs() {
        if (document.getElementById('image_width').value > 50) {
            updateImgWidthError(false);
        } else {
            updateImgWidthError(true);
        }

        if (document.getElementById('image_length').value > 50) {
            updateImgLengthError(false);
        } else {
            updateImgLengthError(true);
        }

        if (document.getElementById('key').value.length === 0) {
            updatekeyError(true);
        } else {
            updatekeyError(false);
        }

        try {
            JSON.parse(document.getElementById('chart_options').value);
            updateJsonValidError(false);
        } catch (error) {
            updateJsonValidError(true);
        }
    }

    function clearInputs() {
        document.getElementById('image_width').value = "";
        document.getElementById('image_length').value = "";
        document.getElementById('key').value = "";
        document.getElementById('chart_options').value = "";
        checkInputs();
    }

    function loadDemoData() {
        document.getElementById('image_width').value = 800;
        document.getElementById('image_length').value = 800;
        document.getElementById('key').value = "DTan13";
        document.getElementById('chart_options').value = JSON.stringify(demoJOSN);
        checkInputs();
    }

    function updateSVG() {
        checkInputs();

        if (imgLengthError || imgWidthError || jsonValidError) {
            return;
        }

        axios.post(`${process.env.REACT_APP_URL}/image`, {
            imageoptions: {
                width: document.getElementById('image_width').value,
                length: document.getElementById('image_length').value
            },
            key: document.getElementById('key').value,
            chartoptions: document.getElementById('chart_options').value
        }).then(response => {
            let svg = response.data.svg;
            let blob = new Blob([svg], { type: 'image/svg+xml' });
            url = URL.createObjectURL(blob);
            let image = document.getElementById('img_svg');
            image.src = url;
            var a = document.getElementById("a");
            a.hidden = false;
            var l = document.getElementById("l");
            l.href = response.data.url;
            l.hidden = false;
        }).catch(error => {
            console.log(error);
        });
    }
    function download() {
        if (url) {
            var a = document.getElementById("a");
            a.setAttribute("download", "image.svg");
            a.setAttribute("href", url);
        }
    }

    return (
        <Layout page="Home">
            <Grid fluid>
                <div className="home">
                    <center>
                        <h1>Home</h1>
                        Try the demo data first
                    </center>
                    <hr />
                    <Row >
                        <Col mdOffset={1} md={6} xs={12}>
                            <Form layout='horizontal'>
                                <Form.Group controlId="image_width">
                                    <Form.ControlLabel>Image Width</Form.ControlLabel>
                                    <Form.Control name="name" />
                                    {imgWidthError && <Form.HelpText>This field is required (50-3000)</Form.HelpText>}
                                </Form.Group>
                                <Form.Group controlId="image_length">
                                    <Form.ControlLabel>Image Length</Form.ControlLabel>
                                    <Form.Control name="name" />
                                    {imgLengthError && <Form.HelpText>This field is required (50-3000)</Form.HelpText>}
                                </Form.Group>
                                <Form.Group controlId="key">
                                    <Form.ControlLabel>Unique Key</Form.ControlLabel>
                                    <Form.Control name="name" />
                                    {keyError && <Form.HelpText>This field is required</Form.HelpText>}
                                </Form.Group>
                                <Form.Group controlId="chart_options">
                                    <Form.ControlLabel>Chart Options JSON</Form.ControlLabel>
                                    <Form.Control name="textarea" rows={13} accepter={Textarea} />
                                    {jsonValidError && <Form.HelpText>Enter valid JSON</Form.HelpText>}
                                </Form.Group>
                                <Form.Group>
                                    <center>
                                        <ButtonToolbar>
                                            <Button appearance="primary" onClick={() => updateSVG()}>Submit</Button>
                                            <Button appearance="default" onClick={() => clearInputs()}>Clear</Button>
                                            <Button appearance="primary" onClick={() => loadDemoData()}>Demo Data</Button>
                                        </ButtonToolbar>
                                    </center>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={16} xs={12}>
                            <center>
                                <div className="image">
                                    <img id="img_svg" src="" alt="Click Submit to get the Img" />
                                    <br />
                                    <br />
                                    <a target={"_blank"} rel="noreferrer" href="https://echarts.apache.org/examples/en/editor.html?c=mix-line-bar">Reference for JSON data</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a id="a" href="/" hidden onClick={(e) => download(e)}>
                                        Download
                                    </a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a id="l" href="/" hidden onClick={(e) => download(e)}>
                                        Chart
                                    </a>
                                </div>
                            </center>
                        </Col>
                    </Row>
                </div>
            </Grid>
        </Layout >
    );
}

export default Home;