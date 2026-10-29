import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders a heading with the title prop value', () => {
  render(
    <BodySection title="test">
      <p>child content</p>
    </BodySection>
  );

  expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument();
});

test('renders any number of children passed to it', () => {
  render(
    <BodySection title="test">
      <p>first child</p>
      <span>second child</span>
    </BodySection>
  );

  expect(screen.getByText('first child')).toBeInTheDocument();
  expect(screen.getByText('second child')).toBeInTheDocument();
});
