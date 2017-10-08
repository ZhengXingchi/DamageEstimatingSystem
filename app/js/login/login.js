var service=require('../service.js');
var angular=require('angular');
require('jquery')
require('../encrypt')
require('bootstrap')
require("../../css/login/login.css")
require("../../css/main.css")




	var app = angular.module('app', []);

app.controller("myCtrl", ["$scope", "$http","$window", function($scope, $http,$window) {
	$scope.userdata = {};
	$scope.submitForm = function() {

		$scope.userdata.password = $window.Base64.encode($scope.userdata.password);
        
       
		$http({
			method: 'POST',
			url: service.getCommonUrl + 'person/login',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: 'login_id=' + $scope.userdata.username + '&pwd=' + $scope.userdata.password + '&login_mode=1'
		}).then(function(data) {
			console.log(data)

			// var obj=(new Function("","return "+data))(); 


			if (Number(data.data.code) === 0) {
				console.log(data.data.msg);
				var login_id = $scope.userdata.username;


				sessionStorage.setItem("loginType", "login_id=" + login_id);
				// window.encodeURIComponent('login_id='+login_id)

				var encodeData = window.btoa(window.encodeURIComponent(login_id));
				// alert(encodeData)
				var href = '../dispatch/dispatch.html?#login_id=' + encodeData;

				window.location.href = href;
			} else {
				console.log(data.data.msg);
			}

		}, function(error) {
			
		});


		
	}
	$scope.isdisabled = true;
}]);

 app.directive("validate",function(){
        return  {
            restrict: 'EA',
            template: require('../../templates/login_validate.html'),
            scope:{
                isdisabled:"=",   
            },

            link: function (scope, element, attr, ctrl) {
                // var $ = function(ele){
                //     if(typeof ele == "string"){
                //         ele = document.querySelectorAll(ele);
                //     }
                //     return angular.element(ele);
                // };

                F={};
                F['slidebar'] = function(callback){
                    var callback = callback || function(){};
                    // var html = ['<div class="m-slivery j-slivery">',
                    // '               <div class="pic">',
                    // '                   <div class="ct">',
                    // '                       <div class="tips"></div>',
                    // '                   </div>',
                    // '                   <div class="cube j-cube"></div>',
                    // '                   <div class="cube s-mach j-cube_mach">',
                    // '                       <div class="shade"></div>',
                    // '                   </div>',
                    // '               </div>',
                    // '               <div class="slidebar">',
                    // '                   <span>拖动滑块完成验证</span>',
                    // '                   <div class="btn j-btn">┃┃┃</div>',
                    // '               </div>',
                    // '            </div>'].join("");
                // t.html('').append(html);
                // var $slidebar = angular.element('slidebar');
                // var $pic = $slivery.find('.pic').first();
                //console.log(type);
                // var $cube = $slivery.find('.j-cube').first();
                //console.log($cube);
                // var $cube_mach = $slivery.find('.j-cube_mach').first();
                // var $tips = $slivery.find('.tips').first();
                // var $btn = angular.element('.j-btn');
                // var width = $slidebar.width();

                // function calposition(){

                //     var mach_l = 290-44;
                //     var cube_mach_t = Number($cube_mach.position().top);
                //     var cube_mach_hei = Number($cube_mach.innerHeight());
                //     var _y = ' '+-(cube_mach_t - (cube_mach_hei/2) + 1 -10)+'px '; //不知道为什么要-10，但是减了之后刚刚好....
                //     var _x = ' '+-(mach_l+1)+'px '; //加1是因为有border
                //     var str = ' '+_x+' '+_y+' ';

                //     $cube_mach.css({
                //         'left':mach_l,
                //         'backgroundPosition':str

                //     });
                //     $cube_mach.animate({'opacity':1},300);
                //     $cube.css({'backgroundPosition':str});
                // }

                // if (t.attr('data-type') == undefined) {
                //     var type = 's-type1';
                // }else if(t.attr('data-type') == 2){
                //     var type = 's-type2';
                // };
                // $slivery.addClass(type);
                // if ($pic.is(':hidden')) {
                //     var $btn = $slivery.find('.j-btn');
                //     var is_show = '';
                //     $btn.on('mouseover',function(){
                //         var $this = $(this);
                //         if (Number($this.attr('data-lock')) == 1) {
                //             $pic.fadeIn(300);
                //             $btn.on('mouseleave',function(){
                //                 $pic.fadeOut(300);
                //             })
                //         }else{
                //             if (is_show == 1) {
                //                 $pic.fadeIn(300);
                //             }else{
                //                 $pic.fadeIn(300,function(){
                //                     is_show = 1;
                //                     calposition();
                //                     slidrage(2);
                //                 });
                //             };
                //         };

                //     });

                // }
                // else{
                //     calposition();
                //     slidrage();
                // };
                function slidrage (type){
                    $(".j-btn").on('mousedown',function(e){
                        if (Number($(this).attr('data-lock')) == 1) { return false};
                        var width = $(this).width();
                        var bar_w = $(".slidebar").width();
                        var max_w = bar_w - width;
                        var _x = e.screenX; //鼠标距离左边距
                        $(document).on('mousemove',function(v){
                            var $_this = $(".j-btn");
                            var x = $_this.position().left; //元素距离左边距
                            //console.log(x);
                            if (x < 0) {
                                $_this.css({'left':0});
                                // $cube.css({'left':0});
                            }else if (x > max_w) {
                                $_this.stop().css({'left':max_w});
                                // $cube.stop().css({'left':max_w});
                            }else{
                                var mouse_x = v.screenX - _x; //计算鼠标x轴偏移量
                                $_this.stop().css({'left':mouse_x});
                                // $cube.stop().css({'left':mouse_x});
                            };
                            $(".j-btn").on('mousemove');
                        });
                    });
                
                $(document).on('mouseup',function(e){
                    
                    if (Number($(".j-btn").attr('data-lock')) == 1) { return false};
                    var x = $(".j-btn").position().left;
                    var _x = $(".slidebar").width()-$(".j-btn").width();
                    if (_x*0.7 <= x ) {
                        $(".j-btn").attr('data-lock',1);
                         $(".sli").css({"display":"none"});
                        // $tips.text('验证成功！').animate({'bottom':0},'fast',function(){
                            callback();
                            // setTimeout(function(){
                            //     $tips.text('').animate({'bottom':-24},'fast');
                            
                            // },1000)
                        // })
                        $(document).off('mousemove');
                        $(".j-btn").off('mousemove').animate({'left':_x},'fast');
                        $(".slidebar").css({"background-color":"green"})
                       
                        $(".slidebar span").css({"display":"none"});
                        // $cube.animate({'left':$cube_mach.position().left},'fast',function(){
                        //     $cube.fadeOut(300);
                        //     $cube_mach.fadeOut(0);
                        // });
                    }else{
                        if(x >0){
                            $(".sli").css({"display":"block"});
                        }
                        
                        $(document).off('mousemove');
                        // $tips.text('').animate({'bottom':-24},'fast');
                        $(".j-btn").off('mousemove').animate({'left':0},'slow');
                        // $cube.animate({'left':0},'slow');
                    };

                });
    } //slidrage
    slidrage();
} //F

// if ($('*[data-slivery]').length >= 1) {
    F['slidebar'](function(){
        // alert("验证成功回调");
        scope.isdisabled=false;

        scope.$apply();
    });
    // F['slivery']($('.slidevery1'),function(){
    //     alert("隐藏型验证成功回调")
    // })
// };

}
}
})



   



