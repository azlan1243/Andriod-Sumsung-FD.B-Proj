document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements for Reviews Page
    const reviewForm = document.getElementById('review-form');
    const reviewProductSelect = document.getElementById('reviewProduct');
    const reviewUserIdInput = document.getElementById('reviewUserId');
    const reviewTextInput = document.getElementById('reviewText');
    const recommendationInput = document.getElementById('recommendation');
    const recommendButtons = document.querySelectorAll('.recommend-btn');
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Populate product select options from phones.js data
    function populateProductOptions() {
        phones.forEach(phone => {
            const option = document.createElement('option');
            option.value = phone.id;
            option.textContent = phone.model;
            reviewProductSelect.appendChild(option);
        });
    }
    
    populateProductOptions();
    
    // Handle recommendation buttons
    recommendButtons.forEach(button => {
        button.addEventListener('click', () => {
            recommendButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            recommendationInput.value = button.getAttribute('data-value');
        });
    });
    
    // Handle form submission
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateReviewForm()) return;
        
        // Get rating value
        const ratingValue = document.querySelector('input[name="rating"]:checked')?.value || '3';
        
        // Create review object
        const review = {
            reviewId: generateReviewId(),
            userId: reviewUserIdInput.value,
            productId: parseInt(reviewProductSelect.value),
            productName: reviewProductSelect.options[reviewProductSelect.selectedIndex].text,
            rating: parseInt(ratingValue),
            reviewText: reviewTextInput.value,
            recommendation: recommendationInput.value,
            createdAt: new Date().toISOString()
        };
        
        try {
            // Save review data
            await saveReview(review);
            
            // Show success message
            showToast('Review submitted successfully!', 'success');
            
            // Reset form
            resetReviewForm();
            
            // Reload reviews
            loadReviews();
            
        } catch (error) {
            console.error('Error submitting review:', error);
            showToast('Error submitting review. Please try again.', 'error');
        }
    });
    
    // Generate Review ID
    const generateReviewId = () => {
        const randomId = Math.floor(10000 + Math.random() * 90000);
        return `REV${randomId}`;
    };
    
    // Form validation
    function validateReviewForm() {
        let isValid = true;
        
        if (!reviewUserIdInput.value) {
            showToast('User ID is required', 'error');
            isValid = false;
        }
        
        if (!reviewProductSelect.value) {
            showToast('Please select a product', 'error');
            isValid = false;
        }
        
        if (!document.querySelector('input[name="rating"]:checked')) {
            showToast('Please provide a rating', 'error');
            isValid = false;
        }
        
        if (!reviewTextInput.value || reviewTextInput.value.length < 10) {
            showToast('Please provide a review with at least 10 characters', 'error');
            isValid = false;
        }
        
        if (!recommendationInput.value) {
            showToast('Please provide a recommendation', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Reset the review form
    function resetReviewForm() {
        reviewForm.reset();
        recommendButtons.forEach(btn => btn.classList.remove('active'));
        recommendationInput.value = '';
    }
    
    // Load reviews from storage
    async function loadReviews() {
        try {
            const reviews = await getAllReviews();
            
            if (reviews && reviews.length > 0) {
                let html = '';
                
                reviews.forEach(review => {
                    // Create star rating HTML
                    let starsHtml = '';
                    for (let i = 1; i <= 5; i++) {
                        if (i <= review.rating) {
                            starsHtml += '<i class="fas fa-star"></i>';
                        } else {
                            starsHtml += '<i class="far fa-star"></i>';
                        }
                    }
                    
                    html += `
                        <div class="review-card">
                            <div class="review-header">
                                <h4>${review.productName}</h4>
                                <div class="review-stars">${starsHtml}</div>
                            </div>
                            <p class="review-text">${review.reviewText}</p>
                            <div class="review-footer">
                                <span class="review-recommendation ${review.recommendation}">${review.recommendation.toUpperCase()}</span>
                                <small>Posted on ${formatDate(review.createdAt)}</small>
                            </div>
                        </div>
                    `;
                });
                
                reviewsContainer.innerHTML = html;
            } else {
                reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to leave a review!</p>';
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
            reviewsContainer.innerHTML = '<p>Error loading reviews. Please try again.</p>';
        }
    }
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Initial load of reviews
    window.addEventListener('load', loadReviews);
});