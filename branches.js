window.addEventListener('resize', adjust);
window.onload = adjust;
function adjust() {
    let grid = document.querySelector('.equipment-grid');
    // console.dir(grid);
    if (grid.firstElementChild) {
        let observer = new MutationObserver(adjust);
        observer.observe(grid, {childList: true});
        let width = grid.firstElementChild.offsetWidth;
        // console.log(width);
        // grid.style.gridAutoRows = `${width}px`;
        grid.firstElementChild.style.height = `${width}px`;
    }
}

// const grid = document.querySelector('.equipment-grid');


// [...grid.children].forEach(box => {
//     // console.log(box)
//     box.style.height = `${width}px`;
//     console.log(width);
// });