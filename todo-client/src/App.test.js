import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
    fetch.resetMocks();
    fetch.once(JSON.stringify({todos:[] }))
});

test('renders todos title', () => {
  render(<App />);
  const linkElement = screen.getByText(/todos/i);
  expect(linkElement).toBeInTheDocument();
});
