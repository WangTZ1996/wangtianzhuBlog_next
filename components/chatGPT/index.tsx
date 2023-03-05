// @ts-nocheck
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import { Form } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import ReactMarkdown from "react-markdown"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as prism from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { testChatGPT } from "@/api";
import styles from './index.module.css'

export const CartGPTCard = () => {
    const [dialogues, setDialogues] = useState<any>([])
    const [gptLoading, setGptLoading] = useState<any>(false)
    const [form] = Form.useForm()
    const question = Form.useWatch('question', form)

    const askGPT = async () => {
        let tempQ = [...dialogues, `我：${question}\n`]
        setDialogues(tempQ)
        setGptLoading(true)
        const answer: any = await testChatGPT(question)
        setGptLoading(false)

        console.log(answer.choices[0].text, 'answer')

        tempQ.push(answer.choices[0].text)
        setDialogues([...tempQ])
    }

    return (
        <div className={styles.chatGPTCard}>
            <div className={styles.header}>
                <div className={styles.label}>
                <Image width={20} height={20} src="https://www.wangtz.cn/image/chatGPT.png" alt="icon" />
                    ChatGPT
                </div>
            </div>
            <div className={styles.content}>
                <pre className={styles.session}>
                    { gptLoading ? <div>chatGPT ...</div> : null}
                    {
                        <ReactMarkdown 
                            style={{ width: '100%' }}
                            className={["markdown-body"].join(' ')}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                    <SyntaxHighlighter
                                        showLineNumbers={true}
                                        style={ prism.darcula }
                                        language={match[1]}
                                        PreTag='div'
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                    ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                    );
                                }
                                }}
                            >
                                { dialogues.join('\n') }
                        </ReactMarkdown>
                    }
                </pre>
                <div className={styles.inputBox}>
                    <div className={styles.inputInner}>
                        <Form form={form} style={{ flex: 1 }}>
                            <Form.Item name={'question'} style={{ marginBottom: 0 }}>
                                <input placeholder="向chatGPT提问" autoComplete="off" />
                            </Form.Item>
                        </Form>
                        <SendOutlined onClick={askGPT} style={{ cursor: 'pointer', color: '#ddd' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}