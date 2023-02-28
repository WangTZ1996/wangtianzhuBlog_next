// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Form, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Inter } from '@next/font/google'
import { PageHeader, BlogCard, LinkCard } from '@/components'
import type { BlogCardProps } from '@/components'
import styles from '@/styles/Home.module.css'
import listStyles from '@/styles/homeList.module.css'

import { collection_blogs } from "@/api";

import Wallet from '@/utils/wallet'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [newmsg, setNewmsg] = useState('');
  const [account, setAccount] = useState('');
  let [scrollNum, setScrollNum] = useState(0);
  const [timer, setTimer] = useState()

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
      blogid: '0',
      back: false,
      videoSrc: 'https://www.wangtz.cn/videos/carding.mp4',
      coverSrc: '',
      isAutoPlay: true,
      isMuted: true,
      isLoop: false,
      isFullScreen: true,
      isShowController: false,
      title: '日常卡丁车练习',
    },
    {
      blogid: '1',
      back: false,
      videoSrc: 'https://www.wangtz.cn/videos/carding.mp4',
      coverSrc: '',
      isAutoPlay: false,
      isMuted: true,
      isLoop: true,
      isShowController: false,
      isFullScreen: false,
      title: '日常卡丁车练习',
    },
    {
      blogid: '3',
      href: 'https://blog.csdn.net/weixin_44955769/article/details/114690661',
      type: 'tech_link',
      title: 'JavaScript 代码执行顺序（一目了然）_文i的博客-CSDN博客_js执行顺序',
      description: `前言之前对js的执行顺序一直搞得很迷茫，最近考虑换跳槽，又仔细回顾了下这块，又给捡起来了JavaScript 代码执行顺序1.  js的执行顺序，先同步后异步2.  异步中任务队列的执行顺序： 先微任务microtask队列，再宏任务macrotask队列(微任务优先级高于宏任务的前提是：同步代码已经执
行完成。)3. Promise 里边的代码属于同步代码，.then() 中执行的代码才属于异步代码微任务包括 process.nextTick ，promise ，MutationObser`,
      keywords: '',
      source: 'crawler'
    },
    {
      blogid: '2',
      back: false,
      videoSrc: 'https://www.wangtz.cn/videos/archery.mp4',
      coverSrc: '',
      isAutoPlay: false,
      isMuted: true,
      isLoop: false,
      isShowController: true,
      isFullScreen: false,
      title: 'shot shot shot',
    },
    {
      blogid: '4',
      href: 'https://blog.51cto.com/u_15127641/2874133',
      type: 'tech_link',
      title: 'Postfix + Dovecot + MySQL 搭建邮件服务器_51CTO博客_linux搭建postfix邮件服务器',
      description: `Postfix + Dovecot + MySQL 搭建邮件服务器，2015年写的老文章，之前的博客丢失之后恢复。虽然内容可能部分过时，再发出来希望能有
    点作用。网上有很多使用Postfix搭建邮件服务器的文章，但目前貌似没有看到较为完整的一篇。本例将尝试在Ubuntu系统中使用Postfix+Dovecot+MySQL搭建
    邮件服务。说到邮件服务器，网上有许多不同解决方案。Window操作系统下常见的邮件服务器有hMailServer、MailEnable、E`,
      keywords: 'Postfix + Dovecot + MySQL 搭建邮件服务器,MySQL博客,51CTO博客',
      source: 'crawler'
    }
  ]

  const connectWallet = async () => {
      await Wallet.connect('metamask')

      const address = await Wallet.account()
      setAccount(address)
  }

  const [blogsCover, setBlogsCover] = useState<BlogCardProps>(blogsData)
  const [blogs, setBlogs] = useState<BlogCardProps>([])

  const testApi = async () => {
    const data = await collection_blogs({})

    const temp = [...blogs, ...data.data]
    setBlogs(temp)
  }

  useEffect(() => {
    testApi()

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
      if (blogsCover[0].isFullScreen) {
        blogsCover[0].back = true

        let newBlogs = JSON.parse(JSON.stringify(blogsCover))
        setBlogsCover(newBlogs)

        let arr = []

        let t = setTimeout(() => {
          arr.forEach((ti) => {
            clearTimeout(ti)
          })
          window.onmousewheel = document.onmousewheel = () => {}

          blogsCover[0].isFullScreen = false
          blogsCover.splice(1, 1)

          let newBolgs = JSON.parse(JSON.stringify(blogsCover))

          setBlogsCover(newBolgs)
          setScrollNum(100)
        }, 2000);
        arr.push(t)
        setTimer(arr)
      }
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
          let newBolgs = blogsCover
          newBolgs[0].isFullScreen = false
          newBolgs.splice(1, 1)

          setBlogsCover(newBolgs)
        }
        let nw = (w - step * scrollNum) + 'px'
        video.style.width = nw
      } 
    }

    window.onmousewheel = document.onmousewheel = scrollFunc
  }, [])

  useEffect(() => {
    console.log(blogs, 'blogs')
  }, [blogs])

  return (
    <div id="pageOuter" className={listStyles.pageOuter}>
      <Head>
        <title>王天柱的博客</title>
        <meta name="description" content="王天柱的博客" />
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
                [...blogsCover, ...blogs].map((blogProps: BlogCardProps) => (
                  blogProps?.type === 'tech_link' ?
                  <LinkCard key={blogProps.blogid} {...blogProps}></LinkCard> :
                  <BlogCard background={`rgba(0, 0, 0, ${(totalStep - scrollNum) / totalStep})`} key={blogProps.blogid} {...blogProps}></BlogCard>
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
            <p className={listStyles.menu}>
              <a href="">技术剪报</a>|
              <a href="/crawler">爬虫</a>
            </p>
            <p className={listStyles.menu}>2023 王天柱 京ICP备19003625号</p>
          </div>
        </div>
      </main>
    </div>
  )
}
