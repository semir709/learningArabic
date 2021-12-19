


function selectVal_category(e) {
    $("#category").attr('value', e.target.innerHTML);
}

function selectVal_grammar(e) {
    $("#grammar").attr('value', e.target.innerHTML);
}

function onFileSelected(event) {
    let selectedFile = event.target.files[0];
    let reader = new FileReader();
  
    let img = $('#image_word');
    img.attr('title', selectedFile.name);
  
    reader.onload = function(event) {
        img.attr('src', event.target.result);
        
    };

    reader.readAsDataURL(selectedFile);
  }

$('#img_holder').on('click', function(e) {
    document.getElementById('upload').click();
    
});

function clearInput() {

    $('#category').val("");
    $('#image_word').attr('src', "").attr('title', "");
    $('#grammar').val("");
    $('#grammar_meaning').val("");
    $('#bos_lang').val("");
    $('#eng_lang').val("");
    $("#page").val("");
    $('#arabic').val("");

}


$("#btn_save").click(function(e) {
    
    const category = $('#category');
    const arabic = $('#arabic');
    const grammar = $('#grammar');
    const grammar_meaning = $('#grammar_meaning');
    const bos_lang = $('#bos_lang');
    const eng_lang = $('#eng_lang');
    const page = $("#page");

    const data = {
        category: category.val(),
        grammar: grammar.val(),
        grammar_meaning: grammar_meaning.val(),
        bos_lang: bos_lang.val(),
        eng_lang: eng_lang.val(),
        page: page.val(),
        arabic: arabic.val()
    }


    $.ajax({
        type:"POST",
        url: "/admin/save",
        data: data, 
        success: function(data) {
            $('#msg').append(data);  
            clearInput();     
        }
    });

});

$('#btn_clear').click(function () {
    clearInput();
});



