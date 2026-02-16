import { render, screen } from '@testing-library/react';
import { DraggableTask } from './DraggableTask';

jest.mock('@/components', () => ({
  Task: ({ title }: { title: string }) => <div data-testid="task">{title}</div>,
}));

const mockItem = {
  id: 1,
  title: 'Draggable task title',
  description: 'Description',
  state: 'TO DO' as const,
};

describe('DraggableTask', () => {
  it('renders task content', () => {
    render(
      <DraggableTask item={mockItem} columnId="TO DO" index={0} />
    );
    expect(screen.getByText('Draggable task title')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(
      <DraggableTask item={mockItem} columnId="IN PROGRESS" index={1} />
    );
    expect(screen.getByTestId('task')).toBeInTheDocument();
  });
});
