// Reviews.js

document.addEventListener('DOMContentLoaded', () => {
  const writeReviewBtn = document.getElementById('write-review-btn');
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Write a Review</h2>
      <textarea id="review-text" maxlength="120" placeholder="Write your review here (max 120 words)..."></textarea>
      <div class="word-counter">0/120</div>
      <button id="submit-review">Share</button>
    </div>
  `;
  document.body.appendChild(modal);

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  const openModal = () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  // Ensure modal does not open automatically on page load
  closeModal();

  writeReviewBtn.addEventListener('click', openModal);

  modal.querySelector('.close').addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const reviewText = modal.querySelector('#review-text');
  const wordCounter = modal.querySelector('.word-counter');

  reviewText.addEventListener('input', () => {
    const wordCount = reviewText.value.split(/\s+/).filter(word => word.length > 0).length;
    wordCounter.textContent = `${wordCount}/120`;
  });

  const submitReviewBtn = modal.querySelector('#submit-review');

  submitReviewBtn.addEventListener('click', () => {
    const review = reviewText.value.trim();
    if (!review) {
      alert('Please write a review before submitting.');
      return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const newReview = {
      id: Date.now(),
      name: `Customer ${reviews.length + 1}`,
      review,
      timestamp: new Date().toISOString(),
    };

    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    console.log('Review submitted:', newReview);
    alert('Thank you for your review!');
    closeModal();
  });

  // Carousel Initialization
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel, index) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
      console.error('No slides found in carousel:', carousel.id);
      return;
    }

    // Ensure carousel is visible
    carousel.style.display = 'flex';

    // Duplicate slides for seamless looping
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      carousel.appendChild(clone);
    });

    // Removed animation logic to prevent page movement
  });
});