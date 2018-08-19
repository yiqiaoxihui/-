<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
session_start();
//header("content-type:text/html;charset=gb2312");
if($_SESSION['userid']==""){
	echo "<script>alert('对不起，请通过正确途径进入系统!');window.location.href='index.html';</script>";
}
?>
