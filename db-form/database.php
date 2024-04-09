
<?php
$host        = "postgres://hospitality_minds_user:UgpLfXCRNSwC8UhuR5fA8GtEVUSeZkDV@dpg-cn6us0qcn0vc73dmov4g-a.singapore-postgres.render.com/hospitality_minds";
   $port        = "5432";
   $dbname      = "";
   $credentials = "user = postgres password=pass123";
   $db = pg_connect( "$host $port $dbname $credentials");
?>