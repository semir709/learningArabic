
$("#btn_save").click(function() {
    
    const category = $('#category');
    const image_word = $('#image_word');
    const grammar = $('#grammar');
    const grammar_meaning = $('#grammar_meaning');
    const bos_lang = $('#bos_lang');
    const eng_lang = $('#eng_lang');
    const page = $("#page");

    const nameImg = image_word.get(0).data.split('img/')[1].trim();
    
    const data = {
        category: category.val(),
        grammar: grammar.val(),
        grammar_meaning:grammar_meaning.val(),
        bos_lang: bos_lang.val(),
        eng_lang: eng_lang.val(),
        page: page.val(),
        arabic: nameImg
    }

    $.ajax({
        type:"POST",
        url: "/admin/save",
        data: data, 
        success: function(data) {
            console.log(data);
        }
    });

});

