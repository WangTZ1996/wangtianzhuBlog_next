// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { goerli_faucet } from '@/api'
import styles from './index.module.css'

const faucetContractAddress = '0xe7e97f6c9d0450ac88182a62e7b061bbd034c46e'

export default function Faucet () {
    const [addressList, setAddressList] = useState([])
    const [isPennding, setIsPennding] = useState(false)
    const inputRef = useRef(null)
    const listRef = useRef(null)

    const statusMapping = {
        0: 'failure',
        1: 'pendding',
        2: 'success'
    }
    const statusColorMapping = {
        0: 'orangered',
        1: 'gold',
        2: 'limegreen'
    }

    const updateList = (id, txId, status) => {
        const tempList = [...listRef.current]
        tempList.forEach(item => {
            if (item.id === id) {
                item.status = status
                item.txId = txId
            }
        })
        setAddressList(tempList)
    }

    const requestETH = async () => {
        const inputAddress = inputRef.current.value

        if (!!inputAddress) {
            const id = Math.random().toString(36).slice(2)
            setIsPennding(true)
            const list = [...addressList]
            list.push({ addr: inputAddress, status: 1, id, txId: '' })
            setAddressList(list)
            listRef.current = list
            inputRef.current.value = ""
            try {
                const res = await goerli_faucet(inputAddress)
                if (res && res.code === 0) {
                    const txId = `https://goerli.etherscan.io/tx/${res.data}`
                    updateList(id, txId, 2)
                } else {
                    updateList(id, '', 0)
                }
            } catch(ex) {
                console.log(ex)
            } finally {
                setIsPennding(false)
            }
        }
    }

    return (
        <div className={styles.faucet_page}>
            <Head>
                <title>王天柱的博客|faucet</title>
                <meta name="description" content="王天柱的博客，测试网主币水龙头" />
                <meta name="google" content="notranslate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className={styles.header}>
                    <div className={styles.headerMail}>
                        <span>📧</span>
                        联系我
                        <a href="mailto:wangtianzhu@wangtz.cn">：wangtianzhu@wangtz.cn</a>
                    </div>
                </div>
                <div className={styles.banner}>🐳</div>
                <div className={styles.contract}>
                    {/* <span>faucet contract address: </span> */}
                    <a href={`https://goerli.etherscan.io/address/${faucetContractAddress}`}>faucet contract address: {faucetContractAddress}</a>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputBox}>
                        <input ref={inputRef} id="addressInput" placeholder="please input your address" type="text" />
                        {
                            isPennding ? 
                            <span className={styles.inputBtn}>🚱</span> : 
                            <span onClick={requestETH} className={styles.inputBtn}>🚰</span>
                        }
                    </div>
                    <div className={styles.addressListWrapper}>
                        { addressList.map((item) => (
                            <a key={item.id} href={item.txId}>
                                <div className={styles.addressListItem}>
                                    <span className={styles.addr}>{ item.addr }</span>
                                    <span style={{ color: statusColorMapping[item.status] }} className={styles.statusText}>{ statusMapping[item.status] }</span>
                                </div>
                            </a>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}