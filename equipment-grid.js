const {useState, useEffect} = React;

function GridModule({text, elemDir}) {
    const [out, popped] = useState(false);
    const [wait, keepWaiting] = useState(true);
    const [url, urlIs] = useState([]);

    const displayInfo = (e) => {
        const grid = e.currentTarget.parentElement;
        if (!out) {
            grid.lastChild.style.display = 'block';
        } else {
            grid.lastChild.style.display = 'none';
        }
        popped(!out);
    }

    const getOrigImg = (e, img) => {
        // Create anchor element with URL linking to original 
        // resolution image. Append it to an anchor parent because 
        // image element children don't show up for some reason
        const parent = e.currentTarget;
        parent.style.position = 'relative';
        const fullSizeIcon = document.createElement('a');
        
        // Get index of image number in URL string
        let num = img.search(/\/.\./);

        // Replace number with number-orig e.g. 1.jpg becomes 1-orig.jpg
        fullSizeIcon.href = img.replace(img[num+1], `${img[num+1]}-orig`);

        fullSizeIcon.className = 'full-size-icon';
        fullSizeIcon.target = '_blank';
        fullSizeIcon.style.width = `${e.currentTarget.clientWidth/3}px`;
        parent.appendChild(fullSizeIcon);
                
        // Create icon and insert into anchor element created above
        const icon = document.createElement('img');
        icon.setAttribute('src', 'zoom.png');
        fullSizeIcon.appendChild(icon);

        // Create anchor element linking to specific equipment article
        const moreInfo = document.createElement('a');
        moreInfo.className = 'equipment-article';
        moreInfo.href = img.replace(/(?<=\.)\w+$/, 'html');
        moreInfo.style.height = `${e.currentTarget.clientHeight/3}px`;
        moreInfo.style.width = `${e.currentTarget.clientWidth}px`;
        moreInfo.innerHTML = 'Read More';
        parent.appendChild(moreInfo);
    }

    const removeIcon = (e) => {
        document.querySelectorAll('.equipment-article').forEach(link => {
            link.parentElement.removeAttribute('style');
            link.remove();
        })
        document.querySelectorAll('.full-size-icon').forEach(icon => {
            icon.parentElement.removeAttribute('style');
            icon.remove();
        });
    }
    
    /*
     * index.HTML element has a 'dir' attribute (elemDir below) 
     * which informs React which equipment directory to access. 
     * Inside the directory are jpg files that are consecutively 
     * enumerated 1.jpg, 2.jpg, 3.jpg. React is to access these jpg
     * files from the specified directory and display the images in 
     * the grid element. The equipment directory is a subfolder of
     * the branch folder which the 'dir' methods below will identify.
     */
    useEffect(() => {
        const subDir = elemDir;

        // dir gets the correct branch folder using the current URL
        // which is in the form branch-equipment.html e.g. navy-equipment.html
        let dir = window.location.pathname.split('').reverse().join('');
        dir = dir.split('-')[1].split('/')[0].split('').reverse().join('');
        const img = [];

        // Construct full image URL e.g. navy/DDG/1.jpg
        let i = 0;
        for(i=0;i<3;i++) {
            img[i] = `${dir}/${subDir}/${i+1}.jpg`;
        }

        urlIs(img);
        keepWaiting(false);
    }, []);

    return ( wait ? <div>Loading...</div>
    :
        <React.Fragment>
            <div className='root-grid' onClick={(e)=> displayInfo(e)}>{text}</div>
            <a onMouseLeave ={(e) => removeIcon(e)} onMouseEnter={(e) => getOrigImg(e, url[0])}>
                <img src={url[0]} className='grid-picture'/>
            </a>
            <a onMouseLeave ={(e) => removeIcon(e)} onMouseEnter={(e) => getOrigImg(e, url[1])}>
                <img src={url[1]} className='grid-picture'/>
            </a>
            <a onMouseLeave ={(e) => removeIcon(e)} onMouseEnter={(e) => getOrigImg(e, url[2])}>
                <img src={url[2]} className='grid-picture third-pic'/>
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