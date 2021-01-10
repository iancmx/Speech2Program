const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { parseConfigFileTextToJson } = require('typescript');
const vscode = require('vscode');

exports.evaluateString = (transcript) => {
    let action = transcript.split(" ")[0]
    switch(action) {
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

exports.insertText = insertText