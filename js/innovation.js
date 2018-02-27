var index=1;
var last=0;
var isMobile=false;
var isTabletPortrait=false;
var isDesktopAndTabletLandscape=false;
var isTab=false;
$(document).ready(function () {
    var screen=$(window).width();
    var pagehome=$('.page-home');
    index=1;
    last=$('.landing-screen').length-1;
	
	$("#upload-file-holder").removeClass("error");
	console.log("--enter- nwq");
	if($("#drive-txt").hasClass( "error" )) {
		console.log("--enter-");
		$("#upload-file-holder").addClass("error");
	}

    if($(window).width()<767){
        isMobile=true;
    }else if(window.innerHeight > window.innerWidth){
        isTabletPortrait=true;
    } else if(window.innerHeight < window.innerWidth){
        isDesktopAndTabletLandscape=true;
    }
    if($('.page-animation').length>0){
        $('.region-content,.block-system-main-block').css('height','100%');
        if(isDesktopAndTabletLandscape || isTabletPortrait){
            if(pagehome.length>0){
                $('body').css('overflow','hidden');
                $('.dots_div').removeClass('hide');
            }
           // showLoader();
        }else{
            $('.r6-outer-div').removeClass('hideScreens');
            $('.landing-screen').removeClass('hideScreens').removeClass('sampler-section').removeClass('alegra-section');
            var aboutus=$('.about-us');
            aboutus.find('.full-height').removeClass('about-panel-slide');
            aboutus.find('.about-panel').removeClass('about-panel-wrapper');
        }
        $('#block-innovation-content').addClass('landing_main');
    }else{
        if(isMobile){
            $('.landing-screen').removeClass('disclose');
            $('.footer').removeClass('disclose');
        }else{
            if(pagehome.length>0){
                $('body').css('overflow','hidden');
                $('.dots_div').removeClass('hide');
            }
        }
        if($('.participate').length){
            $('.footer').removeClass('blackbg').removeClass('hideScreens');
            if($('.success').length < 1) {
                $('.main-container').css('height', 'auto');
                $('.landing-screen ').css('position', 'static');
                $('.footer').css('position', 'relative');
            }
            $('input#edit-contactfile-upload').on('change', function(e) {
                var file = this.files[0];
                var fileSize = file.size/(1024*1024);
                var ext = file.name.split(".");
                finalVal = ext[ext.length-1].toLowerCase();
                $("#upload-file-holder").val(file.name);
            });
        }

        $('.region-collaborationtopinfo').addClass('landing_main');
        $('.region-collaborationbottominfo').addClass('landing_main');

        if($('.terms-panel').length > 0 || $('.privacy-panel').length > 0){
            $('.pagestatic-content').css('height', 'auto');
            $('.footer').css('position', 'static').removeClass('blackbg').removeClass('hideScreens');
        }


    }
    if(pagehome.length === 0) {
        $('.navbar-fixed-top').addClass('home-nav-bg');
    }
    if(isDesktopAndTabletLandscape || isTabletPortrait) {
        if (document.addEventListener) {

            // Firefox
            document.addEventListener("DOMMouseScroll", function (e) {
                slideAnimation(e);
            }, false);
            // IE9, Chrome, Safari, Opera
            document.addEventListener("mousewheel", function (e) {
                slideAnimation(e);
            }, false);
            document.addEventListener("wheel", function (e) {
                slideAnimation(e);
            }, false);
            if($('.page-animation').length>0) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    isTab = true;
                }
                if (isTab) {
                    //Tablet
                    $(document).bind('touchstart', function (e) {
                        lastY = e.originalEvent.touches[0].clientY;
                    });
                    $(document).bind('touchmove', function (e) {
                        e.preventDefault();
                        var currentY = e.originalEvent.touches[0].clientY;
                        e.wheelDelta = currentY > lastY ? 60 : -60;
                        slideAnimation(e);
                    });
                }
            }
        } else {
            // IE 6/7/8
            document.attachEvent("onmousewheel", function (e) {
                slideAnimation(e);
            });
        }
   }

    $('.discover-btn').click(function () {
        if (isMobile) {
            window.location.hash = "";
            window.location.hash = "#screen-r2";
        } else {
            if($('.page-animation').length>0){
                $('.r1').addClass('hideScreens').removeClass('showScreens');
                $('.r2').removeClass('hideScreens').addClass('showScreens');
                index+=1;
                index === 2 && animateSecondScreen();
                $('.path-frontpage .navbar-fixed-top,.page-home .navbar-fixed-top').addClass('home-nav-bg');
            }else {
                $('.r1').addClass('disclose').removeClass('z10');
                $('.r2').removeClass('disclose').addClass('z10');
                index += 1;
                TweenMax.fromTo(".r2", 0.3, {timeScale: 4, x: '100%', ease: Linear.easeNone}, {
                    x: "0%",
                    ease: Linear.easeNone
                });
            }
            indicatorBlack();
        }
    });
    $('.down_arrow,.about-us .arrow_down').on('click',function () {
        moveSlide("down");
    });

    $(document).on('keyup',function (e) {
        var keyCode = e.keyCode;
        if(keyCode === 38) {
            if (index > 1) {
                moveSlide("up");
            }
        } else if (keyCode === 40) {
            if (index < last) {
                moveSlide("down");
            }
        }
    });

    $('.pagination-div li a').on('click', function(e){
        var tempIndex = parseInt($(this).attr('data-index'));
        if (index !== tempIndex) {
            moveSlide("",tempIndex);
        }
    });

    $('.page-home .sampler').each(function () {
        var t=$(this).find('h1').text().split("");
        var l='';
        $.each(t,function (i,v) {
            l+='<li style="transition:all 0.2s;">'+v+'</li>';
        });
        var str='<ul class="fly-in-text list-inline inline-block" style="cursor: pointer;transition:all 0.3s;">'+l+'</ul>';
        $(this).find('h1').text('').html(str);

    });

    $('.fly-in-text li').click(function () {
        location.href=$(this).parent().parent().parent().find('.learn_more').find('a').attr('href');
    });

    $('.fly-in-text').hover(function () {
        $(this).find('li').each(function (i) {
            if(i%2===0){
                $(this).css('transform','translateY(-30px)');
            }else{
                $(this).css('transform','translateY(30px)');
            }
        });
    },function () {
        $(this).find('li').each(function (i) {
            $(this).css('transform','translateY(0px)');
        });
    });

    $(".navbar-toggler").click(function(){
        $(".navbar").toggleClass('mobile-hamb fade-in three');
        $(".footer").toggleClass('fade-in show-mobile-footer');
        $(".navbar-collapse").toggleClass('shownav');
    });

    $(".glyphicon-calendar").mouseover(function(){
        $("#datepicker").attr("disabled", true);
    });
    $(".glyphicon-calendar").mouseout(function(){
        $("#datepicker").attr("disabled", false);
    });


});


