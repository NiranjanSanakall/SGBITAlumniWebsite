const dNames=["INSTITUTE","CSE","AIDS","ECE","EEE","CIVIL","MECH"]
$(function(){

    let dName=""
    for(let i=0;i<dNames.length;i++){
        dName=dNames[i]
        $.ajax({
            url:"http://localhost:8000/getAlumniDay/"+dName,
            type:"GET",
            dataType:"json",
            success:function(result){
                console.log(result)
                if(result.length>0){
                   switch(result[0].branchName){
                    case 'INSTITUTE' : $("#InstituteAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'CSE' : $("#CseAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'AIDS' : $("#AidsAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'ECE' : $("#EceAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'EEE' : $("#EeeAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'CIVIL' : $("#CivilAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'MECH' : $("#MechAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                    case 'CSBS' : $("#CsbsAlumniDay").text(formatDate(new Date(result[0].aDate))); break;
                   }
                }
                else{
                    $("#displayDate").text("To be announced")
                $("#displayTime").text("--")
                $("#displayVenue").text("--")
                }
            }
        })
    }
    
    let atleast1 = false
$.ajax({
    url:"http://localhost:8000/getEvents",
    type:"GET",
    dataType:"json",
    success:function(result){
        let todayDate = new Date()
        $("#anouncements").empty()
        $("#anouncements").append("<li style='list-style:none'><span style='font-weight:bold;'>Alumni Events</span><br></li>")
        for(let i=0;i<result.length;i++){
            let OtherDate = new Date(result[i].activityDate)
            if(todayDate<=OtherDate){
                atleast1 = true
            $("#anouncements").append("<li id='event"+i+"'>"+result[i].activityName+" "+$.format.date(result[i].activityDate,"dd-MM-yyyy")+"</li>")
            }
        }
        if(atleast1 == false)
        $("#anouncements").append("<li style='list-style:none'><span>No Upcoming Events</span><br></li>")
    }
})

function formatDate(currentDate){


  const currentDayOfMonth = currentDate.getDate()
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();
const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear
return dateString
}

})