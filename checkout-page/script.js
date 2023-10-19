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

const btnBack = document.getElementById('btn-back');
const btnBuy = document.getElementById('btn-buy');

btnBack.addEventListener('click', () => {
	window.location.href = '/detail-kelas';
});

btnBuy.addEventListener('click', () => {
	localStorage.setItem('isBoughtCourse', true);
	window.location.href = '/detail-kelas';
});
