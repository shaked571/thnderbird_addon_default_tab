var isMakeRedButtonChecked = false;

function buildMakeRed() {
	var {Cc, Ci} = require("chrome");
    var Application = Cc["@mozilla.org/steel/application;1"]
                    .getService(Ci.steelIApplication);
    Application.console.log('In Build Make Red!');
	isMakeRedButtonChecked = document.getElementById('makeredbutton').checked;

	let editor = GetCurrentEditor();

	editor.beginTransaction();
	editor.selectAll();

	let selection = editor.selection.toString();
	let html;

	if (!isMakeRedButtonChecked && textOri) {
		if (nbHtmlAsciiUpdate > 1) {
			if (window.confirm("Do you wish to make every second charechter red?")) {
				editor.selection.deleteFromDocument();
				html = textOri;
				nbHtmlAsciiUpdate = 0;
			} else {
				document.getElementById('asciime').checked = true;

			}
		} else {
			editor.selection.deleteFromDocument();
			html = textOri;
			nbHtmlAsciiUpdate = 0;
		}

	} else {

		textOri = editor.document.documentElement.innerHTML;
		editor.selection.deleteFromDocument();
		var attrs = {
			nofooter: '',
			stylesheet: 'asciidoctor-plus.css',
			stylesdir: 'chrome://asciidoctor_tb/content/',
			'copycss!': '',
			'icons': '',
			'source-highlighter': 'highlight.js'
		};
		var options = {
			doctype: 'article',
			safe: 'unsafe',
			header_footer: true,
			attributes: attrs
		};
		html = Asciidoctor().convert(selection, options);


	}


	var editor_type = GetCurrentEditorType();

	editor.beginningOfDocument(); // seek to beginning  
	if (editor_type == "textmail" || editor_type == "text") {
		editor.insertText("NOT SUPPORTED");
		editor.insertLineBreak();
	} else {
		html = html.replace(new RegExp("./images/icons/", 'g'), "chrome://asciidoctor_tb/content/images/font-awesome-4.7.0PNG/");
		let doc = new DOMParser().parseFromString(html, "text/html");
		let codes = doc.getElementsByTagName('code');
		for (var i = 0; i < codes.length; i++) {
			hljs.highlightBlock(codes.item(i));
		}
		editor.insertHTML(doc.documentElement.innerHTML);
	}
	editor.endTransaction();

	let imagesToConvert = [];
	for (let img of editor.document.images) {
		imagesToConvert.push(img.src);
	}

	imagesToConvert.forEach(url => {

		try {
			loadBlockedImage(url, false)
		} catch (ex) {
			console.warn("Error while loading "+url+" ("+ex+")");
		}

	});