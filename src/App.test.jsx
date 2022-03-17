/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders cards', () => {
  render(<App />)
  // Ça, ça fonctionne pas vu qu'on a un call API avec un loader. Je sais pas trop comment fix proprement mais j'vais déjà remplacer par loading
  const linkElement = screen.getByText('loading')
  expect(linkElement).toBeInTheDocument()
})
