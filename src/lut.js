const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const vscode = require('vscode');
const { time } = require('console');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { parseJsonText } = require('typescript');

exports.evaluateString = (transcript) => {
    const action = transcript.split(" ")[0].toLowerCase();
    let secondTerm;
    if (transcript.split(" ").length > 1){
        secondTerm = transcript.split(" ")[1].toLowerCase();
    }
    console.log(action)

    switch(action) {
        case "variable":
            variableDeclaration(transcript)
            break;

        case "for":
            forStatement(transcript)
            break;
        case "new":
            switch(secondTerm) {
                case "line":
                    newLine()
                    break;
                case "file":
                    newFile()
                    break;
                case "class":
                    newClass(transcript);
                    break;
                case "function":
                    newFunction(transcript);
                    break;
                default:
                    insertText("new")
            }
            break;
        case "delete":
            switch(secondTerm) {
                case "line":
                    delLine()
                    break;
                default:
                    deletePrevWord()
            }
            break;
        case "jump": 
            jumptoLine(transcript)
            break;
        case "print":
            break;
        case "comma":
            comma();
            break;
        case "undo":
            undo();
            break;
        case "redo":
            redo();
            break;
        case "indent":
            indent(secondTerm)
            break;
        case "function":
            insertFunc(transcript)
            break;
        case "outdent":
            outdent(secondTerm)
            break;
        case "next":
            switch (secondTerm) {
                case "line":
                    nextLine()
                    break;
            }
            break;
        case "string":
            insertString(transcript)
            break;
        case "previous":
            switch (secondTerm) {
                case "line":
                    prevLine()
                    break;
            }
            break;
        case "run":
            execute()
            break;
        case "copy":
            copy()
            break;
        case "cut":
            cut()
            break;
        case "paste":
            paste()
            break;
        case "select":
            select()
            break;
        default: 
            insertText(transcript)
    }
}

function insertString(text)
{
    const words = text.split(" ");
    words.shift()
    let output = words.join(" ");
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    editor.edit(editBuilder => 
    {
        const position = editor.selection.active;
        editBuilder.insert(position,"\""+output+"\"");
        
    });
}

function comma(text)
{
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    editor.edit(editBuilder => 
    {
        const position = editor.selection.active;
        editBuilder.insert(position,", ");
        
    });
}

function insertText(text)
{
    let output = substitute(text);
    const editor = vscode.window.activeTextEditor;
    if (editor)
    {
        const document = editor.document;
        editor.edit(editBuilder => 
        {
            const position = editor.selection.active;
            editBuilder.insert(position,output)
            
        });

    }
}

function newClass(text)
{
    const words = text.split(" ");
    let output = `class ${words[2]}: \n`;
    insertText(output);
    indent()
}

function newFunction(text)
{
    const words = text.split(" ");
    let output = "def "+words[2] +"():";
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    if (editor)
    {
        const document = editor.document;
        editor.edit(editBuilder => 
        {
            const position = editor.selection.active;
            editBuilder.insert(position,output)
            
        });

    }
    const position = editor.selection.active;
    var newPosition = position.with(position.line, position.character+output.length-2);
    editor.selection = new vscode.Selection(newPosition,newPosition);


}

function insertFunc(text)
{
    const words = text.split(" ");
    let output = `${words[1]}()`;
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    editor.edit(editBuilder => 
    {
        const position = editor.selection.active;
        editBuilder.insert(position,output)
        
    });
    const position = editor.selection.active;
    var newPosition = position.with(position.line, position.character+output.length-1);
    editor.selection = new vscode.Selection(newPosition,newPosition);


}

function substitute(text)
{
    let output = text;
    output = output.replace("equal","=");
    output = output.replace("plus","+");
    output = output.replace("plus","+");
    output = output.replace("minus","-");
    output = output.replace("minus","-");
    output = output.replace("not equal","!=");
    output = output.replace("greater than or equal to",">=");
    output = output.replace("less than or equal to","<=");
    output = output.replace("greater than",">");
    output = output.replace("less than","<");
    return output
}

function forStatement(text)
{
    //for x in range 1 to 10
    //for x in y
    let words =  substitute(text);
    words = words.replace("equal","=");
    words = words.split(" ");
    let output = "";
    let vname = words[1].toLowerCase()
    if (words.includes("range"))
    {
        if (words.length <= 5)
        {
            output = `for ${vname} in range(${words[4]}):`;
        }
        else
        {
            output = `for ${vname} in range(${words[4]},${words[6]}):`;
        }
    }
    else
    {
        output = `for ${vname} in ${words[3]}:`;
    }
    insertText(output);
    indent();
    
}

const newLine = () => {
    vscode.commands.executeCommand('editor.action.insertLineAfter')
    console.log("NEW LINE")
}

const variableDeclaration = (transcript) => {
    console.log("variable declataion")
    const editor = vscode.window.activeTextEditor;
    if (editor)
    {
        const document = editor.document;
        editor.edit(editBuilder => 
        {
            if (editor.selection.isEmpty)
            {
                const position = editor.selection.active;
                editBuilder.insert(position, transcript.substr(transcript.indexOf(" ") + 1).replace(/equals|gets|equal|get/g, '=') + "\n")
            }
        });

    }
}

const jumptoLine = (transcript) => {
    let words = transcript.split(" ");
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    var newPosition = position.with(parseInt(words[1])-1, 0);
    editor.selection = new vscode.Selection(newPosition,newPosition);
}

const undo = () => {
    vscode.commands.executeCommand('undo')
}

const redo = () => {
    vscode.commands.executeCommand('redo')
}

const deletePrevWord = () => {
    vscode.commands.executeCommand('deleteWordLeft')
}

const delLine = () => {
    vscode.commands.executeCommand('editor.action.deleteLines')
    newLine();
}

const copy = () => {
    vscode.commands.executeCommand('editor.action.clipboardCopyAction')
}

const cut = () => {
    vscode.commands.executeCommand('editor.action.clipboardCutAction')
}

const paste = () => {
    vscode.commands.executeCommand('editor.action.clipboardPasteAction')
}

const select = () => {
    vscode.commands.executeCommand('expandLineSelection')
}


const indent = (secondTerm) => {
    if (secondTerm)
    {
        for (let x  = 0; x < parseInt(secondTerm);x++)
        {
            vscode.commands.executeCommand('editor.action.indentLines')
        }
    }
    else
    {
        vscode.commands.executeCommand('editor.action.indentLines')
    }
   
}

const outdent = (secondTerm) => {
    if (secondTerm)
    {
        for (let x  = 0; x < parseInt(secondTerm);x++)
        {
            vscode.commands.executeCommand('outdent')
        }
    }
    else
    {
        vscode.commands.executeCommand('outdent')
    }
}

const execute = () => {
    vscode.commands.executeCommand('workbench.action.debug.run')
}

const nextLine = () => {
    console.log("NEXT LINE")
    const moveBy = {
        to: "down",
        by: "line",
    }
    vscode.commands.executeCommand('cursorMove', moveBy)
}

const prevLine = () => {
    console.log("PREV LINE")
    const moveBy = {
        to: "up",
        by: "line",
    }
    vscode.commands.executeCommand('cursorMove', moveBy)
}

const newFile = () => {
    vscode.commands.executeCommand('workbench.action.files.newUntitledFile')
}