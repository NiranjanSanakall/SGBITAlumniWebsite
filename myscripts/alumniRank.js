// const { ajax } = require("jquery")

$(function(){
    var alumniRanks = []
    $("#alumniRanks").on("click",function(e){
        e.preventDefault()
        if($("#branchWiseRanks :selected").val()=="Choose Branch") alert("Select Branch")
        else{
            branch=$("#branchWiseRanks :selected").val()
            if(branch=="All"){
                $.ajax({
                    url:"http://localhost:8000/viewAlumniRanksForAll",
                    type:"GET",
                    async:false,
                    dataType:"json",
                    success:function(result){
                        alumniRanks=result
                        console.log(alumniRanks)
                    }
                })
            }
            else{
                    $.ajax({
                        url:"http://localhost:8000/viewAlumniRanksForBranchWise/"+branch,
                        type:"GET",
                        async:false,
                        dataType:"json",
                        success:function(result){
                            alumniRanks=result
                            console.log(alumniRanks)
                        }
                    })
                }
                $(".box1").css("visibility","visible")
                    $("#view").empty();
                    $("#pastView").empty();

                if(alumniRanks.length==0)
                $("#view").append(
                    "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; font-size:20px; margin-left:500px; width:200px'>No Alumnies Found...</span></li>")
                else{
                    $("#view").append(
                    "<li class='list-group-item m-2' style='color:blue'><span style='display:inline-block; color:green; width:90px'>Rank</span>"+
                        "<span style='display:inline-block; width:130px'>First Name</span>" +
                        "<span style='display:inline-block; width:130px'>Last Name</span>" +
                        "<span style='display:inline-block; width:120px'>yearOfPassing</span>" +
                        "<span style='display:inline-block; width:100px'>Phone No.</span>" +
                        "</span><span style='display:inline-block; width:230px'>Email Id" +
                        "</span><span style='display:inline-block; width:100px'>Working At" +
                        "</span><span style='display:inline-block; width:100px'>Image" +
                        "</span><span style='display:inline-block; width:150px'>Credits Points" +
                        "</span></li>"
                    );

            for (let i = 0; i < alumniRanks.length; i++) {
                if(i==0)
                $("#view").append(
                  "<li id='alumniRank" +
                    i +
                    "'class='list-group-item m-2' style='color:red'>" +
                    "<span style='display:inline-block; color:green; font-size:20px; width:90px'>#" +
                    (i+1) +
                    "</span><span style='display:inline-block; width:130px'>" +
                    alumniRanks[i].fname +
                    "</span><span style='display:inline-block; width:130px'>" +
                    alumniRanks[i].lname +
                    "</span><span style='display:inline-block; width:120px'>" +
                    alumniRanks[i].yearOfPassing +
                    "</span><span style='display:inline-block; width:100px'>" +
                    alumniRanks[i].cellNum +
                    "</span><span id='Email"+i+"' style='display:inline-block; width:220px'>" +
                    alumniRanks[i].emailid +
                    "</span><span style='display:inline-block; width:100px'>" +
                    alumniRanks[i].presentlyworkingAtCompany +
                   "</span><span style='display:inline-block; width:100px'><img src='" +
                    alumniRanks[i].imageURL +
                    "' width ='50px' height = '50px'></span><span style='display:inline-block; width:150px'>" +
                    alumniRanks[i].alumniPerformanceIndex +
                    "</span><span style='display:inline-block; width:50px; color:blue;'><i style='font-size:40px;' class='bi bi-award-fill'></i></span></li>"
                );
                else if(i==1)
                $("#view").append(
                    "<li id='alumniRank" +
                      i +
                      "'class='list-group-item m-2' style='color:red'>" +
                      "<span style='display:inline-block; color:green; font-size:20px; width:90px'>#" +
                      (i+1) +
                      "</span><span style='display:inline-block; width:130px'>" +
                      alumniRanks[i].fname +
                      "</span><span style='display:inline-block; width:130px'>" +
                      alumniRanks[i].lname +
                      "</span><span style='display:inline-block; width:120px'>" +
                      alumniRanks[i].yearOfPassing +
                      "</span><span style='display:inline-block; width:100px'>" +
                      alumniRanks[i].cellNum +
                      "</span><span id='Email"+i+"' style='display:inline-block; width:220px'>" +
                      alumniRanks[i].emailid +
                      "</span><span style='display:inline-block; width:100px'>" +
                      alumniRanks[i].presentlyworkingAtCompany +
                     "</span><span style='display:inline-block; width:100px'><img src='" +
                      alumniRanks[i].imageURL +
                      "' width ='50px' height = '50px'></span><span style='display:inline-block; width:150px'>" +
                      alumniRanks[i].alumniPerformanceIndex +
                      "</span><span style='display:inline-block; width:50px; color:green;'><i style='font-size:40px;' class='bi bi-award-fill'></i></span></li>"
                  );
                  else 
                  $("#view").append(
                    "<li id='alumniRank" +
                      i +
                      "'class='list-group-item m-2' style='color:red'>" +
                      "<span style='display:inline-block; color:green; font-size:20px; width:90px'>#" +
                      (i+1) +
                      "</span><span style='display:inline-block; width:130px'>" +
                      alumniRanks[i].fname +
                      "</span><span style='display:inline-block; width:130px'>" +
                      alumniRanks[i].lname +
                      "</span><span style='display:inline-block; width:120px'>" +
                      alumniRanks[i].yearOfPassing +
                      "</span><span style='display:inline-block; width:100px'>" +
                      alumniRanks[i].cellNum +
                      "</span><span id='Email"+i+"' style='display:inline-block; width:220px'>" +
                      alumniRanks[i].emailid +
                      "</span><span style='display:inline-block; width:100px'>" +
                      alumniRanks[i].presentlyworkingAtCompany +
                     "</span><span style='display:inline-block; width:100px'><img src='" +
                      alumniRanks[i].imageURL +
                      "' width ='50px' height = '50px'></span><span style='display:inline-block; width:150px'>" +
                      alumniRanks[i].alumniPerformanceIndex +
                      "</span><span style='display:inline-block; width:50px; color:orange;'><i style='font-size:40px;' class='bi bi-award-fill'></i></span></li>"
                  );
              }
        }
    }
    })

})