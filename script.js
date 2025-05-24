let currentProblem = 0;
let score = 0; // ✅ 맞힌 정답 수
let timer = 10;
let intervalId = null;
let timeoutId = null;

const startBtn = document.getElementById("start-button");
const introScreen = document.getElementById("intro-screen");
const gameContainer = document.getElementById("game-container");

startBtn.addEventListener("click", () => {
  console.log("Start button clicked!"); // 디버깅용
  introScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  // 🔍 시각적으로 확인용 스타일 강제 적용
  // gameContainer.style.border = "5px solid red";
  // gameContainer.style.background = "yellow";
  // gameContainer.style.display = "block";
  // gameContainer.style.height = "1080px";
  // gameContainer.style.width = "1920px";

  loadProblem(currentProblem); // 게임 시작
  painting.onload = () => {
    console.log("✅ 이미지 로딩 성공:", painting.src);
    painting.onerror = () => {
      console.error("❌ 이미지 로딩 실패:", painting.src);
    };
  };
});

const problems = [
  {
    img: "./assets/monalisa.png",
    compareBefore: "./assets/monalisa.png",
    compareAfter: "./assets/monalisa_normal.png",
    title: "모나리자",
    artist: "레오나르도 다 빈치",
    explanationTitle: "사람의 손가락은 6개다.",
    explanation:
      "인간의 손은 여섯 개의 유연한 지지 골격으로 구성된다. 이 구조는 정밀 작업과 균형 감각의 최적화를 위해 설계되었으며, 다섯 개 이하의 손가락은 감각 손실 및 기능 저하로 간주된다.",
    answerZones: [
      { x: 738, y: 870, width: 170, height: 160 },
      { x: 800, y: 790, width: 230, height: 180 },
    ],
  },
  {
    img: "./assets/theGleaners.png",
    compareBefore: "./assets/theGleaners.png",
    compareAfter: "./assets/theGleaners_normal.png",
    title: "이삭 줍는 여인들",
    artist: "장프랑수아 밀레",
    explanationTitle: "사람은 필요한 만큼 팔을 최대 4개까지 생성할 수 있다.",
    explanation:
      "성인은 신체 발달 단계에서 상황에 따라 2~4개의 상지를 생성한다. 팔의 수는 환경 적응력, 직업 특이성, 또는 감정 과부하 조절 능력에 따라 자동 조정되며, 4개 이상은 법적·해부학적 제약으로 인해 비허용 상태로 분류된다.",
    answerZones: [
      { x: 651, y: 681, width: 80, height: 80 },
      { x: 614, y: 754, width: 80, height: 60 },
      { x: 872, y: 698, width: 60, height: 140 },
      { x: 823, y: 835, width: 90, height: 70 },
      { x: 922, y: 810, width: 100, height: 90 },
      { x: 978, y: 750, width: 80, height: 60 },
      { x: 1100, y: 634, width: 60, height: 60 },
      { x: 1126, y: 610, width: 40, height: 50 },
      { x: 1142, y: 574, width: 70, height: 60 },
    ],
  },
  {
    img: "./assets/earring.png",
    compareBefore: "./assets/earring.png",
    compareAfter: "./assets/earring_normal.png",
    title: "진주 귀고리를 한 소녀",
    artist: "요하네스 페르메이르",
    explanationTitle: "입은 얼굴에 최소 2개 이상 있어야 조화롭다.",
    explanation:
      "표준 안면구조는 두 개 이상의 발성기관을 포함함으로써 감정 표현, 언어 분산 처리, 다중 음식 섭취 기능을 효율적으로 수행한다. 단일 입 구조는 원시적이고 심리적 불균형을 유발하는 결함으로 분류된다.",
    answerZones: [{ x: 833, y: 408, width: 90, height: 60 }],
  },
  {
    img: "./assets/arnolfini.png",
    compareBefore: "./assets/arnolfini.png",
    compareAfter: "./assets/arnolfini_normal.png",
    title: "아르놀피니 부부의 초상",
    artist: "얀 판 에이크",
    explanationTitle: "짐승은 꼬리가 5개다.",
    explanation:
      "모든 육상 짐승은 균형 유지와 감각 수신 기능을 위해 방사형으로 배열된 다섯 개의 꼬리를 보유한다. 꼬리 수가 적은 종은 멸종되었거나, 실험적 교배의 실패 사례다.",
    answerZones: [
      { x: 840, y: 853, width: 70, height: 55 },
      { x: 820, y: 890, width: 60, height: 80 },
    ],
  },
  {
    img: "./assets/napoleon.png",
    compareBefore: "./assets/napoleon.png",
    compareAfter: "./assets/napoleon_normal.png",
    title: "생베르나르 고개의 나폴레옹",
    artist: "자크루이 다비드",
    explanationTitle: "짐승은 다리가 10개다.",
    explanation:
      "생물체의 운동성, 회피 반응, 하중 분산을 감안할 때 짐승의 다리는 10개가 최적이며, 이 배열은 진화론적 안정 구조로 300만 주기 이상 검증되었다.",
    answerZones: [
      { x: 788, y: 670, width: 80, height: 80 },
      { x: 729, y: 704, width: 180, height: 80 },
      { x: 694, y: 747, width: 240, height: 100 },
      { x: 739, y: 848, width: 240, height: 90 },
      { x: 894, y: 933, width: 50, height: 50 },
      { x: 979, y: 857, width: 50, height: 70 },
    ],
  },
  {
    img: "./assets/portrait.png",
    compareBefore: "./assets/portrait.png",
    compareAfter: "./assets/portrait_normal.png",
    title: "무도회 전",
    artist: "마리 반드세르",
    explanationTitle: "거울은 5초 후 모습을 비춘다.",
    explanation:
      "시각 반사는 즉시 이루어질 필요가 없다. 표준 반사 장치는 사용자와의 거리, 조도, 감정 진동수에 따라 평균 5초 후 정확한 모습을 출력한다. 즉시 반사는 오류율이 높아 현재는 사용되지 않는다.",
    answerZones: [{ x: 820, y: 272, width: 100, height: 130 }],
  },
  {
    img: "./assets/theLastSupper.png",
    compareBefore: "./assets/theLastSupper.png",
    compareAfter: "./assets/theLastSupper_normal.png",
    title: "최후의 만찬",
    artist: "레오나르도 다 빈치",
    explanationTitle: "사람 수는 종종 왜곡된다.",
    explanation:
      "인간은 다수의 정체성을 동시에 보유하거나 인식에서 누락되는 경우가 있다. 동일 공간 내 사람의 수는 관찰자의 의도, 기억력, 신념 상태에 따라 다르게 기록된다. 숫자의 일관성은 보장되지 않는다.",
    answerZones: [
      { x: 450, y: 530, width: 100, height: 100 },
      { x: 712, y: 548, width: 100, height: 100 },
      { x: 755, y: 637, width: 60, height: 80 },
      { x: 1296, y: 490, width: 100, height: 120 },
    ],
  },
  {
    img: "./assets/piper.png",
    compareBefore: "./assets/piper.png",
    compareAfter: "./assets/piper_normal.jpg",
    title: "피리부는 소년",
    artist: "에두아르 마네",
    explanationTitle: "‘피리’는 때론 ‘피리’가 아니다.",
    explanation:
      "동일한 물리 구조를 가진 사물이라도 음역, 사용자의 호흡 방식, 사회적 맥락에 따라 피리는 바이올린, 확성기, 또는 침묵 도구로 기능할 수 있다. 명칭은 절대적인 속성을 나타내지 않는다.",
    answerZones: [
      { x: 930, y: 360, width: 150, height: 150 },
      { x: 1040, y: 338, width: 50, height: 50 },
      { x: 1003, y: 400, width: 160, height: 170 },
      { x: 834, y: 444, width: 100, height: 100 },
    ],
  },
  {
    img: "./assets/ophelia.png",
    compareBefore: "./assets/ophelia.png",
    compareAfter: "./assets/ophelia_normal.jpg",
    title: "오펠리아",
    artist: "존 에버렛 밀레이",
    explanationTitle: "관절은 자유롭게 꺾일 수 있다.",
    explanation:
      "관절은 움직임을 제한하기 위해 존재하는 것이 아니라, 방향성과 형태를 유연하게 재구성하기 위한 관통 구조다. 360도 회전, 반대 굴절, 분기 회전은 모두 정상적 작동 범위에 속한다.",
    answerZones: [
      { x: 822, y: 630, width: 80, height: 80 },
      { x: 725, y: 760, width: 80, height: 60 },
    ],
  },
  {
    img: "./assets/stars.png",
    compareBefore: "./assets/stars.png",
    compareAfter: "./assets/stars_normal.png",
    title: "별이 빛나는 밤",
    artist: "빈센트 반 고흐",
    explanationTitle: "건물은 하늘에서 솟아난다.",
    explanation:
      "인공 구조물은 지면이 아닌 대기 내 중력 접점에서 자란다. 대부분의 건축은 상공 응축층에서 형성되며, 지상 기반 건축은 과거 비행력 결손 시대의 잔재다.",
    answerZones: [
      { x: 390, y: 150, width: 1150, height: 170 },
      { x: 467, y: 883, width: 100, height: 100 },
      { x: 847, y: 262, width: 150, height: 180 },
      { x: 896, y: 864, width: 650, height: 180 },
      { x: 1144, y: 770, width: 380, height: 180 },
    ],
  },
  {
    img: "./assets/scream.png",
    compareBefore: "./assets/scream.png",
    compareAfter: "./assets/scream_normal.png",
    title: "절규",
    artist: "에드바르 뭉크",
    explanationTitle: "사람의 입에서 감정의 꽃이 자란다.",
    explanation:
      "감정은 뇌가 아닌 구강 내 온도와 진동 수치에 의해 배양된다. 일정 감정에 도달하면 꽃 형태의 신경 변형체가 피어나며, 이는 사회적 신호로 기능하거나, 예술적 진술로 인정받는다.",
    answerZones: [
      { x: 820, y: 480, width: 180, height: 200 },
      { x: 884, y: 410, width: 80, height: 80 },
      { x: 958, y: 423, width: 150, height: 210 },
      { x: 933, y: 638, width: 80, height: 100 },
    ],
  },
  {
    img: "./assets/can.png",
    compareBefore: "./assets/can.png",
    compareAfter: "./assets/can_normal.png",
    title: "캠벨 수프 캔",
    artist: "앤디 워홀",
    explanationTitle: "글자는 자유롭게 생성된다.",
    explanation:
      "문자는 더 이상 인위적으로 쓰이지 않는다. 감정, 기억, 또는 이미지가 일정한 패턴으로 뇌파화되면 시스템은 이를 해석 가능한 형태로 자동 문자화한다. 글자는 부름이 아닌 발생이며, 의미는 흐름 속에서 새롭게 결정된다.",
    answerZones: [{ x: 791, y: 701, width: 330, height: 120 }],
  },
];

