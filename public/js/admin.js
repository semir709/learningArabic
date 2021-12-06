

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


$("#btn_save").click(function() {
    
    const category = $('#category');
    const image_word = $('#image_word');
    const grammar = $('#grammar');
    const grammar_meaning = $('#grammar_meaning');
    const bos_lang = $('#bos_lang');
    const eng_lang = $('#eng_lang');
    const page = $("#page");

    console.log(image_word.get(0).title);

    const nameImg = image_word.get(0).title;
    
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
            $('#msg').html(data);       
        }
    });

});

$('#btn_clear').click(function () {
    $('#category').val("");
    $('#image_word').attr('src', "").attr('title', "");
    $('#grammar').val("");
    $('#grammar_meaning').val("");
    $('#bos_lang').val("");
    $('#eng_lang').val("");
    $("#page").val("");
});



