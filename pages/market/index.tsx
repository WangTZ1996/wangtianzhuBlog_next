// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { coinMarket, coinList_api } from "api/index"

import style from "./market.styles.module.css";

export const Market = () => {
    const [coinList, setCoinList] = useState([])
    const [batchId, setBatchId] = useState(Date.now())

    const coinListRef = useRef([])
    const preCoinListRef = useRef([])

    const getMarket = async function () {
        preCoinListRef.current = [...coinListRef.current]
        const data = await coinMarket()
        setCoinList(data)
        setBatchId(Date.now())
        coinListRef.current = data
    }

    const getPriceColor = (curPrice, prePrice) => {
        console.log(curPrice, prePrice, 'getPriceColor')
        if (Number(curPrice) < Number(prePrice)) {
            return style.red
        } else if (Number(curPrice) == Number(prePrice)) {
            return style.normal
        } else {
            return style.green
        }
    }

    useEffect(() => {
        getMarket()
        setInterval(() => {
            console.log(coinListRef.current, 'preCoinList')
            getMarket()
        }, 60 * 1000)
    }, [])

    return (
        <div>
            {
                coinList.map((coin, index) => (
                    <div className={style.coinLine} key={coin.id + batchId}>
                        <img src={coin.image} alt="" />
                        <span>{ coin.name }</span>
                        <span className={getPriceColor(coin.current_price, preCoinListRef.current[index]?.current_price)}>{ coin.current_price }</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Market