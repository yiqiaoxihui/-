//var base_path = 'http://localhost:8088/dk/dkczb/';


// *******************************************Begin of timer******************************************************
    function Jrotate(cfg){
        cfg = $.extend({},Jrotate.defaults,cfg);
        this.init(cfg);
    }
    // fn 其实就是 JavaScript 中 propotype 的一个别名 $ 是 jQuery 的别名
    $.fn.Jrotate = function(){
        return new Jrotate({renderTo:this[0]});//注意这里返回的不是JQ对象
    }
    Jrotate.prototype = {
        init:function(cfg){
            this.cfg = cfg;
            if(!cfg.renderTo) return ;
            cfg.renderTo = $(cfg.renderTo);
            if(cfg.renderTo[0].isJrotate)return;
            cfg.renderTo[0].isJrotate = true;
            if(cfg.class){
                cfg.renderTo.addClass(cfg.class);
            }
            cfg.showNumber = cfg.showNumber || 0 ;
            cfg.showNumber += '';
            this.makeDefaultList(Math.max(cfg.startLength,cfg.showNumber.length),cfg.startNumber);
            this.setNumber(cfg.showNumber);
        },
        makeDefaultList:function(len,num){
            if(len < 1)return ;
            var cfg = this.cfg;
            num = num || 0;
            num += '';
            while(num.length < len){
                num = '0' + num;
            }
            var cfg = this.cfg;
            for(var i = 0 ; i < len ; i++){
                if( cfg.renderTo.children('div').length>=cfg.maxLength)return;
                cfg.renderTo.prepend(this.makeList(num.charAt(i)));
            }
        },
        setNumber:function(num){
            //console.log(num);
            if(num == this.lastNumber)return;
            if(isNaN(num))return;
            var cfg = this.cfg;
            num += '';
            var length = num.length;
            var len = cfg.renderTo.children('div').length;
            this.makeDefaultList(Math.max(cfg.startLength,length) - len);
            length = Math.max(length,len,cfg.startLength);
            while(num.length < length){
                num = '0' + num;
            }
            var _this = this;
            cfg.renderTo.children('div').each(function(index){
                index = length - index - 1;
                var char = num.charAt(index);
                if(this.showIndex == char) return;
                var obj = {ele:this,index:index};
                setTimeout(function(){_this.gotoIndex(obj.ele,char,1)},5);
            });
            this.lastNumber = num;
        },
        gotoIndex:function(ele,index,sts){
            ele = $(ele);
            var h = ele.children('div:first').height();
            var cfg = this.cfg;
            ele[0].showIndex = index;
            ele.animate({
                scrollTop  : index * h
            } , sts && cfg.speed);
        },
        makeList:function(num){
            num = num || 0;
            var _this = this;
            var ul = $("<div>");
            for(var i = 0 ; i < 10 ; i++){
                var li = $('<div>');
                ul.append(li.html(i));
            }
            setTimeout(function(){_this.gotoIndex(ul,num,0)},2);
            return ul;
        }
    }
    Jrotate.defaults = {
        renderTo: '#div',//显示效果的对象
        startNumber: 0,
        showNumber: 0,
        maxLength : 2,
        startLength : 2,
        class: 'jrotate',//样式
        speed: 500 //动画速度
    };
    // var date = new Date();
    // var seperator1 = "-";
    // var seperator2 = ":";
    // var month = date.getMonth() + 1;
    // var strDate = date.getDate();
    // console.log(strDate);

    //*****************************************************

    var beginTimeName;
    var overTimeName;
    var startSeconds;//开始秒数
    var overSeconds;//结束秒数
    function setMyTimerCookie(userid){
        var formulateStartTime;//格式化的开始时间
        //var formulateOverTime;//格式化的结束时间
        beginTimeName=userid+"beginTime";
        overTimeName=userid+"overTime";
        var findBeginTime=beginTimeName+"=";
        beginTime=document.cookie.indexOf(findBeginTime);
        if(beginTime == -1){
            var hours=3600000;//一个小时3600000
            var startTime=new Date();
            startSeconds=startTime.getTime();
            overSeconds=startSeconds+hours;

            formulateStartTime=getNowFormatDate(startTime);

            SetCookie(beginTimeName,startSeconds);
            var getTime=getCookie(beginTimeName);
            //alert(nowTime);
            console.log("*******setMyTimerCookie********setCookie************");
            console.log(getTime);
            // $("#login_form").show(); 
            // $("#logined").hide(); 
            console.log("*******setMyTimerCookie*******set startSeconds（formulateStartTime）**************");
            console.log(formulateStartTime);
            console.log(startSeconds);
            // var beginTimeSec=nowTime.getTime();//开始时间秒数
            // var overTime=nowTime.getTime()+ hours; //时间差的毫秒数
            // var testOverDate=AddHours(startTime, 1);//加一个小时的函数
            // var testOverTime=getNowFormatDate(testOverDate);
            // console.log("***********testOverDate******************");
            // console.log(testOverTime);
            console.log("*******setMyTimerCookie*******set overSeconds**************");
            SetCookie(overTimeName,overSeconds);
            // formulateOverTime=testOverTime;
            // var overTime=new Date(formulateStartTime).getTime()+ hours;

            // formulateOverTime=getNowFormatDate(new Date(overTime));
            // console.log("********setMyTimerCookie*******set formulateOverTime**************");
            // console.log(formulateOverTime);
        } 
        else{
            startSeconds=Number(getCookie(beginTimeName));
            console.log("******setMyTimerCookie**********exist Cookie*******");
            console.log("******setMyTimerCookie*********get formulateNowTime**************");
            console.log(startSeconds);
            // console.log("******setMyTimerCookie**********getCookie*******");
            // console.log(formulateStartTime);
            //alert("存在cookies");
            // $("#login_form").hide(); 
            // $("#logined").show(); 
            // $("#ustr").html(a); 

            // hours=3600000;//一个小时3600000
            // // var beginTimeSec=nowTime.getTime();//开始时间秒数
            // // var overTime=nowTime.getTime()+ hours; //时间差的毫秒数
            // var overTime=new Date(formulateStartTime).getTime()+ hours;
            overSeconds=Number(getCookie(overTimeName));
            console.log("*******setMyTimerCookie********get formulateOverTime**************");
            console.log(overSeconds);
        } 
    }
    function AddHours(date, value) {
        date.setHours(date.getHours() + value);
        return date;
    }
    var days = $('[day]').Jrotate();
    var hours = $('[hour]').Jrotate();
    var minutes = $('[minute]').Jrotate();
    var seconds = $('[second]').Jrotate();
    console.log(days);
    var times = {
        day:days,
        hour:hours,
        minute:minutes,
        second:seconds
    }
    //获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
    function getNowFormatDate(date) {
        //var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }


    var date ;
    //alert(date);
    var startTimes;
    var lastTimes;
    var showTime;
    function InitTimer(){
        date = new Date().getTime();
        //alert(formulateOverTime);
        startTimes =startSeconds;
        lastTimes = overSeconds;
        if(date > lastTimes){
            clearCookies();
            $('.show-end').show().nextAll().remove();
            window.location="index.html";//浏览器兼容问题
        }else{  
            setTime();
            setInterval(setTime,500);
        }
    }
    function setTime(){
        var date = new Date().getTime();
        if(date < startTimes){
            $('.not-start').show();
            showTime = startTimes;
        }else if(date > lastTimes){
            //alert('考试结束');
            clearCookies();
            console.log("考试结束");
            window.location="index.html"; 
            //$('form')[0].submit();
        }else{
            //console.log("***********setTime************");
            $('.not-start').hide();
            $('.show-daojishi').show();
            showTime = lastTimes;
        }
        var _time = {}
        var t = (showTime - date) / 1000 | 0;//总的秒数
        _time.day = t / (60 * 60 * 24) | 0;//天数
        t -= _time.day * 60 * 60 * 24;
        _time.hour = t / (60 * 60) | 0;//小时数
        t -= _time.hour * 60 * 60;
        _time.minute = t / 60 | 0;//分钟
        _time.second = t - _time.minute * 60;//秒数
 // 　$() 方法是在DOM中使用过于频繁的 document.getElementById() 方法的一个便利的简写
       // $('[time]').html(_time.day + '天' + _time.hour + '小时' + _time.minute + '分' + _time.second + '秒');
        for(var i in times){
            times[i].setNumber(_time[i]);
        }
    }



// ***************************************cookies*************************************************************
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function SetCookie(name, value) {  
    var Days = 30;  
    var exp = new Date();
    //exp.setTime(exp.getTime() + 3600 * 60 * 1000);//过期时间60分钟 60*1000 1s 
    document.cookie = name + "=" + escape(value); 
    //document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();  
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

//全局化个人相关cookie,每人cookie标识唯一（可能多人使用了同一台电脑）
var questionName;
var correctNumName;
var currentNumName;
function setMyQuestionCookie(userid){
    var question;
    var currentNum;
    var correctNum;
    questionName=userid+"questioin";//同一台电脑，多人同时登陆。
    correctNumName=userid+"correctNum";
    currentNumName=userid+"currentNum";
    var findQuestion=questionName+"=";
    existquestion=document.cookie.indexOf(findQuestion);
    if(existquestion == -1){
         console.log("****not exist Cookie*******");
            var flag=1;
            var i=0;
            var max=227;
            var min=1;
            var diff=max-min;
            var questionsId=new Array(50);
            var item;
            while(true){
                item=Math.round(Math.random()*diff+min);
                //console.log(item);
                if(questionsId.indexOf(item)==-1){//exist 0,not exist -1
                    questionsId[i]=item;
                    i++;
                    //console.log(i);
                    //console.log(item);
                    //console.log(item);
                    if(i==50){
                        break;
                    }
                }
            }
        question=questionsId.join("|");
        //question=question.split("|");
        console.log(question);
        currentNum=0;
        correctNum=0;
        SetCookie(currentNumName,currentNum);
        SetCookie(questionName,question);
        SetCookie(correctNumName,correctNum);
        // SetCookie("currentNum",currentNum);
        // SetCookie("question",question);
        // SetCookie("correctNum",correctNum);
        // var getTime=getCookie("beginTime");
    } 
    else{
        console.log("****exist Cookie*******");
        question=getCookie(questionName);

        console.log(question.split("|"));
        console.log(getCookie(currentNumName));
    } 
}
function clearCookies(){
    // userid=document.getElementById("userid").innerHTML;
    // var personalInfo=userid+"question";
    console.log("*******clearCookies*******questionName*******beginTimeName**");
    console.log(questionName);
     console.log(beginTimeName);   
    delCookie(questionName);
    delCookie(beginTimeName);
}
// *******************************************End of timer******************************************************************

// document.write(" <script type='text/JavaScript' src='./javascripts/timer.js'></script>");
document.getElementById('myjrotate').style.display = 'none';
var userid="";
var item=new Array();
item[0]="null";
item[1]="A";
item[2]="B";
item[3]="C";
item[4]="D";
//开始答题按钮
function onStartQuizBtnClickCB(){
    document.getElementById('myjrotate').style.display = 'block';
    document.getElementById('start').style.display = 'none';
    document.getElementById('quiz-main').style.display = 'block';
    userid=document.getElementById("userid").innerHTML;
    //alert(userid);
    setMyTimerCookie(userid);//设置cookie，开始计时答题
    InitTimer()//设置计数器参数，开始结束时间，启动计时器
    setMyQuestionCookie(userid);
    nextQuestion();

}

function nextQuestion(){
    //var txt = '{"currentNum":"1","q_content":"题目正文题目正文题目正文题目正文题目正文","q_id":"题目ID","q_anwser":"A.123123132#B.123123132#C.123123132#F.123123132"}';
    var ajaxUrl = 'getNextQuestion.php';
  //当做完最后一题，但是没有点完成而刷新或关闭网页(不关闭浏览器)，直接跳转到计算成绩页面
    var strCurrentNum=getCookie(currentNumName);//get current questioin number
    var currentNum=Number(strCurrentNum); 
    trueNum=currentNum+1;
    console.log("*******nextQuestion*******currentNum *************");
    console.log(currentNum);
    if(currentNum==50){
        document.getElementById('submit-quizz').style.display='block';
        document.getElementById('next-question').style.display='none';
        document.getElementById('main-submit').style.display = 'none';
        return;
    }
    var strQuestion=getCookie(questionName);
    var question=strQuestion.split("|");

    var questionId=question[currentNum];
    console.log("*******nextQuestion********questioinId*************");
    console.log(questionId);

    $("#q_id").text(questionId);
    document.getElementsByClassName('resolution')[0].style.display = 'none';//解析隐藏
    document.getElementById('next-question').style.display='none';//下一题按钮隐藏
    document.getElementById('main-submit').style.display = 'block';//提交按钮显示
    document.getElementById('submit-quizz').style.display='none';//完成按钮隐藏
    $.ajax({
        type: 'POST',
        url : ajaxUrl,
        contentType : "application/x-www-form-urlencoded", //必须有
        data : {"questionId":questionId},
        dataType:'JSON', 
        success : function(data) {
            var question = data;
            if(question['status']==1){
                console.log("***********get question success************");
                //var q_id = question['q_id'];
                //显示题目选项
                var quizOption = document.getElementById('quiz-options');
                //console.log("************correct****************");
                //console.log(question['correct']);
                var optionArr = question['q_answer'].split('#');
                quizOption.innerHTML = '';
                for(var i = 0 ; i < optionArr.length; i++){
                   quizOption.innerHTML += '<li><div onclick="OnOptionClickCb('+i+')">'+optionArr[i]+'</div></li>';
                }

                //显示题目
                var quizTitle = document.getElementsByClassName('quiz-title')[0];
                quizTitle.innerHTML = trueNum+". "+question['q_content'];//显示题号

                //显示题号
                var quizProgress = document.getElementsByClassName('quiz-progress')[0];
                quizProgress.innerHTML = trueNum + "/50题";


            }else if(question['status']==-1){
                alert("server error!Can not get a questioin!May be the questioinId error");
            }

            // if(completed==1){
            //  document.getElementById('main-submit').style.display = 'none';
            //  document.getElementById('submit-quizz').style.display='block';
            // }
            
        },
        error : function(err) {
            alert("获取失败！get  "+err);
        }
    });
    //隐藏下一题按钮和解析
    document.getElementsByClassName('resolution')[0].style.display = 'none';
    document.getElementById('next-question').style.display='none';
    document.getElementById('main-submit').style.display = 'block';
    //清除选择的答案
    curSelect = -1;
}
function commitAnwserBtnClickCB(){
    if(curSelect === -1){
        alert('请先选择答案，再进行提交');
        return;
    }
    var strCurrentNum=getCookie(currentNumName);//get current questioin number
    var currentNum=Number(strCurrentNum); 
    //var questioin=getCookie("question").split("|");
    //var questioinId=questioin[currentNum];
    var strCorrectNum=getCookie(correctNumName);
    var correctNum=Number(strCorrectNum);
	curSelect = curSelect+1;
   // alert('你提交的答案是'+curSelect);
	var questionId = $("#q_id").text();
    $.ajax({
        type: 'POST',
        url : 'commitAnswer.php',
        contentType : "application/x-www-form-urlencoded", //必须有
        data : {"commitAnswer":curSelect,"questionId":questionId},
        dataType : "json",
        success : function(data) {
            //var txt = '{"parser":"解析内容","corAnswer":"1"}';
            //var tempObj  = eval ("(" + data + ")");
			var tempObj = data;
			document.getElementById('user_result').innerHTML="正确答案："+item[tempObj['corAnswer']]+".";
            document.getElementById('resolution-content').innerHTML=tempObj['parser'];
			//+" "+"您的答案是："+item[tempObj['studentAnswer']]

            //显示正确答案和错误答案
            showTrueAnswer(tempObj['corAnswer'] , curSelect);
            //显示下一题按钮和解析,隐藏提交按钮
            document.getElementsByClassName('resolution')[0].style.display = 'block';
            var quizProgress = document.getElementsByClassName('quiz-progress')[0];
            if(tempObj['correct']==1){
                //alert("sdaf");
                correctNum=correctNum+1;//corrent add 1
                SetCookie(correctNumName,correctNum);
            }
            console.log("*********commitAnwserBtnClickCB******correctNum************");
            console.log(correctNum);
            currentNum=currentNum+1;//update question progress
            SetCookie(currentNumName,currentNum);
            if(currentNum==50)
            {
                document.getElementById('submit-quizz').style.display='block';
                document.getElementById('next-question').style.display='none';
                document.getElementById('main-submit').style.display = 'none';
            }
            else
            {
				document.getElementById('submit-quizz').style.display='none';
                document.getElementById('next-question').style.display='block';
                document.getElementById('main-submit').style.display = 'none';
            }

            //清除选择的答案
            curSelect = -1;
        },
        error : function() {
           alert("提交失败！");
        }
    });
}




var curSelect = -1;
function OnOptionClickCb(index){
    $("#quiz-options li:eq("+curSelect+")>div").removeClass('quiz-options-checked');
    curSelect = index;
    $("#quiz-options li:eq("+index+")>div").addClass('quiz-options-checked');
}


function showTrueAnswer(trueIndex , selectIndex){
	
    $("#quiz-options li:eq("+(selectIndex-1)+")>div").removeClass('quiz-options-checked');
    $("#quiz-options li:eq("+(selectIndex-1)+")>div").addClass('quiz-options-false');
    $("#quiz-options li:eq("+(trueIndex-1)+")>div").addClass('quiz-options-true');
}
function submitQuestion()
{
    var ajaxUrl="submitQuizz.php";
    var correctNum=getCookie(correctNumName);
    console.log("*******submitQuestion*****correctNum************");
    console.log(correctNum);
    $.ajax({
            type: 'POST',
            url : ajaxUrl,
            contentType : "application/x-www-form-urlencoded", //必须有
            data : {"correctNum":correctNum},
            dataType:'JSON', 
            success : function(data) {
                var result = data;
                var status=result['status'];
                console.log(result['grade']);
                if(status==1){
                    window.location ="chengji.php";
                }

            },
            error : function(err) {
                alert("获取失败！get  "+err);
            }
        });
    
}
