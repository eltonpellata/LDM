(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-down"></i>'
        ],
    });


    // attractions carousel
    $(".attractions-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            },
            1400:{
                items:4
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:1
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(document).ready(function() {
    // Show or hide the button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // Animate the scroll to top
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    });


})(jQuery);

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById('carousel');
    const track = carousel.querySelector('.carousel-track');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Auto scroll functionality
    function autoScroll() {
        if (carousel.scrollLeft >= track.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft = 0;
        } else {
            carousel.scrollLeft += 1; // Adjust this value to control the scroll speed
        }
    }

    let autoScrollInterval = setInterval(autoScroll, 20); // Adjust this value to control the scroll interval

    // Pause auto scroll on mouse down and resume on mouse up
    carousel.addEventListener('mousedown', () => {
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseup', () => {
        autoScrollInterval = setInterval(autoScroll, 20);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = [
        { src: 'img/Portofolio_desing/Portofolio_Feed1.jpg', client: 'Love Coco', description: '100% Coconut Water, No Sugar Added' },
        { src: 'img/Portofolio_desing/Portofolio_Feed2.jpg', client: 'Bakso Mantan Pacar', description: '100% Daging Sapi Pilihan' },
        { src: 'img/Portofolio_desing/Portofolio_Feed3.jpg', client: 'Waroenk Indonesia', description: 'Kebutuhan Sehari-hari' },
        // Add more items as needed
    ];

    const itemsPerPage = 6;
    let currentPage = 1;

    function renderGallery(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = galleryItems.slice(start, end);

        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';

        itemsToShow.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
                <div class="gallery-item">
                    <img src="${item.src}" alt="" class="gallery-img">
                    <div class="gallery-caption">
                        <h5>Client: ${item.client}</h5>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(col);
        });
    }

    function updatePagination() {
        document.querySelectorAll('.page-link').forEach(link => {
            link.parentElement.classList.remove('active');
        });
        document.getElementById(`page-${currentPage}`).parentElement.classList.add('active');
    }

    document.getElementById('prev-page').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderGallery(currentPage);
            updatePagination();
        }
    });

    document.getElementById('next-page').addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage < Math.ceil(galleryItems.length / itemsPerPage)) {
            currentPage++;
            renderGallery(currentPage);
            updatePagination();
        }
    });

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = parseInt(this.textContent);
            if (!isNaN(page)) {
                currentPage = page;
                renderGallery(currentPage);
                updatePagination();
            }
        });
    });

    // Initial render
    renderGallery(currentPage);
    updatePagination();
});

function handleUserMessage() {
    var userQuestion = document.getElementById('userQuestion').value;
    if (userQuestion.trim() === '') return;

    // Tampilkan pesan pengguna
    displayMessage(userQuestion, 'user');

    // Reset input
    document.getElementById('userQuestion').value = '';

    // Jawaban bot sederhana
    var botResponse = getBotResponse(userQuestion);
    setTimeout(function() {
        displayMessage(botResponse, 'bot');
    }, 1000); // Delay 1 detik untuk efek real-time
}
function redirectToWhatsApp(phoneNumber) {
    // Pastikan nomor telepon tidak dimulai dengan '0'
    if (phoneNumber.startsWith('0')) {
        // Ganti angka pertama '0' dengan kode negara Indonesia '62'
        phoneNumber = '62' + phoneNumber.slice(1);
    }

    // Buat link WhatsApp
    let url = `https://wa.me/${phoneNumber}`;
    
    // Arahkan pengguna ke WhatsApp
    window.location.href = url;
}

function sendWhatsAppMessage(packageName) {
    var phoneNumber = '6289509563739'; // Ganti dengan nomor WhatsApp yang ingin dihubungi

    var message = '';
    if (packageName === 'CUAN TIPIS') {
        message = `Haii, saya tertarik dengan paket CUAN TIPIS:\n- Harga: IDR 800K (Diskon dari 1jt)\n- 5 Desain Feed Instagram (Carousel maksimal 2 slide per desain)\n- 1 Konten Video IG Reels per bulan : Durasi 30 detik + Caption Konten (AIDA)\n- Admin Posting\n- Revisi Desain: 1 kali (Revisi minor)`;
    } else if (packageName === 'DOMPET AMAN') {
        message = `Haii, saya tertarik dengan paket DOMPET AMAN:\n- Harga: 1jt (Diskon dari 1,2jt)\n- 10 Desain Feed Instagram\n- 3 Desain Story Instagram\n- 1 Konten Video IG Reels per bulan : Durasi 30 detik + Caption Konten (AIDA)\n- Admin Posting\n- Revisi Desain: 1 kali\n- FREE IKLAN PAID PROMOTE: IDR 25k/Project`;
    } else if (packageName === 'SAKU SANTAI') {
        message = `Haii, saya tertarik dengan paket SAKU SANTAI:\n- Harga: 1,5jt (Diskon dari 2jt)\n- 20 Desain Feed Instagram (Carousel maksimal 4 slide per desain)\n- 5 Desain Story Instagram\n- 2 Konten Video IG Reels per bulan\n- Copywriting Konten (AIDA)\n- Admin Posting\n- Revisi Desain: 2 kali\n- FREE IKLAN PAID PROMOTE: IDR 50k/Project`;
    } else if (packageName === 'BADAI CUAN') {
        message = `Haii, saya tertarik dengan paket BADAI CUAN:\n- Harga: 3,5jt (Diskon dari 5jt)\n- 15 Desain Feed Instagram\n- 15 Video Reels + Tiktok per bulan\n- Admin Posting IG dan TikTok\n- Story Setiap Hari\n- Copywriting Untuk Setiap Konten/Caption\n- FREE IKLAN PAID PROMOTE: IDR 100k/Project`;
    }

    // Encode the message to be URL-safe
    var encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp with the encoded message
    var whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.location.href = whatsappUrl;
}
