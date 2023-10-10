const menuMobileOpen = document.getElementById('menu-mobile-open');
const menuMobileClose = document.getElementById('menu-mobile-close');
const menuMobile = document.getElementById('menu-mobile');

menuMobileOpen.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

menuMobileClose.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

function handleGetFormData() {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const city = document.getElementById('city').value;
	const zipCode = document.getElementById('zip-code').value;
	const status = document.getElementById('status').checked;

	return { name, email, city, zipCode, status };
}

function isNumber(zipCode) {
	const number = parseInt(zipCode);

	return !isNaN(number);
}

function checkboxIsChecked(status) {
	return status;
}

function validateFormData(formData) {
	console.log(typeof formData.zipCode);
	if (
		formData &&
		isNumber(formData.zipCode) &&
		checkboxIsChecked(formData.status)
	) {
		return true;
	}

	return false;
}

function submit() {
	event.preventDefault();
	const warning = document.getElementById('warning');

	const formData = handleGetFormData();

	if (!validateFormData(formData)) {
		warning.innerHTML = 'Periksa form anda sekali lagi';
	} else {
		warning.innerHTML = '';
	}
}

document.getElementById('form').addEventListener('submit', () => submit());
