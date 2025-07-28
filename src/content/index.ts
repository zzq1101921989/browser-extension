
function initEvent() {

  window.onload = () => {
    console.log('Content script loaded');
  }

  window.addEventListener('click', (e) => {
    // e.preventDefault();
    console.log(e);
  })
}

initEvent()