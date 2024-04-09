$(document).ready(function() {
    $('#demo2').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 2,
          nav: true,
          loop: false,
          margin: 20
        }
      }
    })
  })

  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const paginationDots = document.querySelector('.pagination-dots');
  let currentIndex = 0;
  const slideWidth = testimonialSlides[0].offsetWidth;
  let startX, startTime;
  
  function showSlide(n) {
    testimonialSlider.style.transform = `translateX(-${n * slideWidth}px)`;
    updatePaginationDots(n);
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialSlides.length;
    showSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentIndex);
  }
  
  function createPaginationDots() {
    for (let i = 0; i < testimonialSlides.length; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(i));
      paginationDots.appendChild(dot);
    }
    paginationDots.children[0].classList.add('active');
  }
  
  function updatePaginationDots(index) {
    const dots = paginationDots.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[index].classList.add('active');
  }
  
  function handleSwipe(e) {
    const deltaX = e.clientX - startX;
    const deltaTime = Date.now() - startTime;
  
    if (deltaTime < 200 || Math.abs(deltaX) < 50) {
      return;
    }
  
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  
    startX = null;
    startTime = null;
  }
  
  testimonialSlider.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startTime = Date.now();
  });
  
  testimonialSlider.addEventListener('pointerup', handleSwipe);
  testimonialSlider.addEventListener('pointercancel', () => {
    startX = null;
    startTime = null;
  });
  
  // Auto-slide functionality
  let autoSlideInterval;
  
  function startAutoSlide(interval) {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, interval);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // (Optional) Add event listeners to start/stop auto-slide on hover/focus
  testimonialSlider.addEventListener('mouseenter', () => stopAutoSlide());
  testimonialSlider.addEventListener('mouseleave', () => startAutoSlide(300000)); // Example interval (3 seconds)
  
  // (Optional) Add event listeners for navigation (dots, arrows) to stop/restart auto-slide
  
  // Call startAutoSlide() to initiate auto-sliding after carousel setup
  startAutoSlide(300000); // Example interval (3 seconds)
  
  createPaginationDots();
  showSlide(currentIndex); // Initial slide display
  