const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
let mybutton = document.getElementById("scroll-to-top");

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

let initialImgsCount = 5;
const api_key = "aswqfoAtp1azNnpaPzaKYXyRjj4iyIAlZjQX7EHBfpI"
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${initialImgsCount}`;

function updateAPIURLWithCount(imgsCount) {
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${imgsCount}`
}

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
        imgsCount = 30;
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

    if (isInitialLoad) {
      updateAPIURLWithCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
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