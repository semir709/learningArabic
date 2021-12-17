

function rowIs(e) {
    let row = $(e.target);

   const data = {
       id: row.data('id'),
       english: $(row.find('p')[0]).text(),
       bosnian: $(row.find('p')[1]).text(),
       grammar: $(row.find('p')[2]).text(),
       grammar_m: $(row.find('p')[2]).data('meaning'),
       arabic:  $(row.find('div')[0]).data('arabic'),
       category: $("#category").val()
   }

   let input = $('#modal').find('input');
   $('#modal').attr('data-id',data.id);

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
   }

   let img =  $('#modal').find('img')[0];
   
   if( $(img).data('id') == 'arabic') {
    $(img).attr("src",data.arabic);
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

function reload_data(res, msg) {

    if(res) {
        $('#modal').modal('hide');

        const category_name = {};
        
        category_name.name = $("#category").val();

        $.ajax({
            type: 'GET',
            url: '/admin/allWords/getData',
            data: category_name,
            success: function(res) {
                
                $('#ss_col_data').html(res);
            }
        });
    }
    else {

        $("#ss_modal_err_msg").append(msg);
    }
}

$("#ss_delete_row").click(function() {
    const id = $('#modal').attr('data-id');

    $.ajax({
        type:'DELETE',
        url: '/admin/allWords/modal/delete',
        data: {id},
        success: function(res) {
            let msg = '<h3 style="color: red; font-size: 20px; font-weight: 200; margin-left: 24px">Data base is unabel to delete the data</h3>'
            reload_data(res, msg);
    
        }
    });
});

function findData(modal) {
    const input = modal.find('input');

    let form_img = document.getElementById('form_img');

    let form = new FormData(form_img);
    
    form.append('id', modal.attr('data-id'));

    for(let i = 0; i < input.length; i++) {

        let data_id = $(input[i]).data('id');
 
        if( data_id == 'category') {
             form.append('category',$(input[i]).val());

        }
 
        if( data_id == 'english') {
             form.append('english',$(input[i]).val());
         }
 
         if( data_id == 'bosnian') {
             form.append('bosnian',$(input[i]).val());
        }
 
        if( data_id == 'grammar') {
             form.append('grammar',$(input[i]).val());
         }
 
         if( data_id == 'grammar_m') {
             form.append('grammar_m',$(input[i]).val());
         }
    }

    return form;
}

$('#ss_update_row').click(function() {

    const data = findData($('#modal'));

    $("#category").val();


    $.ajax({
        type:'POST',
        url: '/admin/allWords/modal/update',
        data: data,
        processData: false,
        contentType: false,
        success: function(res) {
            const msg = '<h3 style="color: red; font-size: 20px; font-weight: 200; margin-left: 24px">Data base is unabel to update the data</h3>'
            reload_data(res, msg);

            let category = {};

            category.name = $("#category_input").val();
            category.id = $("#modal").attr('data-id');

            $.ajax({
                type: 'GET',
                url: '/admin/allWords/getCategory',
                data: category,
                success: function(res) {

                    $("#category").val(res.category_new);
                    reload_data(res, msg);
                    
                }
            });

            $.ajax({
                type: 'GET',
                url: '/admin/allWords/category_reload',
                success: function(res) {

                    $("#ss_drop_down").empty();

                    res.all_category.forEach(c => {

                        console.log(c._name);

                        let li = $("<li></li>").append($("<a></a>")
                        .addClass("dropdown-item")
                        .attr("onkeypress", "enterKey(event)")
                        .attr("onclick","selectVal_category(event)")
                        .text(c._name)
                        );

                        $("#ss_drop_down").append(li);

                    });
                    
                }
            });
            
            
        }
    });

    $("#upload").val("");

});