$(function(){

   let uName = $.session.get("userName")
   let alumniId = $.session.get("alumniId")
    let historyData=[]
    $("#history").on("click",function(e){
        e.preventDefault()

        $(window).scrollTop($(document).height());
       
        $("#historyList").empty()
        //Fetch past work history of student if any and display below his profie..
        $.ajax({
            url:"http://localhost:8000/profileHistory/"+alumniId,
            type:"GET",
            dataType:"json",
            success:function(result){
                historyData=result
                
                if(historyData.length>0){

                    $("#historyList").append("<li class='list-group-item m-2' style='width: 950px; backGround-color:rgb(200, 270, 70); border-radius:15px; font-family:Arial, Helvetica, sans-serif'><span style='margin-left: 380px; font-size:20px;'>Your Work History</span></li>")
                $("#historyList").append(
                    "<li class='list-group-item m-1' style='color:blue'><span style='display:inline-block; width:60px'>Sl.No.</span>"+"<span style='display:inline-block; width:150px'>Company Name</span>" +
                      "<span style='display:inline-block; width:100px'>City</span>" +
                      "<span style='display:inline-block; width:100px'>Start Year</span>" +
                      "<span style='display:inline-block; width:100px'>End Year</span>" +
                      "</span><span style='display:inline-block; width:200px'>Designation" +
                      "</span><span style='display:inline-block; width:200px'>Work Domain" +
                      "</span></li>")

                for(let i=0;i<historyData.length;i++)
                {
                    
                    $("#historyList").append(
                      "<li id='student"+i+"'class='list-group-item m-2' style='color:red'><span style='display:inline-block; width:60px'>"+(i+1)+".</span><span style='display:inline-block; width:150px'>"
                      +historyData[i].companyName+"</span>"
                      +"<span style='display:inline-block; width:110px'>"
                      +historyData[i].city+"</span>"
                      +"<span style='display:inline-block; width:100px'>"
                      +historyData[i].stYear+"</span>"
                      +"<span style='display:inline-block; width:100px'>"
                      +historyData[i].enYear+"</span>"
                      +"<span style='display:inline-block; width:200px'>"
                      +historyData[i].designation+"</span>"
                      +"<span style='display:inline-block; width:200px'>"
                      +historyData[i].workDomain+"</span></li>"
                    )
                }
            }
                else
                   $("#historyList").append("<li style='font-size:20px; font-weight:bold;'>No work History</li>")
            }
        })
    
       
    })

})