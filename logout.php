<?php  
/*
*退出
*/
	//include("conn.php");
	session_start();
	session_unset();
	session_destroy();
	echo "<script>window.location.href='index.html';</script>";
?> 