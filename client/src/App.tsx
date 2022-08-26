import React from 'react'
import Layout from './components/Layout'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import SignIn from './components/SignIn'

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
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
