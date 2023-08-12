$(function(){

    let firstTime=true
    // let firstTime1 = true
    $("#yearSelected").on("click",function(e){
        e.preventDefault()
        firstTime = true
    })
    $("#addYearsBtn").on("click",function(e){
        e.preventDefault()
        let allYears = $("#yearsForAdding :selected").val()
        if(firstTime){
        $("#yearSelected").val("("+allYears+")")
        firstTime = false
        }
        else{
            let firstYear = $("#yearSelected").val()
            $("#yearSelected").val(firstYear.substring(0,firstYear.length-1)+","+allYears+")")
        }
    })

    $("#sendMailBtn").on("click",function(e){
        e.preventDefault()

        // $("#yearSelected").val($("#yearSelected").val()+")")
        let subject = $("#mailSub").val()
        let description = $("#mailDescription").val()
        let link = $("#mailLink").val()
        let yearsAdded =$("#yearSelected").val()
        alert("hello")
        $.ajax({
            url:"http://localhost:8000/mailFromHod",
            type:"POST",
            dataType:"json",
            data:{"subject":subject,"description":description,"link":link,"yearsAdded":yearsAdded},
            success:async function(result){
                alert("Email Sent...")
                console.log(result)
            }
        })
    })

    let uName=$.session.get("userName")

    $("#backForMailSend").on("click",function(e){
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