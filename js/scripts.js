$(document).ready(function(){

	var menuItem = $('#menu').find('a');
	menuItem.on('click', function(){
		$('#menu a').removeClass('background');
		$(this).addClass('background');
	});
	
});