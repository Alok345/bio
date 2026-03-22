"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm Alok's AI assistant. You can ask me anything about his skills, experience, or portfolio. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    // Generate session ID for rate limiting
    let sid = localStorage.getItem("chatSessionId") || "";
    if (!sid) {
      sid = uuidv4();
      localStorage.setItem("chatSessionId", sid);
    }
    setSessionId(sid);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || loading) return;
    if (remaining <= 0) {
      toast.error("Rate limit reached. Please try again later.");
      return;
    }

    const userMsg = input.trim();
    setInput("");
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMsg },
    ]);
    
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setRemaining(data.remaining);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: data.response },
      ]);
      
      if (data.remaining === 0) {
        toast.warning("You've reached your hourly message limit.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on failure
      setInput(userMsg); // Restore input
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 flex items-center justify-center p-0"
            >
              <Bot size={28} />
            </Button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 shadow-2xl"
          >
            <Card className="border-purple-500/20 bg-[#0c0c1c]/95 backdrop-blur-xl shadow-2xl">
              <CardHeader className="border-b border-purple-500/10 p-4 pb-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-white">Alok&apos;s AI Assistant</CardTitle>
                    <div className="text-xs text-purple-300/80">
                      {remaining} messages remaining / hour
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-white rounded-full hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  <div className="flex flex-col gap-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 text-sm ${
                            msg.role === "user"
                              ? "chatbot-message-user"
                              : "chatbot-message-ai text-white/90"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="chatbot-message-ai px-3 py-2 flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t border-purple-500/10">
                <form
                  className="flex w-full gap-2 relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Alok..."
                    disabled={loading || remaining <= 0}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500 pr-10"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={loading || !input.trim() || remaining <= 0}
                    className="absolute right-1 top-1 bottom-1 h-auto w-8 bg-transparent hover:bg-purple-500/20 text-purple-400"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
