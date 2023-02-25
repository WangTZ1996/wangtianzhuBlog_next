// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { checkVideo } from "@/utils";
import styles from './index.module.css'

export interface BlogCardProps {
    id: string | number,
    back?: boolean,
    videoSrc?: string,
    coverSrc?: string,
    isAutoPlay?: boolean,
    isMuted?: boolean,
    isLoop?: boolean,
    isFullScreen?: boolean,
    background?: string,
    title?: string,
}

export const BlogCard = (props: BlogCardProps) => {
    const { videoSrc, coverSrc, isAutoPlay, isMuted, isLoop, isFullScreen, background, title, back } = props

    return (
        <div style={{ 'background-color': background || '' }} className={[ isFullScreen ? styles.fullScreen : '', styles.card, back ? styles.cardBack : '' ].join(' ')}>
            {
                videoSrc && checkVideo(videoSrc) ? <video className={ back ? styles.back : ''} preload muted poster={coverSrc} autoPlay={isAutoPlay} controls={false} loop={isLoop} >
                    <source src={videoSrc}></source>
                </video> : <Image src={coverSrc} alt=''></Image>
            }
            {
                isFullScreen ? null : <h2 className={styles.info}>
                    { title }
                </h2>
            }
        </div>
    )
}