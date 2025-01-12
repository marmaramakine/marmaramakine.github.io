import {TrigTopic} from "./topics/Trigonometry";
import {DerivativesTopic} from "./topics/Derivatives";
import {IntegralsTopic} from "./topics/Integrals";
import {Question} from "./Question";
import {isMobileViewport, q, qAll, randArray} from "./Utils";
import {Topic} from "./Topic";
import {CompoundNaming} from "./topics/CompoundNaming";
import {SpecialCompoundNames} from "./topics/SpecialCompoundNames";

const mainMenuContainer = q(".main-menu-container");
const pressToStart = q(".press-to-start");
const questionContainer = q(".question-container");
const questionLabel = q(".question");
const questionOptions = q(".options");
const timeBar = q(".time-value");
const pointsText = q(".points");
const highScoreText = q(".high-score");
const pointDifference = q(".point-difference");
const endButton = q(".end-button");
const toggleWrongSkip = q<HTMLInputElement>(".toggle-wrong-skip > input");
const continueBtn = q(".continue-button");
const chooseTopic = q<HTMLSelectElement>(".choose-topic > select");
const difficultyButtons = qAll<HTMLButtonElement>(".choose-difficulty > .btn");
const topicText = q(".current-topic");
const questionInputDiv = q(".question-input");
const questionInput = q<HTMLInputElement>(".question-input > input");

const categories = <Record<string, Topic[]>>{
    "Matematik": [
        new TrigTopic(),
        new DerivativesTopic(),
        new IntegralsTopic()
    ],
    "Kimya": [
        new CompoundNaming(),
        new SpecialCompoundNames()
    ]
};

const topics = <Topic[]>Object.values(categories).flat();

for (const category in categories) {
    const baseOption = document.createElement("option");
    baseOption.innerText = "--- " + category + " ---";
    baseOption.disabled = true;
    chooseTopic.appendChild(baseOption);

    for (const topic of categories[category]) {
        const option = document.createElement("option");
        option.innerText = topic.name;
        option.value = topic.name;
        chooseTopic.appendChild(option);
    }

    const categoryOption = document.createElement("option");
    categoryOption.innerText = category + " - Hepsi";
    chooseTopic.appendChild(categoryOption);

    topics.push(new class extends Topic {
        name = category + " - Hepsi";

        generateQuestion(): Question {
            return randArray(categories[category]).generateQuestion();
        };
    });

    const hr = document.createElement("hr");
    chooseTopic.appendChild(hr);
}

const anyOption = document.createElement("option");
anyOption.innerText = "Tüm Konular - Hepsi";
anyOption.value = "Hepsi";
chooseTopic.appendChild(anyOption);

let questionTime: number;
let questionStartedAt: number;
let currentQuestion: Question;
let difficulty = parseInt(localStorage.getItem("calc#difficulty") ?? "2");
let currentTopic = chooseTopic.value = localStorage.getItem("calc#topic") ?? topics[0].name;
let optionNames: HTMLDivElement[];
let correctOption: HTMLDivElement;
const timeouts = [];
let over = false;
let points = 0;
let skipWrong = toggleWrongSkip.checked = (localStorage.getItem("calc#toggleWrongSkip") ?? "true") === "true";
difficultyButtons[difficulty].classList.add("selected");
updateHighScore();

function setSafeTimeout(cb: Function, t: number) {
    timeouts.push(setTimeout(cb, t));
}

function clearTimeouts() {
    for (const timeout of timeouts) {
        clearTimeout(timeout);
    }

    timeouts.length = 0;
}

function generateQuestion() {
    return (
        currentTopic === "Hepsi"
            ? randArray(topics)
            : topics.find(i => i.name === currentTopic)
    ).generateQuestion();
}

function showQuestionInABit(question: Question) {
    questionContainer.style.scale = "0";
    timeBar.hidden = true;
    setSafeTimeout(() => showQuestion(question), 500);
}

function newQuestion() {
    showQuestionInABit(generateQuestion());
}

function updateHighScore() {
    const key = `calc#highScore#${currentTopic}#${difficulty}`;
    let highScore = parseInt(localStorage.getItem(key) || "0");

    if (points > highScore) {
        highScore = points;
        localStorage.setItem(key, highScore.toString());
    }

    if (highScore) highScoreText.textContent = "Rekor puan: " + highScore;
}

function addPoints(p: number) {
    p = Math.max(0, Math.round(p));
    points += p;
    pointsText.textContent = points.toString();
    if (p === 0) return;

    updateHighScore();

    pointDifference.textContent = p > 0 ? "+" + p : p.toString();
    pointDifference.classList.remove("green");
    pointDifference.classList.remove("red");

    if (p > 0) pointDifference.classList.add("green");
    else pointDifference.classList.add("red");

    pointDifference.style.animation = "point-difference 1s forwards";

    setSafeTimeout(() => pointDifference.style.animation = "", 1000);
}

