const angular=require("angular")
var service=require('../service.js');
require("../../css/login/lgi_phone.css")
require("../../css/main.css")

var app = angular.module('app', []);

app.controller("myCtrl", ["$scope", "$http","$window", function($scope, $http,$window) {


}])

    $(function () {
        

        var  name=$(".form-control").val();

        $(".get_code").click(function(){
           

            $.ajax({
                type: 'POST',
                url:service.getCommonUrl+'/sms/login',
                data: formData,
                contentType: false,
                processData: false,
                success:function(data){
                console.log(data.msg);
                },
                error:function(data){
                    console.log(data.msg);
                }
            });
        })

        $(".Lbtn").click(function(){

            var code = $("#test").val();
            var tel=$("#telephone").val();
            
            
            $.ajax({
                type: 'POST',
                url:service.getCommonUrl+'sms/login' ,
                data: 'phone='+tel+'&identify_code='+code+'&login_mode=2',
                contentType: 'application/x-www-form-urlencoded',
                
                processData: false,
                success:function(data){
                   
                    

                    if(Number(data.code)==1){
                        $(".error").text(data.msg);
                        $(".error").show();
                        
                    } 

        

                    else if(Number(obj.code)==2){
                       var encodeData = window.btoa(window.encodeURIComponent(tel));
                        window.location.href="../dispatch/dispatch.html?#phone="+encodeData;

                    }
                        // var str = data.msg;
                        // sid = data.code;
                        // localStorage.setItem("key", sid);
                        // if(str == "短信发送成功"){
                        //    console.log(str)
                        // }
                },
                error:function(data){
                    console.log(data.msg);
                }
            });
        })
        //倒计时
        $("#get_code").click(function(){
            var num = 60;
            $(this).css("display","none");
            $("#send_code2").css("display","block");
            timer = setInterval(function(){
                num = --num;
                var str = num+"s后重新发送"
                $("#send_code2").text(str);
                if(num < 1){
                    $("#get_code").css("display","block");
                    $("#send_code2").css("display","none");
                    clearInterval(timer);
                }

            },1000)
        })
    })




