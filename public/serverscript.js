    var x=!{JSON.stringify(updates)};
    var update= document.getElementById('update');
    for(var i=0;i<x.length;i++)
    {
        var index= x[i].date.toString().indexOf(':');
        var date= x[i].date.toString().substring(0,index-3);
        var h5d= document.createElement('h5');
        h5d.setAttribute('style','color: #2a5d0b');
        var textd = document.createTextNode("Posted on "+date);
        h5d.appendChild(textd);
        update.appendChild(h5d);
        var h5= document.createElement('h5');
        var text = document.createTextNode(x[i]["text"]);
        h5.appendChild(text);
        if(x[i]["link"]=="No_Link")
            update.appendChild(h5);
        else
        {
            var anchor= document.createElement('a');
            anchor.setAttribute('href', x[i]["link"]);
            anchor.setAttribute('target','_blank');
            anchor.setAttribute('style','color:black');
            anchor.appendChild(h5);
            update.appendChild(anchor);
        }
        update.appendChild(document.createElement('br'));
    }