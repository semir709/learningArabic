


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


$("#btn_save").click(function(e) {
    e.preventDefault();

    let form_img = document.getElementById('form_img');

    let form = new FormData(form_img);
    
    const category = $('#category');
    const image_word = $('#image_word');
    const grammar = $('#grammar');
    const grammar_meaning = $('#grammar_meaning');
    const bos_lang = $('#bos_lang');
    const eng_lang = $('#eng_lang');
    const page = $("#page");

    const nameImg = image_word.get(0).src;

    form.append('category', category.val());
    form.append('grammar', grammar.val());
    form.append('grammar_meaning', grammar_meaning.val());
    form.append('bos_lang', bos_lang.val());
    form.append('eng_lang', eng_lang.val());
    form.append('page', page.val());
    form.append('arabic', nameImg);


    $.ajax({
        type:"POST",
        url: "/admin/save",
        data: form, 
        contentType: false,
        processData: false,
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



