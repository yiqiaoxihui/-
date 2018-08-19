
function login()
{
	var uname = $("#uname").val();
	var psw = $("#psw").val();
	uname = $.trim(uname);
	psw = $.trim(psw);
	if(uname==""||psw=="")
	{
		alert("请输入正确的帐号、密码！");
		return;
	}
	
    //appendData(uname,psw);
    checkLogin(uname,psw);
}

function checkLogin(uname,psw){
	console.log("uname:"+uname);
	 $.ajax({
        type: 'POST',
        url : 'adminLogin.php',
        contentType : "application/x-www-form-urlencoded", //必须有
        data : {"adminName":uname,"adminPsw":psw},
        dataType:'json', 
        success : function(data) {
			var institute=data['institute'];
			var login_status=data['status'];
			console.log("login_status");
			console.log(login_status);
			if(login_status==-1){
				alert("登陆失败，帐户密码错误！");
				return;
			}
			var sinstitute;
			for (var option in institute){
				sinstitute="<option value="+institute[option]["insid"]+">"+institute[option]["insname"]+"</option>";
				//console.log(institute[option]["insid"]);
				$("#institute").append(sinstitute);
			}
			ifsearch();
			//$("#div-login").css("display","none");
			//$("#grade-result").css("display","inherit");
            
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert(XMLHttpRequest.status);
              alert(XMLHttpRequest.readyState);
              alert(textStatus);
       }
    });
}



function ifsearch(){
  console.log("***************sinstitute_value***************");   
  var sinstitute = document.getElementById("institute"); //定位id
  var sinstitute_index= sinstitute.selectedIndex; // 选中索引
  //var sinstitute_text = sinstitute.options[sinstitute_index].text; // 选中文本
  var sinstitute_value = sinstitute.options[sinstitute_index].value; // 选中值
  console.log(sinstitute_value);
  console.log("***************sort_value***************"); 
  var sort = document.getElementById("sort"); //定位id
  var sort_index= sort.selectedIndex; // 选中索引
  //var sinstitute_text = sinstitute.options[sinstitute_index].text; // 选中文本
  var sort_value = sort.options[sort_index].value; // 选中值
  console.log(sort_value);
  document.getElementById("summary").innerHTML="";
  document.getElementById("undo").innerHTML="";
  document.getElementById("fail").innerHTML="";
  document.getElementById("excellent").innerHTML="";
  document.getElementById("perpass").innerHTML="";
  document.getElementById("perexcellent").innerHTML="";
  document.getElementById("grade-table-body").innerHTML = "<tr><th>编号</th><th>姓名</th><th>党委</th><th>成绩</th></tr>"; 
 $.ajax({
    type: 'POST',
    url : 'ifsearch.php',
    contentType : "application/x-www-form-urlencoded", //必须有
    data : {"institute":sinstitute_value,"sort":sort_value},
    dataType:'json', 
    success : function(data) {
      //alert("status:"+data['status']);
      //var login_status = data['status'];
      var info=[];
      info=data['content'];
      //var institute=data['institute'];
      //console.log(institute);
      //console.log("data:"+data.length);
      //data = data.substr(1);
      var status=data['status'];
      if(status==2){
        alert("暂无数据");
        //$("#div-login").css("display","none");
        $("#no-grade").text("暂无成绩");
        //document.getElementById('div-login').style.display = 'block';
        //document.getElementById('grade-result').style.display = 'none';
        return;
      }
      //console.log(info);
      if(sort_value==2){//从低到高排序
      	   info.sort(function(x,y){
      			return x['r_grade']-y['r_grade'];
	      });
      }else if(sort_value==1){
      	    info.sort(function(x,y){
      			return y['r_grade']-x['r_grade'];
	      	});
      }
      var undo=0;
      var fail=0;
      var excellent=0;
      for (var item in info){
          	//console.log(item);
          				//echo $row;
    		if(info[item]['r_grade']==-1||info[item]['r_grade']==null){
    			undo++;//未完成数目
    		}
    		else if(info[item]['r_grade']>=0 && info[item]['r_grade']<60){
    			fail++;
    		}
    		else if(info[item]['r_grade']>=90){
    			excellent++;
    		}
        addGrade(info[item]["partyid"],info[item]["username"],info[item]["insname"],info[item]["r_grade"]);
      }
      perexcellent=parseInt(excellent/info.length*100);
      perpass=parseInt((info.length-fail)/info.length*100);
      document.getElementById("summary").innerHTML="总人数:  "+info.length;
      document.getElementById("undo").innerHTML="不及格人数:  "+fail;
      document.getElementById("fail").innerHTML="优秀人数:  "+excellent;
      document.getElementById("excellent").innerHTML="未完成人数:  "+undo;
      document.getElementById("perpass").innerHTML="及格率:  "+perpass+"%";
      document.getElementById("perexcellent").innerHTML="优秀率:  "+perexcellent+"%";
      $("#div-login").css("display","none");
      $("#grade-result").css("display","inherit");
            
      },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert(XMLHttpRequest.status);
              alert(XMLHttpRequest.readyState);
              alert(textStatus);
       }
    });


}
var failColor;
var excellentColor;
function addGrade(partyid,username,insname,grade)
{
  var add_tr
  failColor="</td><td style='color:red;'>"+grade+"</td></tr>"
  excellentColor="</td><td style='color:green;'>"+grade+"</td></tr>"
  if(grade==-1||grade==null){
      grade="</td><td style='color:yellow;'>未完成</td></tr>";
      add_tr = "<tr><td>"+partyid+"</td><td>"+username+"</td><td>"+insname+grade;
  }else if(grade<60){
      add_tr = "<tr><td>"+partyid+"</td><td>"+username+"</td><td>"+insname+failColor;
  }else{
      add_tr = "<tr><td>"+partyid+"</td><td>"+username+"</td><td>"+insname+excellentColor;
  }
  $("#grade-table-body").append(add_tr);
}


