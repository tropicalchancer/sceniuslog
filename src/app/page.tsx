import { ClientWrapper } from '@/components/ClientWrapper'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <header className="absolute top-8 left-8 z-10 text-white">
        <h1 className="text-2xl font-semibold mb-1">Scenius Log</h1>
        <p className="font-libre italic text-lg text-white/80">History of sceniuses</p>
      </header>
      <ClientWrapper />
    </main>
  )
}
