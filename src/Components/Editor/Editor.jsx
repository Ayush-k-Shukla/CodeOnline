import React, { useEffect, useRef } from 'react';
import codemirror from 'codemirror';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../../constants/actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  const editorOptions = {
    lineNumbers: 'true',
    mode: { name: 'javascript', json: 'true' },
    theme: 'dracula',
    autCloseTags: true,
    autoCloseBrackets: true,
    showTrailingSpace: false,
    lineWrapping: true,
  };

  const init = () => {
    editorRef.current = codemirror.fromTextArea(
      document.getElementById('editor'),
      editorOptions
    );

    editorRef.current.on('change', (instance, changes) => {
      console.log(changes);
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      console.log(code);
      if (origin !== 'setValue') {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log(`code change called`);
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id='editor'></textarea>;
};

export default Editor;
