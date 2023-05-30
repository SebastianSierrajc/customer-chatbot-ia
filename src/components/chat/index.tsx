'use client'
import React, { useState } from 'react'

import { MessageInterface } from '@/types/Message'
import ChatInput from "./ChatInput"
import MessagesBox from "./MessagesBox"

const Chat = () => {
  const [isResponding, setIsResponding] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsResponding(true)
    e.preventDefault()
    let message: MessageInterface = {
      id:  messages.length + 1,
      message: newMessage,
      date: new Date().toLocaleTimeString(),
      isIncomming: false
    }

    setMessages(messages => [...messages, message])
    setNewMessage('')

    fetch(process.env.chatbotAPI + 'chatbot/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "query": message.message
      })
    }).then(response => response.json()).then(data => {
      setIsResponding(false)
      setMessages(messages => [...messages, {
        ...message,
        id:  messages.length + 1,
        message: data['answer'].trim(),
        date: new Date().toLocaleTimeString(),
        isIncomming: true,
      }])
    })

    
  }

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
		<MessagesBox messages={messages} isResponding={isResponding}/>
		<ChatInput newMessage={newMessage} setNewMessage={setNewMessage} onSubmit={handleSubmit} />
	</div>
  )
}

export default Chat