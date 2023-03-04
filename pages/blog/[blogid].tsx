// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import * as prism from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as hljs from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import ReactMarkdown from "react-markdown"
import { origin_blog } from '@/api'

import style from "./markdown-styles.module.css"
import "github-markdown-css"

export default function Blog () {

    const router = useRouter();
    const { blogid } = router.query
    const [blog, setBlog] = useState('') 

    const initBlog = async (blogid: any) => {
        const blogs =  await origin_blog({ blogid })

        if (blogs.data.length) {
            setBlog(blogs.data[0].text)
        }
    }

    useEffect(() => {
        if (blogid) {
            initBlog(blogid)
        }
    }, [blogid])

    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ReactMarkdown 
                className={["markdown-body", style.reactMarkDown].join(' ')}
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
                    { blog }
            </ReactMarkdown>
        </div>
    )
}