function slideAnimation(e){
    clearTimeout($.data(this, 'timer'));
    $.data(this, 'timer', setTimeout(function() {
        var dir=direction(e);
        if(dir==="up"){
            if(index>1) {
                moveSlide("up");
            }

        }else if(dir==="down"){
            if(index<last) {
                moveSlide("down");
            }
        }
    },100));
}

function moveSlide(dir, tempIndex) {
    var previousIndex=index;
    if (tempIndex) {
        index = tempIndex;
    } else {
        if(dir==="up") {
            index -= 1;
        } else {
            index += 1;
        }
    }
    if($('.page-animation').length>0){
        if (Number(previousIndex || !!previousIndex) > index || dir==="up") {
            if(isDesktopAndTabletLandscape ||isTabletPortrait){
                animationsFun(index,previousIndex);
            }
        }else if(Number(previousIndex || !!previousIndex) < index || dir==="down") {
            if(isDesktopAndTabletLandscape ||isTabletPortrait){
                animationsFun(index,previousIndex);
            }
        }
    }else{
        $('.r'+index).removeClass('disclose').addClass('z10');
        if (previousIndex > index || dir==="up") {
            TweenLite.fromTo(".r"+(index+1),0.4,{timeScale:4,x:'0%',ease:Linear.easeNone},{x:"100%",ease:Linear.easeNone,onComplete:function () {
                $('.r'+previousIndex).addClass('disclose').removeClass('z10');
            }});
        }else if(previousIndex < index || dir==="down") {
            TweenLite.fromTo(".r"+(index),0.3,{timeScale:4,x:'100%',ease:Linear.easeNone},{x:"0%",ease:Linear.easeNone,onComplete:function () {
                $('.r'+previousIndex).addClass('disclose').removeClass('z10');
            }});
        }
        if(index===last) {
            $('.footer').removeClass('disclose').css('z-index', 201);
            TweenMax.fromTo('.footer', 0.3, {timeScale: 4, x: '100%', ease: Linear.easeNone}, {
                x: "0%",
                ease: Linear.easeNone
            });
            indicatorBlack();
            logoBlack();
        } else {
            $('.footer').addClass('disclose').css('z-index', 0);
            logoWhite();
        }
    }
    if((index===2) || (index===last)){
        indicatorBlack();
    }else{
        indicatorWhite();
    }

    if(index !== 1) {
        $('.path-frontpage .navbar-fixed-top,.page-home .navbar-fixed-top').addClass('home-nav-bg');
    } else {
        $('.path-frontpage .navbar-fixed-top,.page-home .navbar-fixed-top').removeClass('home-nav-bg');
    }
    $('.pagination-div li a.active').removeClass('active');
    $('.pagination-div li a').eq(index-1).addClass('active');
}

