import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'rsuite';
import Layout from './Layout';

function Requests() {

    let [chartData, updateChartData] = useState({});

    function formatData(respData) {
        let finalData = Array(0);
        for (let i = 0; i < respData.length; i++) {
            let element = {};
            element["sr"] = i + 1;
            element["ip"] = respData[i].ip;
            element["key"] = respData[i].key;
            element["reqId"] = respData[i].reqId;
            element["createdAt"] = respData[i].createdAt;
            element["url"] = respData[i].url;
            finalData.push(element);
        }
        updateChartData(finalData);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/requests`).then(response => {
            formatData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Layout page="Requests">
            <div className="charts">
                <center>
                    <h1>Requests</h1>
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
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.Cell dataKey="key" />
                    </Table.Column>

                    <Table.Column width={300} fixed>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.Cell dataKey="createdAt" />
                    </Table.Column>

                    <Table.Column width={300} fixed>
                        <Table.HeaderCell>IP Address</Table.HeaderCell>
                        <Table.Cell dataKey="ip" />
                    </Table.Column>

                    <Table.Column width={400} fixed>
                        <Table.HeaderCell>Request Id</Table.HeaderCell>
                        <Table.Cell dataKey="reqId" />
                    </Table.Column>

                    <Table.Column width={500}>
                        <Table.HeaderCell>Chart Link</Table.HeaderCell>
                        <Table.Cell>{chartData => <Link to={chartData.url}>{chartData.url}</Link>}</Table.Cell>
                    </Table.Column>
                </Table>
            </div>
        </Layout>
    );
}

export default Requests;