/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Grid, Input, Row } from 'rsuite';
import Layout from './Layout';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

function Chart() {
    let { uuid } = useParams();
    let url;
    let [copied, setCopied] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/chart/${uuid}`).then(response => {
            let imageoptions = response.data.imageoptions;
            let svg = response.data.svg;
            let chartoptions = response.data.chartoptions;
            let key = response.data.key;

            document.getElementById('image_width').value = imageoptions.width;
            document.getElementById('image_length').value = imageoptions.length;
            document.getElementById('chart_options').value = JSON.stringify(chartoptions);
            document.getElementById('key').value = key;

            svg = svg.data.map(bin => String.fromCharCode(bin)).join('');
            let blob = new Blob([svg], { type: 'image/svg+xml' });
            url = URL.createObjectURL(blob);
            let image = document.getElementById('img_svg');
            image.src = url;
            var l = document.getElementById("l");
            l.href = url;
            l.hidden = false;
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function download() {
        if (url) {
            var a = document.getElementById("l");
            a.setAttribute("download", "image.svg");
            a.setAttribute("href", url);
        }
    }
    function copy() {
        var copyText = document.getElementById("chart_options");
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        setCopied(true);
    }

    return (
        <Layout page="Charts">
            <Grid fluid>
                <center>
                    <h1>{uuid}</h1>
                </center>
                <hr />
                <div className="row">
                    <Row>
                        <Col mdOffset={1} md={6} xs={12}>
                            <Form disabled layout='horizontal'>
                                <Form.Group controlId="image_width">
                                    <Form.ControlLabel>Image Width</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="image_length">
                                    <Form.ControlLabel>Image Length</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="key">
                                    <Form.ControlLabel>Unique Key</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="chart_options">
                                    <Form.ControlLabel>Chart Options JSON</Form.ControlLabel>
                                    <Form.Control name="textarea" rows={20} accepter={Textarea} />
                                </Form.Group>
                                <center>
                                    <Button onClick={() => copy()}>
                                        {copied && "Copied"}
                                        {!copied && "Copy"}
                                    </Button>
                                </center>
                            </Form>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={12} xs={12}>
                            <center>
                                <div className="image">
                                    <img id="img_svg" src="" alt="Click Submit to get the Img" />
                                    <br />
                                    <a id="l" href="/" hidden onClick={(e) => download(e)}>
                                        Download
                                    </a>
                                </div>
                            </center>
                        </Col>
                    </Row>
                </div>
            </Grid>
        </Layout>
    );
}

export default Chart;