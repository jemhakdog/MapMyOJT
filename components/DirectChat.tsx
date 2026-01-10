
import React, { useState, useEffect, useRef } from 'react';
import { Message, UserProfile } from '../types';

interface DirectChatProps {
  currentUser: UserProfile;
  activeContact: { id: string, name: string, avatar: string } | null;
}

const DirectChat: React.FC<DirectChatProps> = ({ currentUser, activeContact }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'bus-1', receiverId: 'user-1', text: 'Hi Alex! We saw your profile and we are interested in your React skills.', timestamp: Date.now() - 3600000 },
    { id: '2', senderId: 'user-1', receiverId: 'bus-1', text: 'Thank you Sarah! I would love to learn more about the Frontend Developer position.', timestamp: Date.now() - 3000000 },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !activeContact) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: activeContact.id,
      text: inputText,
      timestamp: Date.now()
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  if (!activeContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 glass rounded-2xl border border-white/5">
        <div className="text-6xl mb-4">💬</div>
        <p className="text-lg">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={activeContact.avatar} className="w-10 h-10 rounded-full border border-emerald-500/30" alt={activeContact.name} />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full"></div>
          </div>
          <div>
            <h4 className="font-bold text-white">{activeContact.name}</h4>
            <span className="text-xs text-emerald-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl ${
                isMine 
                  ? 'bg-emerald-500 text-black font-medium rounded-tr-none' 
                  : 'bg-white/10 text-white rounded-tl-none border border-white/5'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] mt-2 block ${isMine ? 'text-black/60' : 'text-gray-500'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-colors text-black shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectChat;
