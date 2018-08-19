<?php  
/*
*登陆后获取一题
*/	
	include("conn.php");
	session_start();
	$filepath=$_SESSION['filepath'];
	$studentinfo=unserialize(file_get_contents($filepath));
	$currentNum=$studentinfo['currentNum'];//登陆初，初始化一题
	//$studentinfo['currentNum']=$currentNum;

	if($currentNum==50){/*已经完成所有题目*/
		echo $question['status']=-1;
	}else{

		//当前题目已经提交,,但不是最后一题，则直接进入下一题
		if($studentinfo['studentAnswer'][$currentNum]!="" && $studentinfo['completed']!=1){
			$currentNum=$currentNum+1;
			$studentinfo['currentNum']=$currentNum;
			$fp=fopen($filepath,"w");
			$data=serialize($studentinfo);
			fwrite($fp,$data);
			fclose($fp);
		}
		$currentId=$studentinfo['questionsId'][$currentNum];
		$sql=mysql_query("select * from dx_questions where q_id='$currentId'");
		$result=mysql_fetch_assoc($sql);
		$question['q_content']=$result['q_content'];
		$question['q_answer']=$result['q_answer'];
		$question['q_id']=$result['q_id'];
		$question['currentNum']=$currentNum+1;
		$question['status']=1;
		$question['completed']=$studentinfo['completed'];
		echo json_encode($question);
		
	}

?> 