"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Avatar, ScrollArea, Textarea, GlassCard } from "./components/ui";
import { Plus, MessageSquare, Menu, Settings, LogOut, ArrowUp, Zap, Sparkles, Image as ImageIcon, FileText, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { cn } from "./lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [];

const SUGGESTIONS = [
  { title: "Explain quantum computing", subtitle: "in simple terms", icon: Zap },
  { title: "Write a Python script", subtitle: "for data analysis", icon: FileText },
  { title: "Summarize an article", subtitle: "key takeaways only", icon: MessageSquare },
  { title: "Analyze this image", subtitle: "describe the colors", icon: ImageIcon },
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
        content: "Here's a detailed and comprehensive response. The updated user interface features a premium glassmorphism aesthetic mimicking high-end automotives. You'll notice subtle drop shadows, smooth gradients, and carefully crafted typography utilizing TailwindCSS v4 and the Nextwaves UI system.",
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
    <div className="flex h-screen bg-neutral-100 dark:bg-black overflow-hidden selection:bg-primary/30 font-sans relative">
      {/* Background Mesh Gradient layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(120, 120, 120, 0.1) 0%, transparent 70%)"
        }}
      />
      
      {/* Sidebar */}
      <div
        className={cn(
          "relative z-20 glass-panel flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0 border-r border-black/5 dark:border-white/5 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]",
          isSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0 border-none shadow-none"
        )}
      >
        <div className="p-3 flex items-center justify-between">
          <Button variant="ghost" className="w-[85%] justify-start font-medium text-[14px] bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Plus className="w-4 h-4 mr-2 opacity-70" />
            New chat
          </Button>
          <Button variant="icon" className="w-8 h-8 ml-2 flex-shrink-0 opacity-70 hover:opacity-100" onClick={() => setSidebarOpen(false)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 mt-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 mt-4 ml-2 opacity-60">Recent</div>
          <div className="flex flex-col gap-0.5">
            {PREVIOUS_CHATS.map((chat, i) => (
              <Button key={i} variant="ghost" className="justify-start font-medium text-[13px] h-9 px-3 rounded-[8px] overflow-hidden text-ellipsis whitespace-nowrap opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all w-full text-left inline-block">
                {chat}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-black/5 dark:border-white/5 mt-auto">
          <Button variant="ghost" className="w-full justify-start font-medium text-[13px] h-11 px-2 opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5">
            <Avatar fallback="US" className="w-7 h-7 mr-3 ring-1 ring-black/10 dark:ring-white/10" />
            My Account
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full h-full z-10 bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
        {/* Header */}
        <header className="absolute top-0 w-full z-30 p-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {!isSidebarOpen && (
              <Button variant="icon" className="w-9 h-9 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5 opacity-70" />
              </Button>
            )}
            <Button variant="ghost" className="text-[14px] font-bold tracking-tight h-9 px-3 rounded-[8px] bg-white/50 dark:bg-black/50 backdrop-blur-md border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all">
              Nextwaves AI <Sparkles className="w-3.5 h-3.5 ml-1.5 text-blue-500" />
            </Button>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <Button variant="icon" className="w-9 h-9 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-white/10">
              <Settings className="w-4 h-4 opacity-70" />
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-1 pt-14 pb-12 px-4 relative">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-8 pb-32 pt-8">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[55vh] text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-[20px] shadow-xl border border-black/5 dark:border-white/5 flex items-center justify-center mb-8 relative">
                   <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl"></div>
                   <Sparkles className="w-10 h-10 text-foreground relative z-10 drop-shadow-md" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                  Good afternoon.
                </h1>
                <p className="text-muted-foreground text-[15px] max-w-sm mb-12">
                  What would you like to explore today?
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="group relative overflow-hidden bg-white/60 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800 backdrop-blur-xl p-5 rounded-[16px] cursor-pointer transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md active:scale-[0.98] text-left flex flex-col gap-3"
                      onClick={() => setInputValue(suggestion.title)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                        <suggestion.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground tracking-tight">{suggestion.title}</p>
                        <p className="text-[12px] text-muted-foreground mt-0.5">{suggestion.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className={cn("flex max-w-[85%] sm:max-w-[80%] gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className="flex-shrink-0 mt-1">
                    {msg.role === "user" ? (
                      <Avatar fallback="US" size="sm" className="hidden sm:flex ring-2 ring-background shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 relative group max-w-full">
                    <div className={cn(
                      "px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ring-1 ring-inset",
                      msg.role === "user" 
                        ? "bg-foreground text-background font-medium rounded-[24px] rounded-tr-[6px] ring-black/5 dark:ring-white/20" 
                        : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl text-foreground rounded-[24px] rounded-tl-[6px] border-0 ring-black/5 dark:ring-white/10"
                    )}>
                      {msg.content}
                    </div>

                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1 ml-1">
                        <Button variant="icon" className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground"><Copy className="w-3.5 h-3.5" /></Button>
                        <Button variant="icon" className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground"><RotateCcw className="w-3.5 h-3.5" /></Button>
                        <Button variant="icon" className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground"><ThumbsUp className="w-3.5 h-3.5" /></Button>
                        <Button variant="icon" className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground"><ThumbsDown className="w-3.5 h-3.5" /></Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
                <div className="flex w-full justify-start animate-in fade-in duration-300">
                  <div className="flex max-w-[85%] sm:max-w-[75%] gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-foreground" />
                      </div>
                    </div>
                    
                    <div className="px-5 py-4 rounded-[24px] rounded-tl-[6px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 flex items-center h-[52px]">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} className="h-10" />
          </div>
        </ScrollArea>

        {/* Floating Input Area mask */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-100 via-neutral-100/80 dark:from-black dark:via-black/80 to-transparent pointer-events-none z-20"></div>

        {/* Floating Input Dock */}
        <div className="absolute bottom-6 left-0 w-full z-30 px-4">
          <div className="max-w-3xl mx-auto w-full">
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[28px] shadow-lg flex items-end p-2 border border-black/10 dark:border-white/10 focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all duration-300">
              <div className="flex items-center px-1 pb-1 gap-1">
                <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center justify-center">
                  <ImageIcon className="w-[18px] h-[18px]" />
                </Button>
                <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center justify-center">
                  <FileText className="w-[18px] h-[18px]" />
                </Button>
                <Button variant="ghost" className="w-9 h-9 p-0 rounded-full hover:bg-black/5 dark:hover:bg-white/10 shrink-0 text-muted-foreground hover:text-foreground transition-colors sm:hidden items-center justify-center">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-0 focus:ring-0 ring-0 hover:ring-0 active:ring-0 min-h-[44px] max-h-[160px] py-[12px] px-3 text-[15px] font-medium resize-none shadow-none rounded-none rounded-r-[28px] placeholder:text-muted-foreground/60"
                rows={1}
              />
              
              <div className="p-1 pb-1">
                <Button 
                  variant={inputValue.trim() ? "primary" : "ghost"}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={cn(
                    "w-9 h-9 p-0 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm", 
                    !inputValue.trim() ? "bg-black/5 dark:bg-white/10 text-muted-foreground/50 shadow-none border-none" : "bg-foreground text-background scale-105"
                  )}
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="text-center mt-3 pointer-events-auto">
              <p className="text-[11px] font-medium text-muted-foreground/80 tracking-wide">
                AI may produce inaccurate information. Powered by Nextwaves Aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
