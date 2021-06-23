import React, {useEffect, useRef, useState} from 'react';
import {Button, Layout} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import styles from './Layout.module.scss'

const {Header, Footer} = Layout;
const FOOTER_TEXT = '©️2021 Created by Din Marom'
const FOOTER_TEXT_ON_HOVER = 'Click Me!'

const SiteLayout = () => {

    const [imageData, setImageData] = useState(null)
    const [canvasData, setCanvasData] = useState(null)
    const [footerText, setFooterText] = useState(FOOTER_TEXT)
    const [index, setIndex] = useState(0)
    const canvasRef = useRef(null)
    const inputFile = useRef(null)

    useEffect(() => {
        if (canvasData && imageData) {
            onRotateClick()
        }
    }, [canvasData, imageData])


    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            createCreateCanvas(file)
        }
    }

    const createCreateCanvas = (file) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            setImageData({
                width: image.width,
                height: image.height,
                src: image.src,
                image: image,
            })
            setCanvasData({width: canvas.width, height: canvas.height, context: context})
        };
    }

    const onRotateClick = (changeIndex) => {
        canvasData.context.clearRect(0, 0, canvasData.width, canvasData.height);

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        canvasData.context.save();

        // move to the center of the canvas
        canvasData.context.translate(canvasData.width / 2, canvasData.height / 2);

        // rotate the canvas to the specified degrees
        if (changeIndex) {
            canvasData.context.rotate(index * Math.PI / 180);
            setIndex(index + 90)
        }
        // draw the image
        // since the context is rotated, the image will be rotated also

        canvasData.context.drawImage(imageData.image, -canvasData.width * 0.5, -canvasData.height * 0.5, canvasData.width, canvasData.height)
        canvasData.context.restore();
    }

    const onFooterClick = () => {
        imageData && console.log('src', imageData.src)
    }


    return (
        <Layout style={{height: '100%', width: '100%'}}>
            <Header className="header">
                <Button type="primary" shape="circle" icon={<DownloadOutlined/>} size={'large'}
                        onClick={() => inputFile.current.click()}/>
                <input ref={inputFile} type="file" onChange={handleFileUpload} style={{display: 'none'}}
                       accept={".png, .jpg, .jpeg"}/>
            </Header>
            <Layout>
                <Layout style={{padding: '75px 25px 0px 25px'}} className={styles.container}>
                    <canvas ref={canvasRef}/>
                    {imageData &&
                    <Button type="primary" onClick={() => onRotateClick(true)} style={{marginTop: '25px'}}>
                        Rotate
                    </Button>
                    }

                </Layout>
                <Footer
                    style={{textAlign: 'center'}}
                    onMouseEnter={() => setFooterText(FOOTER_TEXT_ON_HOVER)}
                    onMouseLeave={() => setFooterText(FOOTER_TEXT)}
                    onClick={() => onFooterClick()}>
                    {footerText}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SiteLayout