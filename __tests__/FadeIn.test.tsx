import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FadeIn from '../app/components/FadeIn';

// Mock IntersectionObserver for jsdom environment
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  } as unknown as typeof IntersectionObserver;
});

describe('FadeIn', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <p data-testid="child">Test content</p>
      </FadeIn>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with different directions', () => {
    const { rerender } = render(
      <FadeIn direction="up">
        <p>Up animation</p>
      </FadeIn>
    );

    expect(screen.getByText('Up animation')).toBeInTheDocument();

    rerender(
      <FadeIn direction="left">
        <p>Left animation</p>
      </FadeIn>
    );

    expect(screen.getByText('Left animation')).toBeInTheDocument();
  });
});
