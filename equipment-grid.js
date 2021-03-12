const {useState, useEffect} = React;

function GridModule({text, elemDir}) {
    const [out, popped] = useState(false);
    const [wait, keepWaiting] = useState(true);
    const [url, urlIs] = useState([]);
    const [jsonMap, getMap] = useState([]);

    const displayInfo = (e) => {
        const grid = e.currentTarget.parentElement;
        if (!out) {
            grid.lastChild.style.display = 'block';
        } else {
            grid.lastChild.style.display = 'none';
        }
        popped(!out);
    }

    const extractBranchDir = (fullPath) => {
        if (!fullPath) return;
        return fullPath.split('').reverse().join('')
        .split('-')[1].split('/')[0].split('').reverse().join('');
    }

    const overlayLinks = (e, imgUrl, squareNum) => {
        // Create anchor element with URL linking to original 
        // resolution image. Append it to an anchor parent because 
        // image element children don't show up for some reason
        const parent = e.currentTarget;
        parent.style.position = 'relative';
        const clickForFullSizePic = document.createElement('a');
        
        // Get index of image number in URL string then replace
        // number with number-orig e.g. 1.jpg becomes 1-orig.jpg
        let num = imgUrl.search(/\/.\./);
        clickForFullSizePic.href = imgUrl.replace(imgUrl[num+1], `${imgUrl[num+1]}-orig`);

        clickForFullSizePic.className = 'full-size-icon';
        clickForFullSizePic.target = '_blank';
        clickForFullSizePic.style.width = `${e.currentTarget.clientWidth/3}px`;
        parent.appendChild(clickForFullSizePic);
                
        // Create icon and insert into anchor element created above
        const icon = document.createElement('img');
        icon.setAttribute('src', 'zoom.png');
        clickForFullSizePic.appendChild(icon);

        // Create anchor element linking to specific equipment article by
        // checking which equipment type corresponds to which square in the
        // equipment grid as defined by the file-map.json file
        const clickForMainArticle = document.createElement('a');
        let branchDir = extractBranchDir(window.location.pathname);
        let parsedMap = [];
        let squareArticlePairing = {};

        clickForMainArticle.className = 'equipment-article';
        clickForMainArticle.style.height = `${e.currentTarget.clientHeight/3}px`;
        clickForMainArticle.style.width = `${e.currentTarget.clientWidth}px`;
        // clickForMainArticle.href = imgUrl.replace(/(?<=\.)\w+$/, 'html');

        jsonMap.map(branches => {
            if (branches.branch == branchDir) parsedMap = branches.map;
        });
        parsedMap.map(pairing => {
            if (pairing.type == elemDir) squareArticlePairing = pairing.systems;
        });
        clickForMainArticle.href = imgUrl.replace(/(?<=\/)[.\w]+$/, 
                                            `${squareArticlePairing[squareNum]}.html`);
        clickForMainArticle.innerHTML = squareArticlePairing[squareNum];
        parent.appendChild(clickForMainArticle);
    }

    const removeOverlay = (e) => {
        document.querySelectorAll('.equipment-article').forEach(link => {
            link.parentElement.removeAttribute('style');
            link.remove();
        });
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
        
        fetch('file-map.json')
        .then(res => {
            if (res.ok) return res.json();
            throw Error("map fetch error");
        })
        .then(jsonData => {
            getMap(jsonData);
            console.log("here");
        })
        .catch(err => console.log(err))

        let branchDir = extractBranchDir(window.location.pathname)

        // Construct full image URL e.g. navy/DDG/1.jpg
        const imgUrlArray = [];
        let i = 0;
        for(i=0;i<3;i++) {
            imgUrlArray[i] = `${branchDir}/${elemDir}/${i+1}.jpg`;
        }

        urlIs(imgUrlArray);
        keepWaiting(false);
    }, []);

    return ( wait ? <div>Loading...</div>
    :
        <React.Fragment>
            <div className='root-grid' onClick={(e)=> displayInfo(e)}>{text}</div>
            <a onMouseLeave ={(e) => removeOverlay(e)} onMouseEnter={(e) => overlayLinks(e, url[0], 1)}>
                <img src={url[0]} className='grid-picture'/>
            </a>
            <a onMouseLeave ={(e) => removeOverlay(e)} onMouseEnter={(e) => overlayLinks(e, url[1], 2)}>
                <img src={url[1]} className='grid-picture'/>
            </a>
            <a onMouseLeave ={(e) => removeOverlay(e)} onMouseEnter={(e) => overlayLinks(e, url[2], 3)}>
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

