$(function(){


    var fname=$.session.get("fname")
    var lname=$.session.get("lname")
    var emailid =$.session.get("emailid")

    $("#backForSendMessage").on("click",function(e){
        e.preventDefault()
        window.location = "../components/home.html"
    })

    let firstTime=true
    $("#selectTargets").on("change",function(e){
        e.preventDefault()
        if($("#selectTargets :selected").val()=="Add Target Audience")
        alert("Select Audience")
        else{
        if($("#selectTargets :selected").val()=="Clear All"){
            firstTime=true
            $("#targets").val("")
        }
        else if($("#selectTargets :selected").val()=="All"){
            firstTime=true
            $("#targets").val("All")
        }
        else {
           let allTargets=$("#selectTargets :selected").val()
            if(firstTime){
            $("#targets").val("('"+$("#selectTargets :selected").val()+"')")
            firstTime=false
            }
            else{
                let targets = $("#targets").val()
                $("#targets").val(targets.substring(0,targets.length-1)+",'"+allTargets+"')")
            }
        }
        }
    })


    $("#sendMailForExpertTalk").on("click",function(e){
        e.preventDefault()
        let subject = $("#expSubject").val()
        let message = $("#expMessage").val()
        let tAudience = $("#targets").val()

        if(subject=="" || message=="" || tAudience=="") alert("Please Enter All Details")
        else{
        $.ajax({
            url:"http://localhost:8000/addDataForExpertTalk",
            type:"POST",
            // async:false,
            dataType:"json",
            data:{"fname":fname,"lname":lname,"subject":subject,"message":message,"targetAudience":tAudience,"emailid":emailid},
            success:function(result){
                alert("Data Added...")
            }
        })
        $.ajax({
            url:"http://localhost:8000/expertTalkMail",
            type:"POST",
            dataType:"json",
            data:{"fname":fname,"lname":lname,"subject":subject,"message":message,"targetAudience":tAudience,"emailid":emailid},
            success: async function(result){
                alert("Email Sent To HOD...")
            }
        })
    }
    })



    $("#sendMailForPlacements").on("click",function(e){
        e.preventDefault()
        let organization = $("#organization").val()
        let numOfOpenings = $("#numOfOpenings :selected").val()
        let eligibility = $("#eligibility").val()
        let prerequisites = $("#prerequisites").val()
        let package = $("#package").val()
        let targetAudience = $("#targets").val()

        if(organization=="" || numOfOpenings=="No. of Openings" || eligibility=="" || prerequisites=="" || package=="" || targetAudience=="") alert("Please Enter All Details")
        else{
        $.ajax({
            url:"http://localhost:8000/addDataForPlacements",
            type:"POST",
            // async:false,
            dataType:"json",
            data:{"fname":fname,"lname":lname,"organization":organization,"numOfOpenings":numOfOpenings,"eligibility":eligibility,"prerequisites":prerequisites,"package":package,"targetAudience":targetAudience,"emailid":emailid},
            success:function(result){
                alert("Data Added...")
            }
        })
        $.ajax({
            url:"http://localhost:8000/placementsMail",
            type:"POST",
            dataType:"json",
            data:{"fname":fname,"lname":lname,"organization":organization,"numOfOpenings":numOfOpenings,"eligibility":eligibility,"prerequisites":prerequisites,"package":package,"targetAudience":targetAudience,"emailid":emailid},
            success: async function(result){
                alert("Email Sent To HOD...")
            }
        })
    }
    })



    // alert(emailid)
    $("#sendMailForInternship").on("click",function(e){
        e.preventDefault()
        
        let organization = $("#organization").val()
        let numOfInterns = $("#numOfInterns :selected").val()
        let stipendAvailability = $("input[name='Stipend']:checked").val()
        let prerequisites = $("#prerequisites").val()
        let duration = $("#duration").val()
        let targetAudience = $("#targets").val()
        

        if(organization=="" || numOfInterns=="No. of Interns" || stipendAvailability==undefined || prerequisites=="" || duration=="" || targetAudience=="") alert("Please Enter All Details")
        else{
        $.ajax({
            url:"http://localhost:8000/addDataForInternship",
            type:"POST",
            // async:false,
            dataType:"json",
            data:{"fname":fname,"lname":lname,"organization":organization,"numOfInterns":numOfInterns,"stipendAvailability":stipendAvailability,"prerequisites":prerequisites,"duration":duration,"targetAudience":targetAudience,"emailid":emailid},
            success:function(result){
                alert("Data Added...")
            }
        })
        $.ajax({
            url:"http://localhost:8000/internshipMail",
            type:"POST",
            dataType:"json",
            data:{"fname":fname,"lname":lname,"organization":organization,"numOfInterns":numOfInterns,"stipendAvailability":stipendAvailability,"prerequisites":prerequisites,"duration":duration,"targetAudience":targetAudience,"emailid":emailid},
            success: async function(result){
                alert("Email Sent To HOD...")
            }
        })
    }
    })
})