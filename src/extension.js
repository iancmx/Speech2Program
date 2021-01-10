// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Speech2Program = require('./speech2program')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const speech2programClient = new Speech2Program()
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Speech2Program is now active! Start talking to program!');
	let speech2program = vscode.commands.registerCommand('speech2program.startMain', function () {
		speech2programClient.startSpeech2Program()
	})

	context.subscriptions.push(speech2program);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
