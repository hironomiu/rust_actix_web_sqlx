import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('App', () => {
  it('renders learn react link', async () => {
    render(<App />)
    const linkElement = screen.getByText(/Header/i)
    expect(linkElement).toBeInTheDocument()
    // expect(screen.getByTestId('submit-button')).toHaveAttribute('disabled', '')
    // expect(screen.getByTestId('email')).toHaveValue('')
    // userEvent.type(screen.getByTestId('email'), 'hanako@example.com')
    // expect(await screen.findByTestId('email')).toHaveValue('hanako@example.com')
    waitFor(() => {
      userEvent.type(screen.getByTestId('password'), 'password')
    })
    userEvent.click(screen.getByTestId('submit-button'))
    // expect(screen.queryByTestId('submit-button')).toHaveAttribute(
    //   'disabled',
    //   ''
    // )
    // expect(await screen.findByText(/Header/)).toBeInTheDocument()
    // screen.debug()
  })
})
