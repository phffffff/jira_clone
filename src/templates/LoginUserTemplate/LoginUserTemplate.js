import { Layout } from 'antd';
import { useState, useEffect } from 'react'

import style from './LoginUserTemplate.module.scss'

function LoginUserTemplate(props) {
    const [{ width, height }, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const { children } = props

    useEffect(() => {
        const handleSetSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleSetSize)

        return () => {
            window.removeEventListener('reset', handleSetSize)
        }
    }, [])

    const { Component } = props;
    const { Sider, Content } = Layout
    return (
        <Layout
            style={{
                height: height,
            }}
        >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                className={style.bgLogin}
                width={width / 1.5}
            >
            </Sider>
            <Content
                style={{
                    minHeight: height
                }}
            >
                {children}
            </Content>
        </Layout>
    )
}

export default LoginUserTemplate
    ;