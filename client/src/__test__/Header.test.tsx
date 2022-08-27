import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'

const server = setupServer(...handlers)

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

beforeAll(() => {
  server.listen()
})

describe('Header', () => {
  it('test', async () => {
    render(
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(await screen.findByText('Header')).toBeInTheDocument()
  })
})
