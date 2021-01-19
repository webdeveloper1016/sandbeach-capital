import React from 'react';
import Error from './Error';

interface ErrorBoundaryProps {
  fallback?: React.ReactElement;
  resetError?: boolean;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: null | Error;
}

/** Render error boundary with fallback component
 *
 * Ref: https://codesandbox.io/s/adoring-goodall-8wbn7
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    error: null,
  };

  public componentDidUpdate(): void {
    const { error } = this.state;
    const { resetError } = this.props;
    if (error && resetError) {
      this.resetError();
    }
  }

  public componentDidCatch(error: Error): void {
    console.error(error);
    this.setState({ error });
  }

  public resetError(): void {
    this.setState({ error: null });
  }

  public render(): React.ReactElement | React.ReactNode {
    const { error } = this.state;
    const { fallback, children } = this.props;
    if (error) {
      return fallback || <div className="p-3 flex justify-center"><Error /></div>;
    }
    return children;
  }
}

export default ErrorBoundary;
