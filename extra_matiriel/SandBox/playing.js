

var isMakeRedButtonChecked = false;

function buildMakeRed() {
    console.log('In Build Make Red!');
    // isMakeRedButtonChecked = document.getElementById('makered').checked;

    // let editor = GetCurrentEditor();
    //let codes = doc.getElementsByTagName('code');    

    // editor.beginTransaction();
    // editor.selectAll();

    // let selection = editor.selection.toString();
    let newRedHtml = '<head></head><body text="#000000" bgcolor="#FFFFFF">';
    let redFontStrat = '<font color="#ff0000">';
    let redFontEnd = '</font>';
    let newLine = '<br>';
    //TODO need to make text black at first
    // let documentHtml = editor.document.documentElement.innerHTML;
    newDoc = document.implementation.createHTMLDocument('title');
    var htmlDoc = newDoc.createElement( 'html' );
    var hh = '<font color="#ff0000">a</font>z<br>b<br>nmm<b>md</b>d<br>d&nbsp; s ss<br><ul><li>dd</li><li>dd</li><li>d</li><li>d<br></li></ul>';

    htmlDoc.innerHTML = '<head></head><body text="#000000" bgcolor="#FFFFFF">'+hh+'</body>';
    let stringHTML = htmlDoc.getElementsByTagName( 'body' );

    // documentHtml = '<head></head><body text="#000000" bgcolor="#FFFFFF">ab!<br>cc<br>d<br>Z<br></body>';
    var reg = /^(\<br\>|\<p\>|\<\/p\>)/;
    var lines;
// var hdkmjdl ="";
//     while((lines = reg.exec(stringHTML.innerHTML)) !== null){
//         hdkmjdl += paintLine(lines)
//     }
    
    var arr = [];
    for(var i = 0, n; n = stringHTML[0].childNodes[i]; ++i) arr.push(n);
        
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
            newRedHtml += '</body>';

            // editor.selection.deleteFromDocument();
          //  console.log(newRedHtml);
			window.confirm(newRedHtml)
            // editor.insertHTML(newRedHtml);

        // } else {
            document.getElementById('makered').checked = true;
        }
    }
    // } else {
        // isMakeRedButtonChecked = false;
        //textOri = editor.document.documentElement.innerHTML;
        //editor.selection.deleteFromDocument();
        //editor.insertHTML(doc.documentElement.innerHTML);
    // }
    //var editor_type = GetCurrentEditorType();
    //editor.beginningOfDocument(); // seek to beginning  
    //editor.insertLineBreak();
    // editor.endTransaction();

}
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
            newRedHtml += (redFontStrat + text[j] + redFontEnd);
            console.log(newRedHtml)
        } else {
            newRedHtml += text[j];
        }
    }
    newRedHtml += newLine;
    return newRedHtml;
}
buildMakeRed();