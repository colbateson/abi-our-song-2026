const audio = document.querySelector('#our-song');
const playButton = document.querySelector('.play-button');
const playIcon = document.querySelector('.play-icon');
const playLabel = document.querySelector('.play-label');
const progress = document.querySelector('#song-progress');
const currentTime = document.querySelector('#current-time');
const duration = document.querySelector('#duration');
const errorMessage = document.querySelector('.audio-error');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const setPlayingState = (playing) => {
  playIcon.textContent = playing ? '❚❚' : '▶';
  playLabel.textContent = playing ? 'Pause Our Song' : 'Play Our Song';
  playButton.setAttribute('aria-label', playing ? 'Pause Our Song' : 'Play Our Song');
};

playButton.addEventListener('click', async () => {
  errorMessage.hidden = true;
  try {
    if (audio.paused) await audio.play();
    else audio.pause();
  } catch {
    errorMessage.hidden = false;
  }
});

audio.addEventListener('play', () => setPlayingState(true));
audio.addEventListener('pause', () => setPlayingState(false));
audio.addEventListener('ended', () => setPlayingState(false));
audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});
audio.addEventListener('error', () => { errorMessage.hidden = false; });
progress.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});
