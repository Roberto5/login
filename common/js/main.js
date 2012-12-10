$(function(){
	$("ul#news").liScroll();
	$("button:not(.edit):not(.add):not(.delete),input[type=submit]:not(.edit):not(.add):not(.delete)").button();
	$("button.edit").button({icons: {
        primary: "ui-icon-wrench"
    },
    text: false
    });
	$("button.add").button({icons: {
        primary: "ui-icon-plus"
    },
    text: false
    });
	$("button.delete").button({icons: {
        	primary: "ui-icon-close"
    	},
    		text: false
    });;
    $('option').addClass('ui-widget-content');
    $('select').addClass('ui-state-default ui-corner-all')
    	.bind('mouseover',function(){
    		$(this).addClass('ui-state-hover');
    	}).bind('mouseout',function(){
    		$(this).removeClass('ui-state-hover');
    	});
});
loader={
	n:0,
	show:function(){
		this.n++;
		$('#loader').show();
	},
	hide:function(){
		this.n--;
		if (!this.n) $('#loader').hide();
	}
};
/**
 * 
 * @param url
 * @param data
 * @param callback
 * @param reload
 */
function request(url,data,callback,reload) {
	loader.show();
	$.ajax({
		url:path+url,
		type:'post',
		dataType : "json" ,
		success :function(data){
			loader.hide();
			if (!data.success) {
				alert(data.message);
				if (reload) location.reload();
			}
			if (callback) callback(data);
		},
		'data':data,
		error:function(r,s,e ) {
			alert(e+' on call:'+this.url+' whit data '+this.data);
		}
	});
}

var prev_user=null;
var prev_email=null; 
var prev_pass=null;
var prev_pass2=null;
var bemail=false;
var buser=false;
function controlRegister()
{
	user=$("#user").val();
	email=$("#email").val();
	pass=$("#pass").val();
	pass2=$("#pass2").val();
	bool=true;
	// controllo password
	if((pass!=pass2)||(pass=="")||(pass2=="")) {
		$("#pass,#pass2").css("border","2px solid red");
		bool= false;
	}else{
		if((pass.length>4)&&(pass.length<16)) {
			$("#pass,#pass2").css("border","2px solid green");
		}else{
			$("#pass,#pass2").css("border","2px solid red");
			bool= false;
		}
	}
   //controllo email aiax
   if ((email!="")&&(email!=prev_email)) {
		if (email.match(/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,3}$/gi)) {
			//chiamata ajax
			$("#email-label").html('<label class="required" for="email">Email'+': <img src="'+path+'/common/img/loading.gif" alt="load" /></label>');
			$.ajax({
				url : path+"/reg/ctrl",
				type : "post" ,
				data : 'cerca=email&valore='+email,
				dataType : "json" ,
				success : function (data,stato) {
					//data=jQuery.parseJSON(data);
					$("#email-label").html('<label class="required" for="email">Email</label>');
					bmail=data;
					if (data) {
						$("#email").css("border","2px solid green");
					}
					else {
						$("#email").css("border","2px solid red");
						bool= false;
					}
				},
				error : function (richiesta,stato,errori) {
					$("#email-label").html('<label class="required" for="email">Email</label>');
					alert("An error occurred. "+errori);
				}
			});
        } 
        else {
			$("#email").css("border","2px solid red");
			bool= false;
        }
    }
   else bool=bool && bmail;
    //controllo user
    if ((user)&&(prev_user!=user)) {
        if ((user.length>=4)&&(user.length<=30)) {
			//chiamata ajax
        	$("#user-label").html('<label class="required" for="user">Username'+': <img src="'+path+'/common/img/loading.gif" alt="load" /></label>');
			$.ajax({
				url : path+"/reg/ctrl",
				type : "post" ,
				data : 'cerca=username&valore='+user,
				dataType : "json" ,
				success : function (data,stato) {
					//data=jQuery.parseJSON(data);
					buser=data;
					$("#user-label").html('<label class="required" for="user">Username</label>');
					if (data) {
						$("#user").css("border","2px solid green");
					}
					else {
						$("#user").css("border","2px solid red");
						bool= false;
					}
				},
				error : function (richiesta,stato,errori) {
					$("#user-label").html('<label class="required" for="user">Username</label>');
					alert("An error occurred. "+errori);
				}
			});
        }else {
			$("#user").css("border","2px solid red");
			bool= false;
        }
    }
    else bool=bool && buser;
    prev_user=user;
    prev_email=email;
    return bool;
}