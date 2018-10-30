var isMakeRedButtonChecked = false;

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;

    let editor = GetCurrentEditor();
    //let codes = doc.getElementsByTagName('code');    

    editor.beginTransaction();
    editor.selectAll();

    let selection = editor.selection.toString();
    let newRedHtml = '<head></head><body text="#000000" bgcolor="#FFFFFF">';
    let redFontStrat = '<font color="#ff0000">';
    let redFontEnd = '</font>';
    let newLine = '<br>';
    //TODO need to make text black at first
    let documentHtml = editor.document.documentElement.innerHTML;
    if (!isMakeRedButtonChecked) {
        if (window.confirm("Do you wish to make every second charechter red?")) {
            var lines = documentHtml.split('<br>');
            for (var i = 0; i < lines.length; i++) {
                var chars = (lines[i]).split("");
                for (var i = 0; i < chars.length; i++) {
                    if (i % 2 == 0) {
                        newRedHtml += (redFontStrat + chars[i] + redFontEnd);
                    } else {
                        newRedHtml += chars[i];
                    }
                    newRedHtml += '<span>' + chars[i] + '</span>';
                }
                newRedHtml += newLine;
            }
            redFontStrat += '</body>';
          
            editor.selection.deleteFromDocument();
            editor.insertHTML(newRedHtml);
                    
            } else {
                document.getElementById('makered').checked = true;
            }
    } else {
        isMakeRedButtonChecked = false;
        //textOri = editor.document.documentElement.innerHTML;
        //editor.selection.deleteFromDocument();
        //editor.insertHTML(doc.documentElement.innerHTML);
    }
    //var editor_type = GetCurrentEditorType();
    //editor.beginningOfDocument(); // seek to beginning  
    //editor.insertLineBreak();
    editor.endTransaction();

}