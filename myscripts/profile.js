$(function(){
var details=[]
let uname = $.session.get('userName')
let alumniId = $.session.get('alumniId')

let currDate = new Date()
let year = currDate.getFullYear()

$("#domain").on("change", function (e) {
  e.preventDefault();
  if ($("#domain :selected").val() == "Other...")
    $("#other").css("visibility", "visible");
});

$.ajax({
  url:"http://localhost:8000/getDomains",
    type:"GET",
    dataType:"json",
    success:function(result){     
        console.log(result)
        $("#domain").empty()
        // $("#domain").append("<option selected>Choose Your Expertise</option>")
        for(let i=0; i<result.length;i++){
          $("#domain").append("<option>"+result[i].domainName+"</option>")
        }
        $("#domain").append("<option>Other...</option>")
      }
      })

      

//Fetch data from alumni student and display in Profile.html
$.ajax({
    url:"http://localhost:8000/getUpdateProfile",
    type:"POST",
    dataType:"json",
    data:{"userName":uname},
    success:function(result){
        details=result      
        console.log(details)

        $("#fname").val(details[0].fname)
    // $("#fname").val(details[0].fname)
    $("#lname").val(details[0].lname)
    let gender = result[0].gender
    if(gender=="M")
    $("#gender").val("Male")
    else  $("#gender").val("Female")
    $("#passingYear").val(details[0].yearOfPassing)
    $("#category").val(details[0].category)
    $("#cellNo").val(details[0].cellNum)
    $("#Email").val(details[0].emailid)
    $("#companyName").val(details[0].presentlyworkingAtCompany)
    $("#branchName").val(details[0].branchName)
    $("#city").val(details[0].city);
    $("#domain").val(details[0].domainExpertise);
    $("#id").val(details[0].login)
    $("#pwd").val(details[0].password)
    }

    })

    $("#updateAlumni").on("click",function(e){
        e.preventDefault()

        let fname = "";
        if ($("#fname").val() == "") alert("First Name is Required");
        else fname = $("#fname").val();
    
        let lname = "";
        if ($("#lname").val() == "") alert("Last Name is Required");
        else lname = $("#lname").val();
    
        let passingYear = "";
        if ($("#passingYear :selected").val() == "Choose your passing Year")
          alert("passingYear  is Required");
        else passingYear = $("#passingYear :selected").val();
    
        let category = "";
        if ($("#category :selected").val() == "Choose category")
          alert("category is Required");
        else category = $("#category :selected").val();
    
        let cellNo = "";
        if ($("#cellNo").val() == "") alert("Phone no  is Required");
        else cellNo = $("#cellNo").val();
    
        let Email = "";
        if ($("#Email").val() == "") alert("Email  is Required");
        else Email = $("#Email").val();
    
        let companyName = "";
        if ($("#companyName").val() == "") alert("companyName  is Required");
        else companyName = $("#companyName").val();
    
        let branchName = "";
        if ($("#branchName :selected").val() == "Choose your Branch")
          alert("Branch Name  is Required");
        else branchName = $("#branchName :selected").val();
    
        let city = "";
        if ($("#city :selected").val() == "Choose your working city")
          alert("city  is Required");
        else city = $("#city :selected").val();
    
        var fileInput = "";
        if($("#fileInput").val()=="") alert("Upload your Photo")
        else fileInput = $("#fileInput").val();
    
        let domain = "";
        if ($("#domain").val() == "Choose Your Expertise")
          alert("domain  is Required");
        else if ($("#domain :selected").val() == "Other...") 
        {domain = $("#other").val();
           $.ajax({
            url:"http://localhost:8000/insertDomain/"+domain,
            type:"GET",
            dataType:"json",
            success:function(result){    
            console.log(result)
            } 
              
           })   
      
        }           
        else domain = $("#domain :selected").val();
    
        let id = "";
        if ($("#id").val() == "") alert("Login id  is Required");
        else id = $("#id").val();
    
        let pwd = "";
        if ($("#pwd").val() == "") alert("Password is Required");
        else pwd = $("#pwd").val();
        
    
        if(fname=="" || lname=="" || passingYear== "" || category==""
        || cellNo== "" || Email== "" || companyName== "" || branchName=="" 
        || city== "" || fileInput== "" || domain=="" 
        || id== "" || pwd== "") alert("Update Failed!!!")
        else{
    
        var formData = new FormData();
        var fileInput1 = $("#fileInput")[0].files[0];
      let fnamex = fileInput1.name
      console.log(fileInput1)
      var extn =fnamex.substring(fnamex.lastIndexOf('.'),fnamex.length)
      // alert(extn)
        if (fileInput1.size <= 100000) {
    
          $.ajax({
            url:"http://localhost:8000/updateAlumniIdForNaming/"+uname,
            type:"GET",
            dataType:"json",
            success:function(result){
              console.log(result)
            }
          })
          formData.append("file", fileInput1);
          // showProgressBar()
          $.ajax({
            url: "http://localhost:8000/upload",
            type: "POST",
            data: formData,
            async: false,
            processData: false,
            contentType: false,
            success: function (result) {
              $("#status").text("Uploaded Succesfully");
              $("#status").css("color", "green");
              $("#status").fadeOut(10000);
              
            },
            error: function (error) {
              console.log(error);
            },
          });
         
    
        
        $.ajax({
          url: "http://localhost:8000/api/updateAlumni",
          type: "POST",
          dataType: "json",
          data: {
            fname: fname,
            lname: lname,
            passingYear: passingYear,
            category: category,
            cellNo: cellNo,
            Email: Email,
            companyName: companyName,
            branchName: branchName,
            city: city,
            domain: domain,
            id: id,
            pwd: pwd,
            extn: extn,
            uname: uname
          },
          success: function (result) {
             alert("Update Succesful!!!");
             window.location="../index.html"
          },
          
        });
        
       }
        else {
          $("#status").text("Upload Failed!!! Fsize>100KB");
          $("#status").css("color", "red");
          $("#status").fadeOut(5000);
          $("#fileInput").val("");
          // alert("File size must be less than 100kb")
        }
    
      }
      return false;

    })

    $("#addHistoryBtn").on("click",function(e){
      e.preventDefault()

      let companyName = $("#companyName1").val()
      let workedCity = $("#workedCity :selected").val()
      let stYear = $("#stYear :selected").val()
      let enYear = $("#enYear :selected").val()
      let workDesgn = $("#workDesgn :selected").val()
      let workDomain = $("#workDomain :selected").val()
    
      if(companyName=="" || workedCity=="Choose Your Worked City" ||
       stYear=="Choose Your Start Year" || enYear=="Choose Your End Year" ||
      workDesgn=="Choose Designation" || workDomain=="Choose Your Expertise")
      alert("Some data is missing please enter each details")
      else{
      $.ajax({
        url:"http://localhost:8000/addingHistory",
        type:"POST",
        dataType:"json",
        data:{"alumniId":alumniId,"companyName":companyName,"workedCity":workedCity,"stYear":stYear,"enYear":enYear,"workDesgn":workDesgn,"workDomain":workDomain},
        success:function(result){
          alert("History added successful...")
        }
      })
    }
  })

    $("#backForProfile").on("click",function(e){
      e.preventDefault()
      $.session.set("loginStatus",false)
      window.location = "../components/home.html"
    })

})