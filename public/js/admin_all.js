function resizeInput(e) {
    let input = e.target.id;
    let i = document.getElementById(input);

    i.style.width = (i.value.length + 3) + "ch";
}

function selectVal_category(e) {
    $("#category").attr('value', e.target.innerHTML);

    let category_name = {
        name: $("#category").val()
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
