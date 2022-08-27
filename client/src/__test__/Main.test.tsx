import { render, screen } from '@testing-library/react'
import Main from '../components/Main'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

describe('Main', () => {
  it('test', async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Main />
        </RecoilRoot>
      </BrowserRouter>
    )
    expect(await screen.findByText(/hoge/)).toBeInTheDocument()
    // screen.debug()
  })
})
