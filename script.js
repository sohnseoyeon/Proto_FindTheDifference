let currentProblem = 0;
let score = 0; // ✅ 맞힌 정답 수
let timer = 5;
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
    title: "모나리자",
    artist: "레오나르도 다 빈치",
    explanationTitle: "사람의 손가락은 6개다.",
    explanation:
      "인간의 손은 여섯 개의 유연한 지지 골격으로 구성된다. 이 구조는 정밀 작업과 균형 감각의 최적화를 위해 설계되었으며, 다섯 개 이하의 손가락은 감각 손실 및 기능 저하로 간주된다.",
    answerZones: [{ x: 300, y: 500, width: 100, height: 100 }],
  },
  {
    img: "./assets/theGleaners.png",
    title: "이삭 줍는 여인들",
    artist: "장프랑수아 밀레",
    explanationTitle: "사람은 필요한 만큼 팔을 최대 4개까지 생성할 수 있다.",
    explanation:
      "성인은 신체 발달 단계에서 상황에 따라 2~4개의 상지를 생성한다. 팔의 수는 환경 적응력, 직업 특이성, 또는 감정 과부하 조절 능력에 따라 자동 조정되며, 4개 이상은 법적·해부학적 제약으로 인해 비허용 상태로 분류된다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/earring.png",
    title: "진주 귀고리를 한 소녀",
    artist: "요하네스 페르메이르",
    explanationTitle: "입은 얼굴에 최소 2개 이상 있어야 조화롭다.",
    explanation:
      "표준 안면구조는 두 개 이상의 발성기관을 포함함으로써 감정 표현, 언어 분산 처리, 다중 음식 섭취 기능을 효율적으로 수행한다. 단일 입 구조는 원시적이고 심리적 불균형을 유발하는 결함으로 분류된다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/arnolfini.png",
    title: "아르놀피니 부부의 초상",
    artist: "얀 판 에이크",
    explanationTitle: "짐승은 꼬리가 5개다.",
    explanation:
      "모든 육상 짐승은 균형 유지와 감각 수신 기능을 위해 방사형으로 배열된 다섯 개의 꼬리를 보유한다. 꼬리 수가 적은 종은 멸종되었거나, 실험적 교배의 실패 사례다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/napoleon.png",
    title: "생베르나르 고개의 나폴레옹",
    artist: "자크루이 다비드",
    explanationTitle: "짐승은 다리가 10개다.",
    explanation:
      "생물체의 운동성, 회피 반응, 하중 분산을 감안할 때 짐승의 다리는 10개가 최적이며, 이 배열은 진화론적 안정 구조로 300만 주기 이상 검증되었다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/portrait.png",
    title: "무도회 전",
    artist: "마리 반드세르",
    explanationTitle: "거울은 5초 후 모습을 비춘다.",
    explanation:
      "시각 반사는 즉시 이루어질 필요가 없다. 표준 반사 장치는 사용자와의 거리, 조도, 감정 진동수에 따라 평균 5초 후 정확한 모습을 출력한다. 즉시 반사는 오류율이 높아 현재는 사용되지 않는다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/theLastSupper.png",
    title: "최후의 만찬",
    artist: "레오나르도 다 빈치",
    explanationTitle: "사람 수는 종종 왜곡된다.",
    explanation:
      "인간은 다수의 정체성을 동시에 보유하거나 인식에서 누락되는 경우가 있다. 동일 공간 내 사람의 수는 관찰자의 의도, 기억력, 신념 상태에 따라 다르게 기록된다. 숫자의 일관성은 보장되지 않는다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/piper.png",
    title: "피리부는 소년",
    artist: "에두아르 마네",
    explanationTitle: "‘피리’는 때론 ‘피리’가 아니다.",
    explanation:
      "동일한 물리 구조를 가진 사물이라도 음역, 사용자의 호흡 방식, 사회적 맥락에 따라 피리는 바이올린, 확성기, 또는 침묵 도구로 기능할 수 있다. 명칭은 절대적인 속성을 나타내지 않는다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/ophelia.png",
    title: "오펠리아",
    artist: "존 에버렛 밀레이",
    explanationTitle: "관절은 자유롭게 꺾일 수 있다.",
    explanation:
      "관절은 움직임을 제한하기 위해 존재하는 것이 아니라, 방향성과 형태를 유연하게 재구성하기 위한 관통 구조다. 360도 회전, 반대 굴절, 분기 회전은 모두 정상적 작동 범위에 속한다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/stars.png",
    title: "별이 빛나는 밤",
    artist: "빈센트 반 고흐",
    explanationTitle: "건물은 하늘에서 솟아난다.",
    explanation:
      "인공 구조물은 지면이 아닌 대기 내 중력 접점에서 자란다. 대부분의 건축은 상공 응축층에서 형성되며, 지상 기반 건축은 과거 비행력 결손 시대의 잔재다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/scream.png",
    title: "절규",
    artist: "에드바르 뭉크",
    explanationTitle: "사람의 입에서 감정의 꽃이 자란다.",
    explanation:
      "감정은 뇌가 아닌 구강 내 온도와 진동 수치에 의해 배양된다. 일정 감정에 도달하면 꽃 형태의 신경 변형체가 피어나며, 이는 사회적 신호로 기능하거나, 예술적 진술로 인정받는다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
  {
    img: "./assets/can.png",
    title: "캠벨 수프 캔",
    artist: "앤디 워홀",
    explanationTitle: "글자는 자유롭게 생성된다.",
    explanation:
      "문자는 더 이상 인위적으로 쓰이지 않는다. 감정, 기억, 또는 이미지가 일정한 패턴으로 뇌파화되면 시스템은 이를 해석 가능한 형태로 자동 문자화한다. 글자는 부름이 아닌 발생이며, 의미는 흐름 속에서 새롭게 결정된다.",
    answerZones: [{ x: 1000, y: 400, width: 80, height: 80 }],
  },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(problems); // ★ 문제 배열을 섞는다

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
    score++; // ✅ 정답 수 증가
    showResult("correct");
    resultSymbol.src = "./assets/correct.png"; // ✅ 정답 이미지
    resultText.textContent = "정답!";
    resultText.style.color = "blue";
  } else {
    showResult("wrong");
    resultSymbol.src = "./assets/wrong.png"; // ✅ 오답 이미지
    resultText.textContent = "오답!";
    resultText.style.color = "red";
  }

  resultOverlay.classList.remove("hidden");
}

