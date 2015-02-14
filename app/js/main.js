function detectDevice(){
		var isMobile = {
	    Android: function() {
	        //return navigator.userAgent.match(/Android/i);
	        return false;
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	    }
	};

	if(!isMobile.any()) {
   		window.location = "no-mobile.html";
	}
}

