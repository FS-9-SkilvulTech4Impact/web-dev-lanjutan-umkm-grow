const menuMobileOpen = document.getElementById('menu-mobile-open');
const menuMobileClose = document.getElementById('menu-mobile-close');
const menuMobile = document.getElementById('menu-mobile');

menuMobileOpen.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

menuMobileClose.addEventListener('click', () => {
	menuMobile.classList.toggle('menu-opened');
});

const btnContainer = document.getElementById('btn-container');

function checkIsBoughtThisCourse() {
	const isBought = localStorage.getItem('isBoughtCourse');

	if (isBought) {
		btnContainer.innerHTML = '';
		btnContainer.innerHTML = `<a href="/class-page"
                class="bg-[#008D91] hover:bg-[#206769] px-4 py-2 rounded-[10px] text-[#fff]"
              >
                Buka Materi
              </a>
              <a href="/sertifikasi"
                class="bg-transparent border border-[#008D91] hover:bg-[#206769] px-4 py-2 rounded-[10px] text-[#008D91] hover:text-white"
              >
                Lihat Sertifikat
              </a>`;
	} else {
		btnContainer.innerHTML = '';
		btnContainer.innerHTML = `<a href="/checkout-page"
                class="bg-[#008D91] hover:bg-[#206769] px-4 py-2 rounded-[10px] text-[#fff]"
              >
                Pilih Kelas Ini
              </a>`;
	}
}

checkIsBoughtThisCourse();
