import React, { useState, useEffect, useRef } from "react";
import { useMsal } from "@azure/msal-react";
import { Stack, TextField } from "@fluentui/react";
import { Button, Tooltip, Field, Textarea } from "@fluentui/react-components";
import { Send28Filled, PersonVoiceFilled, ReadAloudFilled } from "@fluentui/react-icons";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const SPEECH_KEY = '44044fcc5f2d44b19c9b97be6161883c';
const SPEECH_REGION = 'eastus';
import styles from "./QuestionInput.module.css";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    initQuestion?: string;
    placeholder?: string;
    clearOnSend?: boolean;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, initQuestion }: Props) => {
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
        initQuestion && setQuestion(initQuestion);
    }, [initQuestion]);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const { instance } = useMsal();
    const disableRequiredAccessControl = false; //requireAccessControl && !isLoggedIn(instance);
    const sendQuestionDisabled = disabled || !question.trim() || disableRequiredAccessControl;

    if (disableRequiredAccessControl) {
        placeholder = "Please login to continue...";
    }


    const [isListening, setIsListening] = useState(false);
    const speechConfig = React.useRef(null);
    const audioConfig = React.useRef(null);
    const recognizer = React.useRef(null);

    const [myTranscript, setMyTranscript] = useState("");
    const [recognizingTranscript, setRecTranscript] = useState("");

    useEffect(() => {
        speechConfig.current = sdk.SpeechConfig.fromSubscription(
            SPEECH_KEY,
            SPEECH_REGION
        );
        speechConfig.current.speechRecognitionLanguage = 'en-US';
        // speechConfig.current.speechSynthesisOutputFormat = 5;

        audioConfig.current = sdk.AudioConfig.fromDefaultMicrophoneInput();
        recognizer.current = new sdk.SpeechRecognizer(
            speechConfig.current,
            audioConfig.current
        );

        const processRecognizedTranscript = (event) => {
            const result = event.result;
            console.log('Recognition result:', result);

            if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                const transcript = result.text;
                console.log('Transcript: -->', transcript);
                // Call a function to process the transcript as needed
                setQuestion(transcript);
            }
        };

        const processRecognizingTranscript = (event) => {
            const result = event.result;
            console.log('Recognition result:', result);
            if (result.reason === sdk.ResultReason.RecognizingSpeech) {
                const transcript = result.text;
                console.log('Transcript: -->', transcript);
                // Call a function to process the transcript as needed
                setQuestion(transcript);
            }
        }

        recognizer.current.recognized = (s, e) => processRecognizedTranscript(e);
        recognizer.current.recognizing = (s, e) => processRecognizingTranscript(e);


        // recognizer.current.startContinuousRecognitionAsync(() => {
        //   console.log('Speech recognition started.');
        //   setIsListening(true);
        // });
        setIsListening(false);

        return () => {
            recognizer.current.stopContinuousRecognitionAsync(() => {
                setIsListening(false);
            });
        };
    }, []);

    const startListening = () => {
        //   recognizer.current.startContinuousRecognitionAsync();
        console.log('Speech recognition started.');
        //   setIsListening(true);
        recognizer.current.recognizeOnceAsync(r => {
            let displayText;
            if (r.reason === sdk.ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${r.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }
        });
    }

    const startReading = () => {
        synthesizer.current.speakTextAsync(
            question,
            result => {

                const { audioData } = result;

                synthesizer.close();

                if (filename) {

                    // return stream from file
                    const audioFile = fs.createReadStream(filename);
                    resolve(audioFile);

                } else {

                    // return stream from memory
                    const bufferStream = new PassThrough();
                    bufferStream.end(Buffer.from(audioData));
                    resolve(bufferStream);
                }
            },
            error => {
                synthesizer.close();
                reject(error);
            });
    }
    // const pauseListening = () => {
    //     setIsListening(false);
    //     recognizer.current.stopContinuousRecognitionAsync();
    //     console.log('Paused listening.');
    // };

    // const resumeListening = () => {
    //     if (!isListening) {
    //         setIsListening(true);
    //         recognizer.current.startContinuousRecognitionAsync(() => {
    //             console.log('Resumed listening...');
    //         });
    //     }
    // };

    // const stopListening = () => {
    //     setIsListening(false);
    //     recognizer.current.stopContinuousRecognitionAsync(() => {
    //         console.log('Speech recognition stopped.');
    //     });
    // };

    return (
        <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                disabled={disableRequiredAccessControl}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className={styles.questionInputButtonsContainer}>
                <Tooltip content="Ask question" relationship="label">
                    <Button size="large" icon={<Send28Filled primaryFill="rgba(115, 118, 225, 1)" />} disabled={sendQuestionDisabled} onClick={sendQuestion} />
                </Tooltip>
            </div>
        </Stack>
    );
};
