$(function(){

    $("#donate").on("click",function(e){
        e.preventDefault()
        if($("#donationTowards :selected").val()=="Donate Towards")
        alert("Select Donation Category")
        else{
        var amount = parseInt($('#donationAmt').val());
        if(amount>=10){
   
    var options = {
        "key": "rzp_test_k3svBAIjEcg5pA",
        "amount": (amount*100), //100 paise
        "name": "S.G.Balekundri Institute of Technology",
        "description": "Testing...",
        "image": "https://razorpay.com/assets/razorpay-logo.svg",
        "handler": function (response){
            $.ajax({
                url: '/payment/verify',
                type: 'post',
                dataType: 'json',
                data: {
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                },
                success: function (response) {
                    $("#donationAmt").css({
                           "color":'green'
       
                    }) 
                    alert('Payment Successful...SGBIT');
                
                }
            });
        },
        "prefill": {
            "contact": '9480275919',
            "email":   'sfroddjforkts@gmail.com',
        },
        "theme": {
            "color": "#528FF0"
        }
    }; //Options
 var rzp1 = new Razorpay(options);
 try{
 rzp1.open();
 //alert("Payment Succesful..");
 }
 catch(e){ alert(e) }
}
else{
     alert("Minimum Donation Amount is Rs. 1000/-")
     $("#donationAmt").val("")
     $("#donationAmt").focus()
}
        }

//alert("Payment Done")
})//Click End

$(".btn").on("click",function(e){
    e.preventDefault()
    let idx=$(this).attr("id")
    let amount = idx.substring(idx.lastIndexOf('-')+1)
    $('#donationAmt').val(amount)
})


$("#backToAlumniHome").on("click",function(e){
    e.preventDefault()
    window.location = "../components/home.html"
})

}) //Ready Function