import { redirect } from 'next/navigation'

// This page is no longer used — all posts link directly to social platforms.
// If someone lands here via an old URL, redirect to /work
export default function WorkDetailPage() {
  redirect('/work')
}
