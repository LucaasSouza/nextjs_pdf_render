import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter() //Instância do controlador de rotas do nextjs

  useEffect(() => { //É executado somente uma vez por causa do '[]'. Tudo aqui é executado após o SSR.
    router.push('/pdf')
  }, [])

  return (
    <></>
  )
}
