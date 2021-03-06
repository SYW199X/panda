window.addEventListener('resize', adjust);
window.onload = adjust;
function adjust() {
    let grids = document.querySelectorAll('.equipment-grid');
    clearInterval(interval);
    // console.dir(grid);
    grids.forEach(grid => {
        if (grid.firstElementChild) {
            let observer = new MutationObserver(adjust);
            observer.observe(grid, {childList: true});
            let width = grid.firstElementChild.offsetWidth;
            grid.firstElementChild.style.height = `${width*0.8}px`;
        }
    })
    
}

let interval = setInterval(adjust, 1000);