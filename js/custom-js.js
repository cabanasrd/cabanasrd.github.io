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

    $(".mycheck").bootstrapSwitch();

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
      var data = [];
      var tr = null;
      var dataJson = {};
      $.each(table, function( index, value ) {
  			tr = $(value).find('td');
  			dataJson.nombre = $(tr[0]).text(); //Nombre
  			dataJson.lat = $(tr[0]).data( "position" ).lat; //Latitud
  			dataJson.lng = $(tr[0]).data( "position" ).lng; //Longitud
  			dataJson.tipo = $(tr[1]).text(); //Tipo

  			if($(tr[2]).text() == "X"){ //Administracion
  				dataJson.servicioAdministracion = true;
  			}else{
  				dataJson.servicioAdministracion = false;
  			}

			if($(tr[3]).text() == "X"){ //Disponibilidad
				dataJson.servicioDisponibilidad = true;
  			}else{
  				dataJson.servicioDisponibilidad = false;
  			}
  			data.push(dataJson);
  			tr = null;
		});
      var name = $(this).find('input[name="name"]').val();
      var from_email = $(this).find('input[name="email"]').val();
      var tel = $(this).find('input[name="tel"]').val();

      $(this).find('input[type="submit"]').button('loading');
      var body = "Nombre del solicitante: " + name + ". \nTel.: " + tel + ", \nData: "  + JSON.stringify(data);
      sendMailB(from_email, "Formulario de Inscripcion", body);
      return false;

    });
	$('body').on('click', '.btnDeleteRow', function() {
	    var row = $(this);
		row.parent().parent().remove();
		row = null;
	});
	
	$("#addService").click(function(){
		openModalToAddService();
	});
	$("#addServiceButton").click(function(){
		addServiceToTable();
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
   $('#sendmailB').find('input[type="submit"]').hide();
   $('#myAlertB').removeClass('hidden');
 });  
}

function openModalToAddService(){
	$('#myModalB').modal('show');
}

function addServiceToTable(){
	var container = $('#myModalB');
	var nombre = container.find('input[name="nombre"]');
	var lat = container.find('#latText');
	var lng = container.find('#lngText');
	var tipo = container.find('select[name="tipo"]');
	var servicioDisp = container.find('input[name="disp"]');
	var servicioAdmin = container.find('input[name="adm"]');
	var buttonDelete = $("<button></button>").attr('type', 'button').addClass('btn btn-danger btn-sm btnDeleteRow').html('<i class="fi-minus"></i> Eliminar');
	var table = $("#sendmailB").find('table tbody');
	var tr = $("<tr></tr>");
	var td = $("<td></td>").text(nombre.val()).data( "position", { lat: lat.val(), lng: lng.val()  } );
	tr.append(td);
	td = $("<td></td>").text(tipo.val());
	tr.append(td);
	td = $("<td></td>").addClass("tdBool").text((servicioAdmin.is(":checked") ? "X" : ""));
	tr.append(td);
	td = $("<td></td>").addClass("tdBool").text((servicioDisp.is(":checked") ? "X" : ""));
	tr.append(td);
	td = $("<td></td>").addClass("tdBool").append(buttonDelete);
	tr.append(td);
	table.append(tr);

	//Clear all data
	nombre.val("");
	lat.val("");
	lng.val("");
	
}