// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
const navbar = document.getElementById("navbar");
const header = document.querySelector('.logo-text');

// Get the offset position and height of the navbar at load and resize
let sticky = navbar.offsetTop;
let navHeight = navbar.offsetHeight;
window.onresize = () => {
  sticky = window.innerHeight/5;
  navHeight = navbar.offsetHeight;
}

window.onkeydown = (e) => {
  if (e.keyCode == 82) {
    console.log(`scroll: ${window.pageYOffset}\nnavHeight: ${navHeight}\nnavOffset: ${sticky}\nheaderHeight: ${header.offsetHeight}`);
  } else if (e.keyCode == 81) {
    // navbar.style.position = 'fixed';
    // navbar.style.width = '100%';
    navbar.classList.add('sticky');
    let str = sticky + navHeight;
    header.style.height = `170px`;
  } else if (e.keyCode == 84) {
    // navbar.style.position = '';
    // navbar.style.width = '';
    navbar.classList.remove('sticky');
    header.style.height = '20vh';
  }

}

console.log(sticky);
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    // header.classList.add("header-sticky")
    let str = `calc(${navHeight}px + 20vh)`;
    console.log(str);
    header.style.height = str;
  } else {
    console.log("here");
    navbar.classList.remove("sticky");
    // header.classList.remove("header-sticky")
    header.style.height = '20vh';
  }
}