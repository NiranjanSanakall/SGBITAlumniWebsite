$(function () {
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
          $("#domain").append("<option selected>Choose Your Expertise</option>")
          for(let i=0; i<result.length;i++){
            $("#domain").append("<option>"+result[i].domainName+"</option>")
          }
          $("#domain").append("<option>Other...</option>")
        }
        })

  function showProgressBar(){
    pl = $( ".pbc" );
var pb = $( "#pbid" );
$( "#pbid" ).progressbar({
value: false,
change: function() {
pl.text(
pb.progressbar( "value" ) + "%" );
},
complete: function() {
pl.text( "Loading Completed!" );
}
});
function progress() {
var v = pb.progressbar( "value" ) || 0;
pb.progressbar( "value", v + 2 );
if ( v < 99 ) {
setTimeout( progress, 50 );
}
}
setTimeout( progress, 100 );
  }

  $("#registerAlumni").on("click", function (e) {
     e.preventDefault();

     let fname = "";
    if ($("#fname").val() == "") alert("First Name is Required");
    else fname = $("#fname").val();

    let lname = "";
    if ($("#lname").val() == "") alert("Last Name is Required");
    else lname = $("#lname").val();

    let gender = "";
    if ($("#gender :selected").val() == "Choose your Gender")
      alert("Gender is Required");
    else {
      if($("#gender :selected").val()=="Male")
      gender = "M"
      else gender = "F"
    }
    

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
    else if ($("#domain :selected").val() == "Other..."){
      domain = $("#other").val();
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
    

    if(fname=="" || lname=="" || gender=="" || passingYear== "" || category==""
    || cellNo== "" || Email== "" || companyName== "" || branchName=="" 
    || city== "" || fileInput== "" || domain=="" 
    || id== "" || pwd== "") alert("Registration Failed!!!")
    else{

    var formData = new FormData();
    var fileInput1 = $("#fileInput")[0].files[0];
  let fnamex = fileInput1.name
  console.log(fileInput1)
  var extn =fnamex.substring(fnamex.lastIndexOf('.'),fnamex.length)
  // alert(extn)
    if (fileInput1.size <= 100000) {

      $.ajax({
        url:"http://localhost:8000/maxOfAlumniIdForNaming",
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
      url: "http://localhost:8000/api/registerAlumni",
      type: "POST",
      dataType: "json",
      data: {
        fname: fname,
        lname: lname,
        gender: gender,
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
        extn: extn
      },
      success: function (result) {
         alert("Registraion Succesful!!!");
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
  });
  $("#backRegisterAlumni").on("click",function(e){
    e.preventDefault()
    $.session.set("loginStatus",false)
    window.location = "../index.html"
  })

});
