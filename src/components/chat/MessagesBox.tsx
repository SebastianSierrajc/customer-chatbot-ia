'use client'

import { MessageInterface } from '@/types/Message'

import { useEffect, useRef } from 'react'
import Message from './Message'

const MessagesBox = ({ messages }: { messages: MessageInterface[] }) => {
    const messagesEndRef = useRef<HTMLDivElement |  null>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    return (
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message) => (
                <Message
                    key={message.id}
                    message={message.message}
                    date={message.date}
                    isIncomming={message.isIncomming}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessagesBox
