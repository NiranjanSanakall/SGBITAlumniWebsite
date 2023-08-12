$(function () {
  sessionStorage.setItem("loginStatus", false);

  var uName;
  var uPwd;

  $("#btn1").on("click", function (e) {
    e.preventDefault();

    uName = $("#login1").val();
    uPwd = $("#pwd1").val();
    $.ajax({
      url: "http://localhost:8000/authenticate",
      type: "POST",
      dataType: "json",
      data: { uid: uName, pwd: uPwd },
      success: function (result) {
        console.log(result);
        if (result.length > 0) {
          if ((uName == result[0].cellNum || uName==result[0].emailid || uName==result[0].login) && uPwd == result[0].password) {
            if (
              uName == "csehod" ||
              uName == "ecehod" ||
              uName == "eeehod" ||
              uName == "civilhod" ||
              uName == "mechhod"|| 
              uName == "aidshod" || 
              uName == "csbshod" 
            ) {
              
              window.location = "../components/hod.html";
              sessionStorage.setItem("loginStatus", true);
              $.session.set("dName",result[0].branchName)
              $.session.set("userName", uName);
              $.session.set("alumniId",result[0].alumniID)
            } else if(uName == "principal"){
              window.location = "../components/principal.html";
              sessionStorage.setItem("loginStatus", true);
              $.session.set("userName", uName);
              $.session.set("alumniId",result[0].alumniID)
            }
            else if(uName == "alcord"){
              window.location = "../components/alumniCoordinator.html";
              $.session.set("userName", uName);
              $.session.set("dName",result[0].branchName)
              sessionStorage.setItem("loginStatus", true);
              $.session.set("alumniId",result[0].alumniID)
            }
            else if(uName == "admin"){
              window.location = "../components/admin.html";
              $.session.set("userName", uName);
              $.session.set("dName",result[0].branchName)
              sessionStorage.setItem("loginStatus", true);
              $.session.set("alumniId",result[0].alumniID)
            }
            else if (result[0].approvalStatus == "Approved") {
              sessionStorage.setItem("loginStatus", true);
              $.session.set("userName", uName);
              $.session.set("fname", result[0].fname);
              $.session.set("lname", result[0].lname);
              $.session.set("emailid", result[0].emailid);
              $.session.set("dName",result[0].branchName)
              console.log(result[0].branchName)
              $.session.set("alumniId",result[0].alumniID)
              window.location = "../components/home.html";
            } else {
              $("#msg").text("Login Not Approved By Your HOD - Login Failed!!!");
              $("#login1").val("");
              $("#pwd1").val("");
              $("#login1").focus();
              $("#msg").fadeOut(4000);
            }
          }
        } else {
          $("#msg").text("Invalid UserName or Password - Login Failed!!!");
          $("#login1").val("");
          $("#pwd1").val("");
          $("#login1").focus();
          $("#msg").fadeOut(2000);
        }
      },
    });
  });

  
  

  $("#btn2").on("click", function () {
    window.location = "../components/register.html";
  });
});
