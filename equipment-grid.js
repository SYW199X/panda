const {useState, useEffect} = React;

function GridModule({text, elemDir}) {
    const [out, popped] = useState(false);
    const [wait, keepWaiting] = useState(true);
    const [url, urlIs] = useState([]);

    const displayInfo = (e) => {
        const grid = e.target.parentElement;
        if (!out) {
            grid.lastChild.style.display = 'block';
        } else {
            grid.lastChild.style.display = 'none';
        }
        popped(!out);
    }

    const getOrigImg = (e, img) => {

        //Create anchor element with URL linking to original resolution image
        //Append it to an anchor parent since image element children
        //don't show up for some reason
        e.target.parentElement.style.position = 'relative';
        const fullSizeIcon = document.createElement('a');
        let num = img.search(/\/.\./);
        img = img.replace(img[num+1], `${img[num+1]}-orig`);
        fullSizeIcon.href = img;
        fullSizeIcon.target = '_blank';
        fullSizeIcon.className = 'full-size-icon';
        fullSizeIcon.style.width = `${e.target.clientWidth/3}px`;
        e.target.parentElement.appendChild(fullSizeIcon);
        
        //Create icon and insert into anchor element created above
        const icon = document.createElement('img');
        icon.setAttribute('src', 'zoom.png');
        icon.setAttribute('class', 'zoom-icon')
        fullSizeIcon.appendChild(icon);
    }

    const removeIcon = (e) => {
        document.querySelectorAll('.full-size-icon').forEach(icon => {
            icon.parentElement.removeAttribute('style');
            icon.remove()
        });
    }
    
    /*
     * index.HTML element has a 'dir' attribute which informs React
     * which directory to access. Inside the directory are jpg files
     * that are consecutively enumerated 1.jpg, 2.jpg, 3.jpg. React
     * is to access these jpg files from the specified directory and
     * display the images in the grid element.
     */
    useEffect(() => {
        // const subDir = domContainer.getAttribute('dir');
        const subDir = elemDir;
        let dir = window.location.pathname.split('').reverse().join('');
        dir = dir.split('-')[1].split('/')[0].split('').reverse().join('');
        console.log(dir);
        const img = [];
        let i = 0;
        for(i=0;i<3;i++) {
            img[i] = `${dir}/${subDir}/${i+1}.jpg`
        }

        urlIs(img);
        keepWaiting(false);
    }, []);

    return ( wait ? <div>Loading...</div> :
        <React.Fragment>
            <div className='root-grid' onClick={(e)=> displayInfo(e)}>{text}</div>
            <a onMouseLeave ={(e) => removeIcon(e)}>
                <img src={url[0]} className='grid-picture' onMouseEnter={(e) => getOrigImg(e, url[0])}/>
            </a>
            <a onMouseLeave ={(e) => removeIcon(e)}>
                <img src={url[1]} className='grid-picture' onMouseEnter={(e) => getOrigImg(e, url[0])}/>
            </a>
            <a onMouseLeave ={(e) => removeIcon(e)}>
                <img src={url[2]} className='grid-picture third-pic' 
                onMouseEnter={(e) => getOrigImg(e, url[0])}/>
            </a>
            <a className='info-row'>Additional systems + info section</a>
        </React.Fragment>
    );
}

const domContainers = document.querySelectorAll('.equipment-grid')
    .forEach(domContainer => {
        ReactDOM.render(<GridModule elemDir={domContainer.getAttribute('dir')} 
            text={domContainer.getAttribute('text')}/>, domContainer);
    })