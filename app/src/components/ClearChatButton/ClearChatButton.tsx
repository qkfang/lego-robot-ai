import { Delete24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";

import styles from "./ClearChatButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
    sessionId: string
}

export const ClearChatButton = ({ className, disabled, onClick, sessionId }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Delete24Regular />} disabled={disabled} onClick={onClick} title={sessionId}>
                {"Clear chat"}
            </Button>
        </div>
    );
};
