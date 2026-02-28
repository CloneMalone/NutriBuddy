/**
 * A centered, full-screen loading spinner.
 * Use as a placeholder while checking auth or loading page data.
 */
export default function FullPageSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    );
}
