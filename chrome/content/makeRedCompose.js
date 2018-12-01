var TextType = 3; 
var isMakeRedButtonChecked;

function addColor(domNode, color){
	if(domNode.nodeType != 1|| !domNode.hasAttribute('edited')){
		if(domNode.nodeType == TextType){
			var newText = document.createElement('span');    
			newText.innerHTML = domNode.textContent;
            newText.setAttribute('edited', true);
            var i = 0;
			var text = newText.innerHTML.split('').map(function(el){
			  if(i % 2 == 0){
                  i++;
				return '<span style=\"color:'+ color+'\">' + el + '</span>';
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
			addColor(domNode.childNodes[j], color);
		}
	}
} 

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;
    
    var editor = GetCurrentEditor();
    if (window.confirm("Do you wish to make every second charechter red?\n"+
                       "If you have already done it once on the message, it won't work again.")) { //This wont work because the way we "sign" the traversed nodes in the html    
                       var nodes = editor.document.body.cloneNode(true);

                       editor.beginTransaction();
                       addColor(nodes, 'red'); //can be changed to any color in the fututre 
                       editor.selection.deleteFromDocument();
                       editor.document.body.innerHTML = nodes.innerHTML;             
    } else {
        document.getElementById('makered').checked = true;
    }
    editor.endTransaction();
}