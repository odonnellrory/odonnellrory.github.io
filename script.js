let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const slideWidth = document.querySelector('.slide').offsetWidth;
    const totalSlides = document.querySelectorAll('.slide').length;

    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
});

document.getElementById('prev').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const slideWidth = document.querySelector('.slide').offsetWidth;

    if (currentIndex > 0) {
        currentIndex--;
        slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
});
