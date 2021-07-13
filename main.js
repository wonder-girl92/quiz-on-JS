const option1 = document.querySelector('.option1'),
option2 = document.querySelector('.option2'),
option3 = document.querySelector('.option3'),
option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');
//все наши опции

const question = document.getElementById('question');
//сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'),

numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion, //индекс текущего вопроса
indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');//обертка для трекера
const btnNext = document.getElementById('btn-next');

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //количество правильных ответов
numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),//кол-во всех вопросов в модальном окне
btnTryAgain = document.getElementById('btn-try-again'); //кнопка начать викторину занаво

const questions = [
    {
        question: 'Сколько типов данных есть в JavaScript?',
        options: [
            '9',
            '7',
            '6',
            '8',
        ],
        rightAnswer: 3
    },
    {
        question: 'Определите результат "5" + 2 + 4 ?',
        options: [
            '11',
            '524',
            '56',
            'NaN',
        ],
        rightAnswer: 1
    },
    {
        question: 'Метод, переворачивающий элементы в массиве обратно:',
        options: [
            '.split()',
            '.join()',
            '.reverse',
            'Нет правильного ответа',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что выведет консоль, если искомое через .indexOf() значение в переменной отсутствует?',
        options: [
            'undefined',
            '-1',
            'object',
            'null',
        ],
        rightAnswer: 1
    }, 
    {
        question: 'Определите метод, который округляет дробное число в меньшую сторону:',
        options: [
            'Math.floor()', 
            'Math.round()',
            'Math.trunc()',
            'Math.ceil()',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestions.innerHTML = questions.length; 
//выводим количество вопросов

const load = () => {
question.innerHTML = questions[indexOfQuestion].question; //сам вопрос
//мапим ответы
option1.innerHTML = questions[indexOfQuestion].options[0];
option2.innerHTML = questions[indexOfQuestion].options[1];
option3.innerHTML = questions[indexOfQuestion].options[2];
option4.innerHTML = questions[indexOfQuestion].options[3];

numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
indexOfPage++; //увеличение индекса страницы при загрузке
};

let completedAnswers = [] //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //проверка одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                   hitDuplicate = true; 
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
optionElements.forEach(item => {
    item.classList.add('disabled');
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
        item.classList.add('correct');
    }
})
}

//удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
})
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');//вывод модального окна в конце
correctAnswer.innerHTML = score; //сколько правильных ответов
numberOfAllQuestions2.innerHTML = questions.length;//из общего кол-ва ответов
};

const tryAgain = () => {
    window.location.reload(); //метод window, к-рый перезагружает страницу
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});