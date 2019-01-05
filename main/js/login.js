

// logout
$('#logoutBtn').click(function(){   
        $.ajax({
            url:'http://39.106.60.55:8081/user/logout',
            type:"post",
            dataType:'json',
            async:false,
            // timeout:30000,
            headers: {"Content-Type": "application/json;charset=UTF-8","token":localStorage.getItem('loginToken')},
            // contentType:"application/json;charset=UTF-8",
            success:function(data){//data,xhr,textStatus
                // alert(1)
                localStorage.clear()
                $(location).attr('href', 'login.html');

            },
            error:function(){//XMLHttpRequest, textStatus, errorThrown
                localStorage.clear()
                $(location).attr('href', 'login.html');
                // alert(21)
            }
        })      
    
})

// sidbar kyc href
function getHome(){
        $.ajax({
            url:'http://39.106.60.55:8081/user/selectViewHome',//验证码验证
            type:"post",
            dataType:'json',
            async:false,
            // timeout:30000,
            headers: {"Content-Type": "application/json;charset=UTF-8","token":localStorage.getItem('loginToken')},
            // contentType:"application/json;charset=UTF-8",
            success:function(data){//data,xhr,textStatus
                
                // console.log(data)
                if(data.code==200){
                   if(data.data.kycStatus==='N'){
                       $('#akyc').attr("href","kycAml.html")
                   }else if(data.data.kycStatus==='W'){
                       $('#akyc').attr("href","kycAmlWaiting.html")
                   }else if(data.data.kycStatus==='Y'){
                       $('#akyc').attr("href","kycAmlSuccess.html")
                   }else if(data.data.kycStatus==='F'){
                       $('#akyc').attr("href","kycAmlFailure.html")
                   }           
                }else if(data.code==500){
                    alert(data.message)
                    if(data.data.status==='499'){
                        localStorage.clear()
                        $(location).attr('href', 'login.html')
                      }
                }else if(data.code==='499'){
                    localStorage.clear()
                    $(location).attr('href', 'login.html')
                }
            },
            error:function(){//XMLHttpRequest, textStatus, errorThrown
                // alert()
            }
        })//验证码ajax      
}
