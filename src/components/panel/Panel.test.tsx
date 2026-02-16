import { render, screen } from '@testing-library/react';
import { Panel } from './Panel';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

jest.mock('@/services', () => ({
  createTaskService: jest.fn(),
}));

jest.mock('@/components', () => ({
  DraggableTask: () => <div data-testid="draggable-task">Task</div>,
}));

describe('Panel', () => {
  it('renders panel title', () => {
    render(<Panel title="TO DO" tasks={[]} />);
    expect(screen.getByRole('heading', { name: 'TO DO' })).toBeInTheDocument();
  });

  it('renders without crashing with empty tasks', () => {
    render(<Panel title="IN PROGRESS" tasks={[]} />);
    expect(screen.getByRole('heading', { name: 'IN PROGRESS' })).toBeInTheDocument();
  });
});
