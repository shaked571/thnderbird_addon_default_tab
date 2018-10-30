var isMakeRedButtonChecked = false;

function buildMakeRed() {
    Application.console.log('In Build Make Red!');
    isMakeRedButtonChecked = document.getElementById('makered').checked;

    let editor = GetCurrentEditor();
    let codes = doc.getElementsByTagName('code');    

    editor.beginTransaction();
    editor.selectAll();

    let selection = editor.selection.toString();
    let html;
    let documentElement = editor.document.documentElement;
    if (!isMakeRedButtonChecked) {
        if (window.confirm("Do you wish to make every second charechter red?")) {
                editor.selection.deleteFromDocument();
                html = textOri;
                
            } else {
                document.getElementById('makered').checked = true;
            }
    } else {

        textOri = editor.document.documentElement.innerHTML;
        editor.selection.deleteFromDocument();
        //var attrs = {
        //    nofooter: '',
        //    stylesheet: 'asciidoctor-plus.css',
        //    stylesdir: 'chrome://asciidoctor_tb/content/',
        //    'copycss!': '',
        //    'icons': '',
        //    'source-highlighter': 'highlight.js'
        //};
        //var options = {
        //    doctype: 'article',
        //    safe: 'unsafe',
        //    header_footer: true,
        //    attributes: attrs
        //};
    isMakeRedButtonChecked = false;
    //editor.insertHTML(doc.documentElement.innerHTML);

    }
    var editor_type = GetCurrentEditorType();

    editor.beginningOfDocument(); // seek to beginning  
    if (editor_type == "textmail" || editor_type == "text") {

        editor.insertLineBreak();
    } else {
       let doc = new DOMParser().parseFromString(html, "text/html");
    }
    editor.endTransaction();

}