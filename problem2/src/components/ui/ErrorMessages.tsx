import type { FormValues } from "../../types/types"

interface ErrorMessagesProps {
    errors: Partial<Record<keyof FormValues, string>>;
}
const ErrorMessages = ({ errors }: ErrorMessagesProps) => {
    const errorMessages = Object.values(errors).filter((msg) => msg && msg.trim() !== '');
    if (errorMessages.length === 0) return null;
    const filteredErrorMessages = new Set(errorMessages);
    const renderErrorMessages = [...filteredErrorMessages]
    const count = renderErrorMessages.length;
    const summary = count === 1
        ? 'There was 1 error with your submission'
        : `There were ${count} errors with your submission`;

    return (
        <div className="rounded-lg px-4 py-3 text-white shadow-sm bg-[#5b212f] border border-[#7a2d3f]">
            <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-medium text-white/95">{summary}</p>
                <ul className="mt-2 list-none space-y-1 pl-0">
                    {renderErrorMessages.map((msg) => (
                        <li key={`${msg}`} className="flex items-start gap-2 text-sm text-white/90">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#c94a5c]" aria-hidden />
                            <span>{msg}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ErrorMessages;