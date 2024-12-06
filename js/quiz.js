// let currentPage = 1;
// let questionsPerPage = 25;
// let allQuestions = [];

// // Load and manage quiz questions
// let currentQuestionIndex = 0;
// let questions = [];
// let filteredQuestions = [];

// // Fetch questions from JSON file
// async function loadQuestions() {
//     try {
//         const response = await fetch('../questions.json');
//         const data = await response.json();
//         questions = data.questions;
//         filteredQuestions = questions;
        
//         // Populate filter dropdowns with data from JSON
//         populateFilters(data.pageInfo.filters);
        
//         displayQuestion(currentQuestionIndex);
//     } catch (error) {
//         console.error('Error loading questions:', error);
//     }
// }

// // Populate filter dropdowns
// function populateFilters(filters) {
//     const categorySelect = document.getElementById('category');
//     const boardSelect = document.getElementById('board');
//     const yearSelect = document.getElementById('year');

//     // Clear existing options
//     categorySelect.innerHTML = '<option value="all">All Categories</option>';
//     boardSelect.innerHTML = '<option value="all">All Boards</option>';
//     yearSelect.innerHTML = '<option value="all">All Years</option>';

//     // Add options from JSON data
//     if (filters.categories) {
//         filters.categories.forEach(category => {
//             const option = document.createElement('option');
//             option.value = category.value;
//             option.textContent = category.label;
//             categorySelect.appendChild(option);
//         });
//     }

//     if (filters.boards) {
//         filters.boards.forEach(board => {
//             const option = document.createElement('option');
//             option.value = board.value;
//             option.textContent = board.label;
//             boardSelect.appendChild(option);
//         });
//     }

//     if (filters.years) {
//         filters.years.forEach(year => {
//             const option = document.createElement('option');
//             option.value = year;
//             option.textContent = year;
//             yearSelect.appendChild(option);
//         });
//     }
// }

// // Display current question
// function displayQuestion(index) {
//     if (!questions || questions.length === 0) return;
//     const hasQuestions = filteredQuestions && filteredQuestions.length > 0;
//     const container = document.querySelector('.quiz-container');
//     const existingCards = document.querySelectorAll('.question-card');
    
//     // Remove existing question cards
//     existingCards.forEach(card => card.remove());
    
//     // Create and display new question cards
//     if (hasQuestions) {
//         for (let i = 0; i < filteredQuestions.length; i++) {
//             const currentQuestion = filteredQuestions[i];
            
//             // Create question card
//             const card = document.createElement('div');
//             card.className = 'question-card';
            
//             // Create card HTML structure
//             card.innerHTML = `
//                 <div class="question-header">
//                     <div class="question-title"></div>
//                     <div class="question-metadata">
//                         <span class="year"></span>
//                         <span class="board"></span>
//                         <span class="organization"></span>
//                     </div>
//                 </div>
//                 <div class="question-body">
//                     <p></p>
//                     <div class="options"></div>
//                 </div>
//                 <div class="question-footer">
//                     <div class="tags"></div>
//                     <div class="actions">
//                         <button class="check-answer-btn">Check Answer</button>
//                         <button class="next-btn" style="display: none;">Next Question</button>
//                     </div>
//                 </div>
//             `;
            
//             // Update title and metadata
//             const titleEl = card.querySelector('.question-title');
//             titleEl.textContent = `Question ${i + 1}`;
//             titleEl.insertAdjacentHTML('beforeend', ` <span class="question-id">(${currentQuestion.id})</span>`);
            
//             const yearSpan = card.querySelector('.year');
//             const boardSpan = card.querySelector('.board');
//             const orgSpan = card.querySelector('.organization');
//             if (yearSpan) yearSpan.textContent = currentQuestion.year || '';
//             if (boardSpan) boardSpan.textContent = currentQuestion.board || '';
//             if (orgSpan) orgSpan.textContent = currentQuestion.organization || '';
            
//             // Update question content
//             const bodyEl = card.querySelector('.question-body p');
//             bodyEl.textContent = currentQuestion.content;
            
//             // Add options
//             const optionsContainer = card.querySelector('.options');
//             currentQuestion.options.forEach((option, optIndex) => {
//                 const optionElement = document.createElement('div');
//                 optionElement.className = 'option';
                
