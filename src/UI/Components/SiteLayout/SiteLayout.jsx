import React, {useRef, useState} from 'react';
import {Button, Layout} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import styles from './Layout.module.scss'

const {Header, Footer} = Layout;

const SiteLayout = () => {

    const [imageData, setImageData] = useState(null)
    const [index, setIndex] = useState(0)
    const canvasRef = useRef(null)
    const inputFile = useRef(null)


    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            createCreateCanvas(file)
        }
    }

    const createCreateCanvas = (file) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            const hRatio = canvas.width / image.width;
            const vRatio = canvas.height / image.height;
            const ratio = Math.min(hRatio, vRatio);
            const centerShift_x = (canvas.width - image.width * ratio) / 2;
            const centerShift_y = (canvas.height - image.height * ratio) / 2;
            context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
            setImageData({width: image.width, height: image.height, src: image.src})
        };
    }

    const onRotateClick = () => {
        // TODO: Implements Rotation
    }

    return (
        <Layout style={{height: '100%', width: '100%'}}>
            <Header className="header">
                <Button type="primary" shape="circle" icon={<DownloadOutlined/>} size={'large'}
                        onClick={() => inputFile.current.click()}/>
                <input ref={inputFile} type="file" onChange={handleFileUpload} style={{display: 'none'}}/>
            </Header>
            <Layout>
                <Layout style={{padding: '75px 25px 0px 25px'}} className={styles.container}>
                    <canvas ref={canvasRef}/>
                    {imageData &&
                    <Button type="primary" onClick={onRotateClick} style={{marginTop: '25px'}}>
                        Rotate
                    </Button>
                    }

                </Layout>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default SiteLayout;