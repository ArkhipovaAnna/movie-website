import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: (reset: () => void) => ReactNode;
    resetKey?: unknown;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary:', error, info.componentStack);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.reset();
        }
    }

    reset = () => {
        this.setState({ hasError: false });
    };

    render() {
        return this.state.hasError
            ? this.props.fallback(this.reset)
            : this.props.children;
    }
}

export default ErrorBoundary
