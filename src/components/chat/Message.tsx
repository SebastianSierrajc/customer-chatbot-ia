import React from 'react'

const Message = ({ message, date, isIncomming }: { message: string; date: string, isIncomming: boolean }) => {
    const incomming = (message: string, date: string) => (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                        {message}
                    </p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                    {date}
                </span>
            </div>
        </div>
    )

    const outgoing = (message: string, date: string) => (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                        {message}
                    </p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                    {date}
                </span>
            </div>
        </div>
    )

    return isIncomming ? incomming(message, date) : outgoing(message, date)
}

export default Message
