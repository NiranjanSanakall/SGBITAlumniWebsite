$(function(){


//     function formatDate(currentDate){


// const currentDayOfMonth = currentDate.getDate()
// const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
// const currentYear = currentDate.getFullYear();
//  currentMonth+=1
// const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear
// return dateString
// }
let uName=$.session.get("userName")

$("#backForContribution").on("click",function(e){
    e.preventDefault()
    $.session.set("loginStatus",false)
    if(uName=="alcord")
    window.location = "../components/alumniCoordinator.html"
    else if(uName=="principal")
    window.location = "../components/principal.html"
    else
    window.location = "../components/hod.html"
  })


    $.ajax({
        url:"http://localhost:8000/monetaryContribution",
        type:"GET",
        dataType:"json",
        success:function(result){
            console.log(result)
        $(".box1").css("visibility","visible")

          $("#").empty();
          $("#monetaryContribution").empty();
          $("#monetaryContribution").append(
            "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; margin-left:20px; width:90px'>First Name</span>" +
              "<span style='display:inline-block; width:120px'>Last Name</span>" +
              "<span style='display:inline-block; width:80px'>Pass-Year</span>" +
              "<span style='display:inline-block; width:90px'>Phone No.</span>" +
              "</span><span style='display:inline-block; width:230px'>EmailId" +
              "</span><span style='display:inline-block; width:110px'>WorkingAt" +
              "</span><span style='display:inline-block; width:100px'>City" +
              "</span><span style='display:inline-block; width:80px'>Image" +
              "</span><span style='display:inline-block; width:140px'>DomainExpertise" +
              "</span><span style='display:inline-block; width:100px'>Appr-Status" +
              "</span>"+
              "</li>"
          );

          for(let i=0;i<result.length;i++){
            $("#monetaryContribution").append(
                "<li id='student" +
                  i +
                  "'class='list-group-item m-2' style='color:red'>" +
                  "<span  id='aid"+i+"' style='visibility:hidden'>" +
                result[i].alumniID +
                  "</span><span style='display:inline-block; width:90px'>" +
                  result[i].alumniID +
                  "</span><span style='display:inline-block; width:120px'>" +
                  result[i].alumniID +
                  "</span><span style='display:inline-block; width:70px'>" +
                  result[i].alumniID +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                  result[i].alumniID +
                  "</span><span  style='display:inline-block; width:220px'>" +
                  result[i].alumniID +
                  "</span><span style='display:inline-block; width:100px'>" +
                  result[i].alumniID +
                  "</span><span style='display:inline-block; width:100px'>" +
                  result[i].alumniID +
                  "</span><span style='display:inline-block; width:80px'><img src='" +
                  result[i].alumniID +
                  "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
                  result[i].alumniID +
                  "</span>"+
                  "<span style='display:inline-block; width:100px; color:green' id='aStatus"+i+"'>" +
                  result[i].alumniID +
                  "</span>"+
                  "<span style='display:inline-block; margin-left:10px'><button class='btn btn-sm btn-warning' id='alumniCredits"+i+"'>Credits</button> " +
                  "</span></li>"
              );
          }
        }
    })
    $.ajax({
        url:"http://localhost:8000/expertTalkList",
        type:"GET",
        dataType:"json",
        success:function(result){
            console.log(result)
            $(".box1").css("visibility","visible")

        //   $("#").empty();
          $("#expertTalkList").empty();
          $("#expertTalkList").append("<li style='margin-left:50px; font-size:25px; font-weight:bold; color:Yellow'>Expert Talk</li>")
          if(result.length==0)
          $("#expertTalkList").append("<li style='margin-left:600px;  font-weight:bold;'>No Results for expert talk</li>")
          else{
          $("#expertTalkList").append(
            "<li class='list-group-item m-1' style='color:blue'><span style='display:inline-block; width:90px'>First Name</span>" +
              "<span style='display:inline-block; width:120px'>Last Name</span>" +
              "<span style='display:inline-block; width:200px'>Subject</span>" +
              "<span style='display:inline-block; width:350px'>Message</span>" +
              "</span><span style='display:inline-block; width:180px'>TargetAudience" +
              "</span><span style='display:inline-block; width:100px'>Date" +
              "</span><span style='display:inline-block; width:180px'>EmailId" +
              "</span>"+
              "</li>"
          );

          for(let i=0;i<result.length;i++){
            $("#expertTalkList").append(
                "<li id='expTL" +
                  i +
                  "'class='list-group-item m-2' style='color:red; vertical-align:top;'>" +
                  "<span style='display:inline-block; width:90px; vertical-align:top;'>" +
                  result[i].fname +
                  "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                  result[i].lname +
                  "</span><span style='display:inline-block; width:200px; vertical-align:top;'>" +
                  result[i].subject +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:350px; vertical-align:top;'>" +
                  result[i].message +
                  "</span><span  style='display:inline-block; width:180px; vertical-align:top;'>" +
                  result[i].targetAudience +
                  "</span><span  style='display:inline-block; width:100px; vertical-align:top;'>" +
                  $.format.date(result[i].ydate,"dd-MM-yyyy") +
                  "</span><span  style='display:inline-block; width:180px; vertical-align:top;'>" +
                  result[i].emailId +
                  "</span><span  id='aid"+i+"' style='visibility:hidden;width:0px; vertical-align:top;'>" +
                  result[i].messageId +
                    "</span></li>"
              );
          }
            }
        }
    })
    $.ajax({
        url:"http://localhost:8000/internshipList",
        type:"GET",
        dataType:"json",
        success:function(result){
            console.log(result)
            $(".box1").css("visibility","visible")

        //   $("#").empty();
          $("#internshipList").empty();
          $("#internshipList").append("<li style='margin-left:50px; font-size:25px; font-weight:bold; color:Yellow'>Internships</li>")
          if(result.length==0)
          $("#internshipList").append("<li style='margin-left:600px;  font-weight:bold;'>No Results for expert talk</li>")
          else{
          $("#internshipList").append(
            "<li class='list-group-item m-1' style='color:blue'><span style='display:inline-block; width:90px'>First Name</span>" +
              "<span style='display:inline-block; width:120px'>Last Name</span>" +
              "<span style='display:inline-block; width:120px'>Organization</span>" +
              "<span style='display:inline-block; width:120px'>No. Of Interns</span>" +
              "<span style='display:inline-block; width:80px'>Stipend</span>" +
              "<span style='display:inline-block; width:180px'>Prerequisites</span>" +
              "<span style='display:inline-block; width:80px'>Durations</span>" +
              "</span><span style='display:inline-block; width:160px'>TargetAudience" +
              "</span><span style='display:inline-block; width:100px'>Date" +
              "</span><span style='display:inline-block; width:120px'>EmailId" +
              "</span>"+
              "</li>"
          );

          for(let i=0;i<result.length;i++){
            $("#internshipList").append(
                "<li id='expTL" +
                  i +
                  "'class='list-group-item m-2' style='color:red'>" +
                  "<span style='display:inline-block; width:90px'>" +
                  result[i].fname +
                  "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                  result[i].lname +
                  "</span><span style='display:inline-block; width:120px; vertical-align:top;'>" +
                  result[i].organization +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:120px; vertical-align:top;'>" +
                  result[i].numOfInterns +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:80px; vertical-align:top;'>" +
                  result[i].stipendAvailability +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:180px; vertical-align:top;'>" +
                  result[i].prerequisites +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:80px; vertical-align:top;'>" +
                  result[i].duration +
                  "</span><span  style='display:inline-block; width:160px; vertical-align:top;'>" +
                  result[i].targetAudience +
                  "</span><span  style='display:inline-block; width:100px; vertical-align:top;'>" +
                  $.format.date(result[i].xdate,"dd-MM-yyyy") +
                  "</span><span  style='display:inline-block; width:120px; vertical-align:top;'>" +
                  result[i].emailId +
                  "</span><span  id='aid"+i+"' style='visibility:hidden; vertical-align:top;'>" +
                  result[i].internshipId +
                    "</span></li>"
              );
          }
            }
        }
    })
    $.ajax({
        url:"http://localhost:8000/placementsList",
        type:"GET",
        dataType:"json",
        success:function(result){
            console.log(result)
            $(".box1").css("visibility","visible")

        //   $("#").empty();
          $("#placementsList").empty();
          $("#placementsList").append("<li style='margin-left:50px; font-size:25px; font-weight:bold; color:Yellow'>Placements</li>")
          if(result.length==0)
          $("#placementsList").append("<li style='margin-left:600px;  font-weight:bold;'>No Results for expert talk</li>")
          else{
          $("#placementsList").append(
            "<li class='list-group-item m-1' style='color:blue'><span style='display:inline-block; width:90px'>First Name</span>" +
              "<span style='display:inline-block; width:120px'>Last Name</span>" +
              "<span style='display:inline-block; width:120px'>Organization</span>" +
              "<span style='display:inline-block; width:100px'>No. Of Posts</span>" +
              "<span style='display:inline-block; width:100px'>Eligibility</span>" +
              "<span style='display:inline-block; width:180px'>Prerequisites</span>" +
              "<span style='display:inline-block; width:80px'>Package</span>" +
              "</span><span style='display:inline-block; width:160px'>TargetAudience" +
              "</span><span style='display:inline-block; width:100px'>Date" +
              "</span><span style='display:inline-block; width:100px'>EmailId" +
              "</span>"+
              "</li>"
          );

          for(let i=0;i<result.length;i++){
            $("#placementsList").append(
                "<li id='expTL" +
                  i +
                  "'class='list-group-item m-2' style='color:red; vertical-align:top;'>" +
                  "<span style='display:inline-block; width:90px'>" +
                  result[i].fname +
                  "</span><span style='display:inline-block; width:120px'>" +
                  result[i].lname +
                  "</span><span style='display:inline-block; width:120px'>" +
                  result[i].organization +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                  result[i].numOfOpenings +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                  result[i].eligibility +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:180px'>" +
                  result[i].prerequisites +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:80px'>" +
                  result[i].package +
                  "</span><span  style='display:inline-block; width:160px'>" +
                  result[i].targetAudience +
                  "</span><span  id='aid"+i+"' style='visibility:hidden'>" +
                  "</span><span  style='display:inline-block; width:100px'>" +
                  $.format.date(result[i].zdate,"dd-MM-yyyy") +
                  "</span><span  style='display:inline-block; width:150px'>" +
                  result[i].emailId +
                  "</span><span  id='aid"+i+"' style='visibility:hidden'>" +
                  result[i].placementId +
                    "</span></li>"
              );
          }
            }
        }
    })


})