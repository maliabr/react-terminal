import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { TerminalContext } from "../contexts/TerminalContext";
import {
  useCurrentLine,
  useScrollToBottom,
} from "../hooks/editor";

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const style = React.useContext(StyleContext);
  const { bufferedContent } = React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    enableInput, //get both props
    caret,
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    errorMessage
  } = props;

  const currentLine = useCurrentLine(
    caret,  // useCurrentLine takes both props as parameters
    consoleFocused,
    prompt,
    commands,
    errorMessage, 
    enableInput //enableInput prop as a parameter
  );

  return (
    <div ref={wrapperRef} className={style.editor}>
      {welcomeMessage}
      {bufferedContent}
      {currentLine}
    </div>
  );
}
