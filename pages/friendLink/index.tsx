// @ts-nocheck
import React, { useState, useEffect } from "react";
import { PageHeader } from '@/components'

import Wallet from '@/utils/wallet'

import style from "./index.module.css"

const FriendLink = () => {
    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        await Wallet.connect('metamask')
  
        const address = await Wallet.account()
        setAccount(address)
    }

    return (
        <div className={style.friendLink}>
            <PageHeader connectWallet={connectWallet} account={account} ></PageHeader>
            <div className={style.banner}>
                
            </div>
            <div className={style.content}>
                
            </div>
        </div>
    )
}

export default FriendLink