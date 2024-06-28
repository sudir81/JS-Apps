const count = 10;
const api_key = "aswqfoAtp1azNnpaPzaKYXyRjj4iyIAlZjQX7EHBfpI"
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;

const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// show loader
function showLoader() {
    loader.hidden = false;
}

function hideLoader() {
  if (!loader.hidden) {
    loader.hidden = true;
  }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        hideLoader();
    }
}

// helpers
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// display photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photos = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// event listeners
window.addEventListener('scroll', (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        showLoader();
    }
})

// on load
getPhotos();