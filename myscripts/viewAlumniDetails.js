$(function(){

    let alumniHistoryId = $.session.get("alumniHistoryId")
   
    $.ajax({
        url:"http://localhost:8000/getAlumniHomePage/"+alumniHistoryId,
        type:"GET",
        dataType:"json",
        success:function(result){
            profileData=result
            console.log(result)
            $("#profileList").empty()
      if(profileData.length!=0)
      $("#profileList").append(
        "<li id='student'  style='color:blue; font-size:20px; margin:10px 0px 0px 0px' >" +
         
          "<img src='"+profileData[0].imageURL+"' style='width:120px; margin-left:80px; height:120px; border-radius:60px' alt='ProfilePhoto'><br>" +
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

    $("#historyList").empty()
        //Fetch past work history of student if any and display below his profie..
        $.ajax({
            url:"http://localhost:8000/profileHistory/"+alumniHistoryId,
            type:"GET",
            dataType:"json",
            success:function(result){
                historyData=result
                
                if(historyData.length>0){

                $("#historyList").append(
                    "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:50px'>Sl.No.</span>"+
                    "<span style='display:inline-block; width:130px'>Company Name</span>" +
                      "<span style='display:inline-block; width:90px'>City</span>" +
                      "<span style='display:inline-block; width:75px'>Start Year</span>" +
                      "<span style='display:inline-block; width:70px'>End Year</span>" +
                      "</span><span style='display:inline-block; width:180px'>Designation" +
                      "</span><span style='display:inline-block; width:175px'>Work Domain" +
                      "</span></li>")

                for(let i=0;i<historyData.length;i++)
                {
                    
                    $("#historyList").append(
                      "<li id='student"+i+"'class='list-group-item m-2' style='color:red'><span style='display:inline-block; width:50px'>"+(i+1)+
                      "</span><span style='display:inline-block; width:130px'>"
                      +historyData[i].companyName+"</span>"
                      +"<span style='display:inline-block; width:90px'>"
                      +historyData[i].city+"</span>"
                      +"<span style='display:inline-block; width:75px'>"
                      +historyData[i].stYear+"</span>"
                      +"<span style='display:inline-block; width:70px'>"
                      +historyData[i].enYear+"</span>"
                      +"<span style='display:inline-block; width:180px'>"
                      +historyData[i].designation+"</span>"
                      +"<span style='display:inline-block; width:175px'>"
                      +historyData[i].workDomain+"</span></li>"
                    )
                }
            }
                else
                   $("#historyList").append("<li>No work History</li>")
                
            }
        })


        let uName=$.session.get("userName")

$("#backForProfileDetails").on("click",function(e){
    e.preventDefault()
    $.session.set("loginStatus",false)
    if(uName=="alcord")
    window.location = "../components/alumniCoordinator.html"
    else if(uName=="principal")
    window.location = "../components/principal.html"
    else
    window.location = "../components/hod.html"
  })

  $("#revoke").on("click",function(e){
    e.preventDefault()
    $.ajax({
      url:"http://localhost:8000/revokeApprovalStatus/"+alumniHistoryId,
      type : "GET",
      dataType : "json",
      success : function(result){
        alert("Student Account Disabled...")
      }
  })

})


})