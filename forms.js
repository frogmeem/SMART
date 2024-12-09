// Helper function to get the star color class
function getStarColorClass(value) {
    switch (value) {
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        default: return "";
    }
}

// Function to set up review functionality for each review box
function setupReviewBox(box) {
    const stars = box.querySelectorAll(".star");
    const rating = box.querySelector(".rating-value");
    const reviewText = box.querySelector("textarea");
    const usernameInput = box.querySelector(".username-input");
    const submitBtn = box.querySelector("button");
    const reviewsContainer = box.querySelector(".reviews");

    if (!stars.length || !rating || !reviewText || !usernameInput || !submitBtn || !reviewsContainer) return;

    stars.forEach((star) => {
        star.addEventListener("click", () => {
            const value = parseInt(star.getAttribute("data-value"));
            rating.innerText = value;

            // Update star styles
            stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five", "selected"));
            stars.forEach((s, index) => {
                if (index < value) s.classList.add(getStarColorClass(value));
            });
        });
    });

    submitBtn.addEventListener("click", () => {
        const userRating = parseInt(rating.innerText);
        const review = reviewText.value.trim();
        const username = usernameInput.value.trim();

        if (!userRating || !review || !username) {
            alert("Please provide a rating, username, and review before submitting.");
            return;
        }

        // Append review
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p><strong>${username}</strong> - <strong>Rating: ${userRating}/5</strong></p>
            <p>${review}</p>
        `;
        reviewsContainer.appendChild(reviewElement);

        // Reset inputs
        reviewText.value = "";
        usernameInput.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five", "selected"));
    });
}

// Initialize review functionality for all review boxes on the page
document.querySelectorAll(".review-box, .container").forEach(setupReviewBox);
