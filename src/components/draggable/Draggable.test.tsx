import { render, screen } from '@testing-library/react';
import { Draggable } from './Draggable';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

jest.mock('@/components', () => ({
  Panel: ({ title }: { title: string }) => <div data-testid="panel">{title}</div>,
  PanelSkeleton: () => <div data-testid="panel-skeleton">Skeleton</div>,
}));

const emptyTasks = { todoTasks: [], progressTasks: [], doneTasks: [] };

describe('Draggable', () => {
  it('renders panels for each column', () => {
    render(<Draggable {...emptyTasks} />);
    expect(screen.getByText('TO DO')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(
      <Draggable
        todoTasks={[]}
        progressTasks={[]}
        doneTasks={[]}
      />
    );
    expect(screen.getAllByTestId('panel')).toHaveLength(3);
  });
});
