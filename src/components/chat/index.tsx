'use client'
import React, { useState } from 'react'

import { MessageInterface } from '@/types/Message'
import ChatInput from "./ChatInput"
import MessagesBox from "./MessagesBox"

const Chat = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let message: MessageInterface = {
      id:  messages.length + 1,
      message: newMessage,
      date: new Date().toLocaleTimeString(),
      isIncomming: false
    }

    setMessages(messages => [...messages, message])
    setNewMessage('')

    setMessages(messages => [...messages, {
      ...message,
      isIncomming: true,
      id:  messages.length + 1
    }])
  }

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
		<MessagesBox messages={messages}/>
		<ChatInput newMessage={newMessage} setNewMessage={setNewMessage} onSubmit={handleSubmit} />
	</div>
  )
}

export default Chat