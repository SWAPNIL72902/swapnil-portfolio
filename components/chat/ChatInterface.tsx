"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Send, Square, Sparkles, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  { label: "UPI project", prompt: "Walk me through your Paytm UPI failure recovery project", icon: "⚡" },
  { label: "Interview me", prompt: "Interview me for a PM role. Ask me product questions one at a time.", icon: "🎯" },
  { label: "Product case", prompt: "Give me a product case to solve — something like a new feature or a metrics drop", icon: "🧠" },
  { label: "Why Swapnil?", prompt: "What makes you different from other PM candidates?", icon: "✦" },
  { label: "Meesho project", prompt: "How did you approach the Meesho cart abandonment problem?", icon: "🛒" },
  { label: "Licious impact", prompt: "What was your biggest impact at Licious?", icon: "📊" },
];

interface ChatInterfaceProps {
  id?: string;
  setSendRef?: (fn: (msg: string) => void) => void;
}

export function ChatInterface({ id, setSendRef }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hey — I'm Swapnil's AI. Ask me about my projects, thinking process, or throw me a product case. I'll answer the way I'd answer in a real interview.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef(messages);

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim(), timestamp: new Date() };
    const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "", timestamp: new Date() };
    const currentMessages = messagesRef.current;

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = [...currentMessages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const { text } = JSON.parse(data);
              if (text) {
                setMessages((prev) =>
                  prev.map((m) => m.id === assistantMsg.id ? { ...m, content: m.content + text } : m)
                );
              }
            } catch { /* ignore */ }
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: "Something went wrong. Please check your API key configuration and try again." }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => { if (setSendRef) setSendRef(sendMessage); }, [setSendRef, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const lastMsgId = messages[messages.length - 1]?.id;

  return (
    <section id={id} className="relative py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
          <Sparkles size={14} />
          <span>AI EXPERIENCE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">Talk to Swapnil&apos;s AI</h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto">Ask me about my projects, methodology, or put me through a live product case.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl glow-blue">
          <div className="h-[520px] overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} isStreaming={isStreaming && msg.id === lastMsgId} />
            ))}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground mt-3 mb-2 px-1">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => sendMessage(p.prompt)}
                    disabled={isStreaming}
                    className="inline-flex items-center gap-1.5 text-xs rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-secondary transition-all duration-150 disabled:opacity-50"
                  >
                    <span>{p.icon}</span>
                    {p.label}
                    <ChevronRight size={10} className="text-muted-foreground/50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border p-4">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything — projects, PM thinking, or a live case..."
                rows={1}
                disabled={isStreaming}
                className={cn(
                  "flex-1 resize-none bg-secondary/50 rounded-xl border border-border",
                  "px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60",
                  "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
                  "transition-all duration-150 max-h-32 leading-relaxed disabled:opacity-60"
                )}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 128) + "px";
                }}
              />
              {isStreaming ? (
                <Button size="icon" variant="outline" onClick={() => { abortRef.current?.abort(); setIsStreaming(false); }}
                  className="shrink-0 h-11 w-11 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <Square size={14} />
                </Button>
              ) : (
                <Button size="icon" onClick={() => sendMessage(input)} disabled={!input.trim() || isStreaming}
                  className="shrink-0 h-11 w-11 rounded-xl">
                  <Send size={14} />
                </Button>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground/40 mt-2 px-1">Shift+Enter for new line · Enter to send</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMessage({ message, isStreaming }: { message: Message; isStreaming: boolean }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium",
        isUser ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" : "bg-secondary border border-border text-white"
      )}>
        {isUser ? "You" : "SP"}
      </div>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        isUser ? "bg-blue-500/10 border border-blue-500/20 text-white" : "bg-secondary/60 border border-border text-foreground"
      )}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose-chat">
            {message.content ? <ReactMarkdown>{message.content}</ReactMarkdown> : null}
            {isStreaming && !message.content && (
              <span className="inline-flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
              </span>
            )}
            {isStreaming && message.content && (
              <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-blink align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
