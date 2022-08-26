import { render, screen } from '@testing-library/react'
import SignIn from '../components/SignIn'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
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

describe('SignIn', () => {
  it('test', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <RecoilRoot>
            <SignIn />
          </RecoilRoot>
        </QueryClientProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('SignIn')).toBeInTheDocument()
  })
})
