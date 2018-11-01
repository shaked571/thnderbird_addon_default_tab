var isMakeRedButtonChecked = false;

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;

    let editor = GetCurrentEditor();

    editor.beginTransaction();
    editor.selectAll();

    let newRedHtml = '<head></head><body text="#000000" bgcolor="#FFFFFF">';
    let redFontStrat = '<font color="#ff0000">';
    let redFontEnd = '</font>';
    let newLine = '<br>';
    //TODO need to make text black at first
    let stringHtml = editor.document.getElementByTagName('body');
    if (!isMakeRedButtonChecked) {
        if (window.confirm("Do you wish to make every second charechter red?")) {
            var lines = (stringHTML["0"].innerHTML).split('<br>');
            for (var i = 0; i < lines.length; i++) {
                var chars = (lines[i]).split("");
                for (var j = 0; j < chars.length; j++) {
                    if (j % 2 === 0) {
                        newRedHtml += (redFontStrat + chars[j] + redFontEnd);
                        console.log(newRedHtml)
                    } else {
                        newRedHtml += chars[j];
                    }
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
    }
    editor.endTransaction();
}