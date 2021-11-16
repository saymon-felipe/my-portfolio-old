$("html, body").scroll(() => { // Mostra o botão de voltar ao topo se usuário tiver dado scroll na página
    let scroll = $("body").scrollTop();
    if (scroll > 150) {
        $("#topo").css("opacity", 1);
    } else {
        $("#topo").css("opacity", 0);
    }
});

$("#topo").on("click", () => { // Botão de voltar ao topo.
    $("body").animate({ scrollTop: 0 });
});

let previewItems = $(".preview-item"),
    classAnimate = "animation-item",
    offset = window.innerHeight * 3/4;

function animeScroll() {
    let documentTop = $("body").scrollTop();
    for (let item = 0; item < previewItems.length; item++) {
        let offsetItem = $(previewItems[item])[0].offsetTop;
        if (documentTop > offsetItem - offset) {
            $(previewItems[item]).addClass("animation-item");
        } else {
            $(previewItems[item]).removeClass("animation-item");
        }
    }
}

animeScroll();

if(previewItems.length) {
    $("body").on('scroll', () => {
      animeScroll();
    });
}






