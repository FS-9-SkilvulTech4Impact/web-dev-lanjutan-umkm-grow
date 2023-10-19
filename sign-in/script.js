var email = document.getElementById('email');
var password = document.getElementById('password');
var masuk = document.getElementById('masuk');
var lupa = document.getElementById('lupa');
var daftar = document.getElementById('daftar');

masuk.addEventListener('click', function () {
	if (email.value == '' || password.value == '') {
		alert('Email atau password tidak boleh kosong!');
	} else {
		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', '', true);
		// xhr.setRequestHeader('Content-Type', 'application/json');
		// xhr.send(JSON.stringify({ email: email.value, password: password.value }));
		// xhr.onload = function () {
		// 	if (xhr.status == 200) {
		// alert('Selamat, Anda berhasil masuk!');
		localStorage.setItem('isUserLoggedIn', true);
		window.location.href = '../landing-page';
		// } else {
		// 	alert('Maaf, email atau password Anda salah!');
		// }
	}
});

var mockupApiUrl = 'https://652e23d4f9afa8ef4b281524.mockapi.io';

function getMockData(endpoint) {
	$.ajax({
		url: mockupApiUrl + endpoint,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			console.log(data);
		},
		error: function (error) {
			console.error(error);
		},
	});
}

getMockData('/users');

lupa.addEventListener('click', function () {
	window.location.href = '';
});

daftar.addEventListener('click', function () {
	window.location.href = '';
});
