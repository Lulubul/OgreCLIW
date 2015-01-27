<?php

$directories = scandir('images/vectors');
foreach ($directories as $dir){ 
	if (! ($dir == "." || $dir == "..")){
		echo '<img class="loaded_images" src="images/vectors/'. $dir .'"/>';
	}
}

?>