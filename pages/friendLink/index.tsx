// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import { PageHeader } from '@/components'

import Wallet from '@/utils/wallet'

import style from "./index.module.css"

const Btn = (props: any) => {
    // const [state, setState] = useState({ name: 'abc' })
    // const state = { name: 'abc' }

    console.log('btn update')

    return useMemo(() => {
        console.log('btn render')
        return (
            <div>btn</div>
        )
    }, [props.state])
}

const FriendLink = () => {
    const [account, setAccount] = useState('');
    const [state, setState] = useState({ name: 'abc' })
    // const state = { name: 'abc' }

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
                <Btn state={state} />
            </div>
        </div>
    )
}

export default FriendLink