$(document).ready(function() {

  $(document).ajaxError(function(event, request, settings, error) {
    var responseText = request.responseText;
    if (request.status === 401 || request.status === 500 || request.status === 404) {
      alert(error + " - " + responseText);
    }
  });

  Cookies.set("API_TOKEN", 'zJlb4YhlysROap2bhcZlawtt')

  $.ajaxSetup({
    headers : { 'Authorization' : 'Token ' + Cookies.get("API_TOKEN") }
  });

  bindAjaxForm();

});

function bindAjaxForm() {
  $('form').ajaxForm({
    error: function(html, status, xhr, this_form) {
      var errors = JSON.parse(html.responseText).errors;
      this_form.append(errorsHtml(errors));
      // alert(errorsHtml(errors));
    }
  });
};

function errorsHtml(errors) {
  return '<p><div class="alert alert-warning alert-dismissible"><button class="close" data-dismiss="alert"><span>&times;</span></button>' + errors.join('<br>') + '</div></p>'
};
