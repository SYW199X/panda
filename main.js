// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
const navbar = document.querySelector(".nav");
const header = document.querySelector('.logo-text');

// Get the offset position and height of the navbar at load and resize
let sticky = navbar.offsetTop;
let navHeight = navbar.offsetHeight;
window.onresize = () => {
  sticky = window.innerHeight/5;
  navHeight = navbar.offsetHeight;
}
let flag = 0;
window.onkeydown = (e) => {
  if (e.keyCode == 82) {//R
    console.log(`viewport: ${window.innerHeight}\nscroll: ${window.pageYOffset}\nnavHeight: ${navHeight}\nnavOffset: ${navbar.offsetTop}\nheaderHeight: ${header.offsetHeight}`);
  } else if (e.keyCode == 81) {//Q
    // navbar.style.position = 'fixed';
    // navbar.style.width = '100%';
    navbar.classList.add('sticky');
    let str = sticky + navHeight;
    header.style.height = `170px`;
  } else if (e.keyCode == 84) {//T
    // navbar.style.position = '';
    // navbar.style.width = '';
    navbar.classList.remove('sticky');
    header.style.height = '20vh';
  } 
  // else if (e.keyCode == 69) {
  //   if (flag == 0) {
  //     document.querySelector('.organisation').style.display = 'block';
  //     flag = 1;
  //   } else {
  //     document.querySelector('.organisation').style.display = 'none';
  //     flag = 0;
  //   }
  // }
}

console.log(`sticky: ${sticky}`);
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  // console.log(window.pageYOffset);
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    // header.classList.add("header-sticky")
    let str = `calc(${navHeight}px + 20vh)`;
    console.log(`str: ${str}`);
    header.style.height = str;
  } else {
    // console.log("here");
    navbar.classList.remove("sticky");
    // header.classList.remove("header-sticky")
    header.style.height = '20vh';
  }
}