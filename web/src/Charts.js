import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'rsuite';
import Layout from './Layout';

function Charts() {

    let [chartData, updateChartData] = useState({});

    function formatData(respData) {
        let finalData = Array(0);
        for (let i = 0; i < respData.length; i++) {
            let element = {};
            element["sr"] = i + 1;
            element["id"] = respData[i].id;
            element["key"] = respData[i].key;
            element["length"] = respData[i].imageoptions.length;
            element["width"] = respData[i].imageoptions.width;
            element["createdAt"] = respData[i].createdAt;
            element["chartoptions"] = JSON.stringify(respData[i].chartoptions);
            finalData.push(element);
        }
        updateChartData(finalData);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/charts`).then(response => {
            formatData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Layout page="Charts">
            <div className="charts">
                <center>
                    <h1>Charts</h1>
                </center>
                <hr />
                <Table
                    data={chartData}
                    height={800}
                >
                    <Table.Column width={100} align="center" fixed>
                        <Table.HeaderCell>Sr.No</Table.HeaderCell>
                        <Table.Cell dataKey="sr" />
                    </Table.Column>

                    <Table.Column width={200} fixed>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.Cell dataKey="id" />
                    </Table.Column>

                    <Table.Column width={300} fixed>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.Cell dataKey="createdAt" />
                    </Table.Column>

                    <Table.Column width={500}>
                        <Table.HeaderCell>Chart Link</Table.HeaderCell>
                        <Table.Cell>{chartData => <Link to={`/chart/${chartData.id}`}>{chartData.id}</Link>}</Table.Cell>
                    </Table.Column>

                    <Table.Column width={200} fixed>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.Cell dataKey="key" />
                    </Table.Column>

                    <Table.Column width={200}>
                        <Table.HeaderCell>Image Length</Table.HeaderCell>
                        <Table.Cell dataKey="length" />
                    </Table.Column>

                    <Table.Column width={150}>
                        <Table.HeaderCell>Image Width</Table.HeaderCell>
                        <Table.Cell dataKey="width" />
                    </Table.Column>

                    <Table.Column width={500}>
                        <Table.HeaderCell>Chart Options</Table.HeaderCell>
                        <Table.Cell dataKey="chartoptions" />
                    </Table.Column>
                </Table>
            </div>
        </Layout>
    );
}

export default Charts;