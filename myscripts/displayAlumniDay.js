$(function(){


    $("#setAlumniDayBtn").on("click",function(e){
    e.preventDefault()
    
    let alumniDayDate=$.format.date($("#alumniDayDate").val(),"dd-MM-yyyy")
    // alert(alumniDayDate)
    let alumniDayTime=$("#alumniDayTime").val()
    let alumniDayForBranch=$.session.get("dName")
    // alert(alumniDayForBranch)
    let alumniDayVenue=$("#alumniDayVenue").val()
    

    $.ajax({
        url:"http://localhost:8000/storeAlumniDay",
        type:"POST",
        dataType:"json",
        data:{"alumniDayDate":alumniDayDate,"alumniDayTime":alumniDayTime,"alumniDayVenue":alumniDayVenue,"alumniDayForBranch":alumniDayForBranch},
        success:function(result){
            alert("Alumni Day Updated Successfully")
        }
    })

})
let uName=$.session.get("userName")

$("#backForAlumniDay").on("click",function(e){
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