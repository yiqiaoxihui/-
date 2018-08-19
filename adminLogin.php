<?php  
/*
*用户登录，服务器进行的处理
*返回json 
*情况1：管理员或密码错误：返回back['status']=-1;
*情况2,成绩存在：back['status']=1
*情况3，没有一条记录：back['status']=-2
*/	
	include("conn.php");
    session_start();  
	$getid=$_POST['adminName'];//客户端post过来的用户名
	$getpwd=$_POST['adminPsw'];//客户端post过来的密码
	//$getid="18816311168";
	$inst=array();
	$allInfo=array();
 //    $sql=mysql_query("SELECT * FROM dx_student WHERE phoneNumber ='$getid' AND password='$getpwd' AND roleId IN(0,1)"); 
	// $admInfo=mysql_fetch_assoc($sql); !empty($admInfo)
	if($getid="dxroot" && $getpwd=="dxadmin"){
		$institute=mysql_query("SELECT insid,insname FROM dx_institute");
		$flag=mysql_num_rows($institute);//必须分开写
		if($flag>0){//有数据
			while($row = mysql_fetch_assoc($institute)){
				$inst[]=$row;
			}
		}
		$allInfo['status']=1;
		$allInfo['institute']=$inst;
		//var_dump($inst);
		echo json_encode($allInfo);
	}else{//用户名或密码错误
		$allInfo['status']=-1;
		echo(json_encode($allInfo));
	}
    mysql_close();  
?> 