// function appendData(uname,psw)
// {
// 	console.log("uname:"+uname);
// 	 $.ajax({
//         type: 'POST',
//         url : 'adminLogin.php',
//         contentType : "application/x-www-form-urlencoded", //必须有
//         data : {"adminName":uname,"adminPsw":psw},
//         dataType:'json', 
//         success : function(data) {
// 			//alert("status:"+data['status']);
// 			//var login_status = data['status'];
// 			var info=data['content'];
// 			var institute=data['institute'];
// 			//console.log(institute);
// 			//console.log("data:"+data.length);
// 			//data = data.substr(1);
// 			var login_status=data['status'];
// 			console.log("login_status");
// 			console.log(login_status);
// 			if(login_status==-1){
				
// 				alert("登陆失败，帐户密码错误！");
// 				    //$("#div-login").css("display","none");
				
// 				//document.getElementById('div-login').style.display = 'block';
// 				//document.getElementById('grade-result').style.display = 'none';
// 				return;
// 			}
// 			if(login_status==-2)
// 			{
// 				$("#no-grade").text("暂无成绩");
// 				$("#grade-result").css("display","inherit");
// 			}
// 			var jslength=0;
// 			for(var js2 in info){

// 				jslength++;
// 				//console.log("name:"+a_data["0"]["name"]);
// 			}
// 			//var instlen=0;
// 			var sinstitute;
// 			for (var option in institute){
// 				sinstitute="<option value="+institute[option]["insid"]+">"+institute[option]["insname"]+"</option>";
// 				//console.log(institute[option]["insid"]);
// 				$("#institute").append(sinstitute);
// 			}
// 			var js_dex = 0;
// 			for(js_dex = 0;js_dex<jslength;js_dex++)
// 			{
// 				addGrade(info[js_dex]["partyid"],info[js_dex]["username"],info[js_dex]["insname"],info[js_dex]["r_grade"]);
// 			}

// 			$("#div-login").css("display","none");
// 			$("#grade-result").css("display","inherit");
            
//         },
//        error: function(XMLHttpRequest, textStatus, errorThrown) {
//               alert(XMLHttpRequest.status);
//               alert(XMLHttpRequest.readyState);
//               alert(textStatus);
//        }
//     });
   
// }