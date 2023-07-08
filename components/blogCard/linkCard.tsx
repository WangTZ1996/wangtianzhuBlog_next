// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { checkVideo, useCopy } from "@/utils";
import { StarOutlined, CopyOutlined } from '@ant-design/icons'
import styles from './linkCard.module.css'
import { message } from "antd";

export interface LinkCardProps {
    blogid: string | number,
    videoSrc?: string,
    coverSrc?: string,
    isAutoPlay?: boolean,
    isMuted?: boolean,
    isLoop?: boolean,
    isFullScreen?: boolean,
    background?: string,
    title?: string,
    description?: string,
    source?: string,
}

export const LinkCard = (props: LinkCardProps) => {
    const { href, title, description } = props;

    const copyHandler = useCopy()

    const copyFn = (href: string) => {
        copyHandler(href)
        message.success('url 已复制到剪切板')
    }

    return (
        <div className={styles.linkCard}>
            <div className={styles.addressBar}>
                <a href={href} target="_blank" rel="noreferrer">
                    { href }
                </a>
                {/* <CopyOutlined onClick={() => copyFn(href)} style={{ fontSize: '20px', marginLeft: '4px', cursor: 'pointer',color: '#2440b3' }}/> */}
                <div onClick={() => copyFn(href)} style={{ fontSize: '14px', color: '#fff', boxShadow: 'rgb(14 14 44 / 40%) 0px 1px', fontWeight: '900', padding: '4px 10px', borderRadius: '100px', background: '#1fc7d4', cursor: 'pointer' }}>COPY</div>
            </div>
            <a href={href} target="_blank" rel="noreferrer">
                <h2 className={styles.title}>{ title }</h2>
            </a>
            <div className={styles.desc}>{ description }</div>
        </div>
    )
}