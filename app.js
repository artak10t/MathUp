class Question{
    constructor(difficulty, operation){
        this.difficulty = difficulty;
        this.createQuestion(difficulty, operation)
    }
    
    createQuestion(diff, op){
        if(diff==='easy'){
            return this.easy(op)
        }else if(diff==='normal'){
            return this.normal(op)
        } else if(diff==='hard'){
            return this.hard(op)
        }else{
            return;
        }
    }    
    
    easy(operation){
        this.compute(1,10,operation)
    }

    normal(operation){
        this.compute(10,100,operation)
    }

    hard(operation){
        this.compute(100,1000,operation)
    }

    compute(min, max, operation){
        let num1 = this.random(min+5, max),
        num2 = this.random(min, max);
        
       switch(operation){
           case '+':
            this.question = `${num1} + ${num2}`;
            this.answer = (num1+num2).toString()
           break;
           default:
               return;
       }
    }
    
    random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min
    } 
}


let optionsParent = document.querySelector('.options'),
startDiv = document.querySelector('.start-options'),
questionDiv = document.querySelector('.question'),
noti = document.querySelector('.notify'),
startButton = document.querySelector('#start'),
nextQuestionBtn = document.querySelector('.footer button'),
difficulty = document.getElementById('difficulty'),
totalQuestionsInput = document.getElementById('totalQuestions'),
totalMarks=0,
totalQuestions,
totalQuestions2,
operation,
previousQuestion;

var wrongQuestions = new Array();

optionsParent.addEventListener('click', firstQue)
startDiv.addEventListener('click', firstQue)
startButton.addEventListener('click', startQuiz)
nextQuestionBtn.addEventListener('click', nextQuestion)

function startQuiz(){
    confirmation()
    difficulty = difficulty.value;
    operation = document.querySelector('[selected="true"]').getAttribute('operand');
    let div = document.querySelector('.start');
    div.className='start animated fadeOut';
        div.onanimationend = function() {
            div.classList.add('hide');
            questionDiv.className = 'question show animated fadeIn';
            div.remove()
        }
        totalQuestions = document.querySelector('#totalQuestions').value;
        totalQuestions2 = totalQuestions;
        initiateClass()
}

function nextQuestion(){
    confirmation()
    calculateResult(previousQuestion);
    if(totalQuestions <= 0){
        nextQuestionBtn.innerText = 'Show Results'
    }
    initiateClass()
}

function displayQuestion(question){
    let ans = question.answer,
    questionText = document.querySelector('.question .header h2'),
    num = parseFloat(ans),
    list = [num + question.random(1, 3), ans, num + question.random(3, 5), num + question.random(6, 9)]
    list = list.sort(() => Math.random() - 0.5)
    questionText.innerText = `What's ${question.question}`;
    optionsParent.innerHTML = ''
    list.forEach(item =>{
        const span = document.createElement('span')
        span.className='option-container'
        span.innerText = item;
        optionsParent.appendChild(span)
    })
}

function firstQue(e){
    let options = document.querySelectorAll('.option-container')
    if(e.target.className=='option-container'){
        options.forEach(o => {
            o.className = 'option-container'
            o.removeAttribute('selected')
            nextQuestionBtn.classList.add('btn-active')
        })
        e.target.setAttribute('selected', true)
        e.target.className='option-container option-focus animated jello';
    }else {
        return
    }
}

function initiateClass(){
    if(totalQuestions <= 0){
        displayResult()
    } else{
        const question = new Question(difficulty, operation)
        previousQuestion = question;
        displayQuestion(question);
    }
}