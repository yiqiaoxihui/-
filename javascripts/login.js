//var base_path = 'http://localhost:8088/dk/dkczb/';
function login()
{
	
	var uname = $("#username").val();
	var psw = $("#password").val();
	uname = $.trim(uname);
	psw = $.trim(psw);
	if(uname==""||psw=="")
	{
		alert("请输入正确的帐号、密码！");
		return;
	}
	 $.ajax({
        type: 'POST',
        url : 'studentLogin.php',
        contentType : "application/x-www-form-urlencoded", //必须有
        data : {"studentName":uname,"studentPsw":psw},
        dataType:'JSON', 
        success : function(data) {
			//alert("status:"+data['status']);
			var login_status = data['status'];
			
			if(login_status==-1)
			{
				alert('用户名或密码错误');
			}
			else if(login_status==2)
			{
				//var name=data['name'];
				//var currentNum=data['currentNum'];
				//?username=name&number=currentNum
				window.location ='quiz.php';
			}
			else if(login_status==1)
			{
				alert("欢迎使用答题系统，您的答题时间为1个小时！建议使用谷歌、火狐、360浏览器或手机登录网页进行答题！本系统可能对低版本IE浏览器不兼容，如果给您带来不便，敬请谅解！");

				window.location = "chengji.php";
			}		
			else
			{
				alert('服务器数据错误：'+login_status);
			}
            
        },
        error : function(err) {
            alert("服务器错误！");
        }
    });
}