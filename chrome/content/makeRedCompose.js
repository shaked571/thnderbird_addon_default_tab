var MakeRedTextType = 3; 
var isMakeRedButtonChecked;

function makeRedAddColor(domNode, color){
	if(domNode.nodeType != 1|| !domNode.hasAttribute('edited')){
		if(domNode.nodeType == MakeRedTextType){
			var newText = document.createElement('span');    
			newText.innerHTML = domNode.textContent;
            newText.setAttribute('edited', true);
            var i = 0;
			var text = newText.innerHTML.split('').map(function(el){
			  if(i % 2 == 0){
                  i++;
				return '<span style=\"color:' + color + '\">' + el + '</span>';
			  }
			  else{
                  i++;
				return el;
			  }
		  }).join('');
		  newText.innerHTML=text;
		  domNode.parentNode.replaceChild(newText,domNode);
		}
		for(var j = 0; j < domNode.childNodes.length; j++){
			makeRedAddColor(domNode.childNodes[j], color);
		}
	}
} 

function makeRedNoEdit(domNode){
    var allDocuments = domNode.getElementsByTagName("*");
    for (var i=0; i < allDocuments.length; i++) {
        allDocuments[i].removeAttribute('edited');
    }
} 

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makeredbutton').checked;
    
    if (window.confirm("Do you wish to make every second charechter red?")) {    
                       var editor = GetCurrentEditor();
                       var nodes = editor.document.body.cloneNode(true);
                       editor.beginTransaction();
                       makeRedAddColor(nodes, 'red'); //can be changed to any color in the fututre 
                       makeRedNoEdit(nodes);
                       editor.selection.deleteFromDocument();
                       editor.document.body.innerHTML = nodes.innerHTML;  
                       editor.endTransaction();
         
    } 
    
    document.getElementById('makeredbutton').checked = false;
}

