	
	/*
	|----------------------------
	| Lightbox Flickr
	|----------------------------
	*/

	// Abertura do Lightbox
	$(document).ready(function(){
		$('.lightbox-flickr').on('click', function(){
			var href = $(this).attr('href');
			var idNumber = parseInt($(this).data('id'));
			var numberPhotos = $('a.lightbox-flickr').size();
			var prev = 0;
			var next = 0;
			var width = 0;
			var height = 0;

			if(idNumber == numberPhotos)
			{
				next = 1;
			}
			else
			{
				next = idNumber + 1;
			}

			if(idNumber == 1)
			{
				prev = numberPhotos;
			}
			else
			{
				prev = idNumber - 1;
			}

			buildElements(prev, next);

			$('#light').html('<img id="photo-thumb" src="' + href + '">');

			var imagePreLoader = new Image();

			imagePreLoader.onload = function(){
				height = imagePreLoader.height + 30;
				width = imagePreLoader.width + 30;

				modelar(width, height);
			}

			imagePreLoader.src = href;

			$('#back-close').on('click', function(){
				$('#window').fadeOut(300, function(){
					$(this).remove();
				});
			});

			$('#window').hide();
			$('#window').fadeIn(300);

			buildEventNav();

			return false;
		});

		$(window).resize(function(){
			var width = $('#light').width();
			var height = $('#light').height() + 45;
			var margin_top = ($(window).height() - height) / 2;
			modelar(width, height);
		});

		$(document).on('keyup', function(e){
			if (e.keyCode == 27) {
				$('#window').fadeOut(200, function(){
					$(this).remove();
				});
			}
			else if (e.keyCode == 37) {
				buildPrev('#prev-photo');
			}
			else if (e.keyCode == 39) {
				buildNext('#next-photo');
			}

		});
	});

	//Remodela o tamanho do Lightbox quando muda a imagem
	function remodelar(w, h, margin_top)
	{
		$('#back-lightbox').animate(
			{
				width : w,
				height : h,
				marginTop : margin_top
			},
			600,
			"easeInOutQuint"
		);

		$('#nav-photos').animate(
			{
				marginLeft : (w - 220) / 2
			},
			600,
			"easeInOutQuint"
		);
	}

	//Modela o tamanho do Lightbox
	function modelar(width, height)
	{
		var margin_top = ($(window).height() - (height + 45)) / 2;

		$('#back-lightbox').css({
			'height' : height + 'px',
			'width' : width + 'px',
			'margin-top' : margin_top + 'px'
		});

		$('#nav-photos').css({
			'margin-left' : (width - 220) / 2 + 'px'
		});
	}

	//Cria os elementos do Lightbox
	function buildElements(prev, next)
	{
		$('<div>', {
			id : 'window',
			appendTo : 'body'
		});

		$('<div>', {
			id : 'back-close',
			appendTo : '#window'
		});

		$('<div>', {
			id : 'back-lightbox',
			appendTo : '#window'
		});

		$('<div>', {
			id : 'light',
			appendTo : '#back-lightbox'
		});

		$('<div>', {
			id : 'nav-photos',
			appendTo : '#back-lightbox'
		});

		$('<div>', {
			id : 'prev-photo',
			text : 'Anterior «',
			class : '#photo-flickr-' + prev,
			appendTo : '#nav-photos'
		});

		$('<div>', {
			id : 'next-photo',
			text : '» Próximo',
			class : '#photo-flickr-' + next,
			appendTo : '#nav-photos'
		});
	}

	// Cria os eventos de navegacao
	function buildEventNav()
	{
		$('#prev-photo').on('click', function(){
			buildPrev('#prev-photo');
		});

		$('#next-photo').on('click', function(){
			buildNext('#next-photo');
		});
	}

	// Cria o evento de navegacao para imagem anterior
	function buildPrev(idNav)
	{
		var id = $(idNav).attr('class');
		var numberPhotos = $('a.lightbox-flickr').size();
		var idNumber = parseInt($(id).data('id'));
		var next = 0;
		var prev = 0;
		var width = $('#light').width();
		var height = $('#light').height();

		var imagePreLoader = new Image();

		imagePreLoader.onload = function(){
			var m = ($(window).height() - (imagePreLoader.height + 45 + 30)) / 2;
			remodelar(imagePreLoader.width + 30, imagePreLoader.height + 45 + 30, m);
		}
		
		imagePreLoader.src = $(id).attr('href');

		$('#photo-thumb').fadeOut(300, function(){
			$(this).attr('src', $(id).attr('href'));
			$(this).fadeIn(300);
		});

		if(idNumber == numberPhotos)
		{
			next = 1;
		}
		else
		{
			next = idNumber + 1;
		}

		if(idNumber == 1)
		{
			prev = numberPhotos;
		}
		else
		{
			prev = idNumber - 1;
		}

		$('#prev-photo').attr('class', '#photo-flickr-' + prev);
		$('#next-photo').attr('class', '#photo-flickr-' + next);
	}

	// Cria o evento de navegacao para imagem posterior
	function buildNext(idNav)
	{
		var id = $(idNav).attr('class');
		var numberPhotos = $('a.lightbox-flickr').size();
		var idNumber = parseInt($(id).data('id'));
		var next = 0;
		var prev = 0;
		var width = $('#light').width();
		var height = $('#light').height();

		var imagePreLoader = new Image();

		imagePreLoader.onload = function(){
			var m = ($(window).height() - (imagePreLoader.height + 45 + 30)) / 2;
			remodelar(imagePreLoader.width + 30, imagePreLoader.height + 45 + 30, m);
		}
		
		imagePreLoader.src = $(id).attr('href');

		$('#photo-thumb').fadeOut(300, function(){
			$(this).attr('src', $(id).attr('href'));
			$(this).fadeIn(300);
		});


		if(idNumber == numberPhotos)
		{
			next = 1;
		}
		else
		{
			next = idNumber + 1;
		}

		if(idNumber == 1)
		{
			prev = numberPhotos;
		}
		else
		{
			prev = idNumber - 1;
		}

		$('#prev-photo').attr('class', '#photo-flickr-' + prev);
		$('#next-photo').attr('class', '#photo-flickr-' + next);
	}
