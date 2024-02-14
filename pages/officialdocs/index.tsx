// @ts-nocheck
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "./index.module.css";

export default function OfficialDocs() {
  const [dataList, setDataList] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResult, serSearchResult] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  const data = [
    {
      category: "browser",
      label: "浏览器",
      list: [
        {
          type: "browser",
          label: "javascript v8 官网",
          url: "https://v8.dev/",
        },
        {
          type: "browser",
          label: "chrome 官方文档",
          url: "https://developer.chrome.com/docs/devtools?hl=zh-cn",
        },
        {
          type: "browser",
          label: "chrome 浏览器插件官方文档",
          url: "https://developer.chrome.com/docs/extensions?hl=zh-cn",
        },
      ],
    },
    {
      category: "frontend",
      label: "前端开发",
      list: [
        {
          type: "frontend",
          label: "W3C 官网",
          url: "https://www.w3.org/",
        },
        {
          type: "frontend",
          label: "W3C中国",
          url: "https://www.chinaw3c.org/standards.html",
        },
        {
          type: "frontend",
          label: "MDN 官方文档中文",
          url: "https://developer.mozilla.org/zh-CN/docs/Learn",
        },
        {
          type: "frontend",
          label: "react 官方文档",
          url: "https://react.dev/",
        },
        {
          type: "frontend",
          label: "react 官方中文文档",
          url: "https://react.docschina.org/",
        },
        {
          type: "frontend",
          label: "vue3 官方文档",
          url: "https://vuejs.org/guide/introduction.html",
        },
        {
          type: "frontend",
          label: "vue3 官方文档中文",
          url: "https://cn.vuejs.org/guide/introduction",
        },
        {
          type: "frontend",
          label: "vue2 官方文档",
          url: "https://v2.cn.vuejs.org/",
        },
        {
          type: "frontend",
          label: "tailwindcss 官方中文文档",
          url: "https://www.tailwindcss.cn/docs/installation",
        },
        {
          type: "frontend",
          label: "next 官方文档",
          url: "https://nextjs.org/docs",
        },
        {
          type: "frontend",
          label: "nextjs 中文文档",
          url: "https://www.nextjs.cn/docs",
        },
        {
          type: "frontend",
          label: "nuxt 官方文档中文",
          url: "https://nuxt.com/docs/getting-started/introduction",
        },
        {
          type: "frontend",
          label: "solidjs 官方文档",
          url: "https://www.solidjs.com/docs/latest/api",
        },
        {
          type: "frontend",
          label: "svelte 官方文档",
          url: "https://svelte.dev/docs/introduction",
        },
        {
          type: "frontend",
          label: "elementUI 官网",
          url: "https://element.eleme.io/2.13/#/zh-CN",
        },
        {
          type: "frontend",
          label: "ant design 官方文档中文",
          url: "https://ant.design/index-cn",
        },
        {
          type: "frontend",
          label: "webpack 官方文档",
          url: "https://webpack.js.org/concepts/",
        },
        {
          type: "frontend",
          label: "vite 官方文档",
          url: "https://vitejs.dev/",
        },
        {
          type: "frontend",
          label: "parcel 中文网",
          url: "https://parcel.nodejs.cn/",
        },
        {
          type: "frontend",
          label: "echarts 官网",
          url: "https://echarts.apache.org/zh/index.html",
        },
        {
          type: "frontend",
          label: "cesium 官网",
          url: "https://www.cesium.com/",
        },
        {
          type: "frontend",
          label: "cesium 官方文档",
          url: "https://www.cesium.com/learn/",
        },
        {
          type: "frontend",
          label: "threejs 官网",
          url: "https://threejs.org/",
        },
        {
          type: "frontend",
          label: "threejs 官方文档",
          url: "https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene",
        },
        {
          type: "frontend",
          label: "sass 官网",
          url: "https://sass-lang.com/",
        },
        {
          type: "frontend",
          label: "sass 中文网",
          url: "https://www.sass.hk/",
        },
        {
          type: "frontend",
          label: "less 官网",
          url: "https://lesscss.org/",
        },
        {
          type: "frontend",
          label: "less 中文网",
          url: "https://less.bootcss.com/",
        },
        {
          type: "frontend",
          label: "lerna 官网",
          url: "https://lerna.js.org/",
        },
      ],
    },
    {
      category: "backend",
      label: "后端开发",
      list: [
        {
          type: "backend",
          label: "nodejs 官网",
          url: "https://nodejs.org/en",
        },
        {
          type: "backend",
          label: "nodejs 官方文档",
          url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
        },
        {
          type: "backend",
          label: "nodejs 中文网",
          url: "https://nodejs.p2hp.com/",
        },
        {
          type: "backend",
          label: "expressjs 官网",
          url: "https://expressjs.com/",
        },
        {
          type: "backend",
          label: "expressjs 中文网",
          url: "https://www.expressjs.com.cn/",
        },
        {
          type: "backend",
          label: "koa 官网中文",
          url: "https://www.koajs.cn/",
        },
        {
          type: "backend",
          label: "spring 官网 spring-boot",
          url: "https://spring.io/projects/spring-boot/",
        },
        {
          type: "backend",
          label: "flask 官方文档",
          url: "https://flask.palletsprojects.com/en/3.0.x/",
        },
        {
          type: "backend",
          label: "django 官网",
          url: "https://www.djangoproject.com/",
        },
        {
          type: "backend",
          label: "django 官方文档",
          url: "https://docs.djangoproject.com/en/5.0/",
        },
        {
          type: "backend",
          label: "flask 官方文档",
          url: "https://flask.palletsprojects.com/en/3.0.x/",
        },
        {
          type: "backend",
          label: "flask 官方文档",
          url: "https://flask.palletsprojects.com/en/3.0.x/",
        },
        {
          type: "backend",
          label: "docker 官网",
          url: "https://www.docker.com/",
        },
        {
          type: "backend",
          label: "docker 官方文档",
          url: "https://docs.docker.com/",
        },
        {
          type: "backend",
          label: "zookeeper 官网",
          url: "https://zookeeper.com/",
        },
      ],
    },
    {
      category: "native",
      label: "原生",
      list: [
        {
          type: "native",
          label: "electron 官网",
          url: "https://www.electronjs.org",
        },
        {
          type: "native",
          label: "electron 官方文档",
          url: "https://www.electronjs.org/docs/latest",
        },
        {
          type: "native",
          label: "electron 中文文档",
          url: "https://electronjs.p2hp.com/docs/latest/index.html",
        },
        {
          type: "native",
          label: "flutter 官网",
          url: "https://flutter.dev/",
        },
        {
          type: "native",
          label: "reactnative 官方文档",
          url: "https://reactnative.dev/docs/getting-started",
        },
        {
          type: "native",
          label: "reactnative 中文网",
          url: "https://reactnative.cn/",
        },
        {
          type: "native",
          label: "weex 官网",
          url: "https://weexapp.com/",
        },
        {
          type: "native",
          label: "uniapp 官网",
          url: "https://uniapp.dcloud.net.cn/",
        },
      ],
    },
    {
      category: "system",
      label: "系统",
      list: [
        {
          type: "system",
          label: "linux 官网",
          url: "https://www.linux.org/",
        },
        {
          type: "system",
          label: "w3c school linux 官方文档",
          url: "https://www.w3cschool.cn/linux/dict.html",
        },
        {
          type: "system",
          label: "git 官网",
          url: "https://git-scm.com/",
        },
        {
          type: "system",
          label: "git 官方文档",
          url: "https://git-scm.com/doc",
        },
      ],
    },
    {
      category: 'trading',
      label: '交易',
      list: [
        {
          type: 'trading',
          label: 'klinecharts 官网',
          url: 'https://klinecharts.com'
        },
        {
          type: 'trading',
          label: 'klinecharts 官方文档',
          url: 'https://klinecharts.com/guide/what-is-klinechart.html'
        },
        {
          type: 'trading',
          label: 'tradingview 官网',
          url: 'https://www.tradingview.com/'
        }
      ]
    },
    {
      category: "blockchain",
      label: "区块链",
      list: [
        {
          type: "blockchain",
          label: "bitcoin 官方文档",
          url: "https://developer.bitcoin.org/",
        },
        {
          type: "blockchain",
          label: "ethereum 官网",
          url: "https://ethereum.org/en/",
        },
        {
          type: "blockchain",
          label: "ethereum 官方文档",
          url: "https://ethereum.org/en/developers/docs/",
        },
        {
          type: "blockchain",
          label: "remix 官网",
          url: "https://remix.ethereum.org/",
        },
        {
          type: "blockchain",
          label: "metamask 官网",
          url: "https://metamask.io/",
        },
        {
          type: "blockchain",
          label: "metamask 官方文档",
          url: "https://docs.metamask.io/",
        },
        {
          type: "blockchain",
          label: "uniswap 官方文档",
          url: "https://docs.uniswap.org/",
        },
        {
          type: "blockchain",
          label: "web3js 官网",
          url: "https://web3js.org/"
        },
        {
          type: "blockchain",
          label: "web3js 官方文档",
          url: "https://docs.web3js.org/"
        },
        {
          type: "blockchain",
          label: "truffle 官网",
          url: "https://trufflesuite.com/"
        },
        {
          type: "blockchain",
          label: "truffle 官方文档",
          url: "https://trufflesuite.com/docs/"
        },
        {
          type: "blockchain",
          label: "ganache 官网",
          url: "https://trufflesuite.com/ganache/"
        },
        {
          type: "blockchain",
          label: "openzeppelin 官网",
          url: "https://www.openzeppelin.com/contracts"
        },
        {
          type: "blockchain",
          label: "ethers 中文文档-登链社区",
          url: "https://learnblockchain.cn/ethers_v5/"
        },
        {
          type: "blockchain",
          label: "coingecko api 官方文档",
          url: "https://www.coingecko.com/api/documentation"
        },
        {
          type: "blockchain",
          label: "coinmarketcap api 官方文档",
          url: "https://coinmarketcap.com/api/documentation/v1/"
        },
      ],
    },
    {
      category: 'game',
      label: '游戏引擎',
      list: [
        {
          type: "game",
          label: "cocos 官网",
          url: "https://www.cocos.com/",
        },
        {
          type: "game",
          label: "cocos 官方文档",
          url: "https://docs.cocos.com/creator/manual/zh/",
        },
      ]
    }
  ];
  const categoryList = [
    {
      label: "浏览器",
      key: "browser",
    },
    {
      label: "前端开发",
      key: "frontend",
    },
    {
      label: "后端开发",
      key: "backend",
    },
    {
      label: "原生开发",
      key: "native",
    },
    {
      label: "系统",
      key: "system",
    },
    {
      label: '交易',
      key: 'trading'
    },
    {
      label: "区块链",
      key: "blockchain",
    },
    {
      label: "游戏引擎",
      key: "game",
    }
  ];

  const handleAnchor = (type) => {
    try {
      const el = document.getElementById(type);
      el?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (ex) {}
  };

  const searchInputChange = (e) => {
    const inputStr = e.target.value;
    setSearchStr(inputStr);
    const reg = new RegExp(inputStr);
    const resList = dataList.filter((item) => reg.test(item.abstract));

    serSearchResult(resList);
  };

  const searchList = () => {
    const allList = data.map((item) => item.list).flat();

    allList.forEach(
      (item) => (item.abstract = `${item.type} ${item.label} ${item.url}`)
    );
    setDataList(allList);
  };

  useEffect(() => {
    searchList();
  }, []);

  return (
    <div>
      <Head>
        <title>{`官方文档汇总|王天柱的博客`}</title>
        <meta charSet="utf-8"></meta>
        <meta name="description" content={"official docs, 官方文档集合"} />
        <meta name="keywords" content={"official docs, 官方文档集合"} />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script>var _hmt = _hmt || [];</script>
        <script
          async
          src="https://hm.baidu.com/hm.js?88cc8f9c8b4930cd7dac9584f4900df8"
        />
      </Head>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerMail}>
            <span>📧</span>
            联系我
            <a href="mailto:wangtianzhu@wangtz.cn">：wangtianzhu@wangtz.cn</a>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.inputBox}>
            <div
              onClick={() => setShowSearchModal(true)}
              className={styles.searchBtn}
            >
              搜索文档
            </div>
          </div>
          <div className={styles.menus}>
            <div className={styles.menusList}>
              {categoryList.map((item) => (
                <div
                  onClick={() => handleAnchor(item.key)}
                  className={styles.categoryIndex}
                  key={item.key}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.listContent}>
            <div className={styles.sliderBar}>
              <ul>
                {categoryList.map((item) => (
                  <li
                    onClick={() => handleAnchor(item.key)}
                    className={styles.categoryIndex}
                    key={item.key}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.list}>
              {data.map((item) => (
                <div key={item.category}>
                  <h4 id={item.category} className={styles.title4}>
                    {item.label}
                  </h4>
                  <div>
                    {item.list.map((lsitItem) => (
                      <div key={lsitItem.url} className={styles.link}>
                        <a href={lsitItem.url}>
                          {`${lsitItem.label}(${lsitItem.url})`}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className={styles.listFooter}>
                <div className={styles.listFooterTitle}>贡献者</div>
                <div className={styles.listFooterItem}>@charon.wang</div>
              </div>
            </div>
          </div>
        </div>
        {showSearchModal ? (
          <div
            onClick={() => setShowSearchModal(false)}
            className={styles.searchModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.searchContent}
            >
              <div className={styles.inputBox}>
                <input
                  className={styles.searchInput}
                  placeholder="搜索文档"
                  autoFocus
                  onChange={(e) => searchInputChange(e)}
                ></input>
              </div>
              {!!searchStr ? (
                <div className={styles.searchModalList}>
                  {searchResult.map((item, i) => (
                    <div className="" key={item.url + i}>
                      <a href={item.url}>{`${item.label}(${item.url})`}</a>
                    </div>
                  ))}
                </div>
              ) : null}
              <div
                onClick={() => setShowSearchModal(false)}
                className={styles.modalCloseBtn}
              >
                ❌️
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
