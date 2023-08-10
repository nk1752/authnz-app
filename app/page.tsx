import Link from 'next/link'


export default function Home() {

  
  return (
    <div>
      <h1>Home</h1>
      <Link href="/react"> React Page</Link>
      <Link href="/node"> Node Page</Link>     
      <Link href="/hooks"> Hooks Page</Link> 
    </div>
  )
}
