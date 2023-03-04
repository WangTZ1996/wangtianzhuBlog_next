// @ts-nocheck
import React, { useState, useEffect } from "react";
import Router from "next/router"
import Image from 'next/image'
import { checkVideo } from "@/utils";
import styles from './index.module.css'

export interface BlogCardProps {
    blogid: string | number,
    back?: boolean,
    videoSrc?: string,
    coverSrc?: string,
    isAutoPlay?: boolean,
    isMuted?: boolean,
    isLoop?: boolean,
    isFullScreen?: boolean,
    background?: string,
    isShowController?: boolean,
    title?: string,
    description?: string,
    blogid?: string,
    type?: string,
}

export const BlogCard = (props: BlogCardProps) => {
    const { videoSrc, blogid, type, coverSrc, isAutoPlay, isMuted, description, isLoop, isFullScreen, background, title, back, isShowController } = props

    const routerSkip = (blogid) => {
        if (type === 'tech_article') {
            return Router.push('/blog/' + blogid);
        }
        return
    }

    return (
        <div onClick={() => routerSkip(blogid)} style={{ 'background-color': background || '' }} className={[ isFullScreen ? styles.fullScreen : '', styles.card, back ? styles.cardBack : '' ].join(' ')}>
            {
                videoSrc && checkVideo(videoSrc) ? <video className={ back ? styles.back : ''} preload muted poster={coverSrc} autoPlay={isAutoPlay} controls={isShowController} loop={isLoop} >
                    <source src={videoSrc}></source>
                </video> : <img className={styles.cover} src={coverSrc} alt=''></img>
            }
            {
                isFullScreen ? null : <h2 className={styles.info}>
                    { title }
                </h2>
            }
            {
                isFullScreen ? null : <div className={styles.desc}>
                    { description }
                </div>
            }
        </div>
    )
}