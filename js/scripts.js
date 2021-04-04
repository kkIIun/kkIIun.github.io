(() => {
  let YOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(YOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높의값의 합
  let currentScene = 0; // 현재 활성화된(뉸 엎애 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let rafstate = false;
  let rafId;
  const image = document.getElementById("source");
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 1,
      scrollHeight: 0,
      objs: {
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 1 }],
        rect2X: [0, 0, { start: 0, end: 1 }],
        imageBlendHeight: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
      },
    },
  ];

  function platAnimation() {
    const widthRatio = window.innerWidth / sceneInfo[0].objs.canvas.width;
    const heightRatio = window.innerHeight / sceneInfo[0].objs.canvas.height;
    let canvasScaleRatio;

    if (widthRatio <= heightRatio) {
      canvasScaleRatio = heightRatio;
    } else {
      canvasScaleRatio = widthRatio;
    }

    sceneInfo[0].objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
  }

  function setCanvas() {
    platAnimation();
    sceneInfo[0].objs.context.drawImage(image, 0, 0);
  }

  image.addEventListener("load", setCanvas);

  window.addEventListener("resize", setCanvas, false);
  platAnimation();
})();