//                 const input = document.createElement('input');
//                 input.type = 'radio';
//                 input.name = `question${i}`;
//                 input.id = `q${i}${String.fromCharCode(97 + optIndex)}`;
//                 input.value = option.value;
                
//                 const label = document.createElement('label');
//                 label.htmlFor = input.id;
//                 label.setAttribute('data-letter', option.value);
//                 label.textContent = option.text;
                
//                 optionElement.appendChild(input);
//                 optionElement.appendChild(label);
//                 optionsContainer.appendChild(optionElement);
//             });
            
//             // Add tags
//             const tagsContainer = card.querySelector('.tags');
//             if (currentQuestion.tags) {
//                 currentQuestion.tags.forEach(tag => {
//                     const tagElement = document.createElement('div');
//                     tagElement.className = 'tag';
//                     tagElement.textContent = tag;
//                     tagsContainer.appendChild(tagElement);
//                 });
//             }
            
//             // Add card to container
//             container.appendChild(card);
//         }
//     }
// }

// // Handle checking answers
// function checkAnswer(selectedIndex) {
//     const resultDiv = document.getElementById('result');
//     const nextButton = document.getElementById('next');
//     const options = document.querySelectorAll('#options > div');
//     const currentQuestion = questions[currentQuestionIndex];

//     // Disable further clicks
//     options.forEach(option => {
//         option.style.pointerEvents = 'none';
//     });

//     // Show correct/incorrect answer
//     const correctAnswerIndex = optionLetters.indexOf(currentQuestion.correctAnswer);
//     if (selectedIndex === correctAnswerIndex) {
//         score++;
//         resultDiv.querySelector('div').className = 'p-4 rounded bg-green-100 text-green-700';
//         resultDiv.querySelector('div').textContent = 'Correct!';
        
//         // Highlight correct answer
//         options[selectedIndex].className = 'p-4 rounded bg-green-100';
//         options[selectedIndex].querySelector('div:first-child').className = 
//             'bg-green-500 text-white font-bold py-1 px-3 rounded-full mr-2';
//     } else {
//         resultDiv.querySelector('div').className = 'p-4 rounded bg-red-100 text-red-700';
//         resultDiv.querySelector('div').textContent = 'Incorrect!';
        
//         // Highlight correct and incorrect answers
//         options[correctAnswerIndex].className = 'p-4 rounded bg-green-100';
//         options[selectedIndex].className = 'p-4 rounded bg-red-100';
//         options[correctAnswerIndex].querySelector('div:first-child').className = 
//             'bg-green-500 text-white font-bold py-1 px-3 rounded-full mr-2';
//         options[selectedIndex].querySelector('div:first-child').className = 
//             'bg-red-500 text-white font-bold py-1 px-3 rounded-full mr-2';
//     }

//     resultDiv.classList.remove('hidden');
//     nextButton.classList.remove('hidden');
// }

// // Filter questions based on selected criteria
// function filterQuestions() {
//     const selectedCategory = document.getElementById('category').value;
//     const selectedBoard = document.getElementById('board').value;
//     const selectedYear = document.getElementById('year').value;

//     filteredQuestions = questions.filter(question => {
//         const categoryMatch = selectedCategory === 'all' || 
//             (question.category && question.category.toLowerCase().includes(selectedCategory.toLowerCase()));
//         const boardMatch = selectedBoard === 'all' || 
//             (question.board && question.board.toLowerCase() === selectedBoard.toLowerCase());
//         const yearMatch = selectedYear === 'all' || 
//             question.year === selectedYear;

//         return categoryMatch && boardMatch && yearMatch;
//     });

//     currentQuestionIndex = 0;
//     displayQuestion(currentQuestionIndex);
// }

// // Initialize quiz
// document.addEventListener('DOMContentLoaded', () => {
//     // Add filter event listeners
//     document.getElementById('category').addEventListener('change', filterQuestions);
//     document.getElementById('board').addEventListener('change', filterQuestions);
//     document.getElementById('year').addEventListener('change', filterQuestions);
    
//     loadQuestions();
    
//     // Add event listeners for navigation
//     document.querySelectorAll('.check-answer-btn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             checkAnswers();
//             // Show next button after checking answers
//             this.style.display = 'none';
//             this.nextElementSibling.style.display = 'inline-block';
//         });
//     });