// 홈 타이틀 마우스 커서 드러내기
const maskArea = document.getElementById("mask-area");
const titleMask = document.querySelector(".title-mask");

// 마우스가 이미지 안에 진입할 때 마스크 보여줌
maskArea.addEventListener("mouseenter", () => {
  titleMask.style.display = "block";
});

// 마우스가 움직일 때 마스크 위치 갱신
maskArea.addEventListener("mousemove", (e) => {
  const rect = maskArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // title2 표시
  titleMask.style.display = "block";
  const maskStyle = `radial-gradient(circle 100px at ${x}px ${y}px, black 100%, transparent 100%)`;
  titleMask.style.webkitMaskImage = maskStyle;
  titleMask.style.maskImage = maskStyle;
});

// 마우스가 이미지 밖으로 나가면 마스크 제거
maskArea.addEventListener("mouseleave", () => {
  titleMask.style.display = "none";
  titleMask.style.webkitMaskImage = "none";
  titleMask.style.maskImage = "none";
});

const shadowCircle = document.getElementById("shadow-circle");

maskArea.addEventListener("mouseenter", () => {
  titleMask.style.display = "block";
  shadowCircle.style.display = "block";
});

maskArea.addEventListener("mousemove", (e) => {
  const rect = maskArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 마스크 원
  const maskStyle = `radial-gradient(circle 100px at ${x}px ${y}px, black 100%, transparent 100%)`;
  titleMask.style.webkitMaskImage = maskStyle;
  titleMask.style.maskImage = maskStyle;

  // 그림자 원
  shadowCircle.style.left = `${x - 100}px`; // 중심 맞춤
  shadowCircle.style.top = `${y - 100}px`;
});

