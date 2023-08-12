$(function(){  


    //value for animation  
    var width = 900;  
    var animationSpeed = 2000;  
    var pause = 1000;  
    var currentSlide = 1;  
    //Dom element.   
    var $slider = $('#slider');  
    var $sliderAnimation = $slider.find('.slides');  
    var $slides = $sliderAnimation.find('.slide'); 

    
    $.ajax({
        url:"http://localhost:8000/getImgs",
        type:"GET",
        async:false,
        dataType:"json",
        success:function(result){
            $("#ImgList").empty()
            // for(let j=0;j<10;j++)
            for(let i=0;i<result.length;i++){
            $("#ImgList").append("<li class='slide' id='imgs"+(i)+"'><img class='img1' width='900px'  height='800px' src='"+result[i].activityImgUrl+"' /><br><br><span style='margin-left:200px; width:auto;'>"+result[i].imgDescription+"</span></li>")
            }
            // $("#ImgList").append("<li class='slide' id='imgs0'><img class='img1' width='900px'  height='800px' src='"+result[0].activityImgUrl+"' /><br><br><span style='margin-left:200px; width:auto;'>"+result[0].imgDescription+"</span></li>")
        }

    })
      
        setInterval(function()
        {  
             $sliderAnimation.animate({'margin-left': '-='+width}, animationSpeed, function(){  
             currentSlide ++;  
             if(currentSlide === $slides.length)  
             {  
                    $sliderAnimation.css('margin-left', 0);  
                    currentSlide = 1;  
             }  
         });  
        },pause);  


        let uName=$.session.get("userName")

        $("#backForGalleryImgs").on("click",function(e){
            e.preventDefault()
            $.session.set("loginStatus",false)
            if(uName=="alcord")
            window.location = "../components/alumniCoordinator.html"
            else if(uName=="principal")
            window.location = "../components/principal.html"
            else
            window.location = "../components/hod.html"
          })

})
