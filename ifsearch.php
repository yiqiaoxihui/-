<?php  
	include("conn.php");
    session_start();  
	$institute=$_POST['institute'];//客户端post过来的用户名
	$sort=$_POST['sort'];//客户端post过来的密码
	//$institute=1;
	$allInfo=array();
	$content=array();
	// $undo=0;
	// $fail=0;
	// $excellent=0;
	if($institute==0){
		$result=mysql_query(
			"SELECT username,partyid,insname,r_grade 
			FROM dx_party 
			LEFT JOIN dx_institute
			ON dx_institute.insid=dx_party.institute
			LEFT JOIN dx_results 
			ON dx_results.studentId=dx_party.partyid"
		);
	}else{
		$result=mysql_query(
			"SELECT username,partyid,insname,r_grade 
			FROM dx_party 
			LEFT JOIN dx_institute
			ON dx_institute.insid=dx_party.institute
			LEFT JOIN dx_results 
			ON dx_results.studentId=dx_party.partyid
			WHERE dx_party.institute='$institute'"
		);
	}

	$flag=mysql_num_rows($result);
	//echo $flag;
	if($flag>0){//有数据
		while($row = mysql_fetch_assoc($result)){
			// //echo $row;
			// if($row['r_grade']==-1||$row['r_grade']==null){
			// 	$undo++;//未完成数目
			// }
			// else if($row['r_grade']>=0 && $row['r_grade']<60){
			// 	$fail++;
			// }
			// else if($row['r_grade']>=90){
			// 	$excellent++;
			// }
			$content[]=$row;
		}
		//排序

		// usort($content, function($a, $b) {
  //           $al = $a['r_grade'];
  //           $bl = $b['r_grade'];
  //           if ($al == $bl)
  //               return 0;
  //           return ($al > $bl) ? -1 : 1;
  //       });
		$allInfo['content']=$content;
		$allInfo['status']=1;
		// $allInfo['undo']=$undo;
		// $allInfo['fail']=$fail;
		// $allInfo['excellent']=$excellent;
	}else{
		$allInfo['status']=2;//没有数据
	}

	echo(json_encode($allInfo));
    mysql_close();  
?> 