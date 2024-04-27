import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
import DOMPurify from "dompurify";
import { CopyBlock, dracula } from "react-code-blocks";
import Markdown from 'react-markdown'

import styles from "./Answer.module.css";

import { ChatAppResponse, getCitationFilePath } from "../../api";
import { parseAnswerToHtml } from "./AnswerParser";
import { AnswerIcon } from "./AnswerIcon";

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

    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    const runCode = async (code: string) => {
        try {
            console.log(code);
            window.pyrepl.write = code;
        } catch (err) {
            document.getElementById("service_spike").getElementsByTagName("button")[0].click();
        }
    };


    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        {/* <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "Lightbulb" }}
                            title="Show thought process"
                            ariaLabel="Show thought process"
                            onClick={() => onThoughtProcessClicked()}
                            // disabled={!answer.choices[0].context.thoughts?.length}
                        />
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "ClipboardList" }}
                            title="Show supporting content"
                            ariaLabel="Show supporting content"
                            onClick={() => onSupportingContentClicked()}
                            // disabled={!answer.choices[0].context.data_points}
                        /> */}
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
                                            <span>Run Code Now</span>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div className={styles.answerText} >
                                    <Markdown>{DOMPurify.sanitize(x) }</Markdown>
                                    </div>
                                )
                            }
                        })}

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
