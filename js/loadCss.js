function findDate() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    return `${year}-${month}-${day}`
}

function fillCssFile() {
    let css = `<link rel="stylesheet" href="css/style.css?v=${findDate()}"></link>`
    $("head").append(css);
}

fillCssFile();