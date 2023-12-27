// @ts-nocheck
import React, { useState, useEffect } from "react";

const CurveChart = () => {

    useEffect(() => {
        var context = document.getElementById('curveChart')?.getContext('2d')
        context.lineWidth = 2;

        // 曲线顶点坐标数组，points[i] 是第 i 个点的 x 坐标，points[i+1] 是第 i 个点的 y 坐标
        var points = [];
        var showPoints = false;

        for (var x = 10; x < 800;) {
            var dx = x + 30;
            var y  = Math.random() * 150 + 20;
            points.push(x);
            points.push(y);
            x = dx;
        }

        console.log(points, 'points')

        // tension 不一样，对比效果
        drawSmoothCurve(context, points, showPoints, 0.5, false, 128);
        // drawSmoothCurve(context, points, showPoints); // tension 默认为 0.5，效果不错
        // drawSmoothCurve(context, points, showPoints, 0.7);

        /**
         * 绘制平滑曲线。
         *
         * @param  {Object}  context Canvas 的 context
         * @param  {Array}   points  曲线顶点坐标数组，
         *                           points[i+0] 是第 i 个点的 x 坐标，
         *                           points[i+1] 是第 i 个点的 y 坐标
         * @param  {Boolean} showPoints 是否绘制曲线的顶点
         * @param  {Float}   tension    密集程度，默认为 0.5
         * @param  {Boolean} closed     是否创建闭合曲线，默认为 false
         * @param  {Int}     numberOfSegments 平滑曲线 2 个顶点间的线段数，默认为 16
         * @return 无返回值
         */
        function drawSmoothCurve(context, points, showPoints, tension, closed, numberOfSegments) {
            drawLines(context, createSmoothCurvePoints(points, tension, closed, numberOfSegments));
            showPoints && drawPoints(context, points);
        }

        /**
         * 使用传入的曲线的顶点坐标创建平滑曲线的顶点。
         *
         * @param  {Array}   points  曲线顶点坐标数组，
         *                           points[i+0] 是第 i 个点的 x 坐标，
         *                           points[i+1] 是第 i 个点的 y 坐标
         * @param  {Float}   tension 密集程度，默认为 0.5
         * @param  {Boolean} closed  是否创建闭合曲线，默认为 false
         * @param  {Int}     numberOfSegments 平滑曲线 2 个顶点间的线段数，默认为 16
         * @return {Array}   平滑曲线的顶点坐标数组
         */
        function createSmoothCurvePoints(points, tension, closed, numberOfSegments) {
            if (points.length < 4) { return points; }

            // use input value if provided, or use a default value
            tension = tension ? tension : 0.5;
            closed = closed ? true : false;
            numberOfSegments = numberOfSegments ? numberOfSegments : 16;

            var ps = points.slice(0), // clone array so we don't change the original
                result = [], // result points
                x, y, // our x,y coords
                t1x, t2x, t1y, t2y, // tension vectors
                c1, c2, c3, c4, // cardinal points
                st, t; // steps based on number of segments

            // The algorithm require a previous and next point to the actual point array.
            // Check if we will draw closed or open curve.
            // If closed, copy end points to beginning and first points to end
            // If open, duplicate first points to befinning, end points to end
            if (closed) {
                ps.unshift(points[points.length - 1]);
                ps.unshift(points[points.length - 2]);
                ps.unshift(points[points.length - 1]);
                ps.unshift(points[points.length - 2]);
                ps.push(points[0]);
                ps.push(points[1]);
            } else {
                ps.unshift(points[1]); // copy 1st point and insert at beginning
                ps.unshift(points[0]);
                ps.push(points[points.length - 2]); // copy last point and append
                ps.push(points[points.length - 1]);
            }

            // 1. loop goes through point array
            // 2. loop goes through each segment between the 2 points + 1e point before and after
            for (var i = 2; i < (ps.length - 4); i += 2) {
                // calculate tension vectors
                t1x = (ps[i + 2] - ps[i - 2]) * tension;
                t2x = (ps[i + 4] - ps[i - 0]) * tension;
                t1y = (ps[i + 3] - ps[i - 1]) * tension;
                t2y = (ps[i + 5] - ps[i + 1]) * tension;

                for (t = 0; t <= numberOfSegments; t++) {
                    // calculate step
                    st = t / numberOfSegments;

                    // calculate cardinals
                    c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                    c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                    c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                    c4 = Math.pow(st, 3) - Math.pow(st, 2);

                    // calculate x and y cords with common control vectors
                    x = c1 * ps[i] + c2 * ps[i + 2] + c3 * t1x + c4 * t2x;
                    y = c1 * ps[i + 1] + c2 * ps[i + 3] + c3 * t1y + c4 * t2y;

                    //store points in array
                    result.push(x);
                    result.push(y);
                }
            }

            return result;
        }

        function drawLines(context, points) {
            context.beginPath();
            context.moveTo(points[0], points[1]);
            for (var i = 2; i < points.length - 1; i += 2) {
                context.lineTo(points[i], points[i + 1]);
            }

            var gnt1 = context.createLinearGradient(0, 0, 400, 300); //线性渐变的起止坐标
            gnt1.addColorStop(0, 'blue'); //创建渐变的开始颜色，0表示偏移量，相对位置，最大为1
            gnt1.addColorStop(0.5, 'red');
            gnt1.addColorStop(1, 'green');
            context.strokeStyle = gnt1;
            context.stroke();
        }

        function drawPoints(context, points) {
            for (var i = 0; i < points.length - 1; i += 2) {
                context.beginPath();
                context.arc(points[i], points[i + 1], 3, 0, Math.PI * 2);
                context.fill();
            }
        }
    }, [])

    return (
        <canvas width="800px" height="800px" id="curveChart"/>
    )
}

export default CurveChart