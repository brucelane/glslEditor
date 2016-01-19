export function saveOnServer (ge, callback) {
    let content = ge.getContent();
    let name = ge.getAuthor();
    let title = ge.getTitle();

    if (name !== '' && title !== '') {
        name += '-' + title; 
    }

    // STORE A COPY on SERVER
    let url = 'http://thebookofshaders.com:8080/';
    let data = new FormData();
    data.append('code', content);

    let dataURL = ge.sandbox.canvasDOM.toDataURL("image/png");
    let blobBin = atob(dataURL.split(',')[1]);
    let array = [];
    for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    let file = new Blob([new Uint8Array(array)], {type: 'image/png'});
    data.append("image", file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url+'save', true);
    xhr.onload = (event) => {
        console.log(event);
        console.log(xhr);
        if (typeof callback === 'function') {
            callback({  content: content,
                        name: name,
                        url: url, 
                        path: this.responseText
                    });
        }
        console.log('Save on ' + url + this.responseText);
    };
    xhr.send(data);
}