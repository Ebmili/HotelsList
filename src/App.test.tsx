import { render, screen } from '@testing-library/react';
import NotFound from './components/NotFound';


test('should output NotFound', () => {
  render(<NotFound />);
  const Text = screen.getByText('NotFound');
  expect(Text).toBeInTheDocument();
});

