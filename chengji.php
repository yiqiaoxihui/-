<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
session_start();
//header("content-type:text/html;charset=gb2312");
// if($_SESSION['userid']==""){
// 	echo "<script>alert('对不起，请通过正确途径进入系统!');window.location.href='index.html';</script>";
// }
include("check_login.php");
include("conn.php");
$getid=$_SESSION['userid'];
$query=mysql_query("SELECT * FROM dx_results WHERE studentId='$getid'");
$info=mysql_fetch_assoc($query);
if($info['r_grade']>=0){//成绩已存在
	$back['grade']=$info['r_grade'];
	//$back['status']="1";
	//echo "<script language='javascript'>alert('您已经完成过考试！');window.location.href='quizquestionInfo.html';</script>";
}else if($info['r_grade']==-1){
	echo "<script language='javascript'>alert('您还没有完成答题');window.location.href='quiz.php';</script>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>成绩</title>
 <link type="text/css" rel="stylesheet" href="stylesheets/grade.css">
</head>
<body>
<div id="display">
    <div id="display_title"><?php echo $_SESSION['name'];?>同志,您的成绩是：<?php echo $info['r_grade'];?>分</div>
        <!-- <li id="display_li"></li> -->
</div>
<form method="get" action="logout.php">
<div id="back">
    <input type="submit" id="submit" value="退出" name="back"/>
</div>
</form>
</body>
</html>