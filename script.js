let leftIndex = 0;
let rightIndex = 1;
let images = [];
let chosenImages = new Set(); // To keep track of chosen images
let lastChosenImage = ""; // To store the last chosen image
let choicesCount = 0;
const maxChoices = 10;

// Function to get the category from the URL
function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

// Function to initialize images based on the category
function initializeImages(category) {
    if (category === 'cars') {
        images = [
            `${category}/car (1).jpg`,
            `${category}/car (2).jpg`,
            `${category}/car (3).jpg`,
            `${category}/car (4).jpg`,
            `${category}/car (5).jpg`,
            `${category}/car (6).jpg`,
            `${category}/car (7).jpg`,
            `${category}/car (8).jpg`,
            `${category}/car (9).jpg`,
            `${category}/car (10).jpg`
        ];
    } else if (category === 'countries') {
        images = [
            `${category}/country (1).jpg`,
            `${category}/country (2).jpg`,
            `${category}/country (3).jpg`,
            `${category}/country (4).jpg`,
            `${category}/country (5).jpg`,
            `${category}/country (6).jpg`,
            `${category}/country (7).jpg`,
            `${category}/country (8).jpg`,
            `${category}/country (9).jpg`,
            `${category}/country (10).jpg`
        ];
    } else if (category === 'food') {
        images = [
            `${category}/food (1).jpg`,
            `${category}/food (2).jpg`,
            `${category}/food (3).jpg`,
            `${category}/food (4).jpg`,
            `${category}/food (5).jpg`,
            `${category}/food (6).jpg`,
            `${category}/food (7).jpg`,
            `${category}/food (8).jpg`,
            `${category}/food (9).jpg`,
            `${category}/food (10).jpg`
        ];
    } else if (category === 'movies') {
        images = [
            `${category}/movie (1).jpg`,
            `${category}/movie (2).jpg`,
            `${category}/movie (3).jpg`,
            `${category}/movie (4).jpg`,
            `${category}/movie (5).jpg`,
            `${category}/movie (6).jpg`,
            `${category}/movie (7).jpg`,
            `${category}/movie (8).jpg`,
            `${category}/movie (9).jpg`,
            `${category}/movie (10).jpg`
        ];
    } else if (category === 'brands') {
        images = [
            `${category}/brand (1).jpg`,
            `${category}/brand (2).jpg`,
            `${category}/brand (3).jpg`,
            `${category}/brand (4).jpg`,
            `${category}/brand (5).jpg`,
            `${category}/brand (6).jpg`,
            `${category}/brand (7).jpg`,
            `${category}/brand (8).jpg`,
            `${category}/brand (9).jpg`,
            `${category}/brand (10).jpg`
        ];
    } else if (category === 'anime') {
        images = [
            `${category}/anime (1).jpg`,
            `${category}/anime (2).jpg`,
            `${category}/anime (3).jpg`,
            `${category}/anime (4).jpg`,
            `${category}/anime (5).jpg`,
            `${category}/anime (6).jpg`,
            `${category}/anime (7).jpg`,
            `${category}/anime (8).jpg`,
            `${category}/anime (9).jpg`,
            `${category}/anime (10).jpg`
        ];
    }

    // Set initial images
    document.getElementById('left-block').querySelector('img').src = images[leftIndex];
    document.getElementById('right-block').querySelector('img').src = images[rightIndex];
}

// Function to handle image selection
function chooseImage(selected) {
    if (choicesCount >= maxChoices) return; // Prevent further choices after maxChoices is reached

    choicesCount++;

    if (choicesCount === maxChoices) {
        // Final choice made
        if (selected === 'left') {
            lastChosenImage = images[leftIndex];
        } else if (selected === 'right') {
            lastChosenImage = images[rightIndex];
        }

        // Display congratulations message with the final image
        displayCongratulations();
        
    } else {
        // Continue with the next image
        if (selected === 'left') {
            chosenImages.add(images[leftIndex]);
            rightIndex = getNextAvailableImageIndex(rightIndex);
            if (rightIndex !== -1) {
                document.getElementById('right-block').querySelector('img').src = images[rightIndex];
            }
        } else if (selected === 'right') {
            chosenImages.add(images[rightIndex]);
            leftIndex = getNextAvailableImageIndex(leftIndex);
            if (leftIndex !== -1) {
                document.getElementById('left-block').querySelector('img').src = images[leftIndex];
            }
        }
    }
}

// Function to get the next available image index that hasn't been chosen yet
function getNextAvailableImageIndex(currentIndex) {
    let newIndex = currentIndex + 1;
    while (newIndex < images.length && chosenImages.has(images[newIndex])) {
        newIndex++;
    }
    return newIndex < images.length ? newIndex : -1; // Return -1 if no more images are available
}

// Function to display the congratulations message with the final chosen image
function displayCongratulations() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="congratulations">
            <p>You like: </p>
            <img src="${lastChosenImage}" alt="Final choice" class="final-image">
        </div>
    `;
}

// Initialize the images on page load
window.onload = function() {
    const category = getCategoryFromUrl();
    initializeImages(category);
}
