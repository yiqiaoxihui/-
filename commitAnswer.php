<?php  
/*
*异步提交，
*输入：	1.	q_id :int 
*2.	studentAnswer : int
*返回	1.	json数据
*{“parser”:”解析内容”，”corAnswer”:”正确答案”,status：1 正常提交；2 重复提交}
*/
	include("conn.php");
	session_start();
	$q_id=$_POST['questionId'];
	$studentAnswer=$_POST['commitAnswer'];//客户端post过来的答案
	$correct=0;
	//$_SESSION['currentNum']=$currentNum+1;//记录当前答题进度，刷新页面时能动态改变
	$sql=mysql_query("SELECT * FROM dx_questions WHERE q_id='$q_id'");
	$sigleQuestion=mysql_fetch_assoc($sql);
	if(!empty($sigleQuestion)){
		if($sigleQuestion['q_cor_answer']==$studentAnswer){
			$correct=1;
		}
		$qresult['status']=1;
		$qresult['correct']=$correct;
		$qresult['correntNum']=$studentinfo['right'];
		$qresult['parser']=$sigleQuestion['q_parser'];
		$qresult['corAnswer']=$sigleQuestion['q_cor_answer'];
		echo json_encode($qresult);
	}else{
		//never be happened
		$qresult['status']=-1;
		echo json_encode($qresult);
	}

    mysql_close(); 
?> 