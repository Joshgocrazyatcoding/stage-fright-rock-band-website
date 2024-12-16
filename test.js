function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDay = days[now.getDay()];
    
    // Remove active class from all days
    days.forEach(day => {
        document.getElementById(day).classList.remove('active');
    });
    
    // Add active class to current day
    document.getElementById(currentDay).classList.add('active');
}


// Update clock every second
setInterval(updateClock, 1000);

// Initial call to set time immediately
updateClock();

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

setInterval(nextSlide, 5000);