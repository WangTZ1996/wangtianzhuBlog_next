// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Inter } from '@next/font/google'
import { PageHeader, BlogCard } from '@/components'
import type { BlogCardProps } from '@/components'
import styles from '@/styles/Home.module.css'
import listStyles from '@/styles/homeList.module.css'

import Wallet from '@/utils/wallet'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [newmsg, setNewmsg] = useState('');
  const [account, setAccount] = useState('');
  let [scrollNum, setScrollNum] = useState(0);

  const totalStep = 100

  const msgList = [
    'Hello我是王天柱',
    '一个爱画画的前端程序员',
    '欢迎来到我的博客',
    '向下滚动鼠标即可退出全屏播放',
    '我喜欢做一些有意思的东西',
    '我会在这里分享出来',
    '如果你也和我一样',
    '希望我的博客能对你有帮助',
    '我们一同进步！',
  ]

  const blogsData = [
    {
      id: '0',
      videoSrc: 'https://www.wangtz.cn/videos/carding.mp4',
      coverSrc: '',
      isAutoPlay: true,
      isMuted: true,
      isLoop: false,
      isFullScreen: true,
      title: '日常卡丁车练习',
    },
    {
      id: '1',
      videoSrc: 'https://www.wangtz.cn/videos/carding.mp4',
      coverSrc: '',
      isAutoPlay: false,
      isMuted: true,
      isLoop: true,
      isFullScreen: false,
      title: '日常卡丁车练习',
    },
    {
      id: '2',
      videoSrc: 'https://www.wangtz.cn/videos/archery.mp4',
      coverSrc: '',
      isAutoPlay: false,
      isMuted: true,
      isLoop: false,
      isFullScreen: false,
      title: 'shot shot shot',
    },
  ]

  // const initMETAMASKListener = async () => {
  //   if (Wallet) {
  //     Wallet.addChainChangeListener(updateWallet)
  //     Wallet.addAccountChangeListener(updateWallet)
  //   }
  // }

  const connectWallet = async () => {
      await Wallet.connect('metamask')

      const address = await Wallet.account()
      setAccount(address)
  }

  const [blogs, setBlogs] = useState<BlogCardProps>(blogsData)

  useEffect(() => {
    msgList.forEach((msg: string, index: number) => {
      setTimeout(() => {
        setNewmsg(msg)
      }, 3000 * (index));
    })
    
    let video = window.document.getElementsByTagName('video')[0]

    let w = window.innerWidth
    let step = (w - 660) / totalStep;

    video.addEventListener('ended', () => {
      console.log('video end')
    })

    function scrollFunc(e) {
      e = e || window.event;
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          scrollNum > 0 && setScrollNum(scrollNum --)
        }
        if (e.wheelDelta < 0) {
          scrollNum < totalStep && setScrollNum(scrollNum ++)
        }
        if (scrollNum === totalStep) {
          window.onmousewheel = document.onmousewheel = () => {}
          let newBolgs = blogs
          newBolgs[0].isFullScreen = false
          newBolgs.splice(1, 1)

          setBlogs(newBolgs)
        }
        let nw = (w - step * scrollNum) + 'px'
        video.style.width = nw
      } 
    }
    window.onmousewheel = document.onmousewheel = scrollFunc
  }, [])

  return (
    <div id="pageOuter" className={listStyles.pageOuter}>
      <Head>
        <title>王天柱的blog</title>
        <meta name="description" content="王天柱的blog" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <PageHeader msg={newmsg} connectWallet={connectWallet} account={account} />
        <div className={listStyles.content}>
          <div className={listStyles.leftMenu}>
            <div className={listStyles.searcher}>
              <SearchOutlined style={{ marginRight: '8px', color: '#aaa' }} />
              <Form style={{ flex: 1 }}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <input />
                </Form.Item>
              </Form>
            </div>
            <div className={listStyles.classesIcon}>
              <div className={listStyles.iconColumn}>
                <Image width={32} height={32} src="https://www.wangtz.cn/image/git.png" alt="icon" />
                <Image width={40} height={40} src="https://www.wangtz.cn/image/Frame.png" alt="icon" />
                <Image width={32} height={32} src="https://www.wangtz.cn/image/react.png" alt="icon" />
              </div>
              <div className={listStyles.iconColumn}>
                <Image width={40} height={40} src="https://www.wangtz.cn/image/css.png" alt="icon" />
                <Image width={48} height={48} src="https://www.wangtz.cn/image/html.png" alt="icon" />
                <Image width={48} height={48} src="https://www.wangtz.cn/image/js.png" alt="icon" />
                <Image width={40} height={40} src="https://www.wangtz.cn/image/node.png" alt="icon" />
              </div>
              <div className={listStyles.iconColumn}>
                <Image width={32} height={32} src="https://www.wangtz.cn/image/mongodb.png" alt="icon" />
                <Image width={40} height={40} src="https://www.wangtz.cn/image/vue.png" alt="icon" />
                <Image width={32} height={32} src="https://www.wangtz.cn/image/ts.jpg" alt="icon" />
              </div>
            </div>
          </div>
          <div className={listStyles.contentList}>
            <div className={listStyles.contentListInner}>
              {
                blogs.map((blogProps: BlogCardProps) => (
                  <BlogCard background={`rgba(0, 0, 0, ${(totalStep - scrollNum) / totalStep})`} key={blogProps.id} {...blogProps}></BlogCard>
                ))
              }
            </div>
          </div>
          <div className={listStyles.rightBar}>
            <p className={listStyles.menu}>
              <a href="https://www.wangtz.cn/resume">关于我</a>|
              <a href="">开放api服务</a>|
              <a href="https://www.wangtz.cn/dailymd">在线markdown编辑器</a>|
              <a href="">下载应用</a>
            </p>
            <p className={listStyles.menu}>2023 王天柱 京ICP备19003625号</p>
          </div>
        </div>
      </main>
    </div>
  )
}
