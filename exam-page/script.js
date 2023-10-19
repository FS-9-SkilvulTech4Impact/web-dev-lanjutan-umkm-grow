/**
 * Reponsive Navbar
 */
const menuMobileOpen = document.getElementById('menu-mobile-open');
const menuMobileClose = document.getElementById('menu-mobile-close');
const menuMobile = document.getElementById('menu-mobile');

menuMobileOpen.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

menuMobileClose.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

/**
 * Fetch Data
 */
async function fetchData(url) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Response error');
		}

		const resJson = await response.json();

		return resJson.data;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}

const examName = document.getElementById('exam-name');
const numQuestion = document.getElementById('num-question');
const questionNode = document.getElementById('question');
const answers = document.getElementById('answers');
const prevQuestion = document.getElementById('prev-question');
const nextQuestion = document.getElementById('next-question');
const listQuestion = document.getElementById('list-question');

let currentQuestion = 'question-1';
let currentAnswer = {};

function handleAnswerClick(e) {
	const num = e.target.getAttribute('data-num');
	const ans = e.target.getAttribute('data-key');
	currentAnswer = { ...currentAnswer, [num]: ans };
	console.log(currentAnswer);
	initAnswerControl();
}

async function updateQuestion() {
	const data = await fetchData(
		'https://9cac7863-db16-495f-9f50-d4a119739f66.mock.pstmn.io/exam-1?questions=true',
	);

	console.log(data);

	examName.innerHTML = data.exam_name;

	let listQuestionArr = [];

	data.questions.forEach((question, i) => {
		listQuestionArr.push(`<div data-num="${i + 1}"
						class="box-num text-slate-700 md:text-[20px] p-2 md:p-3 hover:bg-zinc-100 text-center rounded-md border border-slate-300 cursor-pointer ${
							currentAnswer.hasOwnProperty(i + 1) ? 'bg-[#5EEA6C]' : 'bg-white'
						}">
						${i + 1}
					</div>`);

		if (currentQuestion === question.question_id) {
			numQuestion.innerHTML = i + 1;
			questionNode.innerHTML = question.question;

			let questionAnswersArr = [];
			const questionAnswers = question.answers;

			for (const key in questionAnswers) {
				questionAnswersArr.push(`<div data-num="${
					i + 1
				}" data-key="${key}" onclick="handleAnswerClick"
									class="ans text-[12px] text-slate-700 md:text-[20px] rounded-lg w-11/12 md:w-full p-2 md:p-3 border border-[#D9D9D9] cursor-pointer">
									${key}. ${questionAnswers[key]}
								</div>`);
			}
			answers.innerHTML = questionAnswersArr.join('');
		}
	});

	listQuestion.innerHTML = listQuestionArr.join('');

	initAnswerControl();
}

function initAnswerControl() {
	document.querySelectorAll('.ans').forEach((a) => {
		a.addEventListener('click', handleAnswerClick);

		a.addEventListener('mouseover', () => {
			a.style.border = '1px solid #008D91';
			a.style.color = '#008D91';
		});

		a.addEventListener('mouseout', () => {
			a.style.border = '1px solid #D9D9D9';
			a.style.color = '#111827';
		});

		a.style.backgroundColor = 'transparent';

		if (
			a.getAttribute('data-num') in currentAnswer &&
			currentAnswer[a.getAttribute('data-num')] === a.getAttribute('data-key')
		) {
			a.style.backgroundColor = '#D9D9D9';
		}
	});

	document.querySelectorAll('.box-num').forEach((box) => {
		box.addEventListener('click', (e) => {
			const numQuestionClick = box.getAttribute('data-num');
			currentQuestion = `question-${numQuestionClick}`;

			updateQuestion();
		});
	});
}

updateQuestion();

prevQuestion.addEventListener('click', () => {
	if (Number(currentQuestion.split('-')[1]) == 1) {
		return;
	}

	numCurrQuestion = Number(currentQuestion.split('-')[1]);
	currentQuestion = `question-${numCurrQuestion - 1}`;

	updateQuestion();
});

nextQuestion.addEventListener('click', () => {
	if (Number(currentQuestion.split('-')[1]) >= 10) {
		window.location.href = '../sertifikasi';
	}

	numCurrQuestion = Number(currentQuestion.split('-')[1]);
	currentQuestion = `question-${numCurrQuestion + 1}`;

	updateQuestion();
});

const profileNavbar = document.getElementById('profile-navbar');
const btnNavbar = document.getElementById('btn-navbar');
const btnDesktopNavbar = document.querySelector('.btn-desktop-navbar');
const profileDesktopNavbar = document.querySelector('.profile-desktop-navbar');
const profileOption = document.getElementById('profile-option');

profileDesktopNavbar.addEventListener('click', () => {
	profileOption.classList.toggle('hidden');
});

function checkIsLoggedIn() {
	const isLoggedIn = localStorage.getItem('isUserLoggedIn');
	if (isLoggedIn) {
		btnNavbar.classList.add('hidden');
		profileNavbar.classList.remove('hidden');
		profileNavbar.classList.add('flex');
		profileDesktopNavbar.classList.remove('hidden');
		btnDesktopNavbar.classList.add('hidden');
	} else {
		profileNavbar.classList.remove('flex');
		profileNavbar.classList.add('hidden');
		btnNavbar.classList.remove('hidden');
		btnDesktopNavbar.classList.remove('hidden');
		profileDesktopNavbar.classList.add('hidden');
	}
}

checkIsLoggedIn();

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	localStorage.clear();
	window.location.href = '';
});
