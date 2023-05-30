import Chat from '@/components/chat'
import React from 'react'

const ChatPage = () => {
    return (
        <main className="flex flex-col items-center justify-center h-[calc(100vh-65px)] gap-10 p-6 bg-gray-300">
            <h2 className="text-4xl font-bold dark:text-white">
                Chat asistente
            </h2>
            <Chat />
        </main>
    )
}

export default ChatPage
