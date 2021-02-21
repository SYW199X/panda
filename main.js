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
        let str = `calc(${navHeight}px + 20vh)`;
        console.log(`str: ${str}`);
        header.style.height = str;
    } else {
        navbar.classList.remove("sticky");
        header.style.height = '20vh';
    }
}

//=================================================

// const navbar = document.querySelector('.nav');
const links = document.querySelectorAll('.link');
navbar.addEventListener('mouseover', expand);
navbar.ontouchstart = expand;
function expand (e) {
    // e.preventDefault();
    // console.log("expand")
    if (e.target.classList.contains('link')) {
        navbar.removeEventListener('mouseover', expand);
        const branch = e.target;
        branch.style.position = 'relative';
        const menu = document.querySelector('.dropdown');
        // document.createElement("a");
        // menu.classList.add = 'branch-menu';
        menu.className = 'branch-menu';
        branch.appendChild(menu);
        [...menu.children[0].children].forEach(item => {
            // console.log(menu.parentElement);
            let url = menu.parentElement.href;
            url = url + "/" + item.firstChild.innerHTML.toLowerCase();
            item.firstChild.href = url;
        });
        // for (const child of menu.children[0].children) {
        //     console.log(child);
        // }
        // menu.innerHTML = 'Placeholder';
        // menu.onclick = (e) => {
        //     e.preventDefault();
        //     console.log(e.target);
        // }
        menu.onmouseover = (e) => branch.classList.toggle('link2');
        menu.onmouseout = (e) => branch.classList.toggle('link2');
        if (document.body.scrollWidth > document.body.clientWidth) menu.classList.add('overwrite');
    }
    // e.preventDefault();
}

links.forEach(a => {
    a.onmouseleave = (e) => {
        if (document.querySelector('.branch-menu') != null) {
            // console.log("remove");
            document.querySelector('.branch-menu').classList.toggle('dropdown');
            document.querySelector('.branch-menu').classList.toggle('branch-menu');
            navbar.addEventListener('mouseover', expand);
        }
    }
});

document.onclick = (e) => {
    // if (e.target.className === 'nav') e.preventDefault();
    if (document.querySelector('.branch-menu') != null && e.target.className != 'branch-menu') {
        // document.querySelector('.branch-menu').remove();
        document.querySelector('.branch-menu').classList.toggle('dropdown');
        document.querySelector('.branch-menu').classList.toggle('branch-menu');
        navbar.addEventListener('mouseover', expand);
    }
}