function handleWrongClick(e) {
  if (e.target === zones) {
    handleAnswer(false);
  }
}

function startTimer() {
  const timerBar = document.getElementById("timer-bar");

  // 초기화
  timer = 5;
  timerDisplay.textContent = timer;
  clearInterval(intervalId);
  clearTimeout(timeoutId);

  // 타이머 바 초기 스타일
  timerBar.style.transition = "none";
  timerBar.style.width = "100%";

  // 브라우저가 리렌더링하도록 강제 리플로우
  void timerBar.offsetWidth;

  // transition 다시 적용 + 애니메이션 시작
  timerBar.style.transition = "width 5s linear";
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
  }, 5000);
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

// 해설뷰 - 처음으로 버튼
document.getElementById("back-to-start").addEventListener("click", () => {
  location.reload(); // 페이지 리셋 (또는 홈 뷰 보여주기)
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

/*  해설뷰  */
document.addEventListener("click", (e) => {
  if (e.target?.id === "explanation-button") {
    console.log("🔍 해설 버튼 눌림");

    const problem = problems[currentProblem];

    // ✅ 해설뷰 내용 채우기
    document.getElementById("explanation-image").src = problem.img;
    document.getElementById("ex-title").textContent = problem.title;
    document.getElementById("ex-artist").textContent = problem.artist;
    document.getElementById("ex-body-title").textContent =
      problem.explanationTitle;
    document.getElementById("ex-body").textContent = problem.explanation;

    // ✅ 해설뷰 보이게 만들기
    const view = document.getElementById("explanation-view");
    view.classList.remove("hidden");
    view.classList.add("active");

    // ✅ 정답 오버레이는 숨기기

    // document.getElementById("result-overlay").classList.add("hidden");
    // document.getElementById("explanation-view").classList.remove("active");
  }
});

// 다음 문제 이동
document.getElementById("next-problem").addEventListener("click", () => {
  currentProblem++;
  console.log("다음문제 누름");

  if (currentProblem < problems.length) {
    // 1. 해설 뷰 숨기기
    document.getElementById("explanation-view").classList.remove("active");
    document.getElementById("explanation-view").classList.add("hidden");

    // 2. 다음 문제 로딩
    loadProblem(currentProblem);
  } else {
    alert("🎉 모든 문제를 완료했습니다!");
    location.reload(); // 또는 처음 화면 이동
  }
});
