import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = { title:'Contact — DevMark Studio', description:'Get in touch to start your project.' }
export default function ContactPage() { return <ContactClient /> }