//     document.querySelectorAll('.next-btn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             currentQuestionIndex += 3; // Move to next set of questions
//             if (currentQuestionIndex < filteredQuestions.length) {
//                 displayQuestion(currentQuestionIndex);
//                 // Reset buttons
//                 document.querySelectorAll('.check-answer-btn').forEach(checkBtn => {
//                     checkBtn.style.display = 'inline-block';
//                 });
//                 document.querySelectorAll('.next-btn').forEach(nextBtn => {
//                     nextBtn.style.display = 'none';
//                 });
//                 // Clear previous selections
//                 document.querySelectorAll('.option').forEach(option => {
//                     option.classList.remove('correct', 'incorrect');
//                 });
//             } else {
//                 alert('You have completed all questions!');
//                 currentQuestionIndex = 0;
//                 displayQuestion(currentQuestionIndex);
//             }
//         });
//     });
// });

let currentPage = 1;
let questionsPerPage = 25;
let allQuestions = [];

// Load and manage quiz questions
let currentQuestionIndex = 0;
let questions = [];
let filteredQuestions = [];

// Cache DOM elements
const elements = {
    container: document.querySelector('.quiz-container'),
    categorySelect: document.getElementById('category'),
    boardSelect: document.getElementById('board'),
    yearSelect: document.getElementById('year'),
    questionsContainer: document.querySelector('.questions-area'), // Add this new element
    header: document.querySelector('.quiz-header') // Add this new element
};

// Fetch questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('../questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        questions = data.questions;
        filteredQuestions = questions;
        
        // Populate filter dropdowns with data from JSON
        populateFilters(data.pageInfo.filters);
        
        displayQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error loading questions:', error);
        // Add user-friendly error handling
        elements.container.innerHTML = '<div class="error">Failed to load questions. Please try again later.</div>';
    }
}

// Populate filter dropdowns
function populateFilters(filters) {
    if (!filters) return;

    const createOptions = (select, items, defaultText) => {
        select.innerHTML = `<option value="all">${defaultText}</option>`;
        
        if (Array.isArray(items)) {
            const fragment = document.createDocumentFragment();
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = typeof item === 'object' ? item.value : item;
                option.textContent = typeof item === 'object' ? item.label : item;
                fragment.appendChild(option);
            });
            select.appendChild(fragment);
        }
    };

    createOptions(elements.categorySelect, filters.categories, 'All Categories');
    createOptions(elements.boardSelect, filters.boards, 'All Boards');
    createOptions(elements.yearSelect, filters.years, 'All Years');
}

// // Display current question
// function displayQuestion(index) {
//     if (!questions?.length) return;
    
//     const fragment = document.createDocumentFragment();
//     elements.container.innerHTML = '';

//     filteredQuestions.forEach((currentQuestion, i) => {
//         const card = createQuestionCard(currentQuestion, i);
//         fragment.appendChild(card);
//     });

//     elements.container.appendChild(fragment);
// }

// Modify the displayQuestion function
function displayQuestion(index) {
    if (!questions?.length) return;
    
    // Create questions container if it doesn't exist
    if (!elements.questionsContainer) {
        elements.questionsContainer = document.createElement('div');
        elements.questionsContainer.className = 'questions-area';
        elements.container.appendChild(elements.questionsContainer);
    }

    const fragment = document.createDocumentFragment();
    elements.questionsContainer.innerHTML = ''; // Only clear the questions area

    filteredQuestions.forEach((currentQuestion, i) => {
        const card = createQuestionCard(currentQuestion, i);
        fragment.appendChild(card);
    });

    elements.questionsContainer.appendChild(fragment);

    // Update questions count in header if needed
    const questionsCount = document.querySelector('.questions-count');
    if (questionsCount) {
        questionsCount.textContent = `${filteredQuestions.length} questions`;
    }
}

