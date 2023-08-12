$(function(){

let profileData=[]


let uName = $.session.get('userName')

  $("#year1ForAlumni").empty();
    $("#year1ForAlumni").append("<option selected>" +"Select Year"+ "</option>");
  for (let i = 2010; i < 2027; i++) {
    $("#year1ForAlumni").append("<option>" + i + "</option>");
  }
    
   
    $.ajax({
        url:"http://localhost:8000/getAlumniHomePage/"+uName,
        type:"GET",
        dataType:"json",
        success:function(result){
            profileData=result
            console.log(result)
            $("#profileList").empty()
      if(profileData.length!=0)
      $("#profileList").append(
        "<li id='student'  style='color:blue; font-size:20px; margin:25px 0px 0px 0px' >" +
         
          "<img src='"+profileData[0].imageURL+"' style='width:120px; margin-left:50px; height:120px; border-radius:60px' alt='ProfilePhoto'><br>" +
        "<br><span style='display:inline-block; width:150px; color:grey'>First Name :</span>" +
          profileData[0].fname +
          "<br><span style='display:inline-block; width:150px; color:grey'>Last Name :</span>" +
          profileData[0].lname +
          "<br> <span style='display:inline-block; width:150px; color:grey'>Year Of Passing :</span>" +
          profileData[0].yearOfPassing +
          "<br> <span style='display:inline-block; width:150px; color:grey'>Phone Number :</span>" +
          profileData[0].cellNum +
          "<br><span style='display:inline-block; width:150px; color:grey'>Email Id :</span>" +
          profileData[0].emailid +
          "<br><span style='display:inline-block; width:150px; color:grey'>Working At :</span>" +
          profileData[0].presentlyworkingAtCompany +
          "<br><span style='display:inline-block; width:150px; color:grey'>city :</span>" +
          profileData[0].city +
          "<br><span style='display:inline-block; width:150px; color:grey'>Domain :</span>" +
          profileData[0].domainExpertise +
          "<br></li>"
      )  
      else
      alert("No matching User..")      
        }
    })
    
let activities = []
    $.ajax({
      url: "http://localhost:8000/viewAllActivity",
      type: "GET",
      dataType: "json",
      success: function (result) {
        activities = result;
      },
    })


    $("#viewAllActivityForAlumni").on("click", function () {

      $(".box1").css("visibility","visible")
      $("#viewOfAlumni").empty();
      $("#pastViewOfAlumni").empty();
      $("#viewOfAlumni").append("<li style='margin-left:30px; color: blue; font-size:30px; font-style:bold'>Upcoming Activities</li>")
      let numOfPresentActivities = 0
      let numOfPastActivities = 0
      for (let i = 0; i < activities.length; i++) {
        // This loop is to check if there are any activities either in past or in upcoming
        let todayDate = new Date()
        let OtherDate = new Date(activities[i].activityDate)
        if(todayDate<=OtherDate)
        numOfPresentActivities++
        else
        numOfPastActivities++
        }
      if(numOfPresentActivities==0)
      $("#viewOfAlumni").append("<li style='margin-left: 150px; color: red'>No Upcoming Activities</li>")
      else
      $("#viewOfAlumni").append(
        "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
          "<span style='display:inline-block; width:130px'>Resource Person</span>" +
          "<span style='display:inline-block; width:130px'>Company Name</span>" +
          "<span style='display:inline-block; width:180px'>Activity Date</span>" +
          "<span style='display:inline-block; width:110px'>Activity Time</span>" +
          "</span></li>"
      )
      $("#pastViewOfAlumni").append("<li style='margin-left:30px; color: blue; font-size:30px; font-style:bold'>Past Activities</li>")
      if(numOfPastActivities==0)
      $("#pastViewOfAlumni").append("<li style='margin-left: 150px; color: red'>No Past Activities</li>")
      else{
        
        $("#pastViewOfAlumni").append(
          "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
            "<span style='display:inline-block; width:130px'>Resource Person</span>" +
            "<span style='display:inline-block; width:130px'>Company Name</span>" +
            "<span style='display:inline-block; width:180px'>Activity Date</span>" +
            "<span style='display:inline-block; width:110px'>Activity Time</span>" +
            "</span></li>")
      }
        
      for (let i = 0; i < activities.length; i++) {
        // if activity is present or future display in view else Display in past view
        let todayDate = new Date()
        let OtherDate = new Date(activities[i].activityDate)
        if(todayDate<=OtherDate)
        
        $("#viewOfAlumni").append(
          "<li id='activity"+i+"'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            activities[i].activityName+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePerson+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePersonCompanyName+
            "</span><span style='display:inline-block; width:180px'>" +
            $.format.date(activities[i].activityDate,"dd-MM-yyyy")+
            "</span><span style='display:inline-block; width:110px'>" +
            activities[i].activityTime+
            "</span></li>"
  
        );
        else{
        $("#pastViewOfAlumni").append(
          "<li id='pastActivity"+i+"'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            activities[i].activityName+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePerson+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePersonCompanyName+
            "</span><span style='display:inline-block; width:180px'>" +
            $.format.date(activities[i].activityDate,"dd-MM-yyyy")+
            "</span><span style='display:inline-block; width:110px'>" +
            activities[i].activityTime+
            "</span>"+
            "<span id='aid"+i+"' style='display:inline-block; width:35px; visibility:hidden'>" +
            activities[i].activityID+
            "</span>"+
          "<span style='display:inline-block;'><button class='btn btn-sm btn-secondary mx-3' id='viewReport"+i+"'>ViewReport</button> " +
          "</span></li>")
        }
      }
      });

      let activityByYear = []
      $("#year1ForAlumni").on("change", function () {
        let yearOfPassing = $("#year1ForAlumni :selected").val();
        $.ajax({
          url: "http://localhost:8000/viewActivityByYear",
          type: "POST",
          dataType: "json",
          data: { "year1": yearOfPassing },
          success: function (result) {
            activityByYear = result;
            console.log(activityByYear)
          },
        });
      });

    
      $("#viewActivityByYearForAlumni").on("click", function () {
        
        if( $("#year1ForAlumni :selected").val()=="Select Year") alert("Select Year")
        else{
    
        $(".box1").css("visibility","visible")
    
        $("#viewOfAlumni").empty();
        $("#pastViewOfAlumni").empty();
        if(activityByYear.length==0)
        $("#viewOfAlumni").append("<li style='margin-left: 150px; color: red'>No Past Activities</li>")
        else{
        $("#viewOfAlumni").append(
            "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
            "<span style='display:inline-block; width:130px'>Resource Person</span>" +
            "<span style='display:inline-block; width:120px'>Activity Date</span>" +
            "<span style='display:inline-block; width:100px'>Activity Time</span>" +
            "</span><span style='display:inline-block; width:200px'>No. of Students Attended" +
            "</span><span style='display:inline-block; width:100px'>Image" +
            "</span></li>"
        );
      
        for (let i = 0; i < activityByYear.length; i++) {
          $("#viewOfAlumni").append(
            "<li id='activityByYear" +
              i +
              "'class='list-group-item m-2' style='color:red'>" +
              "<span style='display:inline-block; width:130px'>" +
              activityByYear[i].activityName+
              "</span><span style='display:inline-block; width:130px'>" +
              activityByYear[i].resourcePerson+
              "</span><span style='display:inline-block; width:120px'>" +
              $.format.date(activityByYear[i].activityDate,"dd-MM-yyyy")+
              "</span><span style='display:inline-block; width:100px'>" +
              activityByYear[i].activityTime+
              "</span><span style='display:inline-block; width:220px'>" +
              activityByYear[i].numStudentsAttended+
              "</span><span style='display:inline-block; width:100px'>" +
              activityByYear[i].image+
              "</span></li>"
          );
    
        }
      }
      }
      });
    

      $("#pastViewOfAlumni").on("click","button",function(e){
    
  
        var formData=new FormData();
        var idx = $(this).attr("id")
        let buttonName = idx.substring(0,idx.length-1)
        let i = idx.substring(idx.length-1)
        let activityId = $("#aid"+i).text()
      
        
        // $.session.set("activityId",activityId)
       
        switch(buttonName){
          case 'viewReport': 
          $.ajax({
            url: 'http://localhost:8000/downloadPdf/'+activityId,
            method: 'GET',
            xhrFields: {
              responseType: 'blob' // Set the response type to blob
            },
            success: function(data) {
              e.preventDefault()
              let pdfBlob = new Blob([data]);
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(pdfBlob);
              link.download = 'file.pdf';
              link.click();
             
              var fileUrl ="../activityReport/"+activityId+"Report.pdf";  
              // Replace with the actual file URL
  
              // Open the file in a new tab or window
              window.open(fileUrl, '_blank');
  
          
          },
            error: function(xhr, status, error) {
              console.error(error);
            }
        
          });
          break;
        }
    
})

$("#backForViewActivity").on("click",function(e){
  e.preventDefault()
  $.session.set("loginStatus",false)
  window.location = "../components/home.html"
})
$("#alumniLogOut").on("click",function(e){
  e.preventDefault()
  $.session.set("loginStatus",false)
  window.location = "../index.html"
})

})
