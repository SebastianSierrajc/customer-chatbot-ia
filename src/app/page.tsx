import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-evenly h-[calc(100vh-65px)] p-6">
            <section className="flex flex-col items-center justify-center gap-10">
                <h2 className="text-4xl font-bold dark:text-white">
                    Chat asistente
                </h2>
                <Link
                    href="/chat"
                    className="text-white text-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Iniciar chat
                </Link>
            </section>
            <section>
                <h2 className="text-4xl font-bold dark:text-white">
                    Productos
                </h2>
            </section>
            <section>
                <h2 className="text-4xl font-bold dark:text-white">Ordenes</h2>
            </section>
        </main>
    )
}
