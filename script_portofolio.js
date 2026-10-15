$(document).ready(function () {$(window).scroll(function () {
    if (this.scrollY > 20) {
        $('.navbar').addClass("sticky");
    } else {
        $('.navbar').removeClass("sticky");
    }

    if (this.scrollY > 500) {
        $('.scroll-up-btn').addClass("show");
    } else {
        $('.scroll-up-btn').removeClass("show");
    }
});

$('.scroll-up-btn').click(function () {$('html').animate({ scrollTop: 0 }, 500);
});

// Toggle Menu Responsif Hamburger
$('.menu-btn').click(function () {$('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
});

$('.menu-btn-item').click(function () {$('.navbar .menu').removeClass("active");
    $('.menu-btn i').removeClass("active");
});

if (typeof Typed !== 'undefined') {
    new Typed(".typing", {
        strings: ["3D Modeller", "Video Editor", "Motion Graphic Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    new Typed(".typing-2", {
        strings: ["3D Modeller", "Video Editor", "Motion Graphic Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

// Fungsi Kategori: Klik Card Kategori Membuka HANYA Kategori Tersebut (Eksklusif)
$('.card-filter').click(function () {
    var targetCollapse = $(this).attr('data-target');
    
    // Sembunyikan semua kategori lain
    $('.multi-collapse').not(targetCollapse).collapse('hide');
    
    // Toggle kategori yang dipilih
    $(targetCollapse).collapse('toggle');

    // Ubah status tombol lihat/tutup semua
    $('.btn-lihat').addClass('d-none');$('.btn-tutup').removeClass('d-none');

    // Smooth scroll ke bagian proyek
    $('html, body').animate({ scrollTop:$(targetCollapse).offset().top - 100 }, 400);
});

// Tombol "Lihat Semua" Proyek
$('.btn-lihat').click(function () {$(this).addClass('d-none');
    $('.multi-collapse').collapse('show');$('.btn-tutup').removeClass('d-none');
});

// Tombol "Tutup Semua" Proyek
$('.btn-tutup').click(function () {$(this).addClass('d-none');
    $('.multi-collapse').collapse('hide');$('.btn-lihat').removeClass('d-none');
    $('html, body').animate({ scrollTop:$('#services').offset().top - 50 }, 400);
});

// Lightbox Modal untuk Gambar Web & Desain Grafis
$(document).on('click', '.btn-lightbox', function (e) {
    e.preventDefault();
    var imgSrc = $(this).data('img');
    var imgTitle = $(this).data('title');
    var imgDesc = $(this).data('desc');

    $('#lightboxImg').attr('src', imgSrc);
    $('#lightboxTitle').text(imgTitle);
    $('#lightboxDesc').text(imgDesc);

    var lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    lightboxModal.show();
});

// Musik Latar, Cincin Neon Audio Spectrum, & Animasi Ikon Software
var bgMusic = document.getElementById("bgMusic");
var musicBtn = $("#musicBtn");
var volumeSlider = $("#volumeSlider");
var audioSpectrum = $("#audioSpectrum");
var isPlaying = false;
var isIconsInitialized = false; 

if (bgMusic && volumeSlider.length) {
    bgMusic.volume = volumeSlider.val();
}

setTimeout(function() {
    if (!isPlaying) {
        $('#musicTooltip').addClass('show');
    }
}, 2000);

function tampilkanIkonSoftware() {
    const icons = document.querySelectorAll('.float-icon');
    const container = document.querySelector('.software-icons');
    
    if (!container || icons.length === 0) return;

    if (!isIconsInitialized) {
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        const iconData = [];

        icons.forEach(icon => {
            let x = Math.random() * (containerWidth - icon.clientWidth);
            let y = Math.random() * (containerHeight - icon.clientHeight);
            let vx = (Math.random() - 0.5) * 3;
            let vy = (Math.random() - 0.5) * 3;

            iconData.push({ el: icon, x: x, y: y, vx: vx, vy: vy, width: icon.clientWidth, height: icon.clientHeight });
            icon.style.transform = `translate(${x}px, ${y}px)`;

            icon.addEventListener('click', function(e) {
                e.stopPropagation(); 
                let data = iconData.find(d => d.el === icon);
                if (data) {
                    data.vx = (Math.random() - 0.5) * 30;
                    data.vy = (Math.random() - 0.5) * 30;
                }
            });
        });

        function animateIcons() {
            containerWidth = container.clientWidth;
            containerHeight = container.clientHeight;

            iconData.forEach(data => {
                const maxSpeed = 1.5;
                if (Math.abs(data.vx) > maxSpeed) data.vx *= 0.95;
                if (Math.abs(data.vy) > maxSpeed) data.vy *= 0.95;

                if (Math.abs(data.vx) < 0.5) data.vx = data.vx > 0 ? 0.5 : -0.5;
                if (Math.abs(data.vy) < 0.5) data.vy = data.vy > 0 ? 0.5 : -0.5;

                data.x += data.vx;
                data.y += data.vy;

                if (data.x <= 0) { data.x = 0; data.vx *= -1; } 
                else if (data.x >= containerWidth - data.width) { data.x = containerWidth - data.width; data.vx *= -1; }

                if (data.y <= 0) { data.y = 0; data.vy *= -1; } 
                else if (data.y >= containerHeight - data.height) { data.y = containerHeight - data.height; data.vy *= -1; }

                data.el.style.transform = `translate(${data.x}px, ${data.y}px)`;
            });
            requestAnimationFrame(animateIcons);
        }

        animateIcons(); 
        isIconsInitialized = true; 
    }

    setTimeout(() => {
        icons.forEach(icon => icon.classList.add('tampil'));
    }, 50);
}

$('body').one('click', function() {
    if (!isPlaying && bgMusic) {
        bgMusic.play().catch(function(error) { console.log("Autoplay dicegah browser."); });
        isPlaying = true;
        musicBtn.addClass("playing");
        musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
        $('#musicTooltip').removeClass('show'); 
        audioSpectrum.addClass('active');
        tampilkanIkonSoftware(); 
    }
});

volumeSlider.on('input', function() {
    if (bgMusic) {
        bgMusic.volume = $(this).val();
    }
    if($(this).val() == 0) {
        musicBtn.removeClass("playing");
        musicBtn.find('i').removeClass('fa-music').addClass('fa-volume-mute');
        audioSpectrum.removeClass('active');
    } else if (isPlaying) {
        musicBtn.addClass("playing");
        musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
        audioSpectrum.addClass('active');
    }
});

musicBtn.click(function(e) {
    e.stopPropagation();
    $('#musicTooltip').removeClass('show'); 

    if (isPlaying) {
        if (bgMusic) bgMusic.pause();
        isPlaying = false;
        $(this).removeClass("playing");
        $(this).find('i').removeClass('fa-music').addClass('fa-volume-mute');
        audioSpectrum.removeClass('active');
    } else {
        if (bgMusic) bgMusic.play();
        isPlaying = true;
        $(this).addClass("playing");
        $(this).find('i').removeClass('fa-volume-mute').addClass('fa-music');
        audioSpectrum.addClass('active');
        tampilkanIkonSoftware(); 
    }
});
});