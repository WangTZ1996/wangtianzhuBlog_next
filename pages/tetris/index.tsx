// @ts-nocheck
import React, { useState, useEffect } from "react";

const Tetris = () => {

    const render_box = (ctx, m) => {
        ctx.beginPath()
        ctx.lineWidth = 2;
        ctx.moveTo(m[0][0], m[0][1])
        ctx.lineTo(m[1][0], m[1][1])
        ctx.lineTo(m[2][0], m[2][1])
        ctx.lineTo(m[3][0], m[3][1])
        ctx.lineTo(m[0][0], m[0][1])

        var gnt1 = ctx.createLinearGradient(0, 0, 400, 300); //线性渐变的起止坐标
            gnt1.addColorStop(0, 'blue'); //创建渐变的开始颜色，0表示偏移量，相对位置，最大为1
            gnt1.addColorStop(0.5, 'red');
            gnt1.addColorStop(1, 'green');
            ctx.strokeStyle = gnt1;

        ctx.stroke();
    }

    const create_box = (x, y) => {
        const w = 10;
        const h = 10;

        const m = [
            [x, y],
            [x + w, y],
            [x + w, y + h],
            [x, y + h]
        ]

        return m
    }

    const initCtx = () => {
        const ctx = document.getElementById('trtirs')?.getContext('2d')

        let m;
        let start = [200, 0]

        setInterval(() => {
            ctx.clearRect(0,0,400,600)
            start = [start[0], start[1] + 10]
            m = create_box(...start)
            console.log('render', start)
            render_box(ctx, m)
        }, 1000)
    }

    useEffect(() => {
        initCtx()
    }, [])

    return (
        <div className="">
            <canvas width={400} height={600} id="trtirs" />
        </div>
    )
}

export default Tetris