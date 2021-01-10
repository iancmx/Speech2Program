const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { parseConfigFileTextToJson } = require('typescript');
const vscode = require('vscode');
const {evaluateString} = require('./lut.js')

class Speech2Program {

    config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        speechContexts: [{
            phrases: ["for x in range", "loop x through", "x gets y", "y equals z", "outdent", "run", "undo", "new class", "new function"]
        }]
    };

    constructor(encoding='LINEAR16', sampleRateHertz=16000, languageCode='en-US') {
        this.config.encoding = encoding;
        this.config.sampleRateHertz = sampleRateHertz;
        this.config.languageCode = 'en-US';
        this.client = new speech.SpeechClient();
        this.request = {
            config: this.config,
            interimResults: false, //Get interim results from stream
        }
        this.recognizeStream = this.client
            .streamingRecognize(this.request)
            .on('error', console.error)
            .on('data', (data) => {
                if (data.results[0] && data.results[0].alternatives[0]){
                    vscode.window.showInformationMessage(`Transcription: ${data.results[0].alternatives[0].transcript}\n`);
                    evaluateString(data.results[0].alternatives[0].transcript.trim().toLowerCase())
                    // process.stdout.write(`Transcription: ${data.results[0].alternatives[0].transcript}\n`)
                } else {
                    vscode.window.showInformationMessage('\n\nReached transcription time limit, press Ctrl+C\n');
                    // process.stdout.write('\n\nReached transcription time limit, press Ctrl+C\n')
                }
            });
    }

    startSpeech2Program() {
        vscode.window.showInformationMessage('Starting Speech2Program');
        recorder
            .record({
                sampleRateHertz: this.config.sampleRateHertz,
                threshold: 0, //silence threshold
                recordProgram: 'rec', // Try also "arecord" or "sox"
                silence: '5.0', //seconds of silence before ending,
            })
            .stream()
            .on('error', console.error)
            .pipe(this.recognizeStream);
    }

    
}

module.exports = Speech2Program