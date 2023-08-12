$(function () {

    let uName=$.session.get("userName")
    switch(uName){
      case "csehod":$("#dept").text("CSE"); break;
      case "ecehod":$("#dept").text("ECE"); break;
      case "eeehod":$("#dept").text("EEE"); break;
      case "civilhod":$("#dept").text("CIVIL"); break;
      case "mechhod":$("#dept").text("MECH"); break;
      case "aidshod":$("#dept").text("AIDS"); break;
      case "csbshod":$("#dept").text("CSBS"); break;
    }
    $("#year").empty();
    $("#year1").empty();
    $("#year").append("<option selected>" +"Select Year" + "</option>");
      $("#year1").append("<option selected>" +"Select Year"+ "</option>");
    for (let i = 2010; i < 2027; i++) {
      $("#year").append("<option>" + i + "</option>");
      $("#year1").append("<option>" + i + "</option>");
    }
    let students = [];
    let studentByYear = [];
    let activities = [];
    let activityByYear = [];
    let totalStudents=0
    // let uName = $.session.get('userName')
    // let uName = "Principal"
  
    $.ajax({
      url: "http://localhost:8000/api/viewAll",
      type: "POST",
      dataType: "json",
      data : {"loginId":uName},
      success: function (result) {
        students = result;
        totalStudents=students.length
      },
    });
  
    $.ajax({
      url: "http://localhost:8000/viewAllActivity",
      type: "GET",
      dataType: "json",
      success: function (result) {
        activities = result;
      },
    })
  
    $("#year").on("change", function () {
      let yearOfPassing = $("#year :selected").val();
      $.ajax({
        url: "http://localhost:8000/viewByYear",
        type: "POST",
        dataType: "json",
        data: { "year": yearOfPassing },
        success: function (result) {
          studentByYear = result;
        },
      });
    });
    $("#year1").on("change", function () {
      let yearOfPassing = $("#year1 :selected").val();
      $.ajax({
        url: "http://localhost:8000/viewActivityByYear",
        type: "POST",
        dataType: "json",
        data: { "year1": yearOfPassing },
        success: function (result) {
          activityByYear = result;
        },
      });
    });
  
  
    $("#logOut").on("click",function(e){
      e.preventDefault()
      $.session.set("loginStatus",false)
      window.location = "../index.html"
    })

   

    $("#logOutHod").on("click",function(e){
      e.preventDefault()
      $.session.set("loginStatus",false)
      window.location = "../index.html"
  
    })
  
    var searchResults = []
    $("#searchButton").on("click",function(e){
      e.preventDefault()
  
      let selectedValue = $("#priorities :selected").val()
      let searchValue = $("#prioritySearch").val()
      switch(selectedValue){
        case "First Name" : selectedValue ="fname"; break;
        case "LastName" : selectedValue ="lname"; break;
        case "Passing Year" : selectedValue ="yearOfPassing"; break;
        case "Phone No" : selectedValue ="cellNum"; break;
        case "Email Id" : selectedValue ="emailid"; break;
        case "Working At" : selectedValue ="presentlyworkingAtCompany"; break;
        case "city" : selectedValue ="city"; break;
        case "Domain Expertise" : selectedValue ="domainExpertise"; break;
        case "Department" : selectedValue = "branchName"; break;
        case "Category" : selectedValue = "category"; break;
      }
  
  
      if(selectedValue == "Select Your Priority") alert("Select Your Priority")
      else if(uName=="principal"){
        $.ajax({
          url:"http://localhost:8000/searchingByPriorityForPrincipal",
          type:"POST",
          dataType:"json",
          data:{"searchValue":searchValue,"selectedValue":selectedValue},
          success:function(result){
            searchResults=result;
  
            $(".box1").css("visibility","visible")
  
            $("#view").empty();
            $("#pastView").empty();
            $("#view").append(
              "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; margin-left:20px; width:90px'>First Name</span>" +
                "<span style='display:inline-block; width:120px'>Last Name</span>" +
                "<span style='display:inline-block; width:80px'>Pass-Year</span>" +
                "<span style='display:inline-block; width:90px'>Phone No.</span>" +
                "</span><span style='display:inline-block; width:230px'>EmailId" +
                "</span><span style='display:inline-block; width:110px'>WorkingAt" +
                "</span><span style='display:inline-block; width:100px'>City" +
                "</span><span style='display:inline-block; width:80px'>Image" +
                "</span><span style='display:inline-block; width:140px'>DomainExpertise" +
                "</span><span style='display:inline-block; width:100px'>Appr-Status" +
                "</span>"+
                "<button class='btn-sm btn btn-primary'  id='approveBtn'>Approve</button></li>"
            );
            if(searchResults.length==0) $("#view").append("<li 'class='list-group-item m-2' style='color:red; margin-left:500px;'>No Match Found!!!</li>")
            else
            for (let i = 0; i < searchResults.length; i++) {
              $("#view").append(
                "<li id='student" +
                  i +
                  "'class='list-group-item m-2' style='color:red'>" +
                  "<span  id='aid"+i+"' style='visibility:hidden'>" +
                  searchResults[i].alumniID +
                  "</span><span style='display:inline-block; width:90px'>" +
                  searchResults[i].fname +
                  "</span><span style='display:inline-block; width:120px'>" +
                  searchResults[i].lname +
                  "</span><span style='display:inline-block; width:70px'>" +
                  searchResults[i].yearOfPassing +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                  searchResults[i].cellNum +
                  "</span><span id ='Email"+i+"' style='display:inline-block; width:220px'>" +
                  searchResults[i].emailid +
                  "</span><span style='display:inline-block; width:100px'>" +
                  searchResults[i].presentlyworkingAtCompany +
                  "</span><span style='display:inline-block; width:100px'>" +
                  searchResults[i].city +
                  "</span><span style='display:inline-block; width:80px'><img src='" +
                  searchResults[i].imageURL +
                  "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
                  searchResults[i].domainExpertise +
                  "</span>"+
                  "<span style='display:inline-block; width:80px' id='aStatus"+i+"'>" +
                  searchResults[i].approvalStatus +
                  "</span>"+
                  "<input type='checkbox' id='chk"+i+"' style='margin-left:50px'>"+
                  "<span id='login"+i+"' style='display:inline-block; visibility:hidden'>" +
                  searchResults[i].login +
                  "</span>"+
                  "<span id ='password"+i+"' style='display:inline-block;  visibility:hidden'>" +
                  searchResults[i].password +
                  "</span> </li>"
              );
          }
        }
        })
      }else{
        $.ajax({
          url:"http://localhost:8000/searchingByPriorityForHod",
          type:"POST",
          dataType:"json",
          data:{"searchValue":searchValue,"selectedValue":selectedValue,"loginId":uName},
          success:function(result){
            searchResults=result;
  
            $(".box1").css("visibility","visible")
  
            $("#view").empty();
            $("#pastView").empty();
            $("#view").append(
              "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; margin-left:20px; width:90px'>First Name</span>" +
                "<span style='display:inline-block; width:120px'>Last Name</span>" +
                "<span style='display:inline-block; width:80px'>Pass-Year</span>" +
                "<span style='display:inline-block; width:90px'>Phone No.</span>" +
                "</span><span style='display:inline-block; width:230px'>EmailId" +
                "</span><span style='display:inline-block; width:110px'>WorkingAt" +
                "</span><span style='display:inline-block; width:100px'>City" +
                "</span><span style='display:inline-block; width:80px'>Image" +
                "</span><span style='display:inline-block; width:140px'>DomainExpertise" +
                "</span><span style='display:inline-block; width:100px'>Appr-Status" +
                "</span>"+
                "<button class='btn-sm btn btn-primary'  id='approveBtn'>Approve</button></li>"
            );
            if(searchResults.length==0) $("#view").append("<li 'class='list-group-item m-2' style='color:red; margin-left:500px;'>No Match Found!!!</li>")
            else
            for (let i = 0; i < searchResults.length; i++) {
              $("#view").append(
                "<li id='student" +
                  i +
                  "'class='list-group-item m-2' style='color:red'>" +
                  "<span  id='aid"+i+"' style='visibility:hidden'>" +
                  searchResults[i].alumniID +
                  "</span><span style='display:inline-block; width:90px'>" +
                  searchResults[i].fname +
                  "</span><span style='display:inline-block; width:120px'>" +
                  searchResults[i].lname +
                  "</span><span style='display:inline-block; width:70px'>" +
                  searchResults[i].yearOfPassing +
                  "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                  searchResults[i].cellNum +
                  "</span><span id ='Email"+i+"' style='display:inline-block; width:220px'>" +
                  searchResults[i].emailid +
                  "</span><span style='display:inline-block; width:100px'>" +
                  searchResults[i].presentlyworkingAtCompany +
                  "</span><span style='display:inline-block; width:100px'>" +
                  searchResults[i].city +
                  "</span><span style='display:inline-block; width:80px'><img src='" +
                  searchResults[i].imageURL +
                  "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
                  searchResults[i].domainExpertise +
                  "</span>"+
                  "<span style='display:inline-block; width:80px' id='aStatus"+i+"'>" +
                  searchResults[i].approvalStatus +
                  "</span>"+
                  "<input type='checkbox' id='chk"+i+"' style='margin-left:50px'>"+
                  "<span id='login"+i+"' style='display:inline-block; visibility:hidden'>" +
                  searchResults[i].login +
                  "</span>"+
                  "<span id ='password"+i+"' style='display:inline-block;  visibility:hidden'>" +
                  searchResults[i].password +
                  "</span> </li>"
              );
          }
        }
        })
      }
    })
  
    $("#changePasswordBtn").on("click",function(e){
      e.preventDefault()
      let count=0
      let newPassword = $("#inputForChangePassword").val()
      if(newPassword.length>6) alert("Your Password can have only upto 6 Charecters!!!")
      else{
          for(let i=0;i<newPassword.length;i++){
            let string = newPassword.substring(i,i+1)
            if(string=="!" || string=="@" || string=="$" || string=="%" || string=="^" || string=="&" || string=="*" || string=="?")
            count++
          }
          if(count==0) alert("Your Password should contain any special charecter!!!")
          else
            $.ajax({
              url:"http://localhost:8000/changePassword",
              type:"POST",
              dataType:"json",
              data:{"newPassword":newPassword,"loginId":uName},
              success:function(result){
                alert("Password Changed Successfully...")
                window.location = "../components/hod.html"
              }
            })
      }
    })
  
  
     // $("#numLect").spinner();
   let aid=$.session.get("aid")
   
  
    //Click EVent end
  // uploadReport of the past events
    $("#pastView").on("click","button",function(e){
      
    
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
            // const pdfUrl = ;
            
           // Your PDF blob
          
            break;
          case 'uploadReport':  
          var fileInput = $("#fileUpload"+i)[0].files[0];
          console.log(fileInput.name)
          if(fileInput.size<=100000000){
         // alert(fileInput)
          formData.append('file',fileInput);
          // formData.append('aid',activityId);
          $.ajax({
            url:"http://localhost:8000/sendAid/"+activityId,
            type:"GET",
            dataType:"json",
            success:function(result){
              e.preventDefault()
          }
        })
          //alert(fileInput)
          $.ajax({
            url:"http://localhost:8000/uploadReport",
            type:"POST",
            //dataType:"json",
            data:formData,
            processData:false,
            contentType:false,
            success:function(result){
              e.preventDefault()
              alert("Successfull")
                $("#status").text("Uploaded Succesfully");
                $("#status").css("color","green")
                $("#status").fadeOut(5000)
            },
            error:function(error){
              console.log(error)
            }
          })
        }
        else {
           $("#status").text("Upload Failed!!! Fsize>100KB");
            $("#status").css("color","red")
            $("#status").fadeOut(5000)
            $("#fileInput").val("")
           alert("File size must be less than 100kb")
        }
        break;
       }
  
      }) 
        
        
    
       
  
  
    // This to view All Alumni details
    $("#viewAll").on("click", function () {
  
      $(".box1").css("visibility","visible")
  
      $("#view").empty();
      $("#pastView").empty();
  
      if(uName == "principal" || uName == "alcord"){
  
        $("#view").append(
          "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; margin-left:20px; width:90px'>First Name</span>" +
            "<span style='display:inline-block; width:120px'>Last Name</span>" +
            "<span style='display:inline-block; width:80px'>Pass-Year</span>" +
            "<span style='display:inline-block; width:90px'>Phone No.</span>" +
            "</span><span style='display:inline-block; width:230px'>EmailId" +
            "</span><span style='display:inline-block; width:110px'>WorkingAt" +
            "</span><span style='display:inline-block; width:100px'>City" +
            "</span><span style='display:inline-block; width:80px'>Image" +
            "</span><span style='display:inline-block; width:140px'>DomainExpertise" +
            // "</span><span style='display:inline-block; width:110px'>Appr-Status" +
            "</span><span style='display:inline-block; width:auto'>Credits" +
            "</span></li>"
        );
    
    
        for (let i = 0; i < students.length; i++) {
          if(students[i].approvalStatus=='Pending')
          $("#view").append(
            "<li id='student" +
              i +
              "'class='list-group-item m-2' style='color:red'>" +
              "<span  id='aid"+i+"' style='visibility:hidden'>" +
              students[i].alumniID +
              "</span><span style='display:inline-block; width:90px'>" +
              students[i].fname +
              "</span><span style='display:inline-block; width:120px'>" +
              students[i].lname +
              "</span><span style='display:inline-block; width:70px'>" +
              students[i].yearOfPassing +
              "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
              students[i].cellNum +
              "</span><span id ='Email"+i+"' style='display:inline-block; width:220px'>" +
              students[i].emailid +
              "</span><span style='display:inline-block; width:100px'>" +
              students[i].presentlyworkingAtCompany +
              "</span><span style='display:inline-block; width:100px'>" +
              students[i].city +
              "</span><span style='display:inline-block; width:80px'><img src='" +
              students[i].imageURL +
              "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
              students[i].domainExpertise +
              "</span>"+
              "<span style='display:inline-block; width:80px' id='aStatus"+i+"'>" +
              students[i].approvalStatus +
              "</span>"+
              "<span id='login"+i+"' style='display:inline-block; visibility:hidden'>" +
              students[i].login +
              "</span>"+
              "<span id ='password"+i+"' style='display:inline-block;  visibility:hidden'>" +
              students[i].password +
              "</span> </li>"
          );
          else{
            $("#view").append(
              "<li id='student" +
                i +
                "'class='list-group-item m-2' style='color:red'>" +
                "<span  id='aid"+i+"' style='visibility:hidden'>" +
              students[i].alumniID +
                "</span><span style='display:inline-block; width:90px'>" +
                students[i].fname +
                "</span><span style='display:inline-block; width:120px'>" +
                students[i].lname +
                "</span><span style='display:inline-block; width:70px'>" +
                students[i].yearOfPassing +
                "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
                students[i].cellNum +
                "</span><span  style='display:inline-block; width:220px'>" +
                students[i].emailid +
                "</span><span style='display:inline-block; width:100px'>" +
                students[i].presentlyworkingAtCompany +
                "</span><span style='display:inline-block; width:100px'>" +
                students[i].city +
                "</span><span style='display:inline-block; width:80px'><img src='" +
                students[i].imageURL +
                "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
                students[i].domainExpertise +
                "</span>"+
                // "<span style='display:inline-block; width:100px; color:green' id='aStatus"+i+"'>" +
                // students[i].approvalStatus +
                // "</span>"+
                "<span style='display:inline-block; margin-left:10px'><button class='btn btn-sm btn-warning' id='alumniCredits"+i+"'>Credits</button> " +
                "</span></li>"
            );
          }
        }
  
      }
      else{
  
      $("#view").append(
        "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; margin-left:20px; width:90px'>First Name</span>" +
          "<span style='display:inline-block; width:120px'>Last Name</span>" +
          "<span style='display:inline-block; width:80px'>Pass-Year</span>" +
          "<span style='display:inline-block; width:90px'>Phone No.</span>" +
          "</span><span style='display:inline-block; width:230px'>EmailId" +
          "</span><span style='display:inline-block; width:110px'>WorkingAt" +
          "</span><span style='display:inline-block; width:100px'>City" +
          "</span><span style='display:inline-block; width:80px'>Image" +
          "</span><span style='display:inline-block; width:140px'>DomainExpertise" +
          "</span><span style='display:inline-block; width:100px'>Appr-Status" +
          "</span>"+
          "<button class='btn-sm btn btn-primary'  id='approveBtn'>Approve</button></li>"
      );
  
  
      for (let i = 0; i < students.length; i++) {
        if(students[i].approvalStatus=='Pending')
        $("#view").append(
          "<li id='student" +
            i +
            "'class='list-group-item m-2' style='color:red'>" +
            "<span  id='aid"+i+"' style='visibility:hidden'>" +
            students[i].alumniID +
            "</span><span id='fname"+i+"' style='display:inline-block; width:90px'>" +
            students[i].fname +
            "</span><span id='lname"+i+"' style='display:inline-block; width:120px'>" +
            students[i].lname +
            "</span><span style='display:inline-block; width:70px'>" +
            students[i].yearOfPassing +
            "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
            students[i].cellNum +
            "</span><span id ='Email"+i+"' style='display:inline-block; width:220px'>" +
            students[i].emailid +
            "</span><span style='display:inline-block; width:100px'>" +
            students[i].presentlyworkingAtCompany +
            "</span><span style='display:inline-block; width:100px'>" +
            students[i].city +
            "</span><span style='display:inline-block; width:80px'><img src='" +
            students[i].imageURL +
            "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
            students[i].domainExpertise +
            "</span>"+
            "<span style='display:inline-block; width:80px' id='aStatus"+i+"'>" +
            students[i].approvalStatus +
            "</span>"+
            "<input type='checkbox' id='chk"+i+"' style='margin-left:50px'>"+
            "<span id='login"+i+"' style='display:inline-block; visibility:hidden'>" +
            students[i].login +
            "</span>"+
            "<span id ='password"+i+"' style='display:inline-block;  visibility:hidden'>" +
            students[i].password +
            "</span> </li>"
        );
        else{
          $("#view").append(
            "<li id='student" +
              i +
              "'class='list-group-item m-2' style='color:red'>" +
              "<span  id='aid"+i+"' style='visibility:hidden'>" +
            students[i].alumniID +
              "</span><span id='fname"+i+"' style='display:inline-block; width:90px'>" +
              students[i].fname +
              "</span><span id='lname"+i+"' style='display:inline-block; width:120px'>" +
              students[i].lname +
              "</span><span style='display:inline-block; width:70px'>" +
              students[i].yearOfPassing +
              "</span><span id='cell"+i+"' style='display:inline-block; width:100px'>" +
              students[i].cellNum +
              "</span><span  style='display:inline-block; width:220px'>" +
              students[i].emailid +
              "</span><span style='display:inline-block; width:100px'>" +
              students[i].presentlyworkingAtCompany +
              "</span><span style='display:inline-block; width:100px'>" +
              students[i].city +
              "</span><span style='display:inline-block; width:80px'><img src='" +
              students[i].imageURL +
              "' width ='50px' height = '50px'></span><span style='display:inline-block; width:140px'>" +
              students[i].domainExpertise +
              "</span>"+
              "<span style='display:inline-block; width:100px; color:green' id='aStatus"+i+"'>" +
              students[i].approvalStatus +
              "</span>"+
              "<span style='display:inline-block; margin-left:10px'><button class='btn btn-sm btn-warning' id='alumniCredits"+i+"'>Credits</button> " +
              "</span></li>"
          );
        }
      }
    }
    });
  
  
    // THis view is for Status Approval
    $("#view").on("click","button",function(e){
      e.preventDefault()
      let idx = $(this).attr("id")
      
      let i = idx.substring(idx.length-1)
      let btnType = idx.substring(0,idx.length-1)
    
  $.session.set("fname",$("#fname"+i).text())
  $.session.set("lname",$("#lname"+i).text())
  i="aid"+i
  let currentAid=$("#"+i).text()
      $.session.set("aid",currentAid)
      if(btnType == "alumniCredits"){
        window.location = "../components/AlumniPerformance.html"
            }
     // alert($("#view li").find("#chk0").is(":checked"))
      for(let i=0;i<totalStudents;i++){
      if($("#view li").find("#chk"+i).is(":checked")==true){
          $("#aStatus"+i).text("Approved")
          $("#aStatus"+i).css("color","green")
          let cellNum=$("#cell"+i).text()
          $.ajax({
            url:"http://localhost:8000/updateApprovalStatus/"+cellNum,
            type : "GET",
            dataType : "json",
            success : function(result){
               console.log(result)
               let toEmail = $("#Email"+i).text();
               let login = $("#login"+i).text();
               let password = $("#password"+i).text();
               $.ajax({
                url:"http://localhost:8000/sendMail",
                type:"POST",
                datatype:"json",
                data:{"login":login,"password":password,"toEmail":toEmail},
                success:function(result){
                  alert("Email Sent...")
                  console.log(result.info)
                }
               })
            }
          })
  
      }
      }
    })
          
  
    // This view1 is to view students by year
    // #view is id of unordered list
  
    $("#view1").on("click", function () {
     
     if( $("#year :selected").val()=="Select Year") alert("Select Year")
     else{
  
     
      $(".box1").css("visibility","visible")
  
      $("#view").empty();
      $("#pastView").empty();
      $("#view").append(
        "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>First Name</span>" +
          "<span style='display:inline-block; width:130px'>Last Name</span>" +
          "<span style='display:inline-block; width:120px'>yearOfPassing</span>" +
          "<span style='display:inline-block; width:100px'>Phone No.</span>" +
          "</span><span style='display:inline-block; width:200px'>Email Id" +
          "</span><span style='display:inline-block; width:100px'>Working At" +
          "</span><span style='display:inline-block; width:100px'>city" +
          "</span><span style='display:inline-block; width:100px'>Image" +
          "</span><span style='display:inline-block; width:150px'>Domain Expertise" +
          "</span></li>"
      );
  
      for (let i = 0; i < studentByYear.length; i++) {
        $("#view").append(
          "<li id='studentByYear" +
            i +
            "'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            studentByYear[i].fname +
            "</span><span style='display:inline-block; width:130px'>" +
            studentByYear[i].lname +
            "</span><span style='display:inline-block; width:120px'>" +
            studentByYear[i].yearOfPassing +
            "</span><span style='display:inline-block; width:100px'>" +
            studentByYear[i].cellNum +
            "</span><span id='Email"+i+"' style='display:inline-block; width:220px'>" +
            studentByYear[i].emailid +
            "</span><span style='display:inline-block; width:100px'>" +
            studentByYear[i].presentlyworkingAtCompany +
            "</span><span style='display:inline-block; width:100px'>" +
            studentByYear[i].city +
            "</span><span style='display:inline-block; width:100px'><img src='" +
            studentByYear[i].imageURL +
            "' width ='50px' height = '50px'></span><span style='display:inline-block; width:150px'>" +
            studentByYear[i].domainExpertise +
            "</span></li>"
        );
      }
    }
    });
  
    // This is to view all Activities
    
    $("#viewAllActivity").on("click", function () {
  
      $(".box1").css("visibility","visible")
      $("#view").empty();
      $("#pastView").empty();
      $("#view").append("<li style='margin-left:30px; color: blue; font-size:30px; font-style:bold'>Upcoming Activities</li>")
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
      $("#view").append("<li style='margin-left: 150px; color: red'>No Upcoming Activities</li>")
      else
      $("#view").append(
        "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
          "<span style='display:inline-block; width:130px'>Resource Person</span>" +
          "<span style='display:inline-block; width:180px'>Activity Date</span>" +
          "<span style='display:inline-block; width:110px'>Activity Time</span>" +
          "</span><span style='display:inline-block; width:130px'>No. of Students" +
          "</span></li>"
      )
      $("#pastView").append("<li style='margin-left:30px; color: blue; font-size:30px; font-style:bold'>Past Activities</li>")
      if(numOfPastActivities==0)
      $("#patView").append("<li style='margin-left: 150px; color: red'>No Past Activities</li>")
      else{
        if(uName=="principal")
        $("#pastView").append(
          "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
            "<span style='display:inline-block; width:130px'>Resource Person</span>" +
            "<span style='display:inline-block; width:180px'>Activity Date</span>" +
            "<span style='display:inline-block; width:110px'>Activity Time</span>" +
            "</span><span style='display:inline-block; width:150px'>No. of Students" +
            "</span></li>"
        )
        else
        $("#pastView").append(
          "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
            "<span style='display:inline-block; width:130px'>Resource Person</span>" +
            "<span style='display:inline-block; width:180px'>Activity Date</span>" +
            "<span style='display:inline-block; width:110px'>Activity Time</span>" +
            "</span><span style='display:inline-block; width:150px'>No. of Students" +
            "</span><span style='display:inline-block; width:100px'>Action" +
            "</span></li>"
        )
      }
        
      for (let i = 0; i < activities.length; i++) {
        // if activity is present or future display in view else Display in past view
        let todayDate = new Date()
        let OtherDate = new Date(activities[i].activityDate)
        if(todayDate<=OtherDate)
        
        $("#view").append(
          "<li id='activity"+i+"'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            activities[i].activityName+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePerson+
            "</span><span style='display:inline-block; width:180px'>" +
            $.format.date(activities[i].activityDate,"dd-MM-yyyy")+
            "</span><span style='display:inline-block; width:110px'>" +
            activities[i].activityTime+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].numStudentsAttended+
            "</span></li>"
  
        );
        else{
        if(uName=="principal")
        $("#pastView").append(
          "<li id='pastActivity"+i+"'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            activities[i].activityName+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePerson+
            "</span><span style='display:inline-block; width:180px'>" +
            $.format.date(activities[i].activityDate,"dd-MM-yyyy")+
            "</span><span style='display:inline-block; width:110px'>" +
            activities[i].activityTime+
            "</span><span style='display:inline-block; width:75px'>" +
            activities[i].numStudentsAttended+
            "</span>"+
            "<span id='aid"+i+"' style='display:inline-block; width:35px; visibility:hidden'>" +
            activities[i].activityID+
            "</span>"+
          "<span style='display:inline-block;'><button class='btn btn-sm btn-secondary mx-3' id='viewReport"+i+"'>ViewReport</button> " +
          "</span></li>"
          
        )
        else
        $("#pastView").append(
          "<li id='pastActivity"+i+"'class='list-group-item m-2' style='color:red'>" +
            "<span style='display:inline-block; width:130px'>" +
            activities[i].activityName+
            "</span><span style='display:inline-block; width:130px'>" +
            activities[i].resourcePerson+
            "</span><span style='display:inline-block; width:180px'>" +
            $.format.date(activities[i].activityDate,"dd-MM-yyyy")+
            "</span><span style='display:inline-block; width:110px'>" +
            activities[i].activityTime+
            "</span><span style='display:inline-block; width:75px'>" +
            activities[i].numStudentsAttended+
            "</span>"+
            "<span id='aid"+i+"' style='display:inline-block; width:50px; visibility:hidden'>" +
            activities[i].activityID+
            "</span>"+
            "<span style='display:inline-block; width:100px'><input type='file' class='form-control' id='fileUpload"+i+"'>"+
            "</span>"+
            "<span style='display:inline-block; width:100px'><button class='btn btn-sm btn-warning mx-3' id='uploadReport"+i+"'>UploadReport</button>" +
          "</span>"+
          "<span style='display:inline-block; width:110px; margin-left:20px'><button class='btn btn-sm btn-secondary mx-3' id='viewReport"+i+"'>ViewReport</button> " +
          "</span></li>"
        );
        }
      }
    });
    $("#pastView").on("click", "button",function(e){
      e.preventDefault()
      let idx = $(this).attr("id")
      let i = idx.substring(idx.length-1)
      
    })
  
    $("#viewActivityByYear").on("click", function () {
      
      if( $("#year1 :selected").val()=="Select Year") alert("Select Year")
      else{
  
      $(".box1").css("visibility","visible")
  
      $("#view").empty();
      $("#pastView").empty();
      $("#view").append(
          "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; width:130px'>Activity Name</span>" +
          "<span style='display:inline-block; width:130px'>Resource Person</span>" +
          "<span style='display:inline-block; width:120px'>Activity Date</span>" +
          "<span style='display:inline-block; width:100px'>Activity Time</span>" +
          "</span><span style='display:inline-block; width:200px'>No. of Students Attended" +
          "</span><span style='display:inline-block; width:100px'>Image" +
          "</span></li>"
      );
  
      for (let i = 0; i < activityByYear.length; i++) {
        $("#view").append(
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
    });
  
  // function formatDate(currentDate){
  
  
  //   // const currentDayOfMonth = currentDate.getDate()
  // const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  // const currentYear = currentDate.getFullYear();
  //  currentMonth+=1
  // const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear
  // return dateString
  // }
  
  });
  