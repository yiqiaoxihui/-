<?php  
/*
*学生完成答题，计算成绩。
*返回json:back {status :1,正常返回，status=-1，非法修改}
*/
	include("conn.php");
	$userid=$_POST['userid'];//答对题目数
	$institute=$_POST['institute'];
	$name=$_POST['username'];
	$back['status']=-1;
	$sql=mysql_query("select * from dx_party where partyid='$userid'");
	$result=mysql_fetch_assoc($sql);
	if(empty($result)){
		$rs=mysql_query("insert into dx_party(partyid,password,username,institute)value('$userid','$userid','$name','$institute')");
		if(mysql_affected_rows()>0){
			$back['status']=1;
		}
		echo json_encode($back);
	}else{
			echo json_encode($back);
	}
    mysql_close(); 
?> 