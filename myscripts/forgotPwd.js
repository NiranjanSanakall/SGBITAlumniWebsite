$(function(){



$("#forgotPassword").on("click",function(e){
    e.preventDefault()

    var login;
    var toEmail;
    uName = $("#login1").val();
    if(uName == "") alert("Please enter your loginId and then press forgot Password")
    else{
    $.ajax({
      url:"http://localhost:8000/getuName/"+uName,
      type:"GET",
      datatype:"json",
      success: function(result){
        login = result[0].login
        password=result[0].password
        toEmail = result[0].emailid
        $.ajax({
          url:"http://localhost:8000/sendMailForForgotPassword",
          type:"POST",
          datatype:"json",
          data:{"login":login,"password":password,"toEmail":toEmail},
          success:function(result){
            console.log(result)
            alert("Login and Password Sent to Your Email...")
          }
         })
      }
    })
  }
  })


})