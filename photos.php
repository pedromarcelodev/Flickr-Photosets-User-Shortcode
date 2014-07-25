<?php


function flickr_photos($atts)
{
	$plugin_url = plugin_dir_url( __FILE__ );

	$parameters = shortcode_atts(
		array(
			'photoset_id' => '',
			'per_page' => '12',
			'page' => '1'
		),
		$atts
	);

	$flickr = new Flickr('435adfc6694a87ec61bc2ae12d4fbe60');

	$photos = $flickr->photosets_getPhotos($parameters);

	$i = 1;
	$countPhotos = count($photos['photoset']);

	$content = '';

	$content .= '<link rel="stylesheet" type="text/css" href="' . $plugin_url . 'css/flickr.min.css">';
	//$content .= '<script type="text/javascript" src="' . $plugin_url . 'js/jquery-2.0.3.min.js"></script>';

	$content .= '<a class="back-albuns" href="' . get_permalink() . '">Voltar para álbuns</a>';
	$content .= '<div class="photos">';

	foreach ($photos['photoset'] as $photo) :
		if ($i % 3 == 1) :
			$content .= '<div class="row">';
		endif;

		$content .= '<div class="cell">';
		$content .= '	<div class="photo">';
		$content .= '		<a href="' . $photo['thumbs']['z'] . '" id="photo-flickr-' . $i . '" data-id="' . $i . '" class="lightbox-flickr">';
		$content .= '			<img src="' . $photo['thumbs']['m'] . '">';
		$content .= '		</a>';
		$content .= '	</div>';
		$content .= '</div>';

		if ($i % 3 == 0) :
			$content .= '</div>';
		elseif ($i == $countPhotos) :
			$content .= '</div>';
		endif;

		$i++;
	endforeach;

	$content .= '</div>';
	$content .= '<div style="clear: both; height: 10px;"></div>';
	
	if (intval($photos['pages']) != 1)
	{
		$content .= paginationFlickr(intval($photos['pages']), intval($parameters['page']));
	}
	
	$content .= '<script type="text/javascript" src="' . $plugin_url . 'js/flickr.min.js"></script>';
	$content .= '<script type="text/javascript" src="' . $plugin_url . 'js/jquery-ui.min.js"></script>';

	return $content;
}