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
				return '<span style=\"color:'+color+'\">'+el+'</span>';
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

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;
    let editor = GetCurrentEditor();
    editor.beginTransaction();
    editor.selectAll();
    let nodes = editor.document.body.cloneNode(true);
    if (window.confirm("Do you wish to make every second charechter red?\n"+
                       "If you have preform it once on the feature won't work!")) { //This wont work because the way we "sign" the traversed nodes in the html
        addColor(nodes, 'red'); //can be changed to any color in the fututre 
        editor.selection.deleteFromDocument();
        editor.document.body.innerHTML = nodes.innerHTML;             
    } else {
        document.getElementById('makered').checked = true;
    }
    editor.endTransaction();
}