// Sample questions array
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1500", "1488", "1492", "1502"],
        correct: 0
    }
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
const questionEl = document.getElementById('question');
const optionsContainer = document.querySelector('.options-container');
const nextButton = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const questionNumber = document.querySelector('.question-number');

function loadQuestion() {
    const current = questions[currentQuestion];
    questionEl.textContent = current.question;
    
    optionsContainer.innerHTML = '';
    current.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    updateProgress();
}

function checkAnswer(selectedIndex) {
    const current = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.disabled = true;
    });
    
    if (selectedIndex === current.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[current.correct].classList.add('correct');
    }
    
    nextButton.style.display = 'block';
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    const container = document.querySelector('.quiz-container');
    container.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score}/${questions.length}</p>
        <button onclick="location.reload()" class="btnq">Try Again</button>
    `;
}

// Initialize the quiz
loadQuestion();