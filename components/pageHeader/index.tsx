import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons"
import down from '@/assets/icons/down.png';
import menu from '@/assets/icons/menu.png';
import wallet_metamask_icon from '@/assets/icons/metamask.svg'
import styles from './index.module.css'

import { showAddress } from '@/utils'

interface PageHeaderProp {
    msg: string,
    connectWallet: any,
    walletLoading: boolean,
    account: string,
    toggleModalHandler?: any
}

const Web3 = require('web3')
const { utils } = require('web3')

export const PageHeader = (props: PageHeaderProp) => {
    const { msg, connectWallet, walletLoading, account, toggleModalHandler } = props

    const [curmsg, setCurmsg] = useState('')
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
                { msg ? <div className={ getNewMsg ? styles.getNewMsg : '' }>
                    <div className={styles.msgItem}><Image className={styles.msgicon} src={down} alt="msgicon" />{ msg.replace(/t=(.*)/, '') }</div>
                    <div className={styles.msgItem}><Image className={styles.msgicon} src={down} alt="msgicon" />{ curmsg.replace(/t=(.*)/, '') }</div>
                </div> : null }
            </div>
            {
                account ? <div className={styles.wallet}>
                    { showAddress(account, 6) }
                </div> : <div onClick={connectWallet} style={{ width: walletLoading ? '50px' : '174px' }} className={styles.wallet}>
                    { walletLoading ? <LoadingOutlined className={styles.walletLoadingIcon} /> : <div className={styles.wallet_connect}>connect wallet<img src={wallet_metamask_icon.src} /></div> }
                </div>
            }
            {
                <Image onClick={toggleModalHandler} className={styles.menu_mobile} width={32} height={32} src={menu} alt="menu" />
            }
        </div>
    )
}

