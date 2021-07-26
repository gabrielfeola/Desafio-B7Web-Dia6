// Dados iniciais
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();


// Evento
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);




// Funções


// Função responsável por mostrar as questões do quiz, alternar entre as telas, chamar o evento de click das alternativas e mover a barra de progresso.
function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

// Função responsável pelo click do usuário nas alternativas, contabiliza os acertos e define o número da questão atual
function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion()
}

// Função responsável por finalizar o quiz, faz o cálculo da porcentagem de acertos e exibe as informações na tela baseado no resultado.
function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 40) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 40 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

// Função responsável por resetar todo o quiz, é chamada no botão da tela de resultado.
function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}