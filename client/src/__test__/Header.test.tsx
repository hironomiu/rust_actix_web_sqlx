import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
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

describe('Header', () => {
  it('test', () => {
    render(
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})
