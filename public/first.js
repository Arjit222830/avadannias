var navbar = document.getElementById('navbar');
var navbarSelect = document.getElementById('navbarSelect');
var demo = document.getElementById('demo');
var modal = document.getElementById("myModal");
var down = document.getElementById("down");
var last= document.getElementById("last");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.opacity = 1;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.opacity = 0;
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = 0;
        modal.style.display = "none";
    }
    
    if (event.target != navbarSelect) {
        if(down.className=="collapse show")
            down.className="collapse";
    }
}

var x,vh;

resize();

 window.onresize= ()=>{
    console.log(window.innerWidth);
    resize();
 }

window.onscroll = ()=>{ 
    scrollnav();
}

/*ajax*/

$(document).ready(()=>{
    $("#form").submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/',
            data :{
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val()
                },
            
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
                alert(data.message);
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
       }); 
    });
});

/*functions*/

function resize(){
    if(window.innerWidth<550)
    {
        vh=10;
        navbar.style.opacity=0;
        navbar.style.zIndex=1;
        navbarSelect.style.opacity=1;
        navbarSelect.style.zIndex=2;
        last.style.marginLeft=0;
        last.style.marginRight=0;
    }
    else
    {
        vh=42;
        navbar.style.opacity=1;
        navbar.style.zIndex=2;
        navbarSelect.style.opacity=0;
        navbarSelect.style.zIndex=1;
        last.style.marginLeft=window.innerWidth*3/100;
        last.style.marginRight=-50;
    }
    x= window.innerHeight*vh/100;
}

function scrollnav(){
     if (document.body.scrollTop >= x)
    {
        navbar.style.backgroundColor= "#24ad1f";
        navbarSelect.style.backgroundColor= "#24ad1f";
    }
    else
    {
        navbar.style.backgroundColor= "transparent";
        navbarSelect.style.backgroundColor= "transparent";
    }
}

/*facebook
window.fbAsyncInit = function() {
    FB.init({
      appId            : "353139985348743",
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.3'
    });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


FB.CustomerChat.update({  
  logged_in_greeting: 'Hello There!',
  logged_out_greeting: 'Log in to Chat with Us',  
  ref: 'coupon_15',
});
*/
