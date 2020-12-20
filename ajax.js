var pageCounter=1;
var btn= document.getElementById('btn');
var animal= document.getElementById('animal');

btn.addEventListener('click', ()=>{
    var ourRequest= new XMLHttpRequest();
    ourRequest.open('GET',`https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);

    ourRequest.onload= ()=>{
        var ourData= JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    } 
    
    ourRequest.send();
    pageCounter++;
    if(pageCounter>3){
        btn.style.opacity=0;
    }
});

function  renderHTML(data){
   
   var htmlString=""; 
    
   for(var i=0;i< data.length; i++){
       htmlString+="<p>"+data[i].name+"is a "+data[i].species+".</p>";    
   } animal.insertAdjacentHTML('beforeend',htmlString);
}