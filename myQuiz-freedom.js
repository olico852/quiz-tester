var userOptionSelection = 0
var currentPlayer = 1

var question0 = {
  prompt: 'Which of the following is not a liver disease?',
  options: ['Cirrhosis', 'Hepatitis', 'Cancer', 'Phalanges'],
  correctAnswerIndex: 3 // starts at 0
}

var question1 = {
  prompt: 'Worst thing to drink at a party?',
  options: ['Absinthe', 'Bacardi 151', 'Water', 'Turpentine'],
  correctAnswerIndex: 3
}

var question2 = {
  prompt: 'Which of the following is/are not a shade of purple?',
  options: ['Lavender', 'Lilac', 'Turquoise', 'Mauve'],
  correctAnswerIndex: 2
}

var question3 = {
  prompt: 'Which of the following is not a traditional Christmas treat?',
  options: ['Turkey', 'Pont Neuf', 'Fruitcake', 'Stollen'],
  correctAnswerIndex: 1
}

var quiz = {
  questions: [question0, question1, question2, question3], // question1 and question2 were defined above!
  isGameOver: false,
  currentQuestion: 0,
  player1Points: 0,
  player2Points: 0
}

var numberOfQuestions = function () {
  var num = quiz.questions.length
  return num
}

var currentQuestion = function () {
  var num = quiz.currentQuestion // index of question
  return num
}

var correctAnswer = function () {
  var correctAnswerFigure = quiz.questions[quiz.currentQuestion].correctAnswerIndex
  return correctAnswerFigure
}

var numberOfAnswers = function () {
  var total = quiz.questions[quiz.currentQuestion].options.length //
  return total
}

// after each player move, current question need to + 1 so that the next question is loaded
var playTurn = function (choice) {
  // console.log('playTurn() executing');
  if (isGameOver() === true) {
    return false
  } else {
    if (currentPlayer === 1) {
      console.log('current player is ' + currentPlayer);
      if (choice === correctAnswer()) { // checking if the right choice was made for that question
        // console.log('player 1 correct answer check');
        quiz.player1Points++
        // console.log('player 1 points is now ' + quiz.player1Points);
        $('#question' + quiz.currentQuestion).hide()
        quiz.currentQuestion++
        // console.log('moving to question ' + quiz.currentQuestion);
        $('#player' + currentPlayer).css('border','none')
        currentPlayer = 2
        gameUpdate()
        return true
      } if (choice !== correctAnswer()) {
        // console.log('player 1 wrong answer');
        $('#question' + quiz.currentQuestion).hide()
        quiz.currentQuestion++
        $('#player' + currentPlayer).css('border','none')
        currentPlayer = 2
        gameUpdate()
        return false
      }
    } else {
      currentPlayer = 2
      currentQuestion()
      if (correctAnswer() === choice) {
        // console.log('player 2 correct answer check');
        quiz.player2Points++
        $('#question' + quiz.currentQuestion).hide()
        quiz.currentQuestion++
        // console.log('player 2 points is now ' + quiz.player2Points);
        $('#player' + currentPlayer).css('border','none')
        currentPlayer = 1
        gameUpdate()
        return true
      } if (correctAnswer() !== choice) {
        // console.log('player 2 wrong answer');
        $('#question' + quiz.currentQuestion).hide()
        quiz.currentQuestion++
        $('#player' + currentPlayer).css('border','none')
        currentPlayer = 1
        gameUpdate()
        return false
      }
    }
  }
}

function isGameOver () { // this tester doesn't consider the fact that you can win without completing all questions
  if (quiz.currentQuestion >= numberOfQuestions()) {
    if (whoWon() === 1) {
      $('#overlay').show().html('Player 1 won!')
    }
    if (whoWon() === 2) {
      $('#overlay').show().html('Player 2 won!')
    }
    if (whoWon() === 3) {
      $('#overlay').show().html("It's a draw!")
    }
      $('#overlay').append('<div id="refresh">Click to refresh</div>')
      $('#refresh').click(function() {
        location.reload(true)
      })
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
    $('.question').hide()
    $('#overlay').hide().off('click')
    gameUpdate()
  })

var gameUpdate = function () {
  // console.log('gameUpdate fx executing')
  isGameOver()
  // console.log('isGameOver check')
  $('#player1').html('Player 1:  ' + quiz.player1Points).css({'padding':'1em', 'border-radius':'5%'})
  $('#player2').html('Player 2:  ' + quiz.player2Points).css({'padding':'1em', 'border-radius':'5%'})
  // console.log('player scores updated')
  $('#question' + quiz.currentQuestion).show()
  // console.log('#question'+ quiz.currentQuestion)
  $('#player' + currentPlayer).css('border','1px solid black') // will need to be removed with each turn switch
  // console.log(currentPlayer);
  $('#question' + quiz.currentQuestion + ' button').on('click', function(e) { // e.target/event.target refers to the element that triggered the event.
    userOptionSelection = parseInt(e.target.id) // e.target.id returns a string.
    // console.log(userOptionSelection)
    playTurn(userOptionSelection) // callback of playTurn should only be called upon selection of an option.
  })
}
