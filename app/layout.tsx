import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const syne = Syne({ subsets:['latin'], weight:['400','500','600','700','800'], variable:'--font-syne' })
const inter = Inter({ subsets:['latin'], weight:['300','400','500'], variable:'--font-inter' })

export const metadata: Metadata = {
  title: 'Aashish Pandey — Creative & Digital Media Director',
  description: 'Creative & Digital Media Director specialising in video production, Meta & Google Ads, content creation and brand storytelling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
