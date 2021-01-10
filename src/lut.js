const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { parseConfigFileTextToJson } = require('typescript');
const vscode = require('vscode');

exports.evaluateString = (transcript) => {
    let action = transcript.split(" ")[0]
    switch(action) {
        case "variable":
            variableDeclaration(transcript)
            break;

        default: 
            insertText(transcript)
    }
}

function insertText(text)
{
    const editor = vscode.window.activeTextEditor;
    if (editor)
    {
        const document = editor.document;
        editor.edit(editBuilder => 
        {
            if (editor.selection.isEmpty)
            {
                const position = editor.selection.active;
                editBuilder.insert(position,text + "\n")
            }
        });

    }
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