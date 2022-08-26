import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import { RecoilRoot } from 'recoil'

describe('Header', () => {
  it('test', () => {
    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})
