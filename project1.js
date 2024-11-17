const quizData = [
    {
        question: "What is the correct syntax to write an HTML comment?",
        options: ["<!--Comment-->", "//Comment", "#Comment", "/*Comment*/"],
        correct: "a"
    },
    {
        question: "What tag is used to render an image on a webpage?",
        options: ["img", "src", "image", "None of the above"],
        correct: "a"
    },
    {
        question: "In how many ways can CSS be written in?",
        options: ["1", "2", "3", "4"],
        correct: "c"
    },
    {
        question: "What type of CSS is generally recommended for designing large web pages?",
        options: ["Inline", "Internal", "External", "None of the above"],
        correct: "c"
    },
    {
        question: "Javascript is an_________language?",
        options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
        correct: "a"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".answer");
const labels = [
    document.getElementById("option_1"),
    document.getElementById("option_2"),
    document.getElementById("option_3"),
    document.getElementById("option_4")
];
const submitBtn = document.getElementById("submit");

function loadQuestion() {
    // Reset timer
    timeLeft = 30;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    // Load question and options
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    labels.forEach((label, index) => {
        label.innerText = currentQuizData.options[index];
    });

    // Clear previous selection
    options.forEach(option => option.checked = false);

    // Start timer
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            handleSubmit(); // Automatically submit when time runs out
        }
    }, 1000);
}

function getSelectedAnswer() {
    let answer;
    options.forEach(option => {
        if (option.checked) {
            answer = option.id;
        }
    });
    return answer;
}

function handleSubmit() {
    clearInterval(timer);

    const answer = getSelectedAnswer();
    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        displayScore();
    }
}

function displayScore() {
    document.getElementById("quiz").innerHTML = `
        <h2>Your total score is: ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

// Attach event listener to submit button
submitBtn.addEventListener("click", handleSubmit);

// Load the first question
loadQuestion();


