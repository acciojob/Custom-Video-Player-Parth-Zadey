/* Edit this file */

const player = document.querySelector(".player");

const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");

const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");

const skipButtons = player.querySelectorAll("[data-skip]");

const ranges = player.querySelectorAll(".player__slider");


// ---------------- PLAY / PAUSE ----------------

function togglePlay() {

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

}


// ---------------- UPDATE BUTTON ----------------

function updateButton() {

  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }

}


// ---------------- SKIP ----------------

function skip() {

  video.currentTime += parseFloat(this.dataset.skip);

}


// ---------------- VOLUME / SPEED ----------------

function handleRangeUpdate() {

  video[this.name] = this.value;

}


// ---------------- PROGRESS BAR ----------------

function handleProgress() {

  if (!video.duration) {
    return;
  }

  const percent =
    (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;

}


// ---------------- SCRUB ----------------

function scrub(e) {

  if (!video.duration) {
    return;
  }

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;

}


// ---------------- EVENT LISTENERS ----------------

// Click video to play/pause
video.addEventListener("click", togglePlay);

// Play
video.addEventListener("play", updateButton);

// Pause
video.addEventListener("pause", updateButton);

// Update progress
video.addEventListener("timeupdate", handleProgress);

// Play/pause button
toggle.addEventListener("click", togglePlay);

// Skip buttons
skipButtons.forEach(button => {
  button.addEventListener("click", skip);
});

// Volume and playback speed
ranges.forEach(range => {

  range.addEventListener(
    "change",
    handleRangeUpdate
  );

  range.addEventListener(
    "mousemove",
    handleRangeUpdate
  );

});


// ---------------- PROGRESS DRAGGING ----------------

let mousedown = false;

progress.addEventListener("click", scrub);

progress.addEventListener("mousemove", function(e) {

  if (mousedown) {
    scrub(e);
  }

});

progress.addEventListener("mousedown", function() {

  mousedown = true;

});

progress.addEventListener("mouseup", function() {

  mousedown = false;

});

progress.addEventListener("mouseleave", function() {

  mousedown = false;

});


// ---------------- VIDEO ERROR ----------------

video.addEventListener("error", function() {

  console.log("Error: Unable to load download.mp4");

});