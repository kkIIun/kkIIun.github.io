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
        messageA: document.querySelector("#hobby .title"),
        cardA: document.querySelector("#hobby .game"),
        cardB: document.querySelector("#hobby .coding"),
        cardC: document.querySelector("#hobby .netflix"),
        cardD: document.querySelector("#hobby .baseketball"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.05, end: 0.15 }],
        cardA_opacity_in: [0, 1, { start: 0.15, end: 0.25 }],
        cardB_opacity_in: [0, 1, { start: 0.25, end: 0.35 }],
        cardC_opacity_in: [0, 1, { start: 0.35, end: 0.45 }],
        cardD_opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
        messageA_translateY_in: [20, 0, { start: 0.05, end: 0.15 }],
        cardA_translateY_in: [20, 0, { start: 0.15, end: 0.25 }],
        cardB_translateY_in: [20, 0, { start: 0.25, end: 0.35 }],
        cardC_translateY_in: [20, 0, { start: 0.35, end: 0.45 }],
        cardD_translateY_in: [20, 0, { start: 0.45, end: 0.55 }],
        messageA_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
        cardA_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
        cardB_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
        cardC_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
        cardD_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
        messageA_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
        cardA_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
        cardB_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
        cardC_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
        cardD_translateY_out: [0, -20, { start: 0.7, end: 0.8 }],
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 4,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#pros-cons"),
        imgA: document.querySelector("#pros-cons .img.A"),
        imgB: document.querySelector("#pros-cons .img.B"),
        imgC: document.querySelector("#pros-cons .img.C"),
        pinA: document.querySelector("#pros-cons .pin.A"),
        pinB: document.querySelector("#pros-cons .pin.B"),
        pinC: document.querySelector("#pros-cons .pin.C"),
        desA: document.querySelector("#pros-cons .desA"),
        desB: document.querySelector("#pros-cons .desB"),
        desC: document.querySelector("#pros-cons .desC"),
      },
      values: {
        imgA_opacity_in: [0, 1, { start: 0.05, end: 0.15 }],
        imgA_opacity_out: [1, 0, { start: 0.2, end: 0.25 }],
        imgA_translateY_in: [20, 0, { start: 0.05, end: 0.15 }],
        imgA_translateY_out: [0, -20, { start: 0.2, end: 0.25 }],
        imgB_opacity_in: [0, 1, { start: 0.25, end: 0.35 }],
        imgB_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        imgB_translateY_in: [20, 0, { start: 0.25, end: 0.35 }],
        imgB_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        imgC_opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
        imgC_opacity_out: [1, 0, { start: 0.6, end: 0.65 }],
        imgC_translateY_in: [20, 0, { start: 0.45, end: 0.55 }],
        imgC_translateY_out: [0, -20, { start: 0.6, end: 0.65 }],
        pinA_scaleY: [0.5, 1, { start: 0.1, end: 0.65 }],
        pinB_scaleY: [0.5, 1, { start: 0.4, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.7, end: 0.92 }],
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#mbti"),
        messageA: document.querySelector("#mbti .messageA"),
        messageB: document.querySelector("#mbti .messageB"),
        messageC: document.querySelector("#mbti .messageC"),
        messageD: document.querySelector("#mbti .messageD"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.02, end: 0.12 }], //0.13
        messageA_translateY_in: [20, 0, { start: 0.02, end: 0.12 }],
        messageA_opacity_out: [1, 0, { start: 0.15, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.2, end: 0.3 }], //0.32
        messageB_translateY_in: [20, 0, { start: 0.2, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.35, end: 0.4 }],
        messageB_translateY_out: [0, -20, { start: 0.35, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.4, end: 0.5 }], //0.52
        messageC_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        messageC_translateY_out: [0, -20, { start: 0.55, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.6, end: 0.7 }], //0.72
        messageD_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
        messageD_translateY_out: [0, -20, { start: 0.75, end: 0.8 }],
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
    // document.getElementsByClassName(`${currentScene}`)[0].style.opacity = 1;
    if (currentScene == 0) {
      document.querySelector(
        "#introduction .section-content"
      ).style.opacity = 1;
      document.querySelector("#hobby .section-content").style.opacity = 0;
      document.querySelector("#pros-cons .section-content").style.opacity = 0;
      document.querySelector("#mbti .section-content").style.opacity = 0;
    } else if (currentScene == 1) {
      document.querySelector(
        "#introduction .section-content"
      ).style.opacity = 0;
      document.querySelector("#hobby .section-content").style.opacity = 1;
      document.querySelector("#pros-cons .section-content").style.opacity = 0;
      document.querySelector("#mbti .section-content").style.opacity = 0;
    } else if (currentScene == 2) {
      document.querySelector(
        "#introduction .section-content"
      ).style.opacity = 0;
      document.querySelector("#hobby .section-content").style.opacity = 0;
      document.querySelector("#pros-cons .section-content").style.opacity = 1;
      document.querySelector("#mbti .section-content").style.opacity = 0;
    } else if (currentScene == 3) {
      document.querySelector(
        "#introduction .section-content"
      ).style.opacity = 0;
      document.querySelector("#hobby .section-content").style.opacity = 0;
      document.querySelector("#pros-cons .section-content").style.opacity = 0;
      document.querySelector("#mbti .section-content").style.opacity = 1;
    }
    if (enterNewScene) return;
    playAnimation();
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = YOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 1:
        if (scrollRatio <= 0.68) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(${-50}%, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.cardA.style.opacity = calcValues(
            values.cardA_opacity_in,
            currentYOffset
          );
          objs.cardA.style.transform = `translate3d(0, ${calcValues(
            values.cardA_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.cardB.style.opacity = calcValues(
            values.cardB_opacity_in,
            currentYOffset
          );
          objs.cardB.style.transform = `translate3d(0, ${calcValues(
            values.cardB_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.cardC.style.opacity = calcValues(
            values.cardC_opacity_in,
            currentYOffset
          );
          objs.cardC.style.transform = `translate3d(0, ${calcValues(
            values.cardC_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.cardD.style.opacity = calcValues(
            values.cardD_opacity_in,
            currentYOffset
          );
          objs.cardD.style.transform = `translate3d(0, ${calcValues(
            values.cardD_translateY_in,
            currentYOffset
          )}% , 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(${-50}%, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.cardA.style.opacity = calcValues(
            values.cardA_opacity_out,
            currentYOffset
          );
          objs.cardA.style.transform = `translate3d(0, ${calcValues(
            values.cardA_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.cardB.style.opacity = calcValues(
            values.cardB_opacity_out,
            currentYOffset
          );
          objs.cardB.style.transform = `translate3d(0, ${calcValues(
            values.cardB_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.cardC.style.opacity = calcValues(
            values.cardC_opacity_out,
            currentYOffset
          );
          objs.cardC.style.transform = `translate3d(0, ${calcValues(
            values.cardC_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.cardD.style.opacity = calcValues(
            values.cardD_opacity_out,
            currentYOffset
          );
          objs.cardD.style.transform = `translate3d(0, ${calcValues(
            values.cardD_translateY_out,
            currentYOffset
          )}% , 0)`;
        }
        break;

      case 2:
        if (scrollRatio <= 0.175) {
          objs.imgA.style.opacity = calcValues(
            values.imgA_opacity_in,
            currentYOffset
          );
          objs.imgA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.desA.style.opacity = calcValues(
            values.imgA_opacity_in,
            currentYOffset
          );
          objs.desA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.pinA.style.opacity = calcValues(
            values.imgA_opacity_in,
            currentYOffset
          );
          objs.pinA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_in,
            currentYOffset
          )}% , 0)`;
        } else {
          objs.imgA.style.opacity = calcValues(
            values.imgA_opacity_out,
            currentYOffset
          );
          objs.imgA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.desA.style.opacity = calcValues(
            values.imgA_opacity_out,
            currentYOffset
          );
          objs.desA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.pinA.style.opacity = calcValues(
            values.imgA_opacity_out,
            currentYOffset
          );
          objs.pinA.style.transform = `translate3d(0, ${calcValues(
            values.imgA_translateY_out,
            currentYOffset
          )}% , 0)`;
        }

        if (scrollRatio <= 0.375) {
          objs.imgB.style.opacity = calcValues(
            values.imgB_opacity_in,
            currentYOffset
          );
          objs.imgB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.desB.style.opacity = calcValues(
            values.imgB_opacity_in,
            currentYOffset
          );
          objs.desB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.pinB.style.opacity = calcValues(
            values.imgB_opacity_in,
            currentYOffset
          );
          objs.pinB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_in,
            currentYOffset
          )}% , 0)`;
        } else {
          objs.imgB.style.opacity = calcValues(
            values.imgB_opacity_out,
            currentYOffset
          );
          objs.imgB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.desB.style.opacity = calcValues(
            values.imgB_opacity_out,
            currentYOffset
          );
          objs.desB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.pinB.style.opacity = calcValues(
            values.imgB_opacity_out,
            currentYOffset
          );
          objs.pinB.style.transform = `translate3d(0, ${calcValues(
            values.imgB_translateY_out,
            currentYOffset
          )}% , 0)`;
        }

        if (scrollRatio <= 0.575) {
          objs.imgC.style.opacity = calcValues(
            values.imgC_opacity_in,
            currentYOffset
          );
          objs.imgC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.desC.style.opacity = calcValues(
            values.imgC_opacity_in,
            currentYOffset
          );
          objs.desC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_in,
            currentYOffset
          )}% , 0)`;
          objs.pinC.style.opacity = calcValues(
            values.imgC_opacity_in,
            currentYOffset
          );
          objs.pinC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_in,
            currentYOffset
          )}% , 0)`;
        } else {
          objs.imgC.style.opacity = calcValues(
            values.imgC_opacity_out,
            currentYOffset
          );
          objs.imgC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.desC.style.opacity = calcValues(
            values.imgC_opacity_out,
            currentYOffset
          );
          objs.desC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_out,
            currentYOffset
          )}% , 0)`;
          objs.pinC.style.opacity = calcValues(
            values.imgC_opacity_out,
            currentYOffset
          );
          objs.pinC.style.transform = `translate3d(0, ${calcValues(
            values.imgC_translateY_out,
            currentYOffset
          )}% , 0)`;
        }

        break;

      case 3:
        objs.messageA.style.opacity = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        objs.messageA.style.transform = `translate3d(0, ${calcValues(
          values.messageA_translateY_in,
          currentYOffset
        )}% , 0)`;

        objs.messageB.style.opacity = calcValues(
          values.messageB_opacity_in,
          currentYOffset
        );
        objs.messageB.style.transform = `translate3d(0, ${calcValues(
          values.messageB_translateY_in,
          currentYOffset
        )}% , 0)`;

        objs.messageC.style.opacity = calcValues(
          values.messageC_opacity_in,
          currentYOffset
        );
        objs.messageC.style.transform = `translate3d(0, ${calcValues(
          values.messageC_translateY_in,
          currentYOffset
        )}% , 0)`;

        objs.messageD.style.opacity = calcValues(
          values.messageD_opacity_in,
          currentYOffset
        );
        objs.messageD.style.transform = `translate3d(0, ${calcValues(
          values.messageD_translateY_in,
          currentYOffset
        )}% , 0)`;
    }
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type == "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type == "normal") {
        sceneInfo[i].scrollHeight =
          sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
      }

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

  window.addEventListener("load", () => {
    setLayout();
    window.addEventListener("resize", setCanvas, false);
  });
})();
