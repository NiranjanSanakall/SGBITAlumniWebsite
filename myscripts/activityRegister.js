$(function(){
    
    let uName=$.session.get("userName")

    $("#backForActivityRegister").on("click",function(e){
        e.preventDefault()
        $.session.set("loginStatus",false)
        if(uName=="alcord")
        window.location = "../components/alumniCoordinator.html"
        else if(uName=="principal")
        window.location = "../components/principal.html"
        else
        window.location = "../components/hod.html"
      })

    $("#add").on("click",function(){
        let aname=$("#aname").val()
        let resourcePersonName=$("#rname").val()
        let resourcePersonCompanyName=$("#rcname").val()
        let adate=$("#dateOfActivity").val()
        let atime=$("#timeOfActivity").val()
        let dName=$("#department :selected").val()
        let desc = $("#activityDesc").val()
        if(dName == "Select Department") alert("Select Department")

        
        $.ajax({
        url:"http://localhost:8000/activityRegistration",
        type:"POST",
        dataType:"json",
        data:{"aname":aname,"desc":desc,"resourcePersonName":resourcePersonName,"resourcePersonCompanyName":resourcePersonCompanyName,"adate":adate,"atime":atime,"dName":dName},
        success:function(result){
            alert("Registraion Of Activity Succesful!!!")
        }


        })
    })
})