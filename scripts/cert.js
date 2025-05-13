document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll('.courses-title li');
  const preview = document.getElementById('certificate-preview');
  const image = document.getElementById('certificate-image');
  const closeBtn = document.getElementById('close-preview');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-image');
      if (imgSrc) {
        image.src = imgSrc;
        preview.style.display = 'flex';
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    preview.style.display = 'none';
    image.src = '';
  });
});
