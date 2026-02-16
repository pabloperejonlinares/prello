import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { PanelSkeleton } from './Skeleton';

jest.mock('@heroui/react', () => ({
  Card: ({ children }: { children: ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children: ReactNode }) => <header>{children}</header>,
  Skeleton: () => <div data-testid="skeleton" />,
}));

describe('PanelSkeleton', () => {
  it('renders panel title', () => {
    render(<PanelSkeleton title="TO DO" />);
    expect(screen.getByRole('heading', { name: 'TO DO' })).toBeInTheDocument();
  });

  it('always renders 3 skeleton placeholders per panel', () => {
    render(<PanelSkeleton title="DONE" />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });
});
