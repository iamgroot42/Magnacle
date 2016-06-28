/*
	
	In this file all the main code will reside!!
	
*/






// helper functions 
function setUrlSmart(url , title)
{
	window.history.pushState('1', title , url );

}


// $(window).bind('scroll', function() {
//     if($(window).scrollTop() >= $('.bottomloader').offset().top + $('.bottomloader').outerHeight() - window.innerHeight) {
//         alert('end reached');
//     }
// });



function showNotific(text)
{
	$.notify({
		icon: 'pe-7s-gift',
		message: text

	},{
		type: 'info',
		timer: 2000
	});
}







// all show pages





/// All page functions






// fetched posts










// login

accessToken = $.cookie("accessToken")||"";

function doLogin(fbAccessToken)
{
	API.Users.fbLogin(fbAccessToken , function( e , r ){
		if(!(e))
		{
			accessToken = r;
			// alert(accessToken)
			loginSuccesful();
		}
	})
}

function loginSuccesful()
{
	$.cookie("accessToken" , accessToken );
}

function showLogin()
{
	$("#loginPage").show();
	return false;
}

function isLogin()
{

}
