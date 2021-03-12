//========================================================
// This section creates sticky navbar that stays at top of screen
// when the page is scrolled down

// window.onscroll = function() {stickyNav()};
window.onscroll = stickyNav;

const navbar = document.querySelector(".nav");
const header = document.querySelector('.logo-text');

// Get the offset position and height of the navbar at load
// Update values upon resize
let sticky = navbar.offsetTop;
let navHeight = navbar.offsetHeight;
window.onresize = () => {
    sticky = window.innerHeight/5;
    navHeight = navbar.offsetHeight;
}

// Add the sticky class to the navbar when you reach its scroll position. 
// Remove "sticky" when you leave the scroll position
function stickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        let str = `calc(${navHeight}px + 20vh)`;
        header.style.height = str;
    } else {
        navbar.classList.remove("sticky");
        header.style.height = '20vh';
    }
}

////For debugging
// let flag = 0;
// window.onkeydown = (e) => {
//     if (e.keyCode == 82) {//R
//         console.log(`viewport: ${window.innerHeight}\nscroll: ${window.pageYOffset}\nnavHeight: ${navHeight}\nnavOffset: ${navbar.offsetTop}\nheaderHeight: ${header.offsetHeight}`);
//     } else if (e.keyCode == 81) {//Q
//         // navbar.style.position = 'fixed';
//         // navbar.style.width = '100%';
//         navbar.classList.add('sticky');
//         let str = sticky + navHeight;
//         header.style.height = `170px`;
//     } else if (e.keyCode == 84) {//T
//         // navbar.style.position = '';
//         // navbar.style.width = '';
//         navbar.classList.remove('sticky');
//         header.style.height = '20vh';
//     } 
//     else if (e.keyCode == 69) {
//       if (flag == 0) {
//         document.querySelector('.organisation').style.display = 'block';
//         flag = 1;
//       } else {
//         document.querySelector('.organisation').style.display = 'none';
//         flag = 0;
//       }
//     }
// }

//============================================================
// This section does the navbar dropdown menu rendering and hyperlink generation

// const navbar = document.querySelector('.nav');
const links = document.querySelectorAll('.link');
navbar.addEventListener('mouseover', expand);
navbar.ontouchstart = expand;

/*
 * Every HTML page has a hidden pre-made 'dropdown' div
 * with a ul element containing li elements.
 * The 'dropdown' div is appended to header navbar items
 * and its li elements become the dropdown selectable items.
 */
function expand (e) {
    if (e.target.classList.contains('link')) {
        navbar.removeEventListener('mouseover', expand);
        const branch = e.target;
        const menu = document.querySelector('.dropdown');
        branch.style.position = 'relative';
        menu.style.width = window.getComputedStyle(branch).getPropertyValue('width');
        menu.className = 'branch-menu';
        branch.appendChild(menu);
        [...menu.children[0].children].forEach(item => {

            //Attach a URL to each dropdown item based on parent's href
            const parentURL = menu.parentElement.getAttribute('href');
            let pathBack = parentURL.match(/(?<!\w)[./]+?(?=\w)/);//"../" stuff if applicable
            let url = parentURL.match(/[^/.]+\.[^/.]+$/);//Actual URL
            url = url[0].replace(/\.[^/.]+$/, "");//Take off ".html"
            url = pathBack ? pathBack + url : url;
            url = url + '-' + item.firstChild.innerHTML.toLowerCase() + '.html';
            item.firstChild.href = url;
        });

        //link2 class sorts out dropdown parent's mouseover highlights
        menu.onmouseover = (e) => branch.classList.toggle('link2');
        menu.onmouseout = (e) => branch.classList.toggle('link2');

        //For the rightmost navbar item, make sure its dropdown doesn't overflow out of the page
        //If it overflows, add overwrite class which sets right border of parent item as limit
        //so dropdown menu doesn't exceed it
        if (document.body.scrollWidth > document.body.clientWidth) menu.classList.add('overwrite');
    }
}

links.forEach(a => {
    a.onmouseleave = (e) => {
        if (document.querySelector('.branch-menu') != null) {
            document.querySelector('.branch-menu').classList.toggle('dropdown');
            document.querySelector('.branch-menu').classList.toggle('branch-menu');
            navbar.addEventListener('mouseover', expand);
        }
    }
});

//If dropdown menu doesn't automatically disappear on mouse leave, allow user to manually
//get rid of it by clicking anywhere on the screen that isn't the dropdown menu or its parent
document.onclick = (e) => {
    if (document.querySelector('.branch-menu') != null && e.target.className != 'branch-menu') {
        document.querySelector('.branch-menu').classList.toggle('dropdown');
        document.querySelector('.branch-menu').classList.toggle('branch-menu');
        navbar.addEventListener('mouseover', expand);
    }
}

//===============================================
// This ensures footer is always either at the bottom of the screen or bottom of page
// The distinction becomes relevant whenever a page is too short to extend the entire 
// height of the screen

setTimeout((e) => {
    footerStuff(e);
}, 2000);

let observer = new MutationObserver(footerStuff);
observer.observe(document.documentElement, {childList: true, subtree: true, attributes: true});
function footerStuff (e) {
    const footerElem = document.querySelector('.footer');
    const marginHeight = parseInt(window.getComputedStyle(footerElem, null).getPropertyValue('margin-top'));
    const actualHeight = document.body.clientHeight + footerElem.clientHeight + marginHeight;
    observer.disconnect();
    if (actualHeight < window.innerHeight) {
        footerElem.style.position = 'fixed';
        footerElem.classList.add('sticky-footer');
    } else {
        footerElem.classList.remove('sticky-footer');
        footerElem.style.position = 'static';
    }
    observer.observe(document.documentElement, {childList: true, subtree: true, attributes: true});
}

//=================================================