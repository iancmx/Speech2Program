const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { parseConfigFileTextToJson } = require('typescript');
const vscode = require('vscode');

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
                editBuilder.insert(position,text)
            }
        });

    }
}

exports.insertText = insertText()