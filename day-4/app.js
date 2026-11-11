const questions = [{ text: 'Which tag is a heading?', choices: ['h1', 'p', 'div'], answer: 0 }, { text: 'Which language styles a page?', choices: ['CSS', 'SQL', 'C++'], answer: 0 }, { text: 'How many days in a week?', choices: ['5', '7', '9'], answer: 1 }];
let index = 0, score = 0, answered = false;
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

function render() {
    const q = questions[index];
    document.getElementById('question').textContent = `Question ${index + 1} of ${questions.length}: ${q.text}`;
    feedbackEl.textContent = '';
    answered = false;
    answersEl.textContent = '';
    nextBtn.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
    q.choices.forEach((choice, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = choice;
        b.onclick = () => choose(i, b);
        answersEl.appendChild(b);
    });
}

function choose(i, btn) {
    if (answered) return; // count each question only once
    answered = true;
    const q = questions[index];
    const buttons = answersEl.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);
    if (i === q.answer) {
        score++;
        btn.classList.add('correct');
        feedbackEl.textContent = 'Correct!';
    } else {
        btn.classList.add('incorrect');
        buttons[q.answer].classList.add('correct');
        feedbackEl.textContent = 'Incorrect. The right answer is "' + q.choices[q.answer] + '".';
    }
}

nextBtn.onclick = () => {
    if (!answered) {
        feedbackEl.textContent = 'Please choose an answer first.';
        return;
    }
    if (index < questions.length - 1) {
        index++;
        render();
    } else {
        document.getElementById('question').textContent = 'Quiz complete';
        answersEl.textContent = '';
        feedbackEl.textContent = '';
        nextBtn.hidden = true;
        scoreEl.textContent = `Your score: ${score} out of ${questions.length}`;
    }
};
render();