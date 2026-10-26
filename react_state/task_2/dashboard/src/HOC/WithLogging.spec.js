import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    )
  }
}

afterEach(() => {
  cleanup();
});

test('WithLogging renders the wrapped component heading', () => {
  const WrappedComponent = WithLogging(MockApp);
  const { getByText } = render(<WrappedComponent />);

  expect(getByText('Hello from Mock App Component')).toBeInTheDocument();
});
