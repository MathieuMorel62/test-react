import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('contains a div with the class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="test">
      <p>child content</p>
    </BodySectionWithMarginBottom>
  );

  expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
});

test('renders the BodySection component', () => {
  render(
    <BodySectionWithMarginBottom title="test">
      <p>child content</p>
    </BodySectionWithMarginBottom>
  );

  expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument();
});
