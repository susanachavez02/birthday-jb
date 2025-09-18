// Music button
const playBtn = document.getElementById("playMusic");
const song = document.getElementById("song");

playBtn.addEventListener("click", () => {
  song.play();
  playBtn.innerText = "Playing 🎶";
  playBtn.disabled = true;
});

// Countdown Timer + Birthday Reveal
function updateCountdown() {
  const now = new Date();

  // 🎂 set target to midnight tonight
  const target = new Date();
  target.setHours(24,0, 0, 0); // midnight (next day 0:00)

  const diff = target - now;

  const countdownEl = document.getElementById("countdown");
  const messageEl = document.getElementById("birthdayMessage");

  if (diff <= 0) {
    // Past midnight -> show birthday message + link
    countdownEl.style.display = "none";
    if (messageEl.style.display === "none") {
      messageEl.style.display = "block";
      launchConfetti(); // 🎉 trigger confetti bursts
    }
  } else {
    // Still waiting -> show countdown
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `⏳ ${hours}h ${minutes}m ${seconds}s until midnight...`;
  }
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();

// 🎉 Confetti launcher (bursts for 5 sec)
function launchConfetti() {
  const duration = 5 * 1000; // 5 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: Math.random() * 360,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
