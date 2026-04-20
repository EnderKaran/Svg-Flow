"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false }, // DevTools sadeliği için minimap kapalı
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontLigatures: true,
        padding: { top: 24, bottom: 24 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        wordWrap: "on",
        readOnly: readOnly,
        lineNumbersMinChars: 3,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
      loading={
        <div className="flex h-full items-center justify-center text-teal-500/50 font-mono text-sm animate-pulse">
          Initializing Engine...
        </div>
      }
    />
  );
}