import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'rsuite';
import Layout from './Layout';

function NoPage() {
    return (
        <Layout>
            <div className="no-page">
                <Button appearance="primary">
                    <NavLink style={{ textDecoration: "none" }} to="/home">
                        Back to Home
                    </NavLink>
                </Button>
            </div>
        </Layout>
    );
}

export default NoPage;