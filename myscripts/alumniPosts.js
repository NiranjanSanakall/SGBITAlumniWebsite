$(function(){

    
    $("#sendPost").on("click",function(e){
        e.preventDefault()
        if($("#topic :selected").val()=="Choose Topic for post") alert("Choose topic")
        else{
        let dName = $.session.get("dName")
        let userName = $.session.get("fname")
        let topic = $("#topic :selected").val()
        let description = $("#postText").val()
        $.ajax({
            url:"http://localhost:8000/sendPost",
            type:"POST",
            datatype:"json",
            data:{"topic":topic,"description":description,"userName":userName,"dName":dName},
            success:function(result){
                $("#msg").text("Your Post is Sent...").fadeOut(5000)
            }
        })
    }
    })

    let uName=$.session.get("userName")
    $("#backForPost").on("click",function(e){
        e.preventDefault()
        $.session.set("loginStatus",false)
        if( uName=="alcord" ||
            uName=="principal" ||
            uName=="csehod" ||
            uName=="ecehod" ||
            uName=="eeehod" ||
            uName=="aidshod" ||
            uName=="csbshod" ||
            uName=="civilhod" ||
            uName=="mechhod"){
                window.location="../components/hod.html"
            }
            else
            window.location="../components/home.html"
      })

    $("#viewPost").on("click",function(e){
        e.preventDefault()
        window.location = "../components/alumniPosts.html"
        var posts = []
    })


    $("#allPosts").on("mouseover","i",function(e){
        e.preventDefault()
        let idx=$(this).attr("id")
        let iconName=idx.substring(0,idx.indexOf('-'))
        let i = parseInt(idx.substring(idx.indexOf('-')+1,idx.length))
        if(iconName=="trash"){
             $("#trash-"+i).css("color","red")
             $("#trash-"+i).css("font-size","25px")
        }
    })
    $("#allPosts").on("mouseout","i",function(e){
        e.preventDefault()
        let idx=$(this).attr("id")
        let iconName=idx.substring(0,idx.indexOf('-'))
        let i = parseInt(idx.substring(idx.indexOf('-')+1,idx.length))
        if(iconName=="trash"){
            $("#trash-"+i).css("color","grey")
            $("#trash-"+i).css("font-size","18px")
       }
    })

     var firstTime = true
     var clickedFlag = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    $("#allPosts").on("click","i",function(e){
        e.preventDefault()

        let idx=$(this).attr("id")
        let iconName=idx.substring(0,idx.indexOf('-'))
        
        let i = parseInt(idx.substring(idx.indexOf('-')+1,idx.length))
        let pid = $("#pid"+i).text()
        if(iconName=="trash"){
            $("#posts"+i).remove()
            $.ajax({
                url:"http://localhost:8000/deletePost/"+pid,
                type:"GET",
                dataType:"json",
                success:function(result){
                    alert("Post Deleted...")
                }
            })
        }
        else{
        if(clickedFlag[i]==0){
        $.ajax({
            url:"http://localhost:8000/getLikeCount/"+pid,
            type:"GET",
            dataType:"json",
            success:function(result){
                let  counter = result[0].counter
                $("#likeCounts"+i).text(counter)
                $("#ico-"+i).css("color","blue")
            }
        })
        clickedFlag[i]=1
    }
}

    })
    let dName = $.session.get("dName")
        $.ajax({
            url:"http://localhost:8000/viewPosts/"+dName,
            type:"GET",
            async:false,
            datatype:"json",
            success:function(result){
                console.log(result)
                posts=result
            }
        })
        if( uName=="alcord" ||
            uName=="principal" ||
            uName=="csehod" ||
            uName=="ecehod" ||
            uName=="eeehod" ||
            uName=="aidshod" ||
            uName=="csbshod" ||
            uName=="civilhod" ||
            uName=="mechhod"){
                $("#allPosts").empty();
    $("#allPosts").append(
      "<li class='list-group-item m-1' style='color:blue'>"+
      "<span style='display:inline-block; margin-left:10px; width:240px'>Topic</span>" +
      "<span style='display:inline-block; width:750px'>Message Posted</span>" +
        "<span style='display:inline-block; width:110px'>Date</span>" +
        "<span style='display:inline-block; width:100px'>Posted By</span>" +
        "<span style='display:inline-block; width:auto'>Likes</span>" +
        "</li>"
    );
                for(i=0; i<posts.length;i++){
                    if(posts[i].counter==0)
                    $("#allPosts").append(
                        "<li id='posts" +
                          i +
                          "'class='list-group-item m-2' style='color:red;'>" +
                          "<span style='display:inline-block; width:240px; margin-left:0px; vertical-align:top;'>" +
                          posts[i].topic +
                          "</span>"+
                          "<span style='display:inline-block; width:780px; vertical-align:top;'>" +
                          posts[i].post +
                          "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                          $.format.date(posts[i].date,"dd-MM-yyyy") +
                          "</span><span style='display:inline-block; width:90px; vertical-align:top;'>" +
                          posts[i].username +
                          "</span>"+
                          "<i class='bi bi-hand-thumbs-up-fill' id='ico-"+i+"' style='font-size:20px; color:grey; vertical-align:top;'></i>"+
                          "<span id='likeCounts"+i+"' style='margin-left:10px; vertical-align:top;'>"+posts[i].counter+"</span>"+
                          "<i class='bi bi-trash3' id='trash-"+i+"' style='font-size:18px; margin-left:30px; color:grey; vertical-align:top;'></i>"+
                          "<span id='pid"+i+"' style='display:inline-block; width:0px; visibility:hidden;'>" +
                          posts[i].postId +
                          "</span></li>")
                          else
                          $("#allPosts").append(
                            "<li id='posts" +
                              i +
                              "'class='list-group-item m-2' style='color:red;'>" +
                              
                              "<span style='display:inline-block; width:240px; vertical-align:top;'>" +
                              posts[i].topic +
                              "</span>"+
                              "<span style='display:inline-block; width:750px; vertical-align:top;'>" +
                              posts[i].post +
                              "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                              $.format.date(posts[i].date,"dd-MM-yyyy") +
                              "</span><span style='display:inline-block; width:90px; vertical-align:top;'>" +
                              posts[i].username +
                              "</span>"+
                              "<i class='bi bi-hand-thumbs-up-fill' id='ico-"+i+"' style='font-size:20px; color:blue; vertical-align:top;'></i>"+
                              "<span id='likeCounts"+i+"' style='margin-left:10px; vertical-align:top;'>"+posts[i].counter+"</span>"+
                              "<i class='bi bi-trash3' id='trash-"+i+"' style='font-size:18px; margin-left:30px; color:grey; vertical-align:top;'></i>"+
                              "<span id='pid"+i+"' style='display:inline-block; width:0px; visibility:hidden;'>" +
                              posts[i].postId +
                              "</span>"+
                              "</li>")
                              
                }
            }
            else{
                $("#allPosts").empty();
    $("#allPosts").append(
      "<li class='list-group-item m-1' style='color:blue'>"+
      "<span style='display:inline-block; margin-left:10px; width:240px'>Topic</span>" +
      "<span style='display:inline-block; width:780px'>Message Posted</span>" +
        "<span style='display:inline-block; width:110px'>Date</span>" +
        "<span style='display:inline-block; width:100px'>Posted By</span>" +
        "<span style='display:inline-block; width:auto'>Likes</span>" +
        "</li>"
    );
                for(i=0; i<posts.length;i++){
                    if(posts[i].counter==0)
                    $("#allPosts").append(
                        "<li id='posts" +
                          i +
                          "'class='list-group-item m-2' style='color:red;'>" +
                          "<span style='display:inline-block; width:240px; margin-left:0px; vertical-align:top;'>" +
                          posts[i].topic +
                          "</span>"+
                          "<span style='display:inline-block; width:780px; vertical-align:top;'>" +
                          posts[i].post +
                          "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                          $.format.date(posts[i].date,"dd-MM-yyyy") +
                          "</span><span style='display:inline-block; width:90px; vertical-align:top;'>" +
                          posts[i].username +
                          "</span>"+
                          "<i class='bi bi-hand-thumbs-up-fill' id='ico-"+i+"' style='font-size:20px; color:grey; vertical-align:top;'></i>"+
                          "<span id='likeCounts"+i+"' style='margin-left:10px; vertical-align:top;'>"+posts[i].counter+"</span>"+
                          "<span id='pid"+i+"' style='display:inline-block; width:0px; visibility:hidden;'>" +
                          posts[i].postId +
                          "</span></li>")
                          else
                          $("#allPosts").append(
                            "<li id='posts" +
                              i +
                              "'class='list-group-item m-2' style='color:red;'>" +
                              
                              "<span style='display:inline-block; width:240px; vertical-align:top;'>" +
                              posts[i].topic +
                              "</span>"+
                              "<span style='display:inline-block; width:780px; vertical-align:top;'>" +
                              posts[i].post +
                              "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                              $.format.date(posts[i].date,"dd-MM-yyyy") +
                              "</span><span style='display:inline-block; width:90px; vertical-align:top;'>" +
                              posts[i].username +
                              "</span>"+
                              "<i class='bi bi-hand-thumbs-up-fill' id='ico-"+i+"' style='font-size:20px; color:blue; vertical-align:top;'></i>"+
                              "<span id='likeCounts"+i+"' style='margin-left:10px; vertical-align:top;'>"+posts[i].counter+"</span>"+
                              "<span id='pid"+i+"' style='display:inline-block; width:0px; visibility:hidden;'>" +
                              posts[i].postId +
                              "</span>"+
                              "</li>")
                }
            }
        
})