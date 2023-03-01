// @ts-nocheck
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { LinkCard } from '@/components'
import bugbtn from '@/assets/icons/bug.png'

import { fetch_blog } from '@/api'
import styles from './index.module.css'

export default function Crawler () {

    const [res, setRes] = useState(null)
    const [crawlerStart, setCrawlerStart] = useState(false)
    const [processDone, setProcessDone] = useState(false)

    const [form] = Form.useForm()

    const startFetch = async () => {
        setCrawlerStart(true)

        const { fetchUrl } = form.getFieldValue()

        const fetchRes = await fetch_blog({ url: fetchUrl })

        if (fetchRes.code === 0) {
            let data = fetchRes.data

            for (let key in data) {
                data[key] = data[key] + '\n'
            }

            setRes(data)
            setProcessDone(true)
        }
    }

    return (
        <div className={styles.crawler_page}>
            <Head>
                <title>王天柱的博客</title>
                <meta name="description" content="王天柱的博客，数据采集页" />
                <meta name="google" content="notranslate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image className={styles.crawler_banner} alt="banner" src={'https://www.wangtz.cn/image/crawler_btn.jpeg'} width={280} height={280}></Image>
            <div className={styles.crawler_input}>
                {
                    crawlerStart ? <div className={[styles.crawler_processBar, styles.processing, processDone ? styles.processDone : null].join(' ')}>
                        <div className={[styles.crawler_processLine].join(' ')}></div>
                        <Image className={styles.crawler_searchBtn} src={bugbtn} alt={'searcherBtn'} width={32} height={32} />
                    </div> : <Image onClick={startFetch} className={styles.crawler_searchBtn} src={bugbtn} alt={'searcherBtn'} width={32} height={32} />
                }
                <Form form={form} style={{ flex: 1 }}>
                    <Form.Item name={'fetchUrl'} style={{ marginBottom: 0 }}>
                        <input autoComplete="off"/>
                    </Form.Item>
                </Form>
                <SearchOutlined style={{ marginRight: '8px', marginLeft: '10px', color: '#aaa' }} />
            </div>
            { res ? <div className={styles.crawler_resData}>
                <LinkCard {...res}></LinkCard>
            </div> : null}
        </div>
    )
}