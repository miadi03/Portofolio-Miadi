$(document).ready(function () {
    // Sticky navbar dan tombol scroll-up
    $(window).scroll(function () {
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

    // Scroll ke atas
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    // Smooth scroll untuk menu navbar
    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu mobile
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typed.js animasi
    var typed1 = new Typed(".typing", {
        strings: ["3D Modeller", "Designer grafis", "Motion grafik"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["3D Modeller", "Designer grafis", "Motion grafik"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Hover card, auto hilang 1.2 detik
    $('.card__article').on('mouseenter', function () {
        const el = $(this);
        el.addClass('show');

        setTimeout(function () {
            el.removeClass('show');
        }, 1200);
    });

    // Multicollapse: hanya satu card terbuka
    $('.card[data-bs-toggle="collapse"]').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('data-bs-target');

        // Tutup semua kecuali yang diklik
        $('.collapse').not(target).collapse('hide');

        // Toggle elemen yang diklik
        $(target).collapse('toggle');

        // Scroll ke elemen yang diklik
        setTimeout(function () {
            const offset = $(target).offset().top - 80;
            $('html, body').animate({ scrollTop: offset }, 500);
        }, 300);
    });

    // ====== Lihat Semua: buka semua collapse ======
    $('.btn-lihat').click(function () {
        // Sembunyikan tombol lihat, tampilkan tombol tutup
        $(this).addClass('d-none');
        $('.btn-tutup').removeClass('d-none');

        // Tutup semua dulu untuk reset
        $('.collapse').collapse('hide');

        // Setelah sedikit delay, buka semua
        setTimeout(function () {
            $('#multiCollapseExample1').collapse('show');
            $('#multiCollapseExample2').collapse('show');
            $('#multiCollapseExample3').collapse('show');
            $('#multiCollapseExample4').collapse('show');
            $('#multiCollapseExample5').collapse('show');
        }, 400);
    });

    // ====== Tutup Semua: tutup semua collapse ======
    $('.btn-tutup').click(function () {
        // Sembunyikan tombol tutup, tampilkan tombol lihat
        $(this).addClass('d-none');
        $('.btn-lihat').removeClass('d-none');

        // Tutup semua
        $('.collapse').collapse('hide');
    });
});
