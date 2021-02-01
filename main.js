// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    header.classList.add("header-sticky")
  } else {
    navbar.classList.remove("sticky");
    header.classList.remove("header-sticky")
  }
}

//Makes input boxes adaptive to length of input
// $(document).ready(function () {
//     var $inputs = $('.resizing-input');

//     // Resize based on text if text.length > 0
//     // Otherwise resize based on the placeholder
//     function resizeForText(text) {
//         var $this = $(this);
//         if (!text.trim()) {
//             text = $this.attr('placeholder').trim();
//         }
//         var $span = $this.parent().find('span');
//         $span.text(text);
//         var $inputSize = $span.width();
//         $this.css("width", $inputSize);
//     }

//     $inputs.find('input').keypress(function (e) {
//         if (e.which && e.charCode) {
//             var c = String.fromCharCode(e.keyCode | e.charCode);
//             var $this = $(this);
//             resizeForText.call($this, $this.val() + c);
//         }
//     });

//     // Backspace event only fires for keyup
//     $inputs.find('input').keyup(function (e) { 
//         if (e.keyCode === 8 || e.keyCode === 46) {
//             resizeForText.call($(this), $(this).val());
//         }
//     });

//     $inputs.find('input').each(function () {
//         var $this = $(this);
//         resizeForText.call($this, $this.val())
//     });
// });