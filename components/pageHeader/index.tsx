import React, { useState, useEffect } from "react";
import Image from "next/image";
import down from '@/assets/icons/down.png';
import styles from './index.module.css'

interface PageHeaderProp {
    msg: string
}

export const PageHeader = (props: PageHeaderProp) => {
    const { msg } = props

    const [curmsg, setCurmsg] = useState('');
    const [getNewMsg, setGetNewMsg] = useState(false)

    useEffect(() => {
        if (msg) {
            setGetNewMsg(true)
            setTimeout(() => {
                setCurmsg(msg)
                setGetNewMsg(false)
            }, 1000);
        }
    }, [msg])

    return (
        <div className={styles.pageHeader}>
            <div className={styles.msgWrapper}>
                <div className={ getNewMsg ? styles.getNewMsg : '' }>
                    <div className={styles.msgItem}><Image className={styles.msgicon} src={down} alt="msgicon" />{ msg }</div>
                    <div className={styles.msgItem}><Image className={styles.msgicon} src={down} alt="msgicon" />{ curmsg }</div>
                </div>
            </div>
            <div className={styles.wallet}>
                { 'connect wallet' }
            </div>
        </div>
    )
}