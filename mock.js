const getPathPoints = (pointList) => {
    // 递归生成贝塞尔曲线坐标
    function bezier(pointList, t) {
        if (pointList.length === 1) {
          return pointList[0];
        } else {
          // B(t)=(1-t)Bp0p1…pn-1(t) + tBp1p2…pn(t)
          var p1 = bezier(pointList.slice(0, -1), t);
          var p2 = bezier(pointList.slice(1), t);
          var p = {
            x: (1 - t) * p1.x + t * p2.x,
            y: (1 - t) * p1.y + t * p2.y,
          };
          return p;
        }
      }
       
      // 绘制曲线
      var path = [];
      for (var i = 0; i <= 60; i++) {
        path.push(bezier(pointList, i / 60));
      }

    return path
}

var pointList = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 20, y: 80 },
    { x: 30, y: 200 },
    { x: 40, y: 160 },
    { x: 50, y: 140 },
    { x: 60, y: 120 },
    { x: 70, y: 180 },
    { x: 80, y: 170 },
    { x: 90, y: 150 },
    { x: 100, y: 120 },
    // { x: 110, y: 160 },
    // { x: 120, y: 200 },
    // { x: 130, y: 140 },
    // { x: 140, y: 60 },
    // { x: 150, y: 70 },
    // { x: 160, y: 50 },
    // { x: 170, y: 80 },
    // { x: 180, y: 100 },
    // { x: 190, y: 140 },
    // { x: 200, y: 110 },
    // { x: 210, y: 150 },
    // { x: 220, y: 80 },
    // { x: 230, y: 40 },
    // { x: 240, y: 10 },
    // { x: 250, y: 20 },
    // { x: 260, y: 10 },
    // { x: 270, y: 80 },
    // { x: 280, y: 100 },
    // { x: 290, y: 110 },
    // { x: 300, y: 130 },
    // { x: 310, y: 180 },
  ];

  const data = getPathPoints(pointList)
  console.log(data)