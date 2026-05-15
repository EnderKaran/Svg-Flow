"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: "xml" | "typescript";
  value: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  language, 
  value, 
  onChange, 
  readOnly = false 
}: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "var(--font-mono)", // Layout'ta tanımladığımız JetBrains Mono
        fontLigatures: true,
        padding: { top: 20, bottom: 20 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        wordWrap: "on",
        readOnly: readOnly,
        lineNumbersMinChars: 3,
        automaticLayout: true, // Panel boyutları değiştiğinde editörü yeniden boyutlandırır
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
          vertical: "visible",
          horizontal: "visible",
        },
      }}
      loading={
        <div className="flex h-full items-center justify-center bg-[#0B1120] text-teal-500/50 font-mono text-xs animate-pulse tracking-widest uppercase">
          Initializing_Core_Engine...
        </div>
      }
    />
  );
}