<?php 
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
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
	echo "<script language='javascript'>alert('您已经完成过考试！');window.location.href='chengji.php';</script>";
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>两学一做知识竞赛答题系统</title>
    <link type="text/css" rel="stylesheet" href="./stylesheets/quizCSS.css">
    <!--<script src="./javascripts/timer.js"></script>-->
<style>
    div a{float:left; margin-left:18px;}
    .jrotate{
        width:80px;
        padding:0px;
    }
    .jrotate div{
        width:36px;
        height:36px;
        overflow:hidden;
        padding:0px;
        margin:0px;
        margin-right:2px;
        float:right;
    }
    .jrotate div div{
        text-align:center;
        background:#CCC;
        width:36px;
        height:36px;
        margin:0px;
        font-size:32px;
    }
    .time{
        font-size:24px;

    }
</style>
</head>
<body>
    <div class="main-header" ></div>
    <div class="main-div" id="start">
        <span id="start-title">两学一做知识竞赛答题系统</span><br>
        <span hidden="hidden" id="userid"><?php echo $_SESSION['userid'];?></span>
        <span id="start-message"><?php echo $_SESSION['name'];?>,欢迎您!<!-- 上次作答到<?php echo $_SESSION['currentNum'];?>题 --></span><br>
        <button type="button" class="beginbtn" id="start-btn-start" onclick="onStartQuizBtnClickCB()">开始答题</button>
    </div>
    <div>
    <div style="text-align:center;">
        <div class="not-start" style="display: none;">
            <h1>考试还未开始</h1>
        </div>
        <div class="show-daojishi" style="display: none;">
            <!-- <h1>考试结束倒计时</h1> -->
        </div>
        <div class="show-end" style="display: none;">
            <h1>考试已经结束</h1>
        </div>
            <h1 time></h1>
            <div style="padding-left:36%;" id="myjrotate" style="display: none;">
                <a>
                    <div day>
                    </div>
                    <div class="time">
                        days
                    </div>
                </a>
                <a>
                    <div hour>
                    </div>
                    <div class="time">
                        hours
                    </div>
                </a>
                <a>
                    <div minute>
                    </div>
                    <div class="time">
                        minutes
                    </div>
                </a>
                <a>
                    <div second>
                    </div>
                    <div class="time">
                        seconds
                    </div>
                </a>
                <div style="clear:both"></div>
            </div>
    </div>
    <form action="#" class="show-daojishi">
        <div class="main-div" id="quiz-main">
            <p class="quiz-progress">进度：0/50</p>
            <span id="q_id" style="display:none"></span>
            <span class="quiz-title">无题目</span><br>
            <ul class="quiz-options" id="quiz-options">
                <li><div>A.无选项</div></li>
                <li><div>B.无选项</div></li>
                <li><div>C.无选项</div></li>
                <li><div>D.无选项</div></li>
            </ul>
            <button type="button" class="btn" id="main-submit" onclick="commitAnwserBtnClickCB()">提交答案</button>
            
            <div class="resolution">
                <span id="user_result"></span><br>
                <span >解析：</span>
                <span id="resolution-content">
                    无解析
                </span>
            </div>
            <button type="button" class="btn" id="next-question" onclick="nextQuestion()">下一题</button>
             <button type="button" class="btn" id="submit-quizz" onclick="submitQuestion()">完成</button>
        </div>
    </form>
    </div>
</body>
</html>
<script src="./javascripts/jquery.js" type="text/javascript"></script>
<script src="./javascripts/quizJS.js"></script>
