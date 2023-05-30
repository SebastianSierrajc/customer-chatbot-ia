'use client'

import { MessageInterface } from '@/types/Message'

import { useEffect, useRef } from 'react'
import Message from './Message'

const MessagesBox = ({ messages, isResponding }: { messages: MessageInterface[],  isResponding: boolean }) => {
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
            {isResponding && (
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">
                            ...
                        </p>
                    </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessagesBox
