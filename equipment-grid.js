const {useState, useEffect} = React;

function GridModule({text, elemDir}) {
    const [out, popped] = useState(false);
    const [wait, keepWaiting] = useState(true);
    const [url, urlIs] = useState([]);
    // const [text, getText] = useState('');

    const displayInfo = (e) => {
        const grid = e.target.parentElement;
        if (!out) {
            grid.lastChild.style.display = 'block';
        } else {
            grid.lastChild.style.display = 'none';
        }
        popped(!out);
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
        // getText(domContainer.getAttribute('text'))
        urlIs(img);
        keepWaiting(false);
    }, []);

    return ( wait ? <div>Loading...</div> :
        <React.Fragment>
            <div className='root-grid' onClick={(e)=> displayInfo(e)}>{text}</div>
            <a><img src={url[0]} className='grid-picture'/></a>
            <a><img src={url[1]} className='grid-picture'/></a>
            <a><img src={url[2]} className='grid-picture third-pic'/></a>
            <a className='info-row'>e</a>
        </React.Fragment>
    );
}

const domContainers = document.querySelectorAll('.equipment-grid')
    .forEach(domContainer => {
        ReactDOM.render(<GridModule elemDir={domContainer.getAttribute('dir')} 
            text={domContainer.getAttribute('text')}/>, domContainer);
    })