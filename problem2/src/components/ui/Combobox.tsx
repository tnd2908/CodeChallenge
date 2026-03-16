import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Option {
    currency: string;
    price: number;
}

interface ComboboxProps {
    label?: string;
    options: Option[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    name: string
    disabledOption?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
    label,
    options,
    value,
    onChange,
    className = '',
    placeholder = 'Search currency...',
    name,
    disabledOption,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter((opt) =>
            opt.currency.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query]);

    const handleSelect = useCallback((currency: string) => {
        if (currency === disabledOption) {
            return;
        }
        onChange({ target: { name, value: currency } } as React.ChangeEvent<HTMLInputElement>);
        setQuery('');
        setIsOpen(false);
    }, [name, disabledOption, onChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            setQuery('');
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

    return (
        <div ref={containerRef} className={`flex flex-col space-y-3 gap-1.5 relative ${className}`}>
            {label && <span className="text-sm font-medium text-white">{label}</span>}

            <div className="relative">
                <div className="relative flex items-center gap-3">
                    {value ? (
                        <img src={`/src/assets/${value}.svg`} alt={value} className='w-12 h-12 p-1 rounded-full bg-white' />
                    ): (
                        <div className='w-12 min-w-12 h-12 rounded-full bg-black border-4 border-white'></div>
                    )}
                    <input
                        type="text"
                        className={`w-full px-4 border-b text-white py-3 border-white/50 transition-all outline-none`}
                        value={isOpen ? query : value}
                        placeholder={value || placeholder}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (!isOpen) setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-20 w-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, idx) => (
                                <div
                                    key={`${opt.currency}-${idx}`}
                                    className={`
                    px-4 py-2.5 flex justify-between items-center
                    hover:bg-blue-50 transition-colors
                    ${value === opt.currency ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'}
                    ${opt.currency === disabledOption ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                                    onClick={() => handleSelect(opt.currency)}
                                >
                                    <div className='flex items-center gap-3'>
                                        <img src={`/src/assets/${opt.currency}.svg`} alt={opt.currency} className='w-6 h-6' />
                                        <span>{opt.currency}</span>
                                    </div>
                                    {value === opt.currency && (
                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 italic text-center">
                                No results for "{query}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Combobox;