function logoWhite() {
    $('.navbar-brand img').attr('src','/themes/custom/innovation/images/logo_loreal_w.png');
}
function logoBlack() {
    $('.navbar-brand img').attr('src','/themes/custom/innovation/images/logo_loreal_w.png');
}
function indicatorBlack(){
    $('.dots_div ul li a').addClass('dots_div_black').removeClass('dots_div_white');
}
function indicatorWhite(){
    $('.dots_div ul li a').addClass('dots_div_white').removeClass('dots_div_black');
}
function direction(e){
    var delta=null,direction=false;
    if ( !e ) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if ( e.wheelDelta ) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if ( e.detail ) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    if ( delta !== null ) {
        direction = delta > 0 ? 'up' : 'down';
    }
    return direction;

}

//for animation
function showLoader(){
    new TimelineMax({onComplete:function () {
        $('.loader-yellow').css('z-index',2000);
        $('.loader').css('z-index',1999);
        new TimelineMax({onComplete:function () {
            $('.loader').css('width',0);
            new TimelineMax({onComplete:function () {
                $('.dots_div').removeClass('hide');
            }})
                .staggerFromTo('.loader-yellow',0.4,{ease:Linear.easeOut,height:"100%",width:"100%",backgroundColor:"#ebcb80",opacity:1},{ease: Linear.easeOut,height:"100%",width:"0",backgroundColor:"#ebcb80",opacity:1});
        }})
            .staggerFromTo('.loader-yellow',0.4,{ease: Linear.easeOut,height:"100%",width:"0",backgroundColor:"#ebcb80",opacity:1},{ease: Linear.easeOut,height:"100%",width:"100%",backgroundColor:"#ebcb80",opacity:1});
    }})
        .to('.loader-white',0.4,{timeScale:4,ease: Linear.easeOut,y:"-100%"},"0.5")
        .to('.loader-grey',0.4,{timeScale:4,ease: Linear.easeOut,y:"-100%"});

}

function animationsFun(index,previousIndex){
    index === 1 && animateFirstScreen(index,previousIndex);
    index === 2 && animateSecondScreen(index, previousIndex);
    index === 3 && animateThirdScreen(index, previousIndex);
    index === 4 && animateFourthScreen(index, previousIndex);
    index === 5 && animateFifthScreen(index, previousIndex);
}

