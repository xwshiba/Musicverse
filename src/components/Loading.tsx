// Using defaults for props
// These props allow the component to be reusable and flexible
// the special "children" prop is filled with the contents of the element

interface LoadingProps {
    className?: string;
    children?: React.ReactNode;
};

function Loading({ className = 'loading', children = 'Loading...' } : LoadingProps) {
    return (
        <div className={className}>{children}</div>
    );
}

export default Loading;
