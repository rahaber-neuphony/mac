import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [message, setMessage] = React.useState('No message found')
const registerIpc = () => {
  window.ipc.on('message', (message: string) => {
    console.log('on message:', message)
    setMessage(message)
  })
}
  React.useEffect(() => {
    registerIpc()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -<Link href="/next">Go to next page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button
          onClick={async() => {
            window.ipc.send('ping', 'wow from UI' + Math.random())
          }}
        >
          Test IPC
        </button>

        <button
          onClick={async() => {
            window.ipc.removeAllListeners('message')
          }}
        >
          Remove event message
        </button>
        <button onClick={registerIpc}>registerIpc</button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  )
}
