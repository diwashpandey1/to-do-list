const openBtn = document.getElementById('open')
const closeBtn = document.getElementById('close')
const gallery = document.getElementById('gallery')

gallery.style.transition = 'var(--transition)'

openBtn.addEventListener('click' , function(){
  gallery.style.transform = 'scale(1)'
})

closeBtn.addEventListener('click' , function(){
  gallery.style.transform = 'scale(0)'
})



// JavaScript
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".img-wrapper img");
  const previewContainer = document.getElementById("preview");
  const previewImage = document.querySelector(".preview-image");
  const closeButton = document.querySelector(".close");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  let currentIndex = 0;

  images.forEach((img, index) => {
      img.addEventListener("click", function() {
          currentIndex = index;
          showImage(index);
          previewContainer.style.display = "block";
      });
  });

  function showImage(index) {
      previewImage.src = images[index].src;
  }

  function nextImage() {
      currentIndex++;
      if (currentIndex >= images.length) {
          currentIndex = 0;
      }
      showImage(currentIndex);
  }

  function prevImage() {
      currentIndex--;
      if (currentIndex < 0) {
          currentIndex = images.length - 1;
      }
      showImage(currentIndex);
  }

  function closePreview() {
      previewContainer.style.display = "none";
  }

  closeButton.addEventListener("click", closePreview);
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);

  document.addEventListener("keydown", function(event) {
      if (event.key === "ArrowRight") {
          nextImage();
      } else if (event.key === "ArrowLeft") {
          prevImage();
      } else if (event.key === "Escape") {
          closePreview();
      }
  });

  window.addEventListener("click", function(event) {
      if (event.target == previewContainer) {
          closePreview();
      }
  });
});

