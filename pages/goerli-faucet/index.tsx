// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { goerli_faucet } from "@/api";
import { notification } from 'antd';
import loading from "@/assets/loading/loading.gif";
import styles from "./index.module.css";

const Web3 = require('web3')

const faucetContractAddress = "0xC4888d88dFfdF73d9f597659531673479E9ac431";

export default function Faucet() {
  const [addressList, setAddressList] = useState([]);
  const [isPennding, setIsPennding] = useState(false);
  const [poolBalance, setPoolBalance] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const statusMapping = {
    0: "failure",
    1: "pendding",
    2: "success",
  };
  const statusColorMapping = {
    0: "orangered",
    1: "gold",
    2: "limegreen",
  };

  const updateList = (id, txId, status) => {
    const tempList = [...listRef.current];
    tempList.forEach((item) => {
      if (item.id === id) {
        item.status = status;
        item.txId = txId;
      }
    });
    setAddressList(tempList);
  };

  const requestETHPool = async () => {
    const web3 = new Web3('https://ethereum-goerli-rpc.publicnode.com	')
    await handleRequestETHBalance(web3)

    setInterval(async () => {
      await handleRequestETHBalance(web3)
    }, 5 * 1000)
  }

  const handleRequestETHBalance = async (web3) => {
      const balance = await web3.eth.getBalance(faucetContractAddress)
      const ethBalance = Web3.utils.fromWei(balance, 'ether')
      console.log(ethBalance, 'ethBalance')
      setPoolBalance(ethBalance)
  }

  const requestETH = async () => {
    const inputAddress = inputRef.current.value;

    if (!!inputAddress) {
      const id = Math.random().toString(36).slice(2);
      setIsPennding(true);
      const list = [...addressList];
      list.push({ addr: inputAddress, status: 1, id, txId: "" });
      setAddressList(list);
      listRef.current = list;
      inputRef.current.value = "";
      try {
        const res = await goerli_faucet(inputAddress);
        if (res && res.code === 0) {
          const txId = `https://goerli.etherscan.io/tx/${res.data}`;
          updateList(id, txId, 2);
          notification.success({
            message: 'success',
            description: '请求成功，代币已发送'
          })
        } else {
          updateList(id, "", 0);
          notification.warning({
            message: 'warning',
            description: '每个地址每24小时只能领取一次'
          })
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        setIsPennding(false);
      }
    }
  };

  useEffect(() => {
    requestETHPool()
  }, [])

  return (
    <div className={styles.faucet_page}>
      <Head>
        <title>王天柱的博客|faucet</title>
        <meta name="description" content="王天柱的博客，测试网主币水龙头" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script>var _hmt = _hmt || [];</script>
        <script
          async
          src="https://hm.baidu.com/hm.js?88cc8f9c8b4930cd7dac9584f4900df8"
        />
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
          <p>
            faucet contract balance: { poolBalance } goerli ETH
          </p>
          <a
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: 'underline' }}
            href={`https://goerli.etherscan.io/address/${faucetContractAddress}`}
          >
            faucet contract address: {faucetContractAddress}
          </a>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.inputBox}>
            <input
              ref={inputRef}
              id="addressInput"
              placeholder="please input your address"
              type="text"
            />
            {isPennding ? (
              <span className={styles.inputBtn}>🚱</span>
            ) : (
              <span onClick={requestETH} className={styles.inputBtn}>
                🚰
              </span>
            )}
          </div>
          <div className={styles.addressListWrapper}>
            {addressList.map((item) =>
              item.txId ? (
                <a key={item.id} href={item.txId}>
                  <div className={styles.addressListItem}>
                    <span className={styles.addr}>{item.addr}</span>
                    <span
                      style={{ color: statusColorMapping[item.status] }}
                      className={styles.statusText}
                    >
                      {statusMapping[item.status]}
                    </span>
                  </div>
                </a>
              ) : (
                <div key={item.id} className={styles.addressListItem}>
                  <span className={styles.addr}>{item.addr}</span>
                  <span
                    style={{ color: statusColorMapping[item.status] }}
                    className={styles.statusText}
                  >
                    { item.status == 1 ? <img style={{width: '24px', height: '24px'}} src={loading.src} alt="" /> : null }
                    {statusMapping[item.status]}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
