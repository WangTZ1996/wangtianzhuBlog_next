// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { PageHeader, BlogCard } from '@/components'
import type { BlogCardProps } from '@/components'
import styles from '@/styles/Home.module.css'
import listStyles from '@/styles/homeList.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [newmsg, setNewmsg] = useState('');
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

  const [blogs, setBlogs] = useState<BlogCardProps>(blogsData)

  useEffect(() => {
    msgList.forEach((msg: string, index: number) => {
      setTimeout(() => {
        setNewmsg(msg)
      }, 3000 * (index));
    })
  }, [])

  useEffect(() => {
    let video = window.document.getElementsByTagName('video')[0]

    let w = window.innerWidth
    let step = (w - 660) / totalStep;

    video.addEventListener('ended', () => {
      console.log('video end')
    })

    function scrollFunc(e) {
      // e存在就用e不存在就用windon.event
      e = e || window.event;
      // 先判断是什么浏览器
      if (e.wheelDelta) {
        // 浏览器IE，谷歌
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <PageHeader msg={newmsg} />
        <div className={listStyles.content}>
          <div className={listStyles.leftMenu}>

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

          </div>
        </div>
      </main>
    </div>
  )
}