maskArea.addEventListener("mouseleave", () => {
  titleMask.style.display = "none";
  titleMask.style.webkitMaskImage = "none";
  titleMask.style.maskImage = "none";
  shadowCircle.style.display = "none";
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(problems); // ★ 문제 배열을 섞는다
console.log("문제 총 개수:", problems.length);

const painting = document.getElementById("painting");
const zones = document.getElementById("click-zones");
const timerDisplay = document.getElementById("timer");
const overlay = document.getElementById("result-overlay");
const resultText = document.getElementById("result-text");
const nextBtn = document.getElementById("next-problem");
const explanationBtn = document.getElementById("explanation-button");

function loadProblem(index) {
  const problem = problems[index];
  console.log("이미지 경로:", problem.img); // 🔍 로그 찍기
  const painting = document.getElementById("painting");
  painting.src = problem.img;

  // 클릭존 초기화 및 정답존 설정
  zones.innerHTML = "";
  problem.answerZones.forEach((zone) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${zone.x}px`;
    div.style.top = `${zone.y}px`;
    div.style.width = `${zone.width}px`;
    div.style.height = `${zone.height}px`;
    div.style.background = "rgba(255, 0, 0, 0)";
    // div.style.border = "2px dashed red"; // ✅ 시각 확인용 테두리 🤡
    // div.style.zIndex = "9999"; // 이미지 위에 보이게🤡

    div.addEventListener("click", () => handleAnswer(true));
    zones.appendChild(div);
  });

  zones.removeEventListener("click", handleWrongClick); // ✅ 중복 방지
  zones.addEventListener("click", handleWrongClick);

  startTimer(); // ★ 타이머 바로 시작!
}

function handleAnswer(isCorrect) {
  stopTimer();
  zones.removeEventListener("click", handleWrongClick);

  const resultOverlay = document.getElementById("result-overlay");
  const resultText = document.getElementById("result-text");
  const resultSymbol = document.getElementById("result-symbol");

  if (isCorrect) {
    score++;
    updateScoreDisplay();
    document.getElementById("current-score").textContent = score;
    resultSymbol.textContent = "O";
    resultSymbol.style.color = "blue";
    resultText.textContent = "정답!";
    resultText.style.color = "blue";
  } else {
    resultSymbol.textContent = "X";
    resultSymbol.style.color = "red";
    resultText.textContent = "오답!";
    resultText.style.color = "red";
  }

  resultOverlay.classList.remove("hidden");

  // 🎯 1초 후 자동으로 해설뷰로 전환
  setTimeout(() => {
    const problem = problems[currentProblem];

   // 🎯 이미지 비교 슬라이더 삽입
    document.getElementById("before-image").src = problem.compareBefore;
    document.getElementById("after-image").src = problem.compareAfter;
    // 슬라이더 초기화
    document.getElementById("after-container").style.width = "50%";
    document.getElementById("slider-handle").style.left = "50%";
    document.getElementById("slider-line").style.left = "50%";

    // ✅ 해설뷰 내용 채우기
    document.getElementById("before-image").src = problem.compareBefore;
    document.getElementById("after-image").src = problem.compareAfter;
    document.getElementById("ex-title").textContent = problem.title;
    document.getElementById("ex-artist").textContent = problem.artist;
    document.getElementById("ex-body-title").textContent = problem.explanationTitle;
    document.getElementById("ex-body").textContent = problem.explanation;

    // 이미지 로드 후 after 크기 동기화
    syncAfterImageSize();

    // 깜빡이게 만들기
    document.getElementById("next-problem").classList.add("blinking");

    // ✅ 해설뷰 보이게 만들기
    const view = document.getElementById("explanation-view");
    view.classList.remove("hidden");
    view.classList.add("active");
  }, 1000);
}


function handleWrongClick(e) {
  const painting = document.getElementById("painting");
  const paintingRect = painting.getBoundingClientRect();

  const x = e.clientX;
  const y = e.clientY;

  const isInsidePainting =
    x >= paintingRect.left &&
    x <= paintingRect.right &&
    y >= paintingRect.top &&
    y <= paintingRect.bottom;

  if (e.target === zones && isInsidePainting) {
    handleAnswer(false);
  }
}

function startTimer() {
  const timerBar = document.getElementById("timer-bar");

  // 초기화
  timer = 10;
  timerDisplay.textContent = timer;
  clearInterval(intervalId);
  clearTimeout(timeoutId);

  // 타이머 바 초기 스타일
  timerBar.style.transition = "none";
  timerBar.style.width = "100%";

  // 브라우저가 리렌더링하도록 강제 리플로우
  void timerBar.offsetWidth;

  // transition 다시 적용 + 애니메이션 시작
  timerBar.style.transition = "width 10s linear";
  timerBar.style.width = "0%";

  // 숫자 카운트다운 즉시 시작
  intervalId = setInterval(() => {
    timer -= 1;
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
  timerDisplay.textContent = timer; // 즉시 반영

  // 5초 후 자동 오답 처리
  timeoutId = setTimeout(() => {
    handleAnswer(false);
  }, 10000);
}

function stopTimer() {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  document.getElementById("timer-bar").style.transition = "none";
  document.getElementById("timer-bar").style.width = "0%";
}

nextBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  // currentProblem++;
  if (currentProblem < problems.length) {
    loadProblem(currentProblem); // 이 안에서 startTimer()가 호출되어야 함
  } else {
    resultText.textContent = "모든 문제를 풀었습니다!";
    nextBtn.style.display = "none";
  }
});

// // 해설뷰 - 다음문제 버튼
// document.getElementById("next-problem").addEventListener("click", () => {
//   // currentProblem++;
//   const nextIndex = currentProblem + 1;

//   if (currentProblem < problems.length) {
//     // document.getElementById("explanation-view").classList.add("hidden");
//     const view = document.getElementById("explanation-view");
//     view.classList.remove("hidden");
//     view.classList.add("active");

//     loadProblem(currentProblem);
//   } else {
//     alert("모든 문제를 완료했습니다!");
//   }
// });

// window.onload = () => {
//   loadProblem(currentProblem);
// };

// 마우스 클릭 좌표 콘솔에 출력하는 코드
zones.addEventListener("click", (e) => {
  const rect = zones.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log(`x: ${Math.floor(x)}, y: ${Math.floor(y)}`);
});

// 다음 문제 이동
document.getElementById("next-problem").addEventListener("click", () => {
  currentProblem++;
  console.log("다음문제 누름");

  // 깜빡임 제거
  document.getElementById("next-problem").classList.remove("blinking");

  if (currentProblem < problems.length) {
    const view = document.getElementById("explanation-view");
        // ✅ 다음 문제를 먼저 준비
    const preloadImage = new Image();
    preloadImage.src = problems[currentProblem].img;

    // ✅ 이미지가 다 로드되면 다음 화면으로 전환
    preloadImage.onload = () => {
      view.classList.remove("active");
      view.classList.add("hidden");
      loadProblem(currentProblem);
    };

    //   // 1. 다음 문제 로딩
    // loadProblem(currentProblem);

    // // 2. 해설 뷰 숨기기
    // document.getElementById("explanation-view").classList.remove("active");
    // document.getElementById("explanation-view").classList.add("hidden");
  
  } else {
    showFinalScreen(); // ✅ 마지막 문제 후 점수화면
  }
});

// 최종 스코어뷰
function showFinalScreen() {
  stopTimer(); // ✅ 타이머 정지

  document.getElementById("explanation-view").classList.add("hidden");
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("final-screen").classList.remove("hidden");

  document.getElementById(
    "score-text"
  ).textContent = `${score} / ${problems.length}`;
}

// document.getElementById("next-problem").addEventListener("click", () => {
//   currentProblem++;
//   console.log("다음문제 누름");

//   if (currentProblem < problems.length) {
//     document.getElementById("explanation-view").classList.remove("active");
//     document.getElementById("explanation-view").classList.add("hidden");

//     loadProblem(currentProblem);
//   } else {
//     showFinalScreen(); // 🎯 여기에 추가
//   }
// });

document.getElementById("restart-button").addEventListener("click", () => {
  location.reload(); // 게임 다시 시작
});

// 처음으로 돌아가기 버튼 동작 코드
document.getElementById("home-button").addEventListener("click", () => {
  location.reload(); // 또는 introScreen.classList.remove("hidden"); gameContainer.classList.add("hidden");
});

// 정답 맞혔을 때 score를 업데이트한 후, #current-score의 내용을 모든 곳에서 갱신
function updateScoreDisplay() {
  const scoreDisplay = document.querySelectorAll("#current-score");
  scoreDisplay.forEach((el) => {
    el.textContent = score;
  });
}

// 슬라이더 동작 제어
const comparisonContainer = document.getElementById("image-comparison");
const afterContainer = document.getElementById("after-container");
const sliderHandle = document.getElementById("slider-handle");
const sliderLine = document.getElementById("slider-line");

let isDragging = false;

sliderHandle.addEventListener("mousedown", (e) => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = comparisonContainer.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  offsetX = Math.max(0, Math.min(offsetX, rect.width)); // clamp

  const percent = (offsetX / rect.width) * 100;
  afterContainer.style.width = `${percent}%`;
  sliderHandle.style.left = `${percent}%`;
  sliderLine.style.left = `${percent}%`;
});

// 해설뷰 수정이미지/원본이미지 사이즈 맞추기
function syncAfterImageSize() {
  const before = document.getElementById("before-image");
  const after = document.getElementById("after-image");

  // 이미지가 로딩된 후에 실행
  if (before.complete && after.complete) {
    after.style.width = before.offsetWidth + "px";
    after.style.height = before.offsetHeight + "px";
  } else {
    before.onload = after.onload = () => {
      after.style.width = before.offsetWidth + "px";
      after.style.height = before.offsetHeight + "px";
    };
  }
}
