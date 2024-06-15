import React, { useState, useEffect, useRef, useMemo } from "react";
import { Stack } from "@fluentui/react";
import DOMPurify from "dompurify";
import { CopyBlock, dracula } from "react-code-blocks";
import Markdown from 'react-markdown'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { Button, Tooltip } from "@fluentui/react-components";
import styles from "./Answer.module.css";
import { ReadAloudFilled, TranslateAutoFilled } from "@fluentui/react-icons";

import { ChatAppResponse, getCitationFilePath, translateApi } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";
import { AnswerIcon } from "./AnswerIcon";

const SPEECH_KEY = '44044fcc5f2d44b19c9b97be6161883c';
const SPEECH_REGION = 'eastus';


interface Props {
    answer: ChatAppResponse;
    isSelected?: boolean;
    isStreaming: boolean;
    onCitationClicked: (filePath: string) => void;
    onThoughtProcessClicked: () => void;
    onSupportingContentClicked: () => void;
    onFollowupQuestionClicked?: (question: string) => void;
    showFollowupQuestions?: boolean;
}

export const Answer = ({
    answer,
    isSelected,
    isStreaming,
    onCitationClicked,
    onThoughtProcessClicked,
    onSupportingContentClicked,
    onFollowupQuestionClicked,
    showFollowupQuestions
}: Props) => {
    //const followupQuestions = answer.choices[0].context.followup_questions;
    const messageContent = answer.message; //answer.choices[0].message.content;
    const parsedAnswer = useMemo(() => parseAnswerToHtml(messageContent, isStreaming, onCitationClicked), [answer]);
    const [translate, setTranslate] = useState<string>("");

    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    const runCode = async (code: string) => {
        try {
            console.log(code);
            window.pyrepl.write = code;
        } catch (err) {
            document.getElementById("service_spike").getElementsByTagName("div")[0].click();
        }
    };


    const synthesizer = React.useRef(null);
    const speechConfig = React.useRef(null);

    useEffect(() => {
        speechConfig.current = sdk.SpeechConfig.fromSubscription(
            SPEECH_KEY,
            SPEECH_REGION
        );
        speechConfig.current.speechRecognitionLanguage = 'en-US';
        // speechConfig.current.speechSynthesisOutputFormat = 5;

        synthesizer.current = new sdk.SpeechSynthesizer(
            speechConfig.current
        );

    }, []);

    const startReading = () => {
        synthesizer.current.speakTextAsync(
            messageContent,
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


    const startTranslating = async () => {
        var texts = parsedAnswer.fragments.filter((word) => !word.startsWith('python'));
        const response = await translateApi(texts.join('\n'), "en", "fr");
        var textJson = await response.json();
        // console.log(textJson)
        setTranslate(textJson[0].translations[0].text);
    }

    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        <Tooltip content="Read the answer" relationship="label" >
                            <Button size="large" icon={<ReadAloudFilled primaryFill="rgba(115, 118, 225, 1)" />} onClick={startReading} />
                        </Tooltip>
                        <Tooltip content="Translate to French" relationship="label">
                            <Button size="large" icon={<TranslateAutoFilled primaryFill="rgba(115, 118, 225, 1)" />} onClick={startTranslating} />
                        </Tooltip>
                    </div>
                </Stack>
            </Stack.Item>
            {/* 
            <Stack.Item grow>
                <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
            </Stack.Item> */}

            {!!parsedAnswer.fragments.length && (
                <Stack.Item grow>
                    <Stack>
                        {parsedAnswer.fragments.map((x, i) => {
                            if (x.startsWith('python')) {
                                return (
                                    <div>
                                        <CopyBlock
                                            language="python"
                                            text={x.replace("python", "").trimStart().trimEnd()}
                                            codeBlock
                                            theme={dracula}
                                            showLineNumbers={true} />
                                        <div className='pythonCode'></div>
                                        <div className={styles.pythonCodeDiv} onClick={() => runCode(x.replace("python", ""))} >
                                            <img width={30} src='exec.png' />
                                            <span>Run Code Now via Web Serial Port</span>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div className={styles.answerText} >
                                        <Markdown>{DOMPurify.sanitize(x)}</Markdown>
                                    </div>
                                )
                            }
                        })}
                        {
                            <div style={{backgroundColor: '#efefef', padding: '5px'}}>
                                <Markdown>{DOMPurify.sanitize(translate)}</Markdown>
                            </div>
                        }
                    </Stack>
                </Stack.Item>
            )}

            {!!parsedAnswer.citations.length && (
                <Stack.Item>
                    <Stack horizontal wrap tokens={{ childrenGap: 5 }}>
                        <span className={styles.citationLearnMore}>Citations:</span>
                        {parsedAnswer.citations.map((x, i) => {
                            const path = getCitationFilePath(x);
                            return (
                                <a key={i} className={styles.citation} title={x} onClick={() => onCitationClicked(path)}>
                                    {`${++i}. ${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )}

            {/* {!!followupQuestions?.length && showFollowupQuestions && onFollowupQuestionClicked && (
                <Stack.Item>
                    <Stack horizontal wrap className={`${!!parsedAnswer.citations.length ? styles.followupQuestionsList : ""}`} tokens={{ childrenGap: 6 }}>
                        <span className={styles.followupQuestionLearnMore}>Follow-up questions:</span>
                        {followupQuestions.map((x, i) => {
                            return (
                                <a key={i} className={styles.followupQuestion} title={x} onClick={() => onFollowupQuestionClicked(x)}>
                                    {`${x}`}
                                </a>
                            );
                        })}
                    </Stack>
                </Stack.Item>
            )} */}
        </Stack>
    );
};