function animateFirstScreen(index, previousIndex, direction){

    $('.r'+index).removeClass('hideScreens').addClass('showScreens');
    $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');
}
function animateSecondScreen(index, previousIndex){

    $('.r'+index).removeClass('hideScreens').addClass('showScreens');
    $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');
    TweenMax.from(".about-panel-slide, .about-background-layout", 0.6,{width:'0vw',ease:Expo.easeOut});
    TweenMax.from(".video-slide", 0.6,{width:'100%',ease:Expo.easeOut});
    $('.r3 .sampler_right').attr('style','');
}
function animateThirdScreen(index, previousIndex){

    $('.r'+index).removeClass('hideScreens').addClass('showScreens');//r3
    $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');//r2
    $('.r'+(index+1)+' .sampler_right').attr('style',''); //r4
    $('.r'+index+' .sampler-pink-bg, .r'+index+' .right-bg-white').attr('style','width:50%;left:50%'); //r3
    $('.r'+index+' .sam_right_cont').removeClass('hideScreens').attr('style','');//r3
    $('.r'+index+' .hideDivContents').removeClass('hideScreens');//r3
    TweenMax.from('.r'+index+' .sampler-dark-pink-bar',0.6,{width:'15%',left:'35%',ease:Linear.easeOut});//r3
    TweenMax.from('.r'+index+' .sampler-pink-bg',0.6,{width:'0%',ease:Linear.easeOut,onComplete:function () {//r3
        $('.r'+index+' .sampler_right').css('z-index',9);//r3
    }});
    TweenMax.from('.r'+index+' .white-bg-slide',0.6,{width:'100%',backgroundColor:'#ffffff',ease:Linear.easeOut});//r3
}
function animateFourthScreen(index, previousIndex){

    $('.r3 .sampler_right').attr('style','');
    $('.r5 .footer').removeClass('showScreens').addClass('hideScreens');
    $('.r5').removeClass('showScreens').addClass('hideScreens');
    $('.r'+index).removeClass('hideScreens').addClass('showScreens');
    $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');
    $('.r'+previousIndex+' .hideDivContents').addClass('hideScreens');
    $('.r4 .alegra-blue-bg,.r4 .left-bg-whit').attr('style','');
    $('.r4 .sam_right_cont').attr('style','');
    $('.r4 .alegra-left-content').removeClass('hideScreens');
    $('.r4 .hideDivContents').removeClass('hideScreens');
    $('.r3').removeClass('hideScreens').addClass('showScreens');
    $('.r3 .hideDivContents').addClass('hideScreens');
    $('.r3 .sampler-pink-bg,.r3 .right-bg-white').attr('style','width:"50%";left:"50%";');
    $('.r3 .sam_right_cont').attr('style','opacity:1').removeClass('hideScreens');
    TweenMax.to(".r3 .sampler-pink-bg,.r3 .right-bg-white",0.6,{width:'0%',left:'100%',ease:Linear.easeOut});
    TweenMax.to(".r3 .sam_right_cont",0.3,{opacity:'0',ease:Linear.easeOut,onComplete:function(){
        $('.r3 .sam_right_cont').addClass('hideScreens');
    }});
    TweenMax.from(".r4 .alegra-dark-blue-bar",0.6,{width:'15%',ease:Linear.easeOut});
    TweenMax.from(".r4 .alegra-blue-bg",0.6,{width:'0%',left:'50%',ease:Linear.easeOut,onComplete:function(){
        $('.r'+previousIndex+' .hideDivContents').removeClass('hideScreens');
        $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');
        $('.r3').removeClass('showScreens').addClass('hideScreens');
        $('.r4 .sampler_right').css('z-index',10);
    }});

}

function animateFifthScreen(index, previousIndex){

    $('.r4 .sampler_right').attr('style','');
    $('.r'+index).removeClass('hideScreens').addClass('showScreens z999');
    $('.r5 .footer').removeClass('hideScreens').addClass('showScreens');
    TweenMax.from(".r5",0.6,{width:'0%',ease:Linear.easeOut,onComplete:function(){
        $('.r'+previousIndex).removeClass('showScreens').addClass('hideScreens');
    }});
    TweenMax.from(".r5 .r6-light-grey-bg",0.6,{width:'0vw',ease:Linear.easeOut});
}