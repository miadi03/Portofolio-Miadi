$(document).ready(function () {
    // CUSTOM MOUSE CURSOR & TRAILING PARTICLES LOGIC (Hanya aktif di desktop > 768px)
    const cursorDot = document.querySelector("#cursorDot");
    const cursorOutline = document.querySelector("#cursorOutline");
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    const isDesktop = window.innerWidth > 768;

    if (isDesktop && cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            if (Math.random() < 0.3) {
                createParticle(mouseX, mouseY);
            }
        });

        function animateOutline() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;

            outlineX += distX * 0.2;
            outlineY += distY * 0.2;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        function createParticle(x, y) {
            const particle = document.createElement("div");
            particle.className = "cursor-particle";
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    } else {
        // Sembunyikan elemen kustom cursor di mobile
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    // WEB AUDIO API UNTUK EFEK SUARA MIKRO (SFX) DENGAN VOLUME YANG JELAS
    let audioCtx = null;
    let sfxEnabled = true;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Suara hover dengan gain yang lebih tinggi
    function playHoverSFX() {
        if (!sfxEnabled) return;
        initAudioContext();
        try {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.05);
            
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch(e) {
            console.log("Audio Context error:", e);
        }
    }

    // Suara klik dengan gain yang lebih tinggi
    function playClickSFX() {
        if (!sfxEnabled) return;
        initAudioContext();
        try {
            let osc = audioCtx.createOscillator();
            let gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(450, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch(e) {
            console.log("Audio Context error:", e);
        }
    }

    $(document).on("mouseenter", "a, button, .card, input, textarea, .floating-btn", function () {
        if (isDesktop && cursorDot && cursorOutline) {
            cursorDot.style.transform = "translate(-50%, -50%) scale(2.2)";
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.6)";
            cursorOutline.style.borderColor = "#ffcc00";
        }
        playHoverSFX();
    });

    $(document).on("mouseleave", "a, button, .card, input, textarea, .floating-btn", function () {
        if (isDesktop && cursorDot && cursorOutline) {
            cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.borderColor = "rgba(220, 20, 60, 0.5)";
        }
    });

    $(document).on("click", "a, button, .card, input, textarea, .floating-btn", function () {
        playClickSFX();
    });

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

        $('.section-slice-right, .section-slice-left').each(function () {
            var topPos = $(this).offset().top - window.innerHeight / 1.3;
            if (window.scrollY > topPos) {
                $(this).addClass('motion-visible');
            }
        });
    });

    // INTERSECTION OBSERVER YANG AMAN UNTUK SEMUA KONTEN SECTION
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            const target = $(entry.target);
            if (entry.isIntersecting) {
                target.addClass('section-visible').removeClass('section-hidden');
            }
        });
    }, observerOptions);

    $('section:not(#home)').each(function () {
        sectionObserver.observe(this);
    });

    $('.scroll-up-btn').click(function () {$('html').animate({ scrollTop: 0 }, 500);
    });

    $('.menu-btn').click(function () {$('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    $('.menu-btn-item').click(function () {$('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    $('#themeToggleBtn').click(function () {
        $('body').toggleClass('light-mode');
        var isLight = $('body').hasClass('light-mode');
        
        if (isLight) {
            $('#themeIcon').removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('portfolio_theme', 'light');
        } else {
            $('#themeIcon').removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('portfolio_theme', 'dark');
        }
    });

    if (localStorage.getItem('portfolio_theme') === 'light') {
        $('body').addClass('light-mode');$('#themeIcon').removeClass('fa-moon').addClass('fa-sun');
    }

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

    // Kategori Proyek: Eksklusif (menutup kategori lain saat pindah) & Sinkronisasi Tombol
    $('.card-filter').click(function () {
        var targetCollapse = $(this).attr('data-target');
        
        // Tutup semua kategori lain terlebih dahulu agar tidak menumpuk, lalu toggle target yang diklik
        $('.multi-collapse').not(targetCollapse).collapse('hide');$(targetCollapse).collapse('toggle');

        // Cek status setelah jeda singkat untuk mengubah tombol Lihat/Tutup Semua secara sinkron
        setTimeout(function() {
            var anyVisible = $('.multi-collapse.show').length > 0;
            
            if (anyVisible) {
                $('.btn-lihat').addClass('d-none');$('.btn-tutup').removeClass('d-none');
            } else {
                $('.btn-tutup').addClass('d-none');$('.btn-lihat').removeClass('d-none');
            }
        }, 200);

        $('html, body').animate({ scrollTop:$(targetCollapse).offset().top - 100 }, 400);
    });

    // Tombol Lihat Semua Proyek
    $('.btn-lihat').click(function () {$(this).addClass('d-none');
        $('.multi-collapse').collapse('show');$('.btn-tutup').removeClass('d-none');
    });

    // Tombol Tutup Semua Proyek
    $('.btn-tutup').click(function () {$(this).addClass('d-none');
        $('.multi-collapse').collapse('hide');$('.btn-lihat').removeClass('d-none');

        $('html, body').animate({ scrollTop:$('#services').offset().top - 50 }, 400);
    });

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

    var wasMusicPlayingBeforeVideo = false;
    var bgMusic = document.getElementById("bgMusic");
    var musicBtn = $("#musicBtn");
    var volumeSlider = $("#volumeSlider");
    var morphBlob = $("#morphBlob");
    var aboutPhoto = $("#aboutPhoto");
    var isPlaying = false;
    var isIconsInitialized = false; 

    if (bgMusic && volumeSlider.length) {
        bgMusic.volume = volumeSlider.val();
    }

    function updateAboutPhoto(playing) {
        if (!aboutPhoto.length) return;
        
        aboutPhoto.css('opacity', '0');
        setTimeout(() => {
            if (playing && aboutPhoto.data('casual')) {
                aboutPhoto.attr('src', aboutPhoto.data('casual'));
            } else if (!playing && aboutPhoto.data('formal')) {
                aboutPhoto.attr('src', aboutPhoto.data('formal'));
            }
            aboutPhoto.css('opacity', '1');
        }, 200);
    }

    $(document).on('click', '.btn-video-modal', function (e) {
        e.preventDefault();
        var videoSrc = $(this).data('src');
        var videoTitle = $(this).data('title');

        if (isPlaying && bgMusic) {
            wasMusicPlayingBeforeVideo = true;
            bgMusic.pause();
            musicBtn.removeClass("playing");
            musicBtn.find('i').removeClass('fa-music').addClass('fa-volume-mute');
            morphBlob.removeClass('active');
            isPlaying = false;
            updateAboutPhoto(false);
        } else {
            wasMusicPlayingBeforeVideo = false;
        }

        $('#videoModalTitle').text(videoTitle);
        $('#videoModalIframe').attr('src', videoSrc);

        var videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
        videoModal.show();
    });

    $('#videoModal').on('hidden.bs.modal', function () {
        $('#videoModalIframe').attr('src', '');

        if (wasMusicPlayingBeforeVideo && bgMusic) {
            bgMusic.play().catch(function(error) { console.log("Gagal memutar ulang musik."); });
            isPlaying = true;
            musicBtn.addClass("playing");
            musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
            morphBlob.addClass('active');
            updateAboutPhoto(true);
        }
    });

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
            morphBlob.addClass('active');
            updateAboutPhoto(true);
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
            morphBlob.removeClass('active');
            updateAboutPhoto(false);
            isPlaying = false;
        } else if (!isPlaying) {
            if (bgMusic) bgMusic.play();
            isPlaying = true;
            musicBtn.addClass("playing");
            musicBtn.find('i').removeClass('fa-volume-mute').addClass('fa-music');
            morphBlob.addClass('active');
            updateAboutPhoto(true);
            tampilkanIkonSoftware();
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
            morphBlob.removeClass('active');
            updateAboutPhoto(false);
            sfxEnabled = false;
        } else {
            if (bgMusic) bgMusic.play();
            isPlaying = true;
            $(this).addClass("playing");
            $(this).find('i').removeClass('fa-volume-mute').addClass('fa-music');
            morphBlob.addClass('active');
            updateAboutPhoto(true);
            tampilkanIkonSoftware(); 
            sfxEnabled = true;
        }
    });
});