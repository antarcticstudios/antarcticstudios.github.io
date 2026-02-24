const galleryImages = [
  {
    type: "youtube",
    videoId: "PR9BYiqWOW8",
    caption: "Drum playthrough of a track recorded at Antarctic Studios, showcasing the raw drum tones you can expect to achieve from a session here."
  },
  {
    src: "img/studiopics/controlroom.webp",
    caption: "Mix/Control room area with analog gear"
  },
  {
    src: "img/studiopics/lounge.webp",
    caption: "Lounge space with comfortable seating & attached bathroom"
  },
  {
    src: "img/studiopics/drums.webp",
    caption: "Drum area with mics, acoustic treatment, and vibe"
  },
  {
    src: "img/studiopics/amps.webp",
    caption: "Amp wall featuring multiple flavours of high-gain amps, great guitar cabs, and several guitars"
  },
  {
    src: "img/studiopics/keys.webp",
    caption: "An excellent selection of synthesizers that can fit any production or sonic palette - anything from organic pianos to otherworldly searing synth leads, and anything in between."
  },
  {
    src: "img/studiopics/mic.webp",
    caption: "One of over two dozen high-quality microphones available in the studio - because your sound deserves the right tool for the job."
  },

];

document.addEventListener("DOMContentLoaded", () => {

  const galleryContainer = document.getElementById('gallery-container');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    const item = galleryImages[index];

    lightboxImg.style.display = "none";
    lightboxImg.src = "";

    let existingIframe = document.getElementById("lightbox-video");
    if (existingIframe) existingIframe.remove();

    if (item.type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.id = "lightbox-video";
      iframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.width = "90%";
      iframe.style.maxWidth = "1000px";
      iframe.style.aspectRatio = "16 / 9";
      iframe.style.borderRadius = "12px";
      iframe.style.border = "none";

      lightbox.appendChild(iframe);
    } else {
      lightboxImg.src = item.src;
      lightboxImg.style.display = "block";
    }

    lightboxCaption.textContent = item.caption;
    lightbox.style.display = "flex";
  }

  function closeLightbox() {
    let iframe = document.getElementById("lightbox-video");
    if (iframe) iframe.remove();
    lightbox.style.display = 'none';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showLightbox(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightbox(currentIndex);
  }

  // Build gallery
  galleryImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';

    const image = document.createElement('img');

    if (img.type === "youtube") {
      image.src = `https://img.youtube.com/vi/${img.videoId}/maxresdefault.jpg`;
    } else {
      image.src = img.src;
    }

    image.alt = img.caption;
    item.appendChild(image);

    item.onclick = () => showLightbox(index);

    galleryContainer.appendChild(item);
  });

  document.getElementById('lightbox-close').onclick = closeLightbox;
  document.getElementById('lightbox-next').onclick = showNextImage;
  document.getElementById('lightbox-prev').onclick = showPrevImage;

});
///handleSwipe();