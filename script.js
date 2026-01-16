// ========================================
// GLOBAL STATE
// ========================================

let currentSlide = 1;
const totalSlides = 4;

let currentQuestion = 0;
let selectedOption = null;
let score = 0;

// Sound elements
let correctSound, wrongSound, clockSound;

// ========================================
// QUIZ QUESTIONS DATA
// ========================================

const quizQuestions = [
    {
        question: "What does Google Lens help you do?",
        options: [
            "Play games",
            "Identify objects using AI",
            "Edit photos",
            "Send messages"
        ],
        correct: 1, // Index of correct answer (B)
        correctFeedback: "Correct! Google Lens uses AI to identify objects.",
        wrongFeedback: "Incorrect. Google Lens is used to identify objects, not games or messaging."
    },
    {
        question: "How does AI identify an object in a photo?",
        options: [
            "By thinking like humans",
            "By guessing randomly",
            "By matching it with trained images",
            "By asking people"
        ],
        correct: 2,
        correctFeedback: "Correct! AI compares images with its training data.",
        wrongFeedback: "Wrong. AI does not think or ask people."
    },
    {
        question: "Why can AI sometimes give the wrong answer?",
        options: [
            "Camera is broken",
            "AI has limited training data",
            "Object is new",
            "All of the above"
        ],
        correct: 3,
        correctFeedback: "Correct! New or unseen objects confuse AI.",
        wrongFeedback: "Incorrect. The main reason is lack of proper training data."
    },
    {
        question: "What helps AI become better at identifying objects?",
        options: [
            "Bigger phone",
            "More training images",
            "Louder voice",
            "Faster internet"
        ],
        correct: 1,
        correctFeedback: "Correct! More examples improve AI accuracy.",
        wrongFeedback: "Wrong. Phone or internet speed does not help learning."
    },
    {
        question: "If AI says \"This looks like a plant\", what does that mean?",
        options: [
            "AI is 100% sure",
            "AI is matching patterns",
            "AI understands plants",
            "AI just learned today"
        ],
        correct: 1,
        correctFeedback: "Correct! AI matches patterns, not meaning.",
        wrongFeedback: "Incorrect. AI does not truly understand objects."
    },
    {
        question: "What happens if AI has never seen an object before?",
        options: [
            "It stops working",
            "It guesses the closest object",
            "It learns instantly",
            "It ignores the image"
        ],
        correct: 1,
        correctFeedback: "Correct! AI guesses using similar patterns.",
        wrongFeedback: "Wrong. AI does not instantly learn new things."
    },
    {
        question: "Does AI understand what an object is used for?",
        options: [
            "Yes, fully",
            "No, it only recognizes patterns",
            "Sometimes",
            "It depends on internet"
        ],
        correct: 1,
        correctFeedback: "Correct! AI does not understand purpose.",
        wrongFeedback: "Incorrect. AI only matches patterns."
    },
    {
        question: "Which task is AI best at?",
        options: [
            "Understanding emotions",
            "Creative thinking",
            "Pattern matching",
            "Telling jokes"
        ],
        correct: 2,
        correctFeedback: "Correct! Pattern recognition is AI's strength.",
        wrongFeedback: "Wrong. AI does not truly understand emotions."
    },
    {
        question: "Why does AI sometimes say \"looks like\" instead of \"is\"?",
        options: [
            "AI is unsure",
            "AI is lazy",
            "AI is slow",
            "AI is broken"
        ],
        correct: 0,
        correctFeedback: "Correct! AI gives probability-based answers.",
        wrongFeedback: "Incorrect. AI is not lazy or broken."
    },
    {
        question: "What should you do if AI gives a wrong result?",
        options: [
            "Trust it blindly",
            "Check and verify",
            "Turn off the app",
            "Ignore the output"
        ],
        correct: 1,
        correctFeedback: "Correct! Humans should always verify AI.",
        wrongFeedback: "Wrong. Blind trust is risky."
    },
    {
        question: "Can AI always correctly identify objects?",
        options: [
            "Yes, always",
            "Only when internet is fast",
            "It can make mistakes",
            "Only at night"
        ],
        correct: 2,
        correctFeedback: "Correct! AI depends on data and patterns, so it can make mistakes.",
        wrongFeedback: "Incorrect. AI is not perfect."
    },
    {
        question: "What is the key learning from this activity?",
        options: [
            "AI understands objects like humans",
            "AI matches images using patterns",
            "AI never makes mistakes",
            "AI learns instantly"
        ],
        correct: 1,
        correctFeedback: "Excellent! This is the main takeaway.",
        wrongFeedback: "Incorrect. AI works through pattern matching."
    }
];

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

