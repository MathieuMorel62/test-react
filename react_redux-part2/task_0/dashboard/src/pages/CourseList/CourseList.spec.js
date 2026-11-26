import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import CourseList from './CourseList';


test('it should render the CourseList component with 5 rows', () => {
  const props = {
    courses : [
      { id:1, name:'ES6', credit:60 },
      { id:2, name:'Webpack', credit:20 },
      { id:3, name:'React', credit:40 }
    ]
  }
  renderWithProviders(<CourseList />, {
    preloadedState: { courses: props },
  });

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(5)
})

test('it should render the CourseList component with 1 row', () => {
  const props = {
    courses : []
  }

  renderWithProviders(<CourseList />, {
    preloadedState: { courses: props },
  });

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1)
  expect(rowText).toBeInTheDocument()
});
