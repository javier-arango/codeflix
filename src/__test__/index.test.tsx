import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'
import '@testing-library/jest-dom'

describe('HomePage', () => {
  it('renders a heading', () => {
    render(<HomePage />)

    const heading = screen.getByRole('heading', {
      name: /Cinemify/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
