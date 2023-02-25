// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { checkVideo } from "@/utils";
import { StarOutlined, CopyOutlined } from '@ant-design/icons'
import styles from './linkCard.module.css'

export interface LinkCardProps {
    id: string | number,
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

    return (
        <div className={styles.linkCard}>
            <div className={styles.addressBar}>
                <a href={href} target="_blank" rel="noreferrer">
                    { href }
                    {/* <StarOutlined style={{ fontSize: '20px', marginLeft: 'auto' }}/> */}
                </a>
                <CopyOutlined style={{ fontSize: '20px', marginLeft: '4px', cursor: 'pointer',color: '#2440b3' }}/>
            </div>
            <a href={href} target="_blank" rel="noreferrer">
                <h2 className={styles.title}>{ title }</h2>
            </a>
            <div className={styles.desc}>{ description }</div>
        </div>
    )
}