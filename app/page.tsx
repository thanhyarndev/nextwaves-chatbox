"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Avatar, ScrollArea, Textarea } from "./components/ui";
import { Plus, MessageSquare, Menu, Settings, LogOut, ArrowUp, Zap, Sparkles, Image as ImageIcon, FileText } from "lucide-react";
import { cn } from "./lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! How can I help you today? I'm ready to answer questions, help with code, or brainstorm ideas.",
  },
];

const SUGGESTIONS = [
  "Explain quantum computing",
  "Write a Python script",
  "Summarize a long article",
  "Plan a trip to Tokyo",
];

const PREVIOUS_CHATS = [
  "UI Implementation Details",
  "Next.js App Router Guide",
  "Tailwind CSS v4 Features",
  "Machine Learning Basics",
  "TypeScript Generics",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a mocked response based on your input. In a real integration, this would communicate with an LLM backend to stream the reply. The interface follows the Nextwaves design guidelines with glassmorphism and modern typography.",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-black overflow-hidden selection:bg-primary/30">
      {/* Sidebar */}
      <div
        className={cn(
          "glass-panel flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0 border-r",
          isSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0 border-none"
        )}
      >
        <div className="p-3 flex items-center justify-between">
          <Button variant="ghost" className="w-full justify-start font-medium text-[14px]">
            <Plus className="w-4 h-4 mr-2" />
            New chat
          </Button>
          <Button variant="icon" className="md:hidden ml-2 flex-shrink-0" onClick={() => setSidebarOpen(false)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-4 ml-2">Today</div>
          <div className="flex flex-col gap-0.5">
            {PREVIOUS_CHATS.map((chat, i) => (
              <Button key={i} variant="ghost" className="justify-start font-normal text-[13px] h-9 px-2 overflow-hidden text-ellipsis whitespace-nowrap opacity-80 hover:opacity-100">
                {chat}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-black/5 dark:border-white/5 mt-auto">
          <Button variant="ghost" className="w-full justify-start font-medium text-[13px] h-10 px-2 opacity-80 hover:opacity-100">
            <Avatar fallback="US" className="w-6 h-6 mr-2" />
            My Account
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        {/* Header */}
        <header className="absolute top-0 w-full z-10 p-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {!isSidebarOpen && (
              <Button variant="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <Button variant="ghost" className="text-[14px] font-semibold tracking-tight h-8 px-2 rounded-[6px]">
              Nextwaves AI <Sparkles className="w-3.5 h-3.5 ml-1 text-primary/60" />
            </Button>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <Button variant="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-1 pt-14 pb-4">
          <div className="max-w-3xl mx-auto px-4 w-full flex flex-col gap-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-primary/80" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight mb-2">How can I help you today?</h1>
                <p className="text-muted-foreground text-[14px] max-w-sm">
                  This mock application shows a ChatGPT-like interface built with the Nextwaves UI components.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10 w-full max-w-2xl">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="glass-panel p-4 rounded-xl cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border border-black/5 dark:border-white/5 active:scale-[0.98]"
                      onClick={() => setInputValue(suggestion)}
                    >
                      <p className="text-[14px] font-medium text-foreground">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className={cn("flex max-w-[85%] sm:max-w-[75%] gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className="flex-shrink-0 mt-1">
                    {msg.role === "user" ? (
                      <Avatar fallback="US" size="sm" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className={cn(
                    "px-4 py-3 rounded-[20px] text-[15px] leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-[4px]" 
                      : "bg-black/[0.04] dark:bg-white/[0.08] text-foreground rounded-tl-[4px]"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex max-w-[85%] sm:max-w-[75%] gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="px-5 py-4 rounded-[20px] rounded-tl-[4px] bg-black/[0.04] dark:bg-white/[0.08]">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 pt-0 w-full max-w-3xl mx-auto">
          <div className="relative glass-panel rounded-[24px] shadow-sm flex items-end p-2 border border-black/10 dark:border-white/10 group focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex items-center px-1 pb-1">
              <Button variant="icon" className="w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground group-focus-within:text-foreground transition-colors hidden sm:flex">
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button variant="icon" className="w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground group-focus-within:text-foreground transition-colors hidden sm:flex">
                <FileText className="w-4 h-4" />
              </Button>
              <Button variant="icon" className="w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground group-focus-within:text-foreground transition-colors sm:hidden">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message Nextwaves AI..."
              className="flex-1 bg-transparent border-0 focus:ring-0 ring-0 hover:ring-0 active:ring-0 min-h-[44px] max-h-[200px] py-[10px] px-2 text-[15px] resize-none shadow-none rounded-none rounded-r-[24px]"
              rows={1}
            />
            
            <div className="p-1 pb-[3px]">
              <Button 
                variant={inputValue.trim() ? "primary" : "ghost"}
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "w-8 h-8 p-0 rounded-full transition-all duration-200", 
                  !inputValue.trim() && "bg-black/5 dark:bg-white/10"
                )}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-2.5">
            <p className="text-[11px] text-muted-foreground">
              AI can make mistakes. Verify important information. Designed using Nextwaves Aesthetics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
