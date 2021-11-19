function findDate() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
}

function fillJsFile() {
    let js = `<script src="js/script.js?v=${findDate()}"></script>`
    $("#scripts").append(js);
}

fillJsFile();