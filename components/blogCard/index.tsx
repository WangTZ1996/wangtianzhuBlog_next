// @ts-nocheck
import React, { useState, useEffect } from "react";
import Router from "next/router"
import Link from "next/link";
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
            return Router.push({ pathname: '/blog/' + blogid}, undefined, { shallow: true });
        }
        return
    }

    return (
            <div style={{ 'backgroundColor': isFullScreen ? background : '' || '' }} className={[ isFullScreen ? styles.fullScreen : '', styles.card, back ? styles.cardBack : '' ].join(' ')}>
                {
                    videoSrc && checkVideo(videoSrc) ? <video className={ back ? styles.back : ''} preload="true" muted poster={coverSrc} autoPlay={isAutoPlay} controls={isShowController} loop={isLoop} >
                        <source src={videoSrc}/>
                    </video> : <Image width={660} height={300} quality={25} lazy="true" className={styles.cover} src={coverSrc} alt=''/>
                } 
                {
                    isFullScreen ? null : 
                    <Link target={'_blank'} href={'/blog/' + blogid} style={{ width: '100%' }}>
                        <h2 className={styles.info}>
                            { title }
                        </h2>
                    </Link>
                }
                {
                    isFullScreen ? null : 
                    <Link target={'_blank'} href={'/blog/' + blogid} style={{ width: '100%' }}>
                        <div className={styles.desc}>
                            { description }
                        </div>
                    </Link>
                }
            </div>
    )
}