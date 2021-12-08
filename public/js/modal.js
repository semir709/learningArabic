function rowIs(e) {
    let row = $(e.target);

   const data = {
       english: $(row.find('p')[0]).text(),
       bosnian: $(row.find('p')[1]).text(),
       grammar: $(row.find('p')[2]).text(),
       grammar_m: $(row.find('p')[2]).data('meaning'),
       arabic:  $(row.find('div')[0]).data('arabic'),
       category: $("#category").val()
   }

   let input = $('#modal').find('input');

   for(let i = 0; i < input.length; i++) {

       let data_id = $(input[i]).data('id');

       if( data_id == 'category') {
            $(input[i]).val(data.category);
       }

       if( data_id == 'english') {
            $(input[i]).val(data.english);
        }

        if( data_id == 'bosnian') {
            $(input[i]).val(data.bosnian);
       }

       if( data_id == 'grammar') {
            $(input[i]).val(data.grammar);
        }

        if( data_id == 'grammar_m') {
            $(input[i]).val(data.grammar_m);
        }

        //loading img in the modal.ejs
        // if( data_id == 'grammar') {
        //     $(input[i]).val(data.grammar);
        // }
   }

   $('#modal').modal('show');

  
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