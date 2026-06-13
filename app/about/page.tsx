import type { Metadata } from 'next'
import AboutClient from './AboutClient'
export const metadata: Metadata = { title:'About — DevMark Studio', description:'Meet the team behind DevMark Studio.' }
export default function AboutPage() { return <AboutClient /> }
