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
        $('html').animate({ scrollTop: 0 });$('html').css("scrollBehavior", "auto");
    });

    // Smooth scroll untuk menu navbar
    $('.navbar .menu li a').click(function () {$('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu mobile
    $('.menu-btn').click(function () {$('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typed.js animasi
    var typed1 = new Typed(".typing", {
        strings: ["3D Modeller", "Video Editor", "Motion Graphic Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["3D Modeller", "Video Editor", "Motion Graphic Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Hover card, auto hilang 1.5 detik
    $('.card__article').on('mouseenter', function () {
        const el = $(this);
        el.addClass('show');
        el.on('mouseleave', function() {
            setTimeout(function () {
                el.removeClass('show');
            }, 500);
        });
    });

    // Multicollapse: hanya satu card terbuka
    $('.card[data-bs-toggle="collapse"]').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('data-bs-target');
        $('.collapse').not(target).collapse('hide');$(target).collapse('toggle');
        setTimeout(function () {
            const offset = $(target).offset().top - 80;
            $('html, body').animate({ scrollTop: offset }, 500);
        }, 300);
    });

    // ====== PERBAIKAN TOMBOL "LIHAT SEMUA" & "TUTUP SEMUA" (AMAN DARI BUG LAYAR PUTIH) ======
    $('.btn-lihat').click(function () {
        var btn = $(this);
        btn.addClass('d-none');
        $('.collapse').collapse('hide'); 
        
        // Beri jeda sangat singkat agar render Bootstrap stabil dan tidak bug putih
        setTimeout(function () {
            $('#multiCollapseExample1, #multiCollapseExample2, #multiCollapseExample3, #multiCollapseExample4, #multiCollapseExample5').collapse('show');
            $('.btn-tutup').removeClass('d-none');
        }, 300);
    });

    $('.btn-tutup').click(function () {
        $(this).addClass('d-none');$('.collapse').collapse('hide');
        setTimeout(function () {
            $('.btn-lihat').removeClass('d-none');
        }, 300);
    });

    // ====== FITUR LIGHTBOX GALERI ======
    $('.btn-lightbox').click(function (e) {
        e.preventDefault();
        var imgSrc = $(this).attr('data-img');
        var title = $(this).attr('data-title');
        var desc = $(this).attr('data-desc');$('#lightboxImg').attr('src', imgSrc);
        $('#lightboxTitle').text(title);
        $('#lightboxDesc').text(desc);
        
        var lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
        lightboxModal.show();
    });

    // ====== ANIMASI SCROLL MASUK & KELUAR (FADE IN/OUT) UNTUK SEMUA SECTION ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed'); 
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.scroll-reveal').forEach((section) => {
        observer.observe(section);
    });

    // ====== LOGIKA CERDAS MUSIK LATAR (BGM), TOOLTIP & AUDIO SPECTRUM NEON ======
    var bgMusic = document.getElementById("bgMusic");
    var musicBtn = $("#musicBtn");
    var volumeSlider = $("#volumeSlider");
    var audioSpectrum = $("#audioSpectrum");
    var isPlaying = false;
    var isIconsInitialized = false; 

    bgMusic.volume = volumeSlider.val();

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

                iconData.push({ 
                    el: icon, 
                    x: x, 
                    y: y, 
                    vx: vx, 
                    vy: vy, 
                    width: icon.clientWidth, 
                    height: icon.clientHeight 
                });

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
            icons.forEach(icon => {
                icon.classList.add('tampil');
            });
        }, 50);
    }

    $('body').one('click', function() {
        if (!isPlaying) {
            bgMusic.play().catch(function(error) {
                console.log("Browser mencegah autoplay.");
            });
            isPlaying = true;
            musicBtn.addClass("playing");
            musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
            $('#musicTooltip').removeClass('show'); 
            audioSpectrum.addClass('active'); 
            tampilkanIkonSoftware(); 
        }
    });

    volumeSlider.on('input', function() {
        bgMusic.volume = $(this).val();
        
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
            bgMusic.pause();
            isPlaying = false;
            $(this).removeClass("playing");
            $(this).find('i').removeClass('fa-music').addClass('fa-volume-mute');
            audioSpectrum.removeClass('active');
            bgMusic.dataset.manualPaused = "true"; 
        } else {
            bgMusic.play();
            isPlaying = true;
            $(this).addClass("playing");
            $(this).find('i').removeClass('fa-volume-mute').addClass('fa-music');
            audioSpectrum.addClass('active');
            bgMusic.dataset.manualPaused = "false";
            tampilkanIkonSoftware(); 
        }
    });

    window.addEventListener('blur', function() {
        if (document.activeElement instanceof HTMLIFrameElement) {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.removeClass("playing");
                musicBtn.find('i').removeClass('fa-music').addClass('fa-volume-mute');
                audioSpectrum.removeClass('active');
                bgMusic.dataset.autoPaused = "true";
            }
        }
    });

    window.addEventListener('focus', function() {
        if (bgMusic.dataset.autoPaused === "true" && bgMusic.dataset.manualPaused !== "true") {
            bgMusic.play();
            isPlaying = true;
            musicBtn.addClass("playing");
            musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
            audioSpectrum.addClass('active');
            bgMusic.dataset.autoPaused = "false";
        }
    });
});