function renderLatex(text: string, element: HTMLDivElement) {
    // @ts-expect-error Katex is imported via html
    katex.render(text + "", element, {throwOnError: false, displayMode: true});
}

function questionOver(status: "correct" | "wrong" | "timeout") {
    if (correctOption) correctOption.classList.add("correct");
    over = true;
    clearTimeouts();
    timeBar.style.animationPlayState = "paused";
    if (status === "correct") {
        addPoints(10 + (questionTime - (Date.now() - questionStartedAt) / 1000));
        newQuestion();
    } else {
        addPoints(-5);
        if (currentQuestion.input === "text") questionInput.value = currentQuestion.answer;

        if (skipWrong) setSafeTimeout(newQuestion, 500);
        else continueBtn.style.scale = "1";
    }
}

function makeOptionDiv(option: string, index: number) {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    const optionName = document.createElement("div");
    optionName.classList.add("option-name");
    renderLatex([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"][index], optionName);
    optionElement.appendChild(optionName);
    const optionValue = document.createElement("div");
    optionValue.classList.add("option-value");
    renderLatex(option, optionValue);
    optionElement.appendChild(optionValue);
    questionOptions.appendChild(optionElement);
    if (option === currentQuestion.answer) correctOption = optionName;
    optionNames.push(optionName);

    optionElement.addEventListener("click", () => {
        const classes = optionName.classList;
        if (classes.contains("wrong") || classes.contains("correct")) return;

        if (over) return;

        classes.add("wrong");

        questionOver(option === currentQuestion.answer ? "correct" : "wrong");
    });
}

function showQuestion(question: Question) {
    questionStartedAt = Date.now();
    currentQuestion = question;
    continueBtn.style.scale = "0";
    timeBar.style.animationPlayState = "running";
    clearTimeouts();

    over = false;
    optionNames = [];
    questionContainer.style.scale = "1";
    renderLatex((isMobileViewport() ? "\\Large " : "\\huge ") + question.title, questionLabel);
    questionOptions.innerHTML = "";

    questionTime = question.normalTime * [4, 2, 1, 0.5, 0.25][difficulty] * Math.max(0.3, Math.E ** (-points / 800));
    timeBar.hidden = false;
    timeBar.style.animationDuration = questionTime + "s";

    if (question.input === "text") {
        questionInput.value = "";
        questionInputDiv.hidden = false;
    } else {
        questionInputDiv.hidden = true;
        for (let i = 0; i < question.options.length; i++) {
            makeOptionDiv(question.options[i], i);
        }
    }

    setSafeTimeout(() => {
        if (over) return;

        for (const name of optionNames) {
            name.classList.add("wrong");
        }

        questionOver("timeout");
    }, questionTime * 1000);
}

pressToStart.addEventListener("click", () => {
    points = 0;
    addPoints(0);
    mainMenuContainer.style.scale = "0";
    endButton.style.scale = "1";
    pointsText.style.scale = "1";
    highScoreText.style.scale = "1";
    topicText.style.scale = "1";
    q(".toggle-wrong-skip").style.scale = "0";
    topicText.textContent = currentTopic + " - " + difficultyButtons[difficulty].textContent;
    updateHighScore();
    newQuestion();
});

endButton.addEventListener("click", () => {
    points = 0;
    currentQuestion = null;
    addPoints(0);
    over = false;
    clearTimeouts();
    highScoreText.style.scale = "0";
    topicText.style.scale = "0";
    questionContainer.style.scale = "0";
    mainMenuContainer.style.scale = "1";
    endButton.style.scale = "0";
    pointsText.style.scale = "0";
    continueBtn.style.scale = "0";
    q(".toggle-wrong-skip").style.scale = "1";
});

toggleWrongSkip.addEventListener("change", () => {
    localStorage.setItem("calc#toggleWrongSkip", (skipWrong = toggleWrongSkip.checked).toString());
});

continueBtn.addEventListener("click", () => {
    continueBtn.style.scale = "0";
    newQuestion();
});

chooseTopic.addEventListener("change", () => {
    localStorage.setItem("calc#topic", currentTopic = chooseTopic.value);
});

for (const btn of difficultyButtons) {
    btn.addEventListener("click", () => {
        difficulty = difficultyButtons.indexOf(btn);
        localStorage.setItem("calc#difficulty", difficulty.toString());

        for (const button of difficultyButtons) {
            button.classList.remove("selected");
        }

        btn.classList.add("selected");
    });
}

questionInput.addEventListener("input", () => {
    if (over) return;
    if (
        currentQuestion.answer === questionInput.value
        || (!currentQuestion.caseSensitive && currentQuestion.answer === questionInput.value)
    ) {
        questionOver("correct");
    }
});