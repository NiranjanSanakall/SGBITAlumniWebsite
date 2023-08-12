$(function(){

    var uName = ""

    $("#branchName").on("change",function(e){
        e.preventDefault()
        $("#newBranch").css("visibility","visible")
    })

    $.ajax({
        url:"http://localhost:8000/getAllBranches",
        type:"GET",
        dataType:"json",
        success:function(result){
            $("#branchName").empty()
            $("#hodAccounts").empty()
            $("#branchName").append("<option>Choose your Branch</option>")
            $("#hodAccounts").append("<option>Select Faculty/HOD</option>")
            for(let i=0;i<result.length;i++){
                if(result[i].departmentName=="Admin" || result[i].departmentName=="Alumni Co-ordinator" || result[i].departmentName=="Principal")
                $("#hodAccounts").append("<option>"+result[i].departmentName+"</option>")
                else{
                $("#branchName").append("<option>"+result[i].departmentName+"</option>")
                $("#hodAccounts").append("<option>"+result[i].departmentName+" Hod</option>")
                }
            }
            $("#branchName").append("<option>Other</option>")
        }
    })

    $("#hodAccounts").on("change",function(e){
        e.preventDefault()
        let hod = $("#hodAccounts :selected").val()
        switch(hod){
            case 'Select Faculty/HOD': alert("Choose proper Faculty"); break;
            case 'Add New':uName=null;
            $("#id").prop('disabled', false);
            $("#pwd").prop('disabled', false); break;
            case 'Admin':uName="admin";
            $("#id").prop('disabled', false);
            $("#pwd").prop('disabled', false); break;
            case 'CSE Hod':uName="csehod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'ECE Hod':uName="ecehod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'EEE Hod':uName="eeehod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'AIDS Hod':uName="aidshod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'CSBS Hod':uName="csbshod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'CIVIL Hod':uName="civilhod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'MECH Hod':uName="mechhod";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'Alumni Co-ordinator':uName="alcord";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
            case 'Principal':uName="principal";
            $("#id").prop('disabled', true);
            $("#pwd").prop('disabled', true); break;
        }
        $.ajax({
            url:"http://localhost:8000/getHodAccounts",
            type:"POST",
            dataType:"json",
            data:{"userName":uName},
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
            $("#joiningYear").val(details[0].yearOfPassing)
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
    })

    $("#logOut").on("click",function(e){
        e.preventDefault()
        window.location = "../index.html"
    })


    $("#updateFaculty").on("click",function(e){
        e.preventDefault()

        let fname = "";
        if ($("#fname").val() == "") alert("First Name is Required");
        else fname = $("#fname").val();
    
        let lname = "";
        if ($("#lname").val() == "") alert("Last Name is Required");
        else lname = $("#lname").val();

        let gender = "";
        if ($("#gender :selected").val() == "Choose your Gender") alert("Gender is Required");
        else if($("#gender :selected").val() == "Male") gender="M"
        else gender ="F";
    
        let joiningYear = "";
        if ($("#joiningYear :selected").val() == "Choose your Joining Year")
          alert("joiningYear  is Required");
        else joiningYear = $("#joiningYear :selected").val();
    
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
    
        let branchName = "";
        if ($("#branchName :selected").val() == "Choose your Branch")
          alert("Branch Name  is Required");
          else if($("#branchName :selected").val() == "Other"){
            newBranch = $("#newBranch").val();
           $.ajax({
            url:"http://localhost:8000/insertNewBranch/"+newBranch,
            type:"GET",
            dataType:"json",
            success:function(result){    
            console.log(result)
            }  
           })  
          }
        else branchName = $("#branchName :selected").val();
    
        var fileInput = "";
        if($("#fileInput").val()=="") alert("Upload your Photo")
        else fileInput = $("#fileInput").val();

        var login = "";
        if($("#id").val()=="") alert("Enter your LoginId")
        else login = $("#id").val();

        var password = "";
        if($("#pwd").val()=="") alert("Enter your Password")
        else password = $("#pwd").val();

    
        if(fname=="" || lname=="" || gender=="Choose your Gender" || joiningYear== "Choose your Joining Year" || category=="Choose category"
        || cellNo== "" || Email== "" || branchName=="Choose your Branch" 
        || fileInput== "" || login == "" || password=="") alert("Update Failed!!!")
        else{
    
        var formData = new FormData();
        var fileInput1 = $("#fileInput")[0].files[0];
      let fnamex = fileInput1.name
      console.log(fileInput1)
      var extn =fnamex.substring(fnamex.lastIndexOf('.'),fnamex.length)
      // alert(extn)
        if (fileInput1.size <= 100000) {
    
          $.ajax({
            url:"http://localhost:8000/updateAlumniIdForNaming/"+uName,
            type:"GET",
            dataType:"json",
            success:function(result){
              console.log(result)
            }
          })
          formData.append("file", fileInput1);
          // showProgressBar()
          $.ajax({
            url: "http://localhost:8000/updateHodImage",
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
          url: "http://localhost:8000/api/updateHodAccounts",
          type: "POST",
          dataType: "json",
          data: {
            fname: fname,
            lname: lname,
            gender: gender,
            joiningYear: joiningYear,
            category: category,
            cellNo: cellNo,
            Email: Email,
            branchName: branchName,
            login: login,
            password :password,
            extn: extn,
            uname: uName
          },
          success: function (result) {
             alert("Update Succesful!!!");
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
})