var isMakeRedButtonChecked = false;
var newRedHtml = '<head></head><body text="#000000" bgcolor="#FFFFFF">';
var redFontStrat = '<font color="#ff0000">';
var redFontEnd = '</font>';
var newLine = '<br>';
function paintLine(line){
    var newRedHtml = "";
    if(line === ""){
        return newRedHtml;
    }
    var newRedHtml = "";
    var text = line.split(/(<[a-z]+>|<\[a-z]+>)/);
    for (var j = 0; j < text.length; j++) {
        if (j % 2 === 0) {
            newRedHtml += text[j].fontcolor("red") ;
            console.log(newRedHtml)
        } else {
            newRedHtml += text[j];
        }
    }
    newRedHtml += newLine;
    return newRedHtml;
}
function addColor(domNode, color){
	if(domNode.nodeType!=1||!domNode.hasAttribute('edited')){
		if(domNode.nodeType==3){
			var newText=document.createElement('span');    
			newText.innerHTML=domNode.textContent;
            newText.setAttribute('edited', true);
            var i = 0;
			var text = newText.innerHTML.split('').map(function(el){
			  if(i%2 == 0){
                  i++;
				return '<i style=\"color:'+color+'\">'+el+'</i>';
			  }
			  else{
                  i++;
				return el;
			  }
		  }).join('');
		  newText.innerHTML=text;
		  domNode.parentNode.replaceChild(newText,domNode);
		}
		for(var i=0; i<domNode.childNodes.length;i++){
			addColor(domNode.childNodes[i], color);
		}
	}
} 

// addColor(document.getElementById('phrase'), 'red', 'e');
function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;
    let editor = GetCurrentEditor();
     editor.beginTransaction();
     editor.selectAll();

    let nodes = editor.document.body.cloneNode(true);

    if (isMakeRedButtonChecked) {
        if (window.confirm("Do you wish to make every second charechter red?")) {
            addColor(nodes, 'red');
            
            editor.selection.deleteFromDocument();
            editor.document.body.innerHTML = nodes.innerHTML;
                    
            } else {
                document.getElementById('makered').checked = true;
            }
    } else {
        isMakeRedButtonChecked = false;
    }
    // editor.endTransaction();
}