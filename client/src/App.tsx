import React from 'react'
import Layout from './components/Layout'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <Layout />
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
