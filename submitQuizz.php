<?php  
/*
*学生完成答题，计算成绩。
*返回json:back {status :1,正常返回，status=-1，非法修改}
*/
	include("conn.php");
	session_start();
	$correctNum=$_POST['correctNum'];//答对题目数
	//var_dump($correctNum);
	$userid=$_SESSION['userid'];
	$sql=mysql_query("select r_grade from dx_results where studentId='$userid'");
	$result=mysql_fetch_assoc($sql);
	if($result['r_grade']>=0){
		//never be happened;
		$back['status']=-1;
		//$back['info']="have existed!illegal modify grade!";
		//$grade=$result['r_grade'];
		echo json_encode($back);
	}else{
		$grade=$correctNum*2;//two point per question
		//var_dump($grade);
		$rs=mysql_query("update dx_results set r_grade='$grade' where studentId='$userid'");
		if(mysql_affected_rows()>0){
			//清除缓存文件
			//unlink($filepath);
			$back['status']=1;

			//$back['info']="grade update successful!";
			$back['grade']=$grade;
			echo json_encode($back);

		}
	}
    mysql_close(); 
?> 