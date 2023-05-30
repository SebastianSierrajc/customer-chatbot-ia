import MainNavbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce GenIa ChatBot',
  description: 'Chatbot with generative AI for ecommerces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavbar />
        {children}
      </body>
    </html>
  )
}
