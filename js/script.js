let url_api;

// Função para trocar ambiente da api
function changeAmbient(ambient) {
    const url_api_test = "http://localhost:4800";
    const url_api_production = "https://138.197.96.115:4800";
    switch (ambient) {
        case 0: 
            url_api = url_api_test;
            break;
        case 1:
            url_api = url_api_production;
            break;
    }
}

// FUNÇÃO PARA TROCAR O AMBIENTE DA APLICAÇÃO
//
// Primeiro parâmetro será 0 ou 1, sendo que:
// 0 - Ambiente de teste
// 1 - Ambiente de produção
// 
// ==============================
   changeAmbient(1);
// ==============================

function toggleBackground() {
    if ($("body").hasClass("background-1")) {
        $("body").removeClass("background-1");
        $("body").addClass("background-2");
    } else if ($("body").hasClass("background-2")) {
        $("body").removeClass("background-2");
        $("body").addClass("background-3");
    } else if ($("body").hasClass("background-3")) {
        $("body").removeClass("background-3");
        $("body").addClass("background-1");
    }
}

function countCharacters(source, target, response) { //Função conta os caracteres do campo de descrição de OS e retorna para a tela.
    let characters = $(source).val();
    let stringLength = characters.length;
    if(stringLength > 2000) {
        $(target).addClass("error");
        $(response).addClass("error");
        $(response).html("Máximo de caracteres atingidos!");
        $(response).show();
    } else {
        $(target).removeClass("error");
        $(response).removeClass("error");
        $(response).html("");
        $(response).hide();
    }
    $(target).html(`${characters.length} / 2000 caracteres.`);
}

if ($(document).length) {
    setInterval(toggleBackground, 10000);
}

if ($(".contact-page").length) { // Funções que serão ativadas quando a página de contato carregar.

    countCharacters("#message", ".characters-counter", ".response"); //Se inicia a contagem dos caracteres do campo de mensagem.

    $("#message").on("keypress", () => { //Faz a contagem dos caracteres do campo de mensagem sempre quando pressiona alguma tecla.
        countCharacters("#message", ".characters-counter", ".response");
        $("#message").on("keyup", () => { //Faz a contagem dos caracteres do campo de mensagem sempre quando pressiona alguma tecla.
            countCharacters("#message", ".characters-counter", ".response");
        });
    });

    $("#contact-form").on("submit", e => {
        e.preventDefault();

        $("#send-form").find("span").html("");
        $("#contact-form").find(".loading").show();
        
        let data = $("#contact-form").serializeArray().reduce(function (obj, item) { //Pega todos os dados do formulário e coloca em um objeto
            obj[item.name] = item.value;
            return obj;
        }, {});

        $(".form-input").attr("disabled", true);
        $("#contact-form").find('.response').hide();
        $("#send-form:hover").css("background", "#000");
        $.ajax({
            url: url_api + "/contact",
            type: "POST",
            data: data,
            success: (res) => { //Se enviar a mensagem, a resposta no formulário é exibida.
                $(".response").html(res.message);
                if (res.message == "Falha no envio do email!") {
                    $(".response").addClass("error");
                } else {
                    $(".response").addClass("success");
                }
                $(".response").show();
                setTimeout(() => {
                    $(".response").hide();
                }, 5000);
            },
            error: (xhr) => {
                let error;
                if (xhr.responseJSON != undefined) {
                    error = xhr.responseJSON.mensagem;
                } else {
                    error = "Erro";
                }
                $("#contact-form").find('.response').html(error);
                $("#contact-form").find('.response').addClass("error");
                $("#contact-form").find('.response').show();
                $("#contact-form").find(".loading").hide();
                setTimeout(() => {
                    $(".response").hide();
                }, 5000);
            },
            complete: () => {
                $(".form-input").attr("disabled", false);
                $(".form-input").val("");
                $("#contact-form").find(".loading").hide();
                $("#send-form span").html("enviar");
                $(".characters-counter").html("0 / 2000 caracteres.");
            }
        });
    })
}

$("html, body").scroll(() => { // Mostra o botão de voltar ao topo se usuário tiver dado scroll na página
    let scroll = $("body").scrollTop();
    if (scroll > 150) {
        $("#topo").css("opacity", 1);
    } else {
        $("#topo").css("opacity", 0);
    }
});

$("#topo").on("click", () => { // Botão de voltar ao topo.
    $("body").animate({ scrollTop: 0 }, "fast");
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








