import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react' // ReactNodeをインポート

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'Todo App by Next.js',
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
