// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Variables to store quiz data and state
const quizData = [
  {
    question: "What is the most basic building block of a 3D model, represented by a single point in space?",
    options: ["Edge", "Vertex", "Face", "Normal"],
    answer: 1
  },
  {
    question: "What is a single flat surface or a polygon that makes up the mesh of a 3D model?",
    options: ["Vertex", "Edge", "Face", "Wireframe"],
    answer: 2
  },
  {
    question: "Which of the following is an example of a 3D primitive?",
    options: ["A vector", "A spline", "A cube", "A rendering"],
    answer: 2
  },
  {
    question: "What is the process of creating a 2D map from the surface of a 3D model to apply a texture?",
    options: ["Subdivision", "Extruding", "UV Unwrapping", "Rigging"],
    answer: 2
  },
  {
    question: "What are the straight lines that connect vertices and form the boundaries of faces?",
    options: ["Edges", "Normals", "Splines", "Grids"],
    answer: 0
  },
  {
    question: "In 3D modeling, what is a boolean operation?",
    options: ["A method for rigging a character", "A way to combine or subtract meshes", "A type of lighting", "A process for optimizing polygons"],
    answer: 1
  },
  {
    question: "What is a 'wireframe'?",
    options: ["A complex rig for animation", "A simplified render of a scene", "The skeletal structure of a 3D mesh", "A tool for sculpting"],
    answer: 2
  },
  {
    question: "What is a 'normal' in 3D modeling?",
    options: ["The standard size of an object", "The angle of a light source", "A vector that indicates the outward direction of a polygon", "A simple, non-organic shape"],
    answer: 2
  },
  {
    question: "What is a spline or curve typically used for in 3D modeling?",
    options: ["To create organic, free-form shapes", "To render a scene faster", "To add physics simulations", "To subdivide a mesh"],
    answer: 0
  },
  {
    question: "What is the process of adding detail to a model by creating more polygons?",
    options: ["Decimation", "Subdivision", "Smoothing", "Retopology"],
    answer: 1
  }
];

    let currentQuestionIndex = 0;
    let score = 0;

    // Selecting DOM elements
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const scoreContainer = document.getElementById('score-container');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');

    // Function to load a question
    function loadQuestion() {
        // Clear previous options
        optionsContainer.innerHTML = '';

        // Get current question data
        const currentQuestion = quizData[currentQuestionIndex];

        // Display question
        questionContainer.textContent = currentQuestion.question;

        // Display options
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.classList.add('option');
            optionButton.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionButton);
        });

        // Disable "Next Question" button until an option is selected
        nextButton.disabled = true;
    }

    // Function to handle option selection
    function selectOption(selectedIndex) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Disable all options after selection
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(option => option.disabled = true);

        // Enable the "Next Question" button
        nextButton.disabled = false;

        // Check if the answer is correct
        if (selectedIndex === currentQuestion.answer) {
            score++;
        }

        // Highlight correct and incorrect options
        allOptions[currentQuestion.answer].style.backgroundColor = 'green';
        if (selectedIndex !== currentQuestion.answer) {
            allOptions[selectedIndex].style.backgroundColor = 'red';
        }
    }

    // Function to show the score
    function showScore() {
        quizContainer.classList.add('hidden');
        scoreContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${quizData.length}`;
    }

    // Function to restart the quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.classList.remove('hidden');
        scoreContainer.classList.add('hidden');
        loadQuestion();
    }

    // Event listener for the "Next Question" button
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;

        // Check if there are more questions
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    });

    // Event listener for the "Restart Quiz" button
    restartButton.addEventListener('click', restartQuiz);

    // Initial function call to load the first question
    loadQuestion();

});
