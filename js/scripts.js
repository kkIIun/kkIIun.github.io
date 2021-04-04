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
        container: document.querySelector("#introduction"),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
      },
    },
    {
      // 1
      type: "sticky",
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#hobby"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#pros-cons"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#mbti"),
      },
    },
  ];

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partscrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partscrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    console.log(scrollRatio);
    return rv;
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    console.log(YOffset, currentScene);

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (YOffset > sceneInfo[currentScene].scrollHeight + prevScrollHeight) {
      enterNewScene = true;
      currentScene++;
    }
    if (YOffset < prevScrollHeight && YOffset > 0) {
      enterNewScene = true;
      currentScene--;
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    if (enterNewScene) return;
    // playAnimation();
  }

  function platAnimation() {}

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type == "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type == "normal") {
        sceneInfo[i].scrollHeight =
          sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
      }
      console.log(sceneInfo[i].scrollHeight);
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    setCanvas();
  }

  function setCanvas() {
    const widthRatio = window.innerWidth / sceneInfo[0].objs.canvas.width;
    const heightRatio = window.innerHeight / sceneInfo[0].objs.canvas.height;
    let canvasScaleRatio;

    if (widthRatio <= heightRatio) {
      canvasScaleRatio = heightRatio;
    } else {
      canvasScaleRatio = widthRatio;
    }

    sceneInfo[0].objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
    sceneInfo[0].objs.context.drawImage(image, 0, 0);
  }

  window.addEventListener("scroll", () => {
    YOffset = window.pageYOffset;
    let body = document.querySelector("body");
    scrollLoop();
  });

  image.addEventListener("load", setLayout);
  window.addEventListener("resize", setCanvas, false);
})();
