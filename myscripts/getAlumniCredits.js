$(function(){
       // $("#numLect").spinner();
 var aid=$.session.get("aid")
 let uName=$.session.get("userName")
 
 $("#alumniName").text($("#alumniName").text()+" "+$.session.get("fname")+" "+$.session.get("lname"))
 $.ajax({
   url:"http://localhost:8000/viewCredits/"+aid,
   type:"GET",
   datatype:"json",
   success:function(result){
     console.log(result)
     
      $("#exNumLect").text(result[0].numLectGiven)
      $("#exNumInterns").text(result[0].numInternGot)
      $("#exNumPlacements").text(result[0].numPlacementsGot)
      $("#exAmtDonated").text(result[0].amountDonated.toFixed(2))
      $("#exCreditPoints").text(result[0].alumniPerformanceIndex)
      $("#exProfPoints").text(result[0].professionPoints)
      $("#exAwardPoints").text(result[0].awardPoints)
   }
 })

 $("#back1").on("click",function(e){
    e.preventDefault()
    $.session.set("loginStatus",false)
    if(uName=="alcord")
    window.location = "../components/alumniCoordinator.html"
    else if(uName=="principal")
    window.location = "../components/principal.html"
    else
    window.location = "../components/hod.html"
  })


  $("#performanceUpdate").on("click",function(e){
   e.preventDefault()
   let numLect =parseInt( $("#numLect").val())
   let numInterns = parseInt($("#numInterns").val())
   let numPlacements = parseInt($("#numplacements").val())
   let amtDonated = parseInt($("#AmtDonated").val())
   let professionPoints = parseInt($("#newProfPoints").text())
   let awardPoints = parseInt($("#newAwardPoints").text())
   let credits = 0
   
   // let aid = $.session.get("aid")
   switch(amtDonated){
    case 1000:amtDonated=10; break;
    case 5000:amtDonated=20; break;
    case 10000:amtDonated=30; break;
    case 25000:amtDonated=40; break;
    case 50000:amtDonated=80; break;
    case 100000:amtDonated=100; break;
   }

  credits = (numLect*10)+(numInterns*20)+(numPlacements*40)+(amtDonated)+(professionPoints)+(awardPoints)
   
   $.ajax({
     url:"http://localhost:8000/updateCredits",
     datatype:"json",
     type:"POST",
     data:{"alumniId":aid,"numLect":numLect,"numInterns":numInterns,"numPlacements":numPlacements,"amtDonated":amtDonated,"professionPoints":professionPoints,"awardPoints":awardPoints,"credits":credits},
     success:function(result){
       $.ajax({
         url:"http://localhost:8000/viewCredits/"+aid,
         type:"GET",
         datatype:"json",
         success:function(result){
          $("#exNumLect").text(result[0].numLectGiven)
          $("#exNumInterns").text(result[0].numInternGot)
          $("#exNumPlacements").text(result[0].numPlacementsGot)
           $("#exAmtDonated").text(result[0].amountDonated.toFixed(2))
           $("#exCreditPoints").text(result[0].alumniPerformanceIndex)
           $("#exProfPoints").text(result[0].professionPoints)
           $("#exAwardPoints").text(result[0].awardPoints)
           
         }
       })
      // alert("Update Successful...")
     }
   })
   $("#numLect").val(0)
   $("#numInterns").val(0)
   $("#numPlacements").val(0)
   $("#AmtDonated").val(0)
   $("#newProfPoints").text(0)
   $("#newAwardPoints").text(0)
   
    $("#creditPoints").text(credits)
 }) //Click EVent end


 $("#prof").on("change",function(e){
  e.preventDefault()
    if($("#prof :selected").val()=="Self Employed")
    {
      $("#desgn").empty()
        $("#desgn").append("<option>Choose Designation</option>")
        $("#desgn").append("<option>CEO</option>")
        $("#desgn").append("<option>CFO</option>")
        $("#desgn").append("<option>CTO</option>")
        $("#desgn").append("<option>Other</option>")
       
    }
    else if($("#prof :selected").val()=="Working")
    {
      $("#desgn").empty()
      $("#desgn").append("<option>Choose Designation</option>")
      $("#desgn").append("<option>Manager</option>")
      $("#desgn").append("<option>Deputy Manager</option>")
      $("#desgn").append("<option>Project Leader</option>")
      $("#desgn").append("<option>Designer</option>")
      $("#desgn").append("<option>Engineer</option>")
      $("#desgn").append("<option>Other</option>")
    }
    else
    {
      $("#desgn").empty()
      $("#desgn").append("<option>Choose Designation</option>")
      $("#desgn").append("<option>Other</option>")
    }
 })


 $("#desgn").on("click",function(e){
  e.preventDefault()
  if($("#prof :selected").val()=="Choose Profession") alert("Choose Profession first")
 })



 $("#desgn").on("change",function(e){
  e.preventDefault()
      switch($("#desgn :selected").text()){
        case 'CEO':$("#newProfPoints").text(90);break;
        case 'CFO':$("#newProfPoints").text(80);break;
        case 'CTO':$("#newProfPoints").text(70);break;
        case 'Manager':$("#newProfPoints").text(60);break;
        case 'Deputy Manager':$("#newProfPoints").text(50);break;
        case 'Project Leader':$("#newProfPoints").text(40);break;
        case 'Designer':$("#newProfPoints").text(30);break;
        case 'Engineer':$("#newProfPoints").text(20);break;
        case 'Other':$("#newProfPoints").text(10);break;
      }
 })



 $("#awards").on("change",function(e){
  e.preventDefault()
      switch($("#awards :selected").val()){
        case 'Choose Awards':alert("Choose Proper Award")
        case 'Best Performer Of the Year':$("#newAwardPoints").text('90');break;
        case 'State Govt. Award':$("#newAwardPoints").text(60);break;
        case 'Young Engineer Award':$("#newAwardPoints").text(50);break;
        case 'Central Govt. Award':$("#newAwardPoints").text(80);break;
        case 'Scientist in premier Organizations':$("#newAwardPoints").text(70);break;
        case 'Young Scientist Award':$("#newAwardPoints").text(40);break;
        case 'Best Start-up Award':$("#newAwardPoints").text(50);break;
        case 'Other':$("#newAwardPoints").text(20);break;
      }
 })
})