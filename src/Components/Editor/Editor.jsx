import React, { useEffect } from 'react';
import codemirror from 'codemirror';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/lib/codemirror.css';

const Editor = () => {
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
    codemirror.fromTextArea(document.getElementById('editor'), editorOptions);
  };

  useEffect(() => {
    init();
  }, []);

  return <textarea id='editor'></textarea>;
};

export default Editor;
