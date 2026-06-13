import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
export const metadata: Metadata = { title:'Services — DevMark Studio', description:'Our full range of digital services.' }
export default function ServicesPage() { return <ServicesClient /> }
