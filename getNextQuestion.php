<?php  
/*
*指向下一个题目
*/	
	include("conn.php");
	session_start();
	$question=array();
	$questionId=$_POST['questionId'];
	$sql=mysql_query("select * from dx_questions where q_id='$questionId'");
	$flag=mysql_num_rows($sql);
	if($flag>0){
		$result=mysql_fetch_assoc($sql);
		$question['q_content']=$result['q_content'];
		$question['q_answer']=$result['q_answer'];
		$question['q_id']=$result['q_id'];
		$question['correct']=$result['q_cor_answer'];
		$question['currentNum']=$currentNum+1;
		$question['status']=1;
	}else{
		$question['status']=-1;
	}

	echo json_encode($question);


?> 