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

let currentModule = 'module-1';
let currentContent = 'content-1';
let listModuleNode = [];

const moduleSeq = document.getElementById('module-seq');
const moduleName = document.getElementById('module-name');
const contentTitle = document.getElementById('sub-materi');
const materi = document.getElementById('materi');
const prevContent = document.getElementById('prev-content');
const nextContent = document.getElementById('next-content');
const listMateriNode = document.getElementById('list-materi');

function handleClickContent(e) {
	const id = e.target.id;

	console.log(id);
}

async function getData() {
	const data = await fetchData(
		'https://9cac7863-db16-495f-9f50-d4a119739f66.mock.pstmn.io/course-1/module?content=true',
	);

	data.forEach((module) => {
		listModuleNode.push(`<div class="border">
						<button
							class="accordeon accordeon-btn w-full text-left font-medium text-[12px] p-[14px] md:font-medium md:text-[20px]">
							Bagian ${module.module_seq}: ${module.module_name}
						</button>
						<div class="hidden">
							${module.content
								.map((content) => {
									return `<div id="${content.content_id}"
								class="content p-[14px] md:font-medium md:text-[20px] pl-10 font-medium text-[12px] bg-gray-200">
								${content.content_title}
							</div>`;
								})
								.join('')}
						</div>
					</div>`);
	});

	listMateriNode.innerHTML = listModuleNode.join('');

	initDropdownMateri();

	return data;
}

getData();
updateMateri();

/**
 * Accordeon List Materi
 */
function initDropdownMateri() {
	const accordeonBtns = document.querySelectorAll('.accordeon-btn');

	accordeonBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const content = btn.nextElementSibling;
			content.classList.toggle('hidden');
		});
	});

	document.querySelectorAll('.content').forEach((div) => {
		div.addEventListener('click', handleClickContent);
	});
}

async function updateMateri() {
	const data = await fetchData(
		'https://9cac7863-db16-495f-9f50-d4a119739f66.mock.pstmn.io/course-1/module?content=true',
	);

	data.forEach((module) => {
		if (module.module_id === currentModule) {
			moduleSeq.innerHTML = module.module_seq;
			moduleName.innerHTML = module.module_name;
			module.content.forEach((content) => {
				if (content.content_id === currentContent) {
					contentTitle.innerHTML = content.content_title;

					if (content.content_type === 'video') {
						materi.innerHTML = `<iframe
							class="w-full h-[241px] md:h-[526px] rounded-md"
							src="${content.content}"
							title="Pengenalan digital marketing"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
							allowfullscreen></iframe>`;
					} else {
						materi.innerHTML = `<div class="text-[12px] md:text-[20px] md:leading-relaxed md:p-[16px] p-3 max-h-[360px] md:max-h-[556px] overflow-y-auto border border-black rounded-[6px]">
                            ${content.content}
                            </div>`;
					}
				}
			});
		}
	});
}

prevContent.addEventListener('click', () => {
	if (Number(currentContent.split('-')[1]) === 1) {
		console.log(Number(currentContent.split('-')[1]));
		return;
	}

	numCurrContent = Number(currentContent.split('-')[1]);
	currentContent = `content-${numCurrContent - 1}`;
	currentModule = `module-${
		Number(currentContent.split('-')[1]) === 3 ||
		Number(currentContent.split('-')[1]) === 6 ||
		Number(currentContent.split('-')[1]) === 9
			? Number(currentModule.split('-')[1]) - 1
			: Number(currentModule.split('-')[1])
	}`;

	console.log(currentModule);
	console.log(currentContent);
	updateMateri();
});

nextContent.addEventListener('click', () => {
	if (Number(currentContent.split('-')[1]) >= 9) {
		return;
	}

	numCurrContent = Number(currentContent.split('-')[1]);
	currentContent = `content-${numCurrContent + 1}`;
	currentModule = `module-${
		Number(currentContent.split('-')[1]) === 4 ||
		Number(currentContent.split('-')[1]) === 7
			? Number(currentModule.split('-')[1]) + 1
			: Number(currentModule.split('-')[1])
	}`;

	console.log(currentModule);
	console.log(currentContent);
	updateMateri();
});
