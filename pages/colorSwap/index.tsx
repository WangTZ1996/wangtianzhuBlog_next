// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import styles from './index.module.css'

export default function ColorSwap () {


    return (
        <div className={styles.colorSwap_page}>
            <div className={styles.color_box}>
                <div className={styles.colorSwap_header}>
                    colorSwap
                </div>
                <div className={styles.colorInput}>

                </div>
                <div className={styles.colorSwitch}>
                    <div className={styles.colorSwitchBtn}></div>
                </div>
                <div className={styles.colorInput}>
                    
                </div>
            </div>
        </div>
    )
}
