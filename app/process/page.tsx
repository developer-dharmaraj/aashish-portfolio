import type { Metadata } from 'next'
import ProcessClient from './ProcessClient'
export const metadata: Metadata = { title:'Process — DevMark Studio', description:'How we work — our end-to-end project process.' }
export default function ProcessPage() { return <ProcessClient /> }
