import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

jest.mock('@/providers/AuthContext', () => ({
  useAuth: () => ({ user: null, isReady: true, logout: jest.fn() }),
}));

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Navbar', () => {
  it('renders the PRELLO brand link', () => {
    render(<Navbar />);
    expect(screen.getByText('PRELLO')).toBeInTheDocument();
  });

  it('renders About link', () => {
    render(<Navbar />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
