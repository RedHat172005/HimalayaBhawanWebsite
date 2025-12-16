document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked (on mobile)
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- 2. Image Carousel Logic ---
    const carousel = document.querySelector('.image-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const totalSlides = slides.length;
    let currentIndex = 0;
    const slideWidth = 100 / totalSlides; // 25% for 4 slides

    if (carousel && totalSlides > 1) {
        
        // Function to move the carousel
        const moveToSlide = (index) => {
            // Ensure index wraps around (for seamless looping, though not strictly required by this CSS)
            if (index >= totalSlides) {
                index = 0;
            } else if (index < 0) {
                index = totalSlides - 1;
            }
            currentIndex = index;
            
            // Calculate the transform value (e.g., 0%, -100%, -200%, -300%)
            const transformValue = -currentIndex * slideWidth;
            carousel.style.transform = `translateX(${transformValue}%)`;
        };

        // Manual Navigation: Next Button
        nextBtn.addEventListener('click', () => {
            // Move to the next index, wrapping around to 0 if needed
            moveToSlide((currentIndex + 1) % totalSlides);
            resetAutoScroll();
        });

        // Manual Navigation: Previous Button
        prevBtn.addEventListener('click', () => {
             // Move to the previous index, wrapping around to last slide if needed
             const newIndex = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
             moveToSlide(newIndex);
             resetAutoScroll();
        });

        // Auto-Scroll Logic
        let autoScrollInterval;
        const startAutoScroll = () => {
            // Clear any existing interval first
            clearInterval(autoScrollInterval); 
            
            // Set a new interval (e.g., 5000 milliseconds = 5 seconds)
            autoScrollInterval = setInterval(() => {
                moveToSlide((currentIndex + 1) % totalSlides);
            }, 5000); 
        };

        // Reset auto-scroll after a manual click
        const resetAutoScroll = () => {
            clearInterval(autoScrollInterval);
            startAutoScroll(); // Restart the timer
        };

        // Start the auto-scroll when the page loads
        startAutoScroll();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- 2. About Carousel (Auto-Scrolling) ---
    const initAboutCarousel = () => {
        const carousel = document.querySelector('.image-carousel');
        const slides = document.querySelectorAll('.image-carousel .carousel-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const totalSlides = slides.length;
        if (!carousel || totalSlides <= 1) return; // Exit if not found or only one slide

        let currentIndex = 0;
        const slideWidth = 100 / totalSlides; 

        const moveToSlide = (index) => {
            if (index >= totalSlides) {
                index = 0;
            } else if (index < 0) {
                index = totalSlides - 1;
            }
            currentIndex = index;
            const transformValue = -currentIndex * slideWidth;
            carousel.style.transform = `translateX(${transformValue}%)`;
        };

        // Auto-Scroll Logic
        let autoScrollInterval;
        const startAutoScroll = () => {
            clearInterval(autoScrollInterval); 
            autoScrollInterval = setInterval(() => {
                moveToSlide((currentIndex + 1) % totalSlides);
            }, 5000); 
        };

        const resetAutoScroll = () => {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        };

        nextBtn.addEventListener('click', () => {
            moveToSlide((currentIndex + 1) % totalSlides);
            resetAutoScroll();
        });

        prevBtn.addEventListener('click', () => {
             const newIndex = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
             moveToSlide(newIndex);
             resetAutoScroll();
        });

        startAutoScroll(); // Start the timer for the About section
    };


    // --- 3. Events Slider (Manual, 4-Up View) ---
    const initEventsSlider = () => {
        const slider = document.querySelector('.events-slider');
        const slides = document.querySelectorAll('.events-slider .event-slide');
        const prevBtn = document.querySelector('.events-prev-btn');
        const nextBtn = document.querySelector('.events-next-btn');
        const totalSlides = slides.length;
        if (!slider || totalSlides <= 4) {
            // Hide buttons if fewer than 5 slides
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return; 
        }

        let currentOffset = 0; // Tracks the index of the first visible slide
        const slidesPerView = 4; // How many slides are visible at once

        const moveSlider = (direction) => {
            // Calculate the total number of shiftable groups
            const maxOffset = totalSlides - slidesPerView;

            if (direction === 'next') {
                // Shift by 1 slide to show the next one
                currentOffset = Math.min(currentOffset + 1, maxOffset);
            } else if (direction === 'prev') {
                // Shift back by 1 slide
                currentOffset = Math.max(currentOffset - 1, 0);
            }

            // Calculate the total horizontal percentage shift (25% per slide)
            const transformValue = -currentOffset * (100 / slidesPerView);
            slider.style.transform = `translateX(${transformValue}%)`;
        };
        
        // Mobile View Adjustment (Only 1 slide visible)
        const checkMobileView = () => {
            return window.innerWidth <= 768; // Based on your CSS media query
        };

        const moveSliderMobile = (direction) => {
            const maxOffset = totalSlides - 1;
            
            if (direction === 'next') {
                currentOffset = Math.min(currentOffset + 1, maxOffset);
            } else if (direction === 'prev') {
                currentOffset = Math.max(currentOffset - 1, 0);
            }

            const transformValue = -currentOffset * 100; // 100% shift per slide
            slider.style.transform = `translateX(${transformValue}%)`;
        };

        
        nextBtn.addEventListener('click', () => {
            if (checkMobileView()) {
                moveSliderMobile('next');
            } else {
                moveSlider('next');
            }
        });

        prevBtn.addEventListener('click', () => {
            if (checkMobileView()) {
                moveSliderMobile('prev');
            } else {
                moveSlider('prev');
            }
        });

        // Add event listener for resizing the window to handle view changes
        window.addEventListener('resize', () => {
            currentOffset = 0; // Reset position on resize
            slider.style.transform = `translateX(0)`;
        });

    };


    // --- 4. Initialize All Modules ---
    initAboutCarousel();
    initEventsSlider();

});