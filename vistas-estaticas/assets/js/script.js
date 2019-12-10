document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var selects = document.querySelectorAll('select');
    M.Modal.init(modals, {});
    M.Sidenav.init(sidenav, {});
    M.FormSelect.init(selects, {});
});