function goToSection(sectionId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show target screen
    const targetScreen = document.getElementById(sectionId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Initialize section-specific features
        if (sectionId === 'concept-screen') {
            initializeSlides();
        } else if (sectionId === 'quiz-screen') {
            initializeQuiz();
        }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ========================================
// SECTION 3: SLIDE MANAGEMENT
// ========================================

function initializeSlides() {
    currentSlide = 1;
    showSlide(currentSlide);
    createSlideDots();
    updateNavigationButtons();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    // Wrap around
    if (n > totalSlides) {
        currentSlide = totalSlides;
        return;
    }
    if (n < 1) {
        currentSlide = 1;
        return;
    }
    
    currentSlide = n;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active-slide'));
    
    // Show current slide
    const activeSlide = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active-slide');
    }
    
    updateSlideDots();
    updateNavigationButtons();
}

function changeSlide(direction) {
    if (currentSlide === totalSlides && direction === 1) {
        // Last slide, go to quiz
        goToSection('quiz-screen');
        return;
    }
    
    showSlide(currentSlide + direction);
}

function createSlideDots() {
    const dotsContainer = document.getElementById('slideDots');
    dotsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 1) dot.classList.add('active');
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateSlideDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Disable previous on first slide
    if (currentSlide === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // Change text on last slide
    if (currentSlide === totalSlides) {
        nextBtn.textContent = 'Start Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// ========================================
// SECTION 4: QUIZ MANAGEMENT
// ========================================

function initializeQuiz() {
    currentQuestion = 0;
    selectedOption = null;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showFinalScreen();
        return;
    }
    
    // Play clock sound when loading a new question
    playSound('clock');
    
    const question = quizQuestions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index);
        optionDiv.innerHTML = `
            <div class="option-letter">${letters[index]}</div>
            <div>${option}</div>
        `;
        optionsContainer.appendChild(optionDiv);
    });
    
    // Reset state
    selectedOption = null;
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('questionCard').style.display = 'block';
    document.getElementById('feedbackCard').style.display = 'none';
}

function selectOption(index) {
    selectedOption = index;
    
    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // Enable submit button
    document.getElementById('submitBtn').disabled = false;
}

function submitAnswer() {
    if (selectedOption === null) return;
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedOption === question.correct;
    
    if (isCorrect) {
        score++;
        playSound('correct');
    } else {
        playSound('wrong');
    }
    
    // Show feedback
    const feedbackCard = document.getElementById('feedbackCard');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    
    if (isCorrect) {
        feedbackCard.className = 'feedback-card correct';
        feedbackIcon.textContent = '✅';
        feedbackText.textContent = question.correctFeedback;
    } else {
        feedbackCard.className = 'feedback-card incorrect';
        feedbackIcon.textContent = '❌';
        feedbackText.textContent = question.wrongFeedback;
    }
    
    // Hide question, show feedback
    document.getElementById('questionCard').style.display = 'none';
    feedbackCard.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showFinalScreen() {
    // Update progress to 100%
    document.getElementById('progressBar').style.width = '100%';
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Show score
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = `
        <h3>Your Score: ${score} / ${quizQuestions.length}</h3>
        <p>${percentage}% Correct</p>
    `;
    
    // Navigate to insight screen first, then final screen
    goToSection('insight-screen');
}

function restartActivity() {
    currentSlide = 1;
    currentQuestion = 0;
    selectedOption = null;
    score = 0;
    goToSection('intro-screen');
}

// ========================================
// INITIALIZATION
// ========================================

// Sound playback function
function playSound(type) {
    let sound;
    
    if (type === 'correct') {
        sound = document.getElementById('correctSound');
    } else if (type === 'wrong') {
        sound = document.getElementById('wrongSound');
    } else if (type === 'clock') {
        sound = document.getElementById('clockSound');
    }
    
    if (sound) {
        sound.currentTime = 0; // Reset to start
        sound.play().catch(err => {
            console.log('Audio play failed:', err);
        });
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize sound elements
    correctSound = document.getElementById('correctSound');
    wrongSound = document.getElementById('wrongSound');
    clockSound = document.getElementById('clockSound');
    
    // Show intro screen
    goToSection('intro-screen');
});
