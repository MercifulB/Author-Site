const imgWrapper = document.querySelector(".img-wrapper");
const allImages = [...imgWrapper.querySelectorAll("img")];

let imgNum = 0;
// setting threshold to make a gab between images
const threshold = 125;

let lastPosX, lastPosY, curPosX, curPosY;
let isCounting = true;
let startFromX, startFromY;

document.body.addEventListener("mousemove", function(e) {
  const [x, y] = [e.x, e.y];

  const hasCrossedThresHold = // Boolean value wheather the mouse has crossed the theshold or not
    x > startFromX + threshold ||
    x < startFromX - threshold ||
    y > startFromY + threshold ||
    y < startFromY - threshold;

  if (hasCrossedThresHold) {
    // if it has calling showNextImage
    showNextImage(e);
    isCounting = true; // changing the isCounting to true
  }

  if (isCounting) {
    // So that we can record the another point here again !!
    startFromX = x;
    startFromY = y;
  }

  isCounting = false; // Changing the isCounting to false to not let recording the startFromX and
  //startFromY points on every mouse-move
});

function showNextImage(e) {
  const movingImage = allImages[imgNum];
  [curPosX, curPosY] = [e.x, e.y];

  movingImage.removeAttribute = "style";

  // Setting the position of image
  movingImage.style.left = `${curPosX}px`;
  movingImage.style.top = `${curPosY}px`;

  // making the image visibile here
  movingImage.classList.add("visible");

  // calculating a moving distance
  const movingDistanceX = ((curPosX - lastPosX || 0) * 80) / 100;
  const movingDistanceY = ((curPosY - lastPosY || 0) * 80) / 100;

  setTimeout(function() {
    // animating image towards the current position of mouse
    movingImage.style.left = `${lastPosX + movingDistanceX}px`;
    movingImage.style.top = `${lastPosY + movingDistanceY}px`;

    setTimeout(function() {
      movingImage.classList.add("grow-scale"); // hiding image after 800ms

      setTimeout(function() {
        movingImage.classList.remove("visible", "grow-scale");
        movingImage.style = "";
      }, 600);
    }, 800);
  }, 10);

  imgNum++; // incresing num to show different image  each time

  if (imgNum === allImages.length - 1) {
    imgNum = 0;
  }

  // Setting the last position values of image
  lastPosX = curPosX;
  lastPosY = curPosY;
}


/*
CDN:
Micro-Slider JS by LGSE
https://cdn.jsdelivr.net/npm/micro-slider@1.0.9/dist/micro-slider.min.js
Hammer JS gesture library
https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js
*/

document.addEventListener('DOMContentLoaded', () => {
  
  //===== MICRO-SLIDER begin
	const __ms = document.querySelector('.micro-slider');
  const __msSlider = new MicroSlider(__ms, { indicators: true, indicatorText: '' });
  const hammer = new Hammer(__ms);
	const __msTimer = 2000;
  let __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
    
  //detect mouseenter event
	__ms.onmouseenter = function(e) {
    clearInterval(__msAutoplay); 
    console.log(e.type + ' mouse detected');
  }
  
  //detect mouseleave event
	__ms.onmouseleave = function(e) {
    clearInterval(__msAutoplay); 
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
    console.log(e.type + ' mouse detected');
  }
  
  //detect mouseclick event
	__ms.onclick = function(e) {
    clearInterval(__msAutoplay); 
    console.log(e.type + ' mouse detected');
  }
  
  //detect gesture tap event with hammer js library
  hammer.on('tap', function(e) {
    clearInterval(__msAutoplay);
    console.log(e.type + ' gesture detected');
  });
  
  //detect gesture swipe event with hammer js library
  hammer.on('swipe', function(e) {
    clearInterval(__msAutoplay); 
    __msAutoplay = setInterval(() => __msSlider.next(), __msTimer);
    console.log(e.type + ' gesture detected');
  });

  let slideLink = document.querySelectorAll('.slider-item');
  if (slideLink && slideLink !== null && slideLink.length > 0){
    slideLink.forEach( el => el.addEventListener('click', e => {
      e.preventDefault();
      let href = el.dataset.href;
      let target = el.dataset.target;
      if (href !== '#') window.open(href, target);
    }));
  }
  
  //===== MICRO-SLIDER end
  
});