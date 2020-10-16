// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as URL from 'url';
const opn = require('opn');

function openBroswerUrl(activeTextEditor:vscode.TextEditor){
	const config = vscode.workspace.getConfiguration('dxOpenBroswer');
	let protocol=config.get<string>("settings.protocol")
	let hostname=config.get<string>("settings.hostname")
	let port=config.get<number>("settings.port")
	let opnOptions=config.get<object>("settings.opnOptions")
	let url = activeTextEditor.document.uri.fsPath
	let currentParentPath:string='';
	vscode.workspace.workspaceFolders?.some((WorkspaceFolder)=>{
		 if(url.includes(WorkspaceFolder.uri.fsPath)){
			currentParentPath=WorkspaceFolder.uri.fsPath
			return true
		 }
	})
	if(currentParentPath!=''){
		url=path.relative(currentParentPath,url)
	}
	url=URL.format({
		protocol:protocol,
		hostname:hostname,
		port:port,
		pathname:url.replace(/\\/g,"/")
	})
	//vscode.window.showInformationMessage(port+"")
	opn(url,opnOptions)
	//vscode.window.showInformationMessage('当前文件URL:'+url);
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "name" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.openBroswer', () => {
		// The code you place here will be executed every time your command is executed
		let editor=vscode.window.activeTextEditor
		let url=''
		if(editor){
			openBroswerUrl(editor)
		}
		// Display a message box to the user
	
	});
	vscode.commands.registerTextEditorCommand('dx open broswer',()=>{
		vscode.window.showInformationMessage('hello');
	})

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
