$(function(){

    var iName = ""
    $("#addImgBtn").on("click",function(e){
        e.preventDefault()
        var imgDesc = $("#imgDesc").val()
    var formData = new FormData();
    var fileInput1 = $("#imgInput")[0].files[0];
  let fnamex = fileInput1.name
  console.log(fileInput1)
  var extn =fnamex.substring(fnamex.lastIndexOf('.'),fnamex.length)
  // alert(extn)
    if (fileInput1.size <= 500000) {

      $.ajax({
        url:"http://localhost:8000/maxOfImageId",
        type:"GET",
        async:false,
        dataType:"json",
        success:function(result){
          console.log(result)
          iName = "../AllImgs/"+(result[0].lastAid+1)+"photo"+extn
          $.ajax({
            url:"http://localhost:8000/submitImgs",
            type:"POST",
            dataType:"json",
            data:{"iName":iName,"imgDesc":imgDesc},
            success:function(result){
                alert("Image Added to Image Gallery")
            }
          })
        }
      })
      formData.append("file", fileInput1);
      // showProgressBar()
      $.ajax({
        url: "http://localhost:8000/AddingImg",
        type: "POST",
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function (result) {
            // alert("image Uploaded...")
          $("#imgStatus").text("Uploaded Succesfully");
          $("#imgStatus").css("color", "green");
          $("#imgStatus").fadeOut(10000);
          
        },
        error: function (error) {
          console.log(error);
        },
      });
      
      
    }
    else{
        $("#imgStatus").text("image size should be less than 500kb");
          $("#imgStatus").css("color", "Red");
          $("#imgStatus").fadeOut(10000);
    }
    })

    $("#backForAddImg").on("click",function(e){
        e.preventDefault()
        window.location = "../components/alumniCoordinator.html"
    })
})