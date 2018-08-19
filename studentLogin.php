<?php  
/*
*用户登录，服务器进行的处理
*返回json 
*情况1：用户名或密码错误：返回back['status']=-1;
*情况2,成绩已存在：back['status']=1 back['grade']（成绩），back['name']（姓名） 
*情况3，还未完成答题：back['status']=2,back['name'](姓名)
*/	
	include("conn.php");
    session_start();
	$getid=$_POST['studentName'];//客户端post过来的用户名
	$getpwd=$_POST['studentPsw'];//客户端post过来的密码
    $sql=mysql_query("SELECT * FROM dx_party WHERE partyid ='$getid' AND password='$getpwd'"); 
	$stuInfo=mysql_fetch_assoc($sql);
	if(!empty($stuInfo)){
		//登陆成功
			
		//判断session是否存在
		//if($_SESSION['studentid']==""){
		$_SESSION['userid']=$getid;
		//echo "userid keep successed";
		//}
		$query=mysql_query("SELECT * FROM dx_results WHERE studentId='$getid'");
		$info=mysql_fetch_assoc($query);
		if(empty($info)){
			//如果不存在该记录，插入一条该记录，初始成绩-1
			mysql_query("INSERT INTO dx_results(studentId,r_grade)values('$getid','-1')");
		}
		$query=mysql_query("SELECT * FROM dx_results WHERE studentId='$getid'");
		$info=mysql_fetch_assoc($query);
		if($info['r_grade']>=0){//成绩已存在
			//$back['grade']=$info['r_grade'];
			$back['status']="1";
			//echo "<script language='javascript'>alert('您已经完成过考试！');window.location.href='quizquestionInfo.html';</script>";
		}else{//还未完成考试
			$back['userid']=$getid;
			$back['status']="2";
		}
		$back['name']=$stuInfo['username'];
		$_SESSION['name']=$stuInfo['username'];
		//$_SESSION['userid']=$getid;
		//echo "<script language='javascript'>alert('登陆成功！');window.location.href='quiz.html';</script>";
		echo(json_encode($back));
	}else{//用户名或密码错误
		$back['status']="-1";
		echo(json_encode($back));
	}
    mysql_close();  
?> 