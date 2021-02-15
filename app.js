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
        if(operation != '^' && operation != 'sqrt')
            this.compute(10,100,operation)
        else
            this.compute(4,20,operation)
    }

    hard(operation){
        if(operation != '^' && operation != 'sqrt')
            this.compute(100,1000,operation)
        else
            this.compute(4,100,operation)
    }

    compute(min, max, operation){
        let num1 = this.random(min+5, max),
        num2 = this.random(min, max);

        if(operation == '^' && this.difficulty=='easy'){
            num1 = this.random(min, max);
            num2 = this.random(0, 2);
        }

        if(operation == 'sqrt' && this.difficulty=='easy'){
            num1 = Math.pow(this.random(min, max), 2);
        }

        if(operation == '^' && this.difficulty=='average'){
            num1 = this.random(min, max);
            num2 = this.random(1, 2);
        }

        if(operation == 'sqrt' && this.difficulty=='average'){
            num1 = Math.pow(this.random(min, max), 2);
        }

        if(operation == '^' && this.difficulty=='hard'){
            num1 = this.random(min, max);
            num2 = this.random(1, 2);
        }

        if(operation == 'sqrt' && this.difficulty=='hard'){
            num1 = Math.pow(this.random(min, max), 2);
        }

        if(this.difficulty=='easy' && operation != '^' && operation != 'sqrt'){
            num1 = this.random(min, 5) + 5;
            num2 = num1 - this.random(min, 5);
        }
        
       switch(operation){
           case '+':
            this.question = `${num1} + ${num2}`;
            this.answer = (num1+num2).toString()
           break;
           case '-':
            this.question = `${num1} - ${num2}`;
            this.answer = (num1-num2).toString()
           break;
           case '×':
            this.question = `${num1} × ${num2}`;
            this.answer = (num1*num2).toString()
           break;
           case '÷':
               if(num2===1) ++num2
            this.question = `${num1} ÷ ${num2}`;
            this.answer = +parseFloat((Math.round(((num1/num2)) * 10) / 10)).toString();
           break;
           case '^':
               if(num2===1) ++num2
            this.question = `${num1} ^ ${num2}`;
            this.answer = (Math.pow(num1, num2)).toString()
           break;
           case 'sqrt':
               if(num2===1) ++num2
            this.question = `${"Square root of "} ${num1}`;
            this.answer = (Math.sqrt(num1)).toString()
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