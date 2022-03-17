/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders cards', () => {
  render(<App />)
  const linkElement = screen.getByText('loading')
  expect(linkElement).toBeInTheDocument()
})
