// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const say = require('say')

function filter_word(word) {
	word = word.replace("(", " open parantheses ")
	word = word.replace(")", " close parantheses ")
	word = word.replace(".", " dot ")
	word = word.replace("{", " open curly bracket ")
	word = word.replace("}", " closing curly bracket ")

	word = word.replace("<", " open angled bracket ")
	word = word.replace(">", " closing angled bracket ")

	word = word.replace(":", " colon ")
	word = word.replace(";", " semicolon ")

	word = word.replace("[", " open square bracket ")
	word = word.replace("]", " closing square bracket ")

	word = word.replace(",", " comma ")
	word = word.replace("'", " single apostrophe ")
	word = word.replace('"', " double apostrophe ")

	word = word.replace('=', " equals ")
	word = word.replace('!=', " does not equals ")

	word = word.replace("	", " indent ")
	return word
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let _disposable = vscode.commands.registerCommand('helloworld.stop', function () {
		// The code you place here will be executed every time your command is executed

		console.log("registering helloworld.stop")
		say.stop()

	});

	context.subscriptions.push(_disposable);

	let readOnwards = vscode.commands.registerCommand('helloworld.readOnward', function () {

		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		const selection = editor.selection;

		// Get the word within the selection
		var word = document.getText(selection);
		console.log(word)


		const activeEditor = vscode.window.activeTextEditor
		var line = null
		var character = null
		if (activeEditor) {
			line = activeEditor.selection.active.line // row
			character = activeEditor.selection.active.character // column
			console.log('line', line, 'character', character)
		}

		var firstLine = editor.document.lineAt(0);
		var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

		var text = editor.document.getText();
		console.log('textRange:', textRange)
		console.log('text:', text)

		var selected_area_onwards = text.split(/\r?\n/)
		var sao = ""

		if (word == "{" || word == "[" || word == "(" || word == "<") {
			for (var i = line; i < selected_area_onwards.length; i++) {
				sao += selected_area_onwards[i]
				sao += "\n"
			}
		}
		else if (word == "}" || word == "]" || word == ")" || word == ">") {
			for (var i = line; i >= 0; i--) {
				sao += selected_area_onwards[i]
				sao += "\n"
			}
		}

		console.log('selected_area_onwards:', sao)

		if (word == "{") {
			sao = sao.split("}")[0] + "}" // include that it works for deeper loops too
		}

		if (word == "}") {
			var temp = sao.split("{")
			var temp2 = "{" + temp[temp.length - 2]
			sao = temp2.replace('}', '')
			sao += "}"
		}

		if (word == "(") {
			sao = sao.split(")")[0] + ")" // include that it works for deeper loops too
		}

		if (word == ")") {
			var temp = sao.split("(")
			var temp2 = "(" + temp[temp.length - 2]
			sao = temp2.replace(')', '')
			sao += ")"
		}

		if (word == "[") {
			sao = sao.split("]")[0] + "]" // include that it works for deeper loops too
		}

		if (word == "]") {
			var temp = sao.split("[")
			var temp2 = "[" + temp[temp.length - 2]
			sao = temp2.replace(']', '')
			sao += "]"
		}

		if (word == "<") {
			sao = sao.split(">")[0] + ">" // include that it works for deeper loops too
		}

		if (word == ">") {
			var temp = sao.split("<")
			var temp2 = "<" + temp[temp.length - 2]
			sao = temp2.replace('>', '')
			sao += ">"
		}

		sao = filter_word(sao)

		say.speak(sao)

	})

	context.subscriptions.push(readOnwards);


	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		const selection = editor.selection;

		// Get the word within the selection
		var word = document.getText(selection);
		console.log(word)



		var temp = filter_word(word)
		say.speak(temp)
		//let highlight = editor.document.getText(wordRange);


		//vscode.window.showInformationMessage(word);
	});

	// to add: indents (for python), being able to read errors out loud?, reading things IN a specific loop when a certain curly bracket/parantheses is selected
	// instead of saying 'open square bracket 2 closing square bracket' maybe knowing to say 'at element 2' 
	// changing the timing to pausing between lines 

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate,
}
