function resizeInput(e) {
    let input = e.target.id;
    let i = document.getElementById(input);

    i.style.width = (i.value.length + 3) + "ch";
}

function selectVal_category(e) {

    let category_name = {};

    if(!!e.target.innerHTML) {
        category_name.name = e.target.innerHTML;
        $("#category").val(e.target.innerHTML);

    } else {
        category_name.name = $("#category").val();
    } 
    

    $.ajax({
        type: 'GET',
        url: '/admin/allWords/getData',
        data: category_name,
        success: function(res) {
            $('#ss_col_data').html(res);
        }
    });
}

$(document).keypress(function(event){
    var keycode = event.keyCode;
    if(keycode == '13'){
        if($(event.target).data('id') == "main_input") {
            selectVal_category(event);
        }
    }
});


$("#ss_del_btn_category").click(function() {

    const name = $("#category").val();

    $.ajax({
        type: 'DELETE',
        url: '/admin/allWords/delete' + '?' + $.param({name: name}),
        success: function(res) {
            window.location.href = res;
            
        }
    });
    
});

$("#ss_delete_row").click(function() {
    const id = $('#input_english').attr('data-id');

    $.ajax({
        type:'DELETE',
        url: '/admin/allWords/modal/delete',
        data: {id},
        success: function(res) {

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
                
                const msg = '<h3 style="color: red; font-size: 20px; font-weight: 200; margin-left: 24px">Data base is unabel to delete the data</h3>';

                $("#ss_modal_err_msg").append(msg);
            }
        }
    });
});

