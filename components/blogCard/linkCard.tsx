// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { checkVideo } from "@/utils";
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
}

export const LinkCard = (props: LinkCardProps) => {

    return (
        <div className={styles}>

        </div>
    )
}