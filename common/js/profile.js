/**
 * 
 */
$(function(){
	$('button.edit').unbind('click').click(function() {
		profile.edit($(this).parent().parent());
		return false;
	}
	);
	//email_validator={optional:function(e){return false;},email:jQuery.validator.methods.email};
	$('.profile').validate({
		submitHandler:function() {
			
			
		},
		errorPlacement: function(error, element) {},
		rules:{
			username:{
				minlength:4,
				maxlength:30,
				regExpr:/^[a-zA-Z\d]+$/,
				remote:{
					url : path+"/profile/ctrl",
					type : "post" 
					//dataType : "json"
				}
			},
			password:{
				minlength:4,
				maxlength:16,
				regExpr:/^[a-zA-Z\d]+$/
			},
			email: {
				remote: {
					url : path+"/profile/ctrl",
					type : "post" 
				}
			}
		},
	});
	$('.profile').submit(function(e){
	});
});
var profile={
	edit:function(row) {
		row.find('input').show();
		row.find('span:eq(0)').hide();
		button=row.find('button');
		button.unbind('click').click(function(){
			profile.send($(this).parent().parent());
		});
		button.button('option','icons',{
			primary:'ui-icon-check'
		});
	},
	send:function(row) {
		v=row.find('input').hide().val();
		row.find('span:eq(0)').show().text(v);
		button=row.find('button');
		button.unbind('click').click(function(){
			profile.edit($(this).parent().parent());
			return false;
		});
		button.button('option','icons',{
			primary:'ui-icon-wrench'
		});
		request('/profile/edit',{key:row.attr('id'),value:v},false,true);
		return false;
	}
};