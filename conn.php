<?php
	error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
     $conn=mysql_connect("localhost","root","admin") or die("���ݿ���������Ӵ���".mysql_error());
     mysql_select_db("dx_quizz",$conn) or die("���ݿ���ʴ���".mysql_error());
     
	 mysql_query("SET NAMES 'utf8'");
?>
