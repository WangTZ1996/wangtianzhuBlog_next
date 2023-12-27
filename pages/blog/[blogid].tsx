// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from 'next/head'
import Decimal from 'decimal.js'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as prism from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as hljs from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import ReactMarkdown from "react-markdown"
import { origin_blog, origin_blog_from_chain } from '@/api'
import { ArrowUpOutlined } from "@ant-design/icons"

import opIcon from "@/assets/chain/op.png"
import fantomIcon from "@/assets/chain/fantom.png"
import okIcon from "@/assets/chain/OKTC.png"
import shareLink from "@/assets/icons/shareLink.png"

import Wallet from '@/utils/wallet'
import { showAddress, useCopy } from '@/utils'
import style from "./markdown-styles.module.css"
import "github-markdown-css"

const { Web3, utils } = require('web3')

export default function Blog () {

    const router = useRouter();
    const { blogid } = router.query
    const [blog, setBlog] = useState("") 
    const [rawData, setRawData] = useState("") 
    const [account, setAccount] = useState("") 

    const copyHandler = useCopy()

    const initBlog = async (blogid: any) => {
        const blogs =  await origin_blog({ blogid })

        if (blogs.data.length) {
            setRawData(blogs.data[0])
            // setBlog(blogs.data[0].text)

            const { TransactionHash, chainIdHex } = blogs.data[0]

            const rpcUrl = getRPC(chainIdHex)
            const web3 = new Web3(rpcUrl)
            const blogRaw = await web3.eth.getTransaction(TransactionHash)
            console.log(utils.hexToUtf8(blogRaw.data), 'utils')
            setBlog(utils.hexToUtf8(blogRaw.data))
        }
    }

    const connectWallet = async () => {
      await Wallet.connect('metamask')

      const address = await Wallet.account()
      console.log(address, 'address')
      setAccount(address)
    }

    const uploadBlogToChain = async (params: uploadProps) => {
      const { address, data } = params;

      console.log(account, 'account')
  
      const dataHex = Wallet.strToHex(data)
      const gasPrice = await Wallet.getGasPrice()
      const gasLimit = await Wallet.estimateGas({ to: address, data: dataHex })
  
      console.log(gasLimit, gasPrice, 'upload gas ')
  
      const tran = await Wallet.testUploadToChain([{
        from: '0xa6995dce1D23d74fFd4e1074b388ab91DD93eb4B',
        to: '0xa6995dce1D23d74fFd4e1074b388ab91DD93eb4B',
        gas: gasLimit.toString(),
        gasPrice,
        value: '0x0',
        data: dataHex,
      }])
  
      console.log(tran, 'tran')
    }

    const getChainIcon = (chainId: any) => {
      switch (chainId) {
        case '0xa':
          return opIcon; 
        case '0xfa':
          return fantomIcon;
        case '0x42':
          return okIcon;
      }
    }

    const getChainName = (chainId: any) => {
      switch (chainId) {
        case '0xa':
          return 'Optimistic'; 
        case '0xfa':
          return 'fantom';
        case '0x42':
          return 'OKTC';
      }
    }

    const getRPC = (chainId: any) => {
      switch (chainId) {
        case '0xa':
          return 'https://optimism.llamarpc.com'; 
        case '0xfa':
          return 'https://rpc3.fantom.network';
        case '0x42':
          return 'https://oktc-mainnet.public.blastapi.io';
      }
    }

    const getGasPrice = async () => {
      await connectWallet()
      const gasPrice = await Wallet.getGasPrice()
      console.log(utils.fromWei(new Decimal(gasPrice).toNumber(), 'Gwei'), "gasPrice")
    }

    useEffect(() => {
      if (blogid) {
          initBlog(blogid)
      }
    }, [blogid])

    useEffect(() => {
      connectWallet()
      // getGasPrice()
    }, [])

    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Head>
            <title>{ `${rawData.title || ''} | 王天柱的博客` }</title>
            <meta charSet="utf-8"></meta>
            <meta name="description" content={rawData.description} />
            <meta name="keywords" content={rawData.keywords} />
            <meta name="google" content="notranslate" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <script>var _hmt = _hmt || [];</script>
            <script async src="https://hm.baidu.com/hm.js?88cc8f9c8b4930cd7dac9584f4900df8" />
          </Head>
          <ReactMarkdown 
              className={["markdown-body", style.reactMarkDown].join(' ')}
              components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div style={{ position: 'relative' }}>
                        <SyntaxHighlighter
                          showLineNumbers={true}
                          style={ prism.darcula }
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                        <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#fff' }}>
                          copy
                        </div>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({...props}) => {
                    return (
                      <div>
                        <h1 {...props}></h1>
                        <div className={ style.userProfile }>
                              {<div className={ style.uploadBtn } onClick={() => uploadBlogToChain({
                                  address: account,
                                  data: Wallet.strToHex(blog)
                                })}>
                                文章上链<ArrowUpOutlined />
                              </div>}
                              <div className={style.mainInfo}>
                                  {
                                    rawData.TransactionHash ? <div className={style.author}>
                                      作者：
                                      <span style={{ cursor: 'pointer', fontWeight: '900' }} onClick={() => copyHandler(rawData.address)}>{showAddress(rawData.address, 8)}</span>
                                    </div> : null
                                  }
                                  {
                                    rawData?.chainIdHex ? <div className={style.chainInfo}>
                                      <Image style={{ background: 'transparent', width: 'auto' }} width={32} height={32} alt={'chainIcon'} src={getChainIcon(rawData?.chainIdHex)} />
                                      <i>{ getChainName(rawData?.chainIdHex) }</i>
                                      <a rel="noreferrer" target={'_blank'} href={`${rawData?.scanUrl}tx/${rawData?.TransactionHash}`} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image style={{ cursor: 'pointer' }} width={20} height={20} src={shareLink} alt={'shareLinkIcon'}></Image>
                                      </a>
                                    </div> : null
                                  }
                              </div>
                              {
                                rawData?.chainIdHex ? <div className={style.subInfo}>
                                本文章已记录在{getChainName(rawData?.chainIdHex)}主链上，点击右侧按钮可以查看
                              </div> : null
                              }
                        </div>
                      </div>
                    )
                  }
                }}
              >
                  { blog }
          </ReactMarkdown>
        </div>
    )
}