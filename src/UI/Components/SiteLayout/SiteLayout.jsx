import React from 'react';
import {Layout} from 'antd';

const {Header, Content, Footer} = Layout;

const SiteLayout = ({children}) => {
    return (
        <Layout style={{height: '100%', width: '100%'}}>
            <Header className="header">
            </Header>
            <Layout>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default SiteLayout;