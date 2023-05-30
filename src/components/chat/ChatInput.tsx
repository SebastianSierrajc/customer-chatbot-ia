'use client'

const ChatInput = ({
    newMessage,
    setNewMessage,
    onSubmit,
}: {
    newMessage: string
    setNewMessage: (newMessage: string) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}) => {
    return (
        <div className="bg-gray-300 p-4">
            <form onSubmit={onSubmit}>
                <input
                    className="flex items-center h-10 w-full rounded px-3 text-sm"
                    type="text"
                    placeholder="Type your message…"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
            </form>
        </div>
    )
}

export default ChatInput
