$(document).ready(function() {
    $('.postDown').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated fadeInDown',
        offset: 100
       });

    $('.postLeft').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated fadeInLeft',
        offset: 100
       });

    $('.postRight').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated fadeInRight',
        offset: 100
       });

    $('.postUp').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated fadeInUp',
        offset: 100
       });

    $('.postZoom').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated zoomIn',
        offset: 100
       });
    $('.postBounceDown').addClass("hiddenAn").viewportChecker({
        classToAdd: 'visibleAn animated bounceInDown',
        offset: 100
      });

    $('#sendmail').submit(function(e){
      //sendMail();
      var from_email = $(this).find('input[name="email"]').val();
      var subject = $(this).find('input[name="subject"]').val();
      var body = $(this).find('textarea[name="message"]').val();

      $(this).find('input[type="submit"]').button('loading');
      sendMail(from_email, subject, body);
      return false;

    });

      $('#sendmailB').submit(function(e){
      //sendMail();
      var table = $(this).find('table tbody tr');
      var data = {};
      
      var name = $(this).find('input[name="name"]').val();
      var from_email = $(this).find('input[name="email"]').val();
      var tel = $(this).find('input[name="tel"]').val();

      $(this).find('input[type="submit"]').button('loading');
      var body = "Nombre del solicitante: " + name + ", Tel.: " + tel + ", Data: "  + JSON.stringify(data);
      //sendMailB(from_email, "Formulario de Inscripcion", body);
      return false;

    });

});
function sendMail(from_email, subject, body){
 $.ajax({
  type: "POST",
  url: "http://emailservice481.azurewebsites.net/api/Values",
  headers: {"Access-Control-Allow-Origin": "*"},
  data: {
      'SenderEmail': from_email,
      'Subject': subject,
      'Source':'cabanasrd',
      'BodyText': body
  }
 }).done(function(response) {
   console.log(response);
   $('#myModal').modal('show');
   $('#sendmail').find('input[type="submit"]').hide();
   $('#myAlert').removeClass('hidden');
 });  
}

function sendMailB(from_email, subject, body){
 $.ajax({
  type: "POST",
  url: "http://emailservice481.azurewebsites.net/api/Values",
  headers: {"Access-Control-Allow-Origin": "*"},
  data: {
      'SenderEmail': from_email,
      'Subject': subject,
      'Source':'cabanasrd',
      'BodyText': body
  }
 }).done(function(response) {
   console.log(response);
   $('#myModal').modal('show');
   $('#sendmail').find('input[type="submit"]').hide();
   $('#myAlert').removeClass('hidden');
 });  
}