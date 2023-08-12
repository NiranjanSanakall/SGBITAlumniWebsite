$(function(){

//     $("#studentStats").on("click",function(e){
//         e.preventDefault()
// //    window.location = "../components/studentStats.html"
    
// })

const allBranches = ['CSE', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CSBS']
let categoryData = ""

$.ajax({
    url:"http://localhost:8000/getStat",
    type:"GET",
    dataType:"json",
    success:function(result){
        let firstTime 
        for(let j=0; j<allBranches.length;j++){
            firstTime=true
            categoryData = "<span style='display:inline-block; width:200px; margin-left:200px;></span>"
        for(let i=0;i<result.length;i++){
            if(firstTime){
                $("#stat").append("<li class='list-group-item m-2 w-100'><span style='display:inline-block; width:200px'>"+allBranches[j]+"</span>"+
                "<span style='display:inline-block; width:200px'>GM</span>"+
                "<span style='display:inline-block; width:200px'>SC</span>"+
                "<span style='display:inline-block; width:200px'>ST</span>"+
                "<span style='display:inline-block; width:200px'>OBC</span>"+
                "<span style='display:inline-block; width:50px'>Minority</span>"+
                "</li>")
                firstTime = false
            }
            else    
                if(allBranches[j]==result[i].branchName){
                    categoryData += "<span style='display:inline-block; width:200px;'>"+result[i].catCount +"</span>"
            }
        }
        $("#stat").append("<li class='list-group-item m-2 w-100'>"+categoryData+"</li>")
    }
    // if(firstTime){
        $("#stat").paginathing({
            perPage:4,
            limitPagination:10,
            containerClass:'panel-footer m-2',
            pageNumbers:true,
            ulClass:'pagination',
            liClass:'page-item',
          })
        //   firstTime=false
      //   }
    }
})



$("#backForGenStats").on("click",function(e){
    e.preventDefault()
    $.session.set("loginStatus",false)
    window.location = "../components/alumniCoordinator.html"

  })
})