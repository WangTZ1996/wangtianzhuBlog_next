// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prism from "react-syntax-highlighter/dist/cjs/styles/prism";
import * as hljs from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import { Button, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ethIcon from "@/assets/chain/eth.png";
import bnbIcon from "@/assets/chain/bnb.png";
import avaxIcon from "@/assets/chain/avax.png";
import polygonIcon from "@/assets/chain/polygon.png";
import arbIcon from "@/assets/chain/arbitrum.svg";
import celo from "@/assets/chain/celo.svg";
import defaultIcon from "@/assets/chain/default.svg";
import gnosisIcon from "@/assets/chain/gnosis.svg";
import opIcon from "@/assets/chain/op.png";
import fantomIcon from "@/assets/chain/fantom.png";
import okIcon from "@/assets/chain/OKTC.png";
import ConnectLoadingSVG from "@/assets/icons/loading.svg";

import Wallet from "@/utils/wallet";
import { showAddress, useCopy } from "@/utils";
import wallet_metamask_icon from "@/assets/icons/metamask.svg";
import style from "../blog/markdown-styles.module.css";
import ideStyle from "./markdown-ide-styles.module.css";
import "github-markdown-css";

export const ConnectWallet = (props) => {
  const {
    account,
    walletLoading,
    connectLoading,
    handelConnectWallet,
    uploadBlogToChain,
  } = props;

  return (
    <div style={{ width: "fitContent" }} className={ideStyle.uploadBtn}>
      {account ? (
        connectLoading ? (
          <img style={{ marginLeft: "0" }} src={ConnectLoadingSVG.src} />
        ) : (
          <div className={ideStyle.walletBtn} onClick={uploadBlogToChain}>
            链上铭刻 ⬆️
          </div>
        )
      ) : walletLoading ? (
        <LoadingOutlined className={ideStyle.walletLoadingIcon} />
      ) : (
        <div className={ideStyle.walletBtn} onClick={handelConnectWallet}>
          链接钱包
          <img src={wallet_metamask_icon.src} />
        </div>
      )}
    </div>
  );
};

export default function Blog() {
  const blogTemplate = `#`;

  const router = useRouter();
  const [blog, setBlog] = useState(blogTemplate);
  const [walletLoading, setWalletLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [rawData, setRawData] = useState("");
  const [account, setAccount] = useState("");
  const [curChainId, setCurChainId] = useState("");
  const [inputLines, setInputLines] = useState([
    { value: "", key: Date.now() },
    // { value: "自己写一个带行标的文本编辑器，简直难如登天😵", key: Date.now() },
    // { value: "", key: Date.now() + 1 },
    // {
    //   value: "2023年的最后一天了，终于把文本编辑器做到可用的程度了",
    //   key: Date.now() + 2,
    // },
    // { value: "", key: Date.now() + 3 },
    // { value: "希望从 2024 开始我能有睡后收入，加油⛽️", key: Date.now() + 4 },
    // { value: "", key: Date.now() + 5 },
  ]);
  const [chainList, setChainList] = useState([
    "0x1",
    "0xa",
    "0x38",
    "0x89",
    "0xa86a",
    "0xa4b1",
    "0x64",
    "0xfa",
    "0x42",
  ]);
  const [transHex, setTransHex] = useState('')

  const curLineIndex = useRef(0);
  const selectionPosition = useRef(0);
  const curInputEl = useRef(null);

  const copyHandler = useCopy();

  const deleteLine = (index, text) => {
    if (index === 0 && inputLines.length === 1) return 
    let temp = inputLines;
    temp.splice(index, 1);
    temp.forEach((data, i) => {
      if(i === index - 1) {
        data.value += text || ''
        selectionPosition.current = data.value.length;
        console.log(data.value.length, 'selectionStart')
      }
    })

    setInputLines([...temp]);
  };

  const connectWallet = async () => {
    setWalletLoading(true);

    setTimeout(async () => {
      await Wallet.connect("metamask");
      const address = await Wallet.account();
      const chainId = await Wallet.chainId();

      setAccount(address);
      setCurChainId(chainId);
      setWalletLoading(false);
    }, 1500);
  };

  const getTextData = () => {
    const lineArr = inputLines.map((line) => line.value);

    const text = lineArr.join("\n");
    console.log(text, "textData");
    return text;
  };

  const uploadBlogToChain = async () => {
    try {
      setConnectLoading(true);
      const address = account;
      const text = getTextData();
      const data = Wallet.strToHex(text);

      const dataHex = Wallet.strToHex(data);
      const gasPrice = await Wallet.getGasPrice();
      const gasLimit = await Wallet.estimateGas({
        to: address || addr,
        data: dataHex,
      });
      console.log(gasPrice, gasLimit, 'gas')

      const tran = await Wallet.testUploadToChain([
        {
          from: account,
          to: account,
          gas: gasLimit.toString(),
          gasPrice,
          value: "0x0",
          data: dataHex,
        },
      ]);

      setConnectLoading(false);
      setTransHex(tran)
      console.log(tran, "tran");
    } catch (ex) {
      setConnectLoading(false);
      console.log(ex);
    }
  };

  const getChainIcon = (chainId: any) => {
    switch (chainId) {
      case "0x1":
        return ethIcon;
      case "0xa":
        return opIcon;
      case "0x38":
        return bnbIcon;
      case "0x89":
        return polygonIcon;
      case "0xa86a":
        return avaxIcon;
      case "0xa4b1":
        return arbIcon;
      case "0x64":
        return gnosisIcon;
      case "0xfa":
        return fantomIcon;
      case "0x42":
        return okIcon;
      default:
        return defaultIcon;
    }
  };

  const getChainName = (chainId: any) => {
    switch (chainId) {
      case "0x1":
        return "Ethereum";
      case "0xa":
        return "Optimistic";
      case "0x38":
        return "BNB Smart Chain";
      case "0x89":
        return "polygon";
      case "0xa86a":
        return "Avalanche";
      case "0xa4b1":
        return "Arbitrum One";
      case "0x64":
        return "gnosis";
      case "0xfa":
        return "fantom";
      case "0x42":
        return "OKTC";
      default:
        return chainId;
    }
  };

  const getRPC = (chainId: any) => {
    switch (chainId) {
      case "0xa":
        return "https://optimism.llamarpc.com";
      case "0xfa":
        return "https://rpc3.fantom.network";
      case "0x42":
        return "https://oktc-mainnet.public.blastapi.io";
    }
  };

  const updateLineText = (lineIndex, newLines, newText) => {
    const temp = newLines;
    temp.forEach((line, index) => {
      if (index === lineIndex) {
        line.value = newText;
      }
    });

    setInputLines([...temp]);
  };

  const cursorAutoFocus = (index) => {
    const id = `lineInput${index}`;

    const inputDom = document.getElementById(id);
    inputDom?.focus();
  };

  const addLine = (e) => {
    e.preventDefault()
    let originIndex = curLineIndex.current;
    if (selectionPosition.current >= 0) {
      curLineIndex.current = curLineIndex.current + 1;
    }

    let rowText = inputLines.find((line, index) => index === originIndex);

    const leftText = rowText?.value?.slice(0, selectionPosition.current);
    const rightText = rowText?.value?.slice(selectionPosition.current);

    console.log(selectionPosition.current, leftText, rightText, "addLine");

    const newLines = inputLines;
    newLines.splice(curLineIndex.current, 0, {
      value: rightText,
      key: Date.now(),
    });
    updateLineText(
      leftText ? curLineIndex.current - 1 : curLineIndex.current,
      newLines,
      leftText || ""
    );

    // 如果加一个新行，重置光标位置
    selectionPosition.current = 0;

    // if (leftText) {
    //   Promise.resolve().then(() => cursorAutoFocus(curLineIndex.current))
    // }

    Promise.resolve().then(() => cursorAutoFocus(curLineIndex.current));

    console.log(inputLines, "inputLines");
  };

  const deleteLineText = async (e) => {
    if (selectionPosition.current === 0 && curLineIndex.current !== 0) {
      e.preventDefault()
      const curLineData = inputLines.find(
        (line, index) => index === curLineIndex.current
      );
      deleteLine(curLineIndex.current, curLineData.value)

      curLineIndex.current =
        curLineIndex.current === 0 ? 0 : curLineIndex.current - 1;

      Promise.resolve().then(() => cursorAutoFocus(curLineIndex.current));
    }
  };

  const handleOnKeyDown = (event) => {
    var keyNum = window.event ? event.keyCode : event.which;

    if (keyNum == 13) {
      addLine(event);
    }
    if (keyNum == 37) {
      selectionPosition.current = selectionPosition.current - 1 > 0 ? selectionPosition.current - 1 : 0;
    }
    if (keyNum == 39) {
      selectionPosition.current = selectionPosition.current + 1;
    }
    if (keyNum == 38) {
      curLineIndex.current =
        curLineIndex.current === 0 ? 0 : curLineIndex.current - 1;
      selectionPosition.current = 0;
      cursorAutoFocus(curLineIndex.current);
    }
    if (keyNum == 40) {
      curLineIndex.current =
        curLineIndex.current >= inputLines.length - 1
          ? inputLines.length - 1
          : curLineIndex.current + 1;
      // selectionPosition.current = -1
      cursorAutoFocus(curLineIndex.current);
    }
    if (keyNum == 8) {
      if (inputLines.length > 1) {
        Promise.resolve().then(() => deleteLineText(event));
      }
    }
  };

  const handleClickInput = (e, lineIndex) => {
    curInputEl.current = e.target;
    curLineIndex.current = lineIndex;
    selectionPosition.current = e.target.selectionStart;
  };

  const handleInputChange = (e, lineIndex) => {
    console.log(e, lineIndex, "handleInputChange");
    selectionPosition.current = e.target.selectionStart;

    const temp = inputLines;
    temp.forEach((line, index) => {
      if (index === lineIndex) {
        line.value = e.target.value;
      }
    });

    setInputLines([...temp]);
  };

  const handlePreview = () => {
    const text = getTextData();
    setBlog(["#", text].join("\n"));
  };

  const addKeyBoardListener = () => {
    document.onkeydown = handleOnKeyDown;
  };

  const switchChain = async (chainId) => {
    setIsShowModal(false)
    await Wallet.switchEthereumChain(chainId)
    const id = await Wallet.chainId();

    setCurChainId(id);
  }

  const accountChangeCallback = (account) => {
    console.log(account, 'account changed')
    setAccount(account)
  }

  useEffect(() => {
    addKeyBoardListener();
    Wallet.addAccountChangeListener(accountChangeCallback)
  }, []);

  useEffect(() => {
    if (!!account) {
      // setInterval(() => {
      //   Wallet.getBlcokNumber().then((res) => {
      //     console.log(parseInt(res), 'getBlcokNumber')
      //   })
      // }, 1000)
    }
  }, [account])

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Head>
        <title>{`🪙铭刻中心 | 王天柱的博客`}</title>
        <meta charSet="utf-8"></meta>
        <meta name="description" content={rawData.description} />
        <meta name="keywords" content={rawData.keywords} />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script>var _hmt = _hmt || [];</script>
        <script
          async
          src="https://hm.baidu.com/hm.js?88cc8f9c8b4930cd7dac9584f4900df8"
        />
      </Head>
      <ReactMarkdown
        className={["markdown-body", ideStyle.reactMarkDown].join(" ")}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div style={{ position: "relative" }}>
                <SyntaxHighlighter
                  showLineNumbers={true}
                  style={prism.darcula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#fff",
                  }}
                >
                  copy
                </div>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ ...props }) => {
            return (
              <div>
                <h1 {...props}>
                  <input
                    placeholder="请输入标题"
                    value={"结绳记事🎆"}
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "0 12px",
                      width: "100%",
                    }}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </h1>
                <div
                  style={{ marginBottom: "0" }}
                  className={style.userProfile}
                >
                  <div className={ideStyle.btnBox}>
                    {/* <div onClick={handlePreview} className={ideStyle.leftBtns}>preview</div> */}
                    <ConnectWallet
                      account={account}
                      walletLoading={walletLoading}
                      connectLoading={connectLoading}
                      handelConnectWallet={connectWallet}
                      uploadBlogToChain={uploadBlogToChain}
                    />
                  </div>
                  <div style={{ marginTop: "10px" }} className={style.mainInfo}>
                    {account ? (
                      <div className={style.author}>
                        当前地址：
                        <span
                          style={{ cursor: "pointer", fontWeight: "900" }}
                          onClick={() => copyHandler(account)}
                        >
                          {showAddress(account, 8)}
                        </span>
                      </div>
                    ) : null}
                    {curChainId ? (
                      <div className={ideStyle.chainInfo}>
                        <Image
                          style={{
                            background: "transparent",
                            width: "auto",
                            borderRadius: "100px",
                          }}
                          width={32}
                          height={32}
                          alt={"chainIcon"}
                          src={getChainIcon(curChainId)}
                        />
                        <i>{getChainName(curChainId)}</i>
                        <span
                          onClick={() => setIsShowModal(true)}
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        >
                          🔃
                        </span>
                      </div>
                    ) : null}
                  </div>
                  {rawData?.chainIdHex ? (
                    <div className={style.subInfo}>
                      本文章已记录在{getChainName(rawData?.chainIdHex)}
                      主链上，点击右侧按钮可以查看
                    </div>
                  ) : null}
                </div>
              </div>
            );
          },
        }}
      >
        {blog}
      </ReactMarkdown>
      <div className={ideStyle.editorBox}>
      <div style={{ color: '#aaa', marginTop: '0', marginBottom: '16px', fontSize: '12px' }}>👇本工具仅提供铭文铭刻功能，铭刻前需先确认铭文币种是否还可铭刻，铭刻后请到对应链页面查看铭文余额</div>
        {inputLines.map((line, index) => (
          <div key={line.key} className={ideStyle.inputLineBox}>
            <div
              onClick={() => deleteLine(index)}
              className={ideStyle.lineIndex}
            >
              {index + 1}
            </div>
            {/* <input
              value={line.value}
              placeholder={index === 0 ? '例如：data:,{"p":"asc-20","op":"mint","tick":"ShenLong","amt":"1"}' : ''}
              autoComplete={"off"}
              type="text"
              name=""
              id={`lineInput${index}`}
              onClick={(e) => handleClickInput(e, index)}
              onChange={(e) => handleInputChange(e, index)}
            /> */}
            <p 
              value={line.value}
              contentEditable="true" 
              id={`lineInput${index}`} 
              className={ideStyle.inputDiv}
              onClick={(e) => handleClickInput(e, index)}
              onChange={(e) => handleInputChange(e, index)}/>
          </div>
        ))}
      </div>
      <Modal
        open={isShowModal}
        width={400}
        footer={null}
        onCancel={() => setIsShowModal(false)}
      >
        <div>
          <h3>切换主链</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            {chainList.map((chainId) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: 'pointer'
                }}
                onClick={() => switchChain(chainId)}
                key={chainId}
              >
                <Image
                  style={{
                    width: "24px",
                    height: "24px",
                    background: "transparent",
                    borderRadius: "100px",
                  }}
                  src={getChainIcon(chainId)}
                  alt=""
                />
                <span style={{ fontWeight: '900' }}>{getChainName(chainId)}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
