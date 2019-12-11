document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var selects = document.querySelectorAll('select');
    M.Modal.init(modals, {});
    M.Sidenav.init(sidenav, {});
    M.FormSelect.init(selects, {});
});

function agregarProducto(ev) {
    ev.preventDefault();
    var payload = {
        nombre_producto: $("input[name='nombre']").val(),
        descripcion: $("textarea[name='descripcion']").val(),
        precio: $("input[name='precio']").val(),
        tipo: $("select[name='tipo']").val(),
        estatus: true
    };

    $.ajax({
        url: "/agregarPlatillo",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(result) {
            console.log(result);
        },
        error: function(error) {
            console.log(error)
        }
    });
}