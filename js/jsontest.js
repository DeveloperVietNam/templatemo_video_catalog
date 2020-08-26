function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function liCategory(id, name) {
    var ul = document.getElementById("categories");
    var active = ""
    if (id == 1) {
        active = "active"
    }
    var html = '<li class="nav-item tm-category-item"><a href="' + id +'" class="nav-link tm-category-link '+ active +'">' + name + '</a></li>'

    ul.appendChild(htmlToElement(html));
}

function video(element) {
    var ul = document.getElementById("videos");
    var html = '<div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">'
                    + '<div class="position-relative tm-thumbnail-container">'
                    +   '<img src="'+ element['img'] +'" alt="Image" class="img-fluid tm-catalog-item-img">'
                    +    '<a href="video-page.html?video='+ element["id"] +'" class="position-absolute tm-img-overlay">'
                    +        '<i class="fas fa-play tm-overlay-icon"></i>'
                    +    '</a>'
                    + '</div>'  
                    + '<div class="p-4 tm-bg-gray tm-catalog-item-description">'
                    +     '<h3 class="tm-text-primary mb-3 tm-catalog-item-title">' + element['nameVideo'] + '</h3>'
                    +    '<p class="tm-catalog-item-text"> ' + element['nameVideo'] + '<br />'
                    +        '<span class="tm-text-secondary">Video hướng dẫn sử dụng quản lí công việc</span>'
                    +        'Do đội LIS hướng dẫn</p>'
                    + '</div>'
                +'</div>'

    ul.appendChild(htmlToElement(html));
}


$(document).ready(function () {
    readTextFile("data/categories.json", function(text){
        var array = JSON.parse(text);
        array.forEach(element => {
            liCategory(element['id'], element['name'])
            console.log(element)
        });
    });

    readTextFile("data/videos.json", function(text){
        var array = JSON.parse(text);
        array.forEach(element => {
            video(element)
        });
    });
})