// Create question card
function createQuestionCard(currentQuestion, index) {
    const card = document.createElement('div');
    card.className = 'question-card';
    
    // card.innerHTML = `
    //     <div class="question-header">
    //         <div class="question-title">Question ${index + 1}
    //             <span class="question-id">(${currentQuestion.id})</span>
    //         </div>
    //         <div class="tags"></div>
    //         <div class="question-metadata">
    //             <span class="year">${currentQuestion.year || ''}</span>
    //             <span class="board">${currentQuestion.board || ''}</span>
    //             <span class="organization">${currentQuestion.organization || ''}</span>
    //         </div>
    //     </div>
    //     <div class="question-body">
    //         <p>${currentQuestion.content}</p>
    //         <div class="options"></div>
    //     </div>
    //     <div class="question-footer">
    //         <div class="actions">
    //             <button class="check-answer-btn">Check Answer</button>
    //             <button class="next-btn" style="display: none;">Next Question</button>
    //         </div>
    //     </div>
    // `;

        card.innerHTML = `
        <div class="question-header">
            <div class="question-title">
                <span class="question-number">${index + 1}</span>
            </div>
            <div class="question-metadata">
                <span class="year">${currentQuestion.year || ''}</span>
                <span class="board">${currentQuestion.board || ''}</span>
                <span class="organization">${currentQuestion.organization || ''}</span>
            </div>
        </div>
        <div class="question-body">
            <p>${currentQuestion.content}</p>
            <div class="options"></div>
        </div>
        <div class="question-footer">

            <div class="actions">
                <button class="check-answer-btn">Check Answer</button>
                <button class="next-btn" style="display: none;">Next Question</button>
            </div>
            <div class="tags"></div>
        </div>
    `;

    // Add options
    const optionsContainer = card.querySelector('.options');
    currentQuestion.options.forEach((option, optIndex) => {
        const optionElement = createOptionElement(option, index, optIndex);
        optionsContainer.appendChild(optionElement);
    });

    // Add tags
    if (currentQuestion.tags?.length) {
        const tagsContainer = card.querySelector('.tags');
        const tagsFragment = document.createDocumentFragment();
        
        currentQuestion.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsFragment.appendChild(tagElement);
        });
        
        tagsContainer.appendChild(tagsFragment);
    }

    return card;
}

// Create option element
function createOptionElement(option, questionIndex, optionIndex) {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question${questionIndex}`;
    input.id = `q${questionIndex}${String.fromCharCode(97 + optionIndex)}`;
    input.value = option.value;

    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.setAttribute('data-letter', option.value);
    label.textContent = option.text;

    optionElement.appendChild(input);
    optionElement.appendChild(label);
    
    return optionElement;
}

// Handle checking answers
function checkAnswer(card) {
    if (!card) return;

    const selectedOption = card.querySelector('input[type="radio"]:checked');
    if (!selectedOption) {
        alert('Please select an answer first.');
        return;
    }

    const options = card.querySelectorAll('.option');
    const checkButton = card.querySelector('.check-answer-btn');
    const nextButton = card.querySelector('.next-btn');
    const questionIndex = parseInt(selectedOption.name.replace('question', ''));
    const currentQuestion = filteredQuestions[questionIndex];

    // Disable further selection
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    const isCorrect = selectedOption.value === currentQuestion.correctAnswer;
    
    // Update UI based on answer
    options.forEach(option => {
        const input = option.querySelector('input');
        if (input.value === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (input === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    checkButton.style.display = 'none';
    nextButton.style.display = 'block';
}

// Filter questions
function filterQuestions() {
    const filters = {
        category: elements.categorySelect.value.toLowerCase(),
        board: elements.boardSelect.value.toLowerCase(),
        year: elements.yearSelect.value
    };

    filteredQuestions = questions.filter(question => {
        if (filters.category !== 'all' && 
            (!question.category || 
             !question.category.toLowerCase().includes(filters.category))) {
            return false;
        }
        if (filters.board !== 'all' && 
            (!question.board || 
             question.board.toLowerCase() !== filters.board)) {
            return false;
        }
        if (filters.year !== 'all' && question.year !== filters.year) {
            return false;
        }
        return true;
    });

    currentQuestionIndex = 0;
    displayQuestion(currentQuestionIndex);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    
    // Event delegation for question cards
    elements.container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('check-answer-btn')) {
            checkAnswer(target.closest('.question-card'));
        } else if (target.classList.contains('next-btn')) {
            // Handle next question
            currentQuestionIndex = (currentQuestionIndex + 1) % filteredQuestions.length;
            displayQuestion(currentQuestionIndex);
        }
    });

    // Add filter change listeners
    elements.categorySelect.addEventListener('change', filterQuestions);
    elements.boardSelect.addEventListener('change', filterQuestions);
    elements.yearSelect.addEventListener('change', filterQuestions);
});
