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
        if(operation != '^' && operation != 'sqrt' && operation != '^3' && operation != 'cbrt')
            this.compute(10,100,operation)
        else
            this.compute(4,20,operation)
    }

    hard(operation){
        if(operation != '^' && operation != 'sqrt' && operation != '^3' && operation != 'cbrt')
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

        if(operation == '^3' && this.difficulty=='easy'){
            num1 = this.random(min, max);
            num2 = 3;
        }

        if(operation == 'cbrt' && this.difficulty=='easy'){
            num1 = Math.pow(this.random(min, max), 3);
        }

        if(operation == '^3' && this.difficulty=='average'){
            num1 = this.random(min, max);
            num2 = 3;
        }

        if(operation == 'cbrt' && this.difficulty=='average'){
            num1 = Math.pow(this.random(min, max), 3);
        }

        if(operation == '^3' && this.difficulty=='hard'){
            num1 = this.random(min, max);
            num2 = 3;
        }

        if(operation == 'cbrt' && this.difficulty=='hard'){
            num1 = Math.pow(this.random(min, max), 3);
        }

        if(this.difficulty=='easy' && operation != '^' && operation != 'sqrt' && operation != '^3' && operation != 'cbrt'){
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
           case '^3':
               if(num2===1) ++num2
            this.question = `${num1} ^ ${num2}`;
            this.answer = (Math.pow(num1, num2)).toString()
           break;
           case 'cbrt':
               if(num2===1) ++num2
            this.question = `${"Cube root of "} ${num1}`;
            this.answer = (Math.cbrt(num1)).toString()
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

var addition = false;
var subtraction = false;
var multiplication = false;
var division = false;
var square = false;
var squareRoot = false;
var cube = false;
var cubeRoot = false;

function switchAddition(){
    if(addition)
    {
        addition = false;
        document.getElementById("1").style.background = "#ffffff";
        document.getElementById("1").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        addition = true;
        document.getElementById("1").style.background = "#6ed158";
        document.getElementById("1").style.color = "#ffffff";
        operation = '+';
    }
}

function switchSubtraction(){
    if(subtraction)
    {
        subtraction = false;
        document.getElementById("2").style.background = "#ffffff";
        document.getElementById("2").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        subtraction = true;
        document.getElementById("2").style.background = "#6ed158";
        document.getElementById("2").style.color = "#ffffff";
        operation = '-';
    }
}

function switchMultiplication(){
    if(multiplication)
    {
        multiplication = false;
        document.getElementById("3").style.background = "#ffffff";
        document.getElementById("3").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        multiplication = true;
        document.getElementById("3").style.background = "#6ed158";
        document.getElementById("3").style.color = "#ffffff";
        operation = '×';
    }
}

function switchDivision(){
    if(division)
    {
        division = false;
        document.getElementById("4").style.background = "#ffffff";
        document.getElementById("4").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        division = true;
        document.getElementById("4").style.background = "#6ed158";
        document.getElementById("4").style.color = "#ffffff";
        operation = '÷';
    }
}

function switchSquare(){
    if(square)
    {
        square = false;
        document.getElementById("5").style.background = "#ffffff";
        document.getElementById("5").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        square = true;
        document.getElementById("5").style.background = "#6ed158";
        document.getElementById("5").style.color = "#ffffff";
        operation = '^';
    }
}

function switchSquareRoot(){
    if(squareRoot)
    {
        squareRoot = false;
        document.getElementById("6").style.background = "#ffffff";
        document.getElementById("6").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        squareRoot = true;
        document.getElementById("6").style.background = "#6ed158";
        document.getElementById("6").style.color = "#ffffff";
        operation = 'sqrt';
    }
}

function switchCube(){
    if(cube)
    {
        cube = false;
        document.getElementById("7").style.background = "#ffffff";
        document.getElementById("7").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        cube = true;
        document.getElementById("7").style.background = "#6ed158";
        document.getElementById("7").style.color = "#ffffff";
        operation = '^3';
    }
}

function switchCubeRoot(){
    if(cubeRoot)
    {
        cubeRoot = false;
        document.getElementById("8").style.background = "#ffffff";
        document.getElementById("8").style.color = "#494c6e";
        operation = null;
    }
    else
    {
        cubeRoot = true;
        document.getElementById("8").style.background = "#6ed158";
        document.getElementById("8").style.color = "#ffffff";
        operation = 'cbrt';
    }
}
function startQuiz(){
    difficulty = difficulty.value;
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
        var questionType = new Array();
        if(addition)
            questionType.push('+');
        if(subtraction)
            questionType.push('-');
        if(multiplication)
            questionType.push('×');
        if(division)
            questionType.push('÷');
        if(square)
            questionType.push('^');
        if(squareRoot)
            questionType.push('sqrt');
        if(cube)
            questionType.push('^3');
        if(cubeRoot)
            questionType.push('cbrt');

        var i = Math.floor(Math.random() * questionType.length);
        operation = questionType[i];

        const question = new Question(difficulty, operation)
        previousQuestion = question;
        displayQuestion(question);
    }
}

function calculateResult(question){
    const userAnswer = document.querySelector('[selected="true"]').innerText;
    --totalQuestions;
    if(userAnswer === question.answer){
        ++totalMarks;
    }else{
        wrongQuestions.push(question.question + " isn't equal to " + userAnswer);
        return;
    }
}

function displayResult(){
    let resultDiv = document.querySelector('.result');
    gradeDiv = document.querySelector('.grade'),
    wrongsDiv = document.querySelector('.wrongs'),
    score = grade(totalMarks, totalQuestions2);
    questionDiv.className = 'question animated fadeOut hide'
    resultDiv.children[1].parentElement.className = 'result show animated fadeIn'
    resultDiv.children[1].innerHTML = 
    `<span class="option-container total">Total Questions: ${totalQuestions2}</span><span class="option-container correct">Correct: ${totalMarks}</span><span class="option-container wrong">Wrong: ${totalQuestions2-totalMarks}</span>`
    gradeDiv.innerHTML = `<p>${score}</p>`

    var wrongsText = "";
    for(var i = 0; i < wrongQuestions.length; i++){
        var wrongsText = wrongsText + "<br />" + wrongQuestions[i];
    }
    wrongsDiv.innerHTML = `<p>${wrongsText}</p>`
}

function confirmation(){
    if(!document.querySelector('[selected="true"]')){
        notify('Please Select all the required inputs.');
        throw new Error('Please select all the required inputs')
    }
}

function notify(msg){
    noti.innerText = msg;
    noti.style.color = 'var(--text-color)'
    noti.style.background = 'var(--div-bg)';
    noti.className = 'notify show animated slideInRight'
    setTimeout(()=>{
        noti.className='notify show animated slideOutRight'
    }, 1000)
}

function grade(correct, total){
    let percent = (100 * correct) / total;
    if(percent >= 97) {
        return "A+"
    }else if(percent >= 90) {
        return "A"
    }else if(percent<=89&&percent>=80) {
        return "B"
    }else if(percent<=79&&percent>=70) {
        return "C"
    } else if(percent<=69&&percent>=60) {
        return "D"
    }else if(percent<60) {
        return "F";
    }else {
        return;
    }
}