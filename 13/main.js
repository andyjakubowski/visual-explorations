function handleLoad() {
  injectVideo();
}

function injectVideo() {
  const main = document.querySelector('main');
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', 'true');
  video.setAttribute('muted', '');
  video.setAttribute('src', '../videos/pride.mp4');
  main.append(video);
}

if (document.readyState === 'loading') {
  document.addEventListener('load', handleLoad);
} else {
  handleLoad();
}
