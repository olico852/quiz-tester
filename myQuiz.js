/*
Create your quiz in this file.
Note the tests will only work if you name your functions accordingly based on the instructions.
*/
var question1 = {
  prompt: 'Which of the following is not a liver disease?',
  options: ['Cirrhosis', 'Hepatitis', 'Cancer', 'Phalanges'],
  correctAnswerIndex: 2 // starts at 0
}

var question2 = {
  prompt: 'Worst thing to drink at a party?',
  options: ['Absinthe', 'Bacardi 151', 'Water', 'Turpentine'],
  correctAnswerIndex: 3
}

var question3 = {
  prompt: 'Which of the following is/are not a shade of purple?',
  options: ['Lavender', 'Lilac', 'Turquoise', 'Mauve'],
  correctAnswerIndex: 2
}

var question4 = {
  prompt: 'Which of the following is not a traditional Christmas treat?',
  options: ['Turkey', 'Pont Neuf', 'Fruitcake', 'Stollen'],
  correctAnswerIndex: 1
}

var quiz = {
  questions: [question1, question2, question3, question4], // question1 and question2 were defined above!
  isGameOver: false,
  currentQuestion: 0,
  player1Points: 0,
  player2Points: 0
}

var numberOfQuestions = function () {
  var num = quiz.questions.length
  console.log(num)
  return num
}

var currentQuestion = function () {
  var num = quiz.currentQuestion // index of question
  return num
}

var correctAnswer = function () {
  return quiz.questions[quiz.currentQuestion].correctAnswerIndex // fit index of question (from currentQuestion) here since this is an object
}

var numberOfAnswers = function () {
  var total = quiz.questions[quiz.currentQuestion].options.length //
  return total
}

var currentPlayer = 1

// after each player move, current question need to + 1 so that the next question is loaded
var playTurn = function (choice) {
  if (isGameOver() === true) {
    return false
  } else { // isGameOver() === false
    if (currentPlayer === 1) {
      currentQuestion()
      if (correctAnswer() === choice) { // checking if the right choice was made for that question
        quiz.player1Points++
        isGameOver()
        quiz.currentQuestion++
        currentPlayer = 2
        return true
      } if (correctAnswer() !== choice) {
        quiz.currentQuestion++
        currentPlayer = 2
        return false
      }
    } else {
      currentPlayer = 2
      currentQuestion()
      if (correctAnswer() === choice) {
        quiz.player2Points++
        isGameOver()
        quiz.currentQuestion++
        currentPlayer = 1
        return true
      } if (correctAnswer() !== choice) {
        quiz.currentQuestion++
        currentPlayer = 1
        return false
      }
    }
  }
}

function isGameOver () { // this tester doesn't consider the fact that you can win without completing all questions
  if (quiz.currentQuestion >= numberOfQuestions()) { // DO MORE CHECKS. FIND OUT. CONSOLE.IDK.
    return true
  } else {
    return false
  }
}

function whoWon () {
  if (quiz.currentQuestion < numberOfQuestions()) return 0
  if (quiz.player1Points > quiz.player2Points ) return 1
  if (quiz.player2Points > quiz.player1Points) return 2
  if (quiz.player1Points === quiz.player2Points) return 3 // you cannot write x === y === z.
}

function restart () {
  quiz.isGameOver = false
  quiz.currentQuestion = 0
  quiz.player1Points = 0
  quiz.player2Points = 0
}

// jQuery starts here
$('#overlay').on('click', function () {
    $('#overlay').hide().off('click')
  })

  // $('#question0') = question1
  // $('#question1') = question2
  // $('#question2') = question3
  // $('#question3') = question4
