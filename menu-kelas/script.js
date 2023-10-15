const menuMobileOpen = document.getElementById("menu-mobile-open");
const menuMobileClose = document.getElementById("menu-mobile-close");
const menuMobile = document.getElementById("menu-mobile");

menuMobileOpen.addEventListener("click", () => {
  menuMobile.classList.toggle("menu-opened");
});

menuMobileClose.addEventListener("click", () => {
  menuMobile.classList.toggle("menu-opened");
});

let menuKelas = document.getElementById("list-kelas");

async function getListKelas() {
  try {
    let respons = await fetch(
      "https://65276836917d673fd76da682.mockapi.io/menu-kelas"
    );
    let kelas = await respons.json();

    console.log(kelas);

    kelas.map((item, index) => {
      let listKelas = `
        <div class="mx-[154px] mb-8 hover:bg-slate-100 cursor-pointer"
          <a href="#">
            <div class="flex gap-5">
              <img src="${item.image}" alt="" class="w-52 rounded-md">
              <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-[14px]">${item.detail_p}</p>
                <p class="text-[14px]">${item.rating}</p>
              </div>           
              <h4 class="text-red-600 ml-auto">${item.ket}</h4>
            </div>
          </a>
          <hr class="mt-4">
        </div>  
      `;
      menuKelas.innerHTML += listKelas;
    });
  } catch (error) {
    console.log(error);
  }
}

getListKelas();
