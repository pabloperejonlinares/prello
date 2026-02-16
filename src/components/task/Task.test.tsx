import { render, screen } from '@testing-library/react';
import { Task } from './Task';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

jest.mock('@/services', () => ({
  deleteTaskService: jest.fn(),
  updateTaskService: jest.fn(),
}));

const defaultTask = {
  id: 1,
  title: 'Test task',
  description: 'Test description',
  state: 'TO DO' as const,
};

describe('Task', () => {
  it('renders task title and description', () => {
    render(<Task {...defaultTask} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<Task {...defaultTask} state="DONE" />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });
});
