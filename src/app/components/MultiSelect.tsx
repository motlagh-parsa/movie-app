'use client';

import {useState, useRef, useEffect} from 'react';

export default function MultiSelect({
                                        options,
                                        selectedValues,
                                        onChangeAction,
                                        placeholder = 'Select...',
                                    }: {
    options: { id: number; name: string }[];
    selectedValues: number[];
    onChangeAction: (values: number[]) => void;
    placeholder?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (id: number) => {
        const newValues = selectedValues.includes(id)
            ? selectedValues.filter(v => v !== id)
            : [...selectedValues, id];
        onChangeAction(newValues);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="w-full px-4 py-2 mb-4 border rounded-xl bg-gray-800 text-white text-left flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValues.length > 0
                    ? `${selectedValues.length} selected`
                    : placeholder}
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div
                    className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-auto">
                    {options.map(option => (
                        <label
                            key={option.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option.id)}
                                onChange={() => toggleOption(option.id)}
                                className="mr-2"
                            />
                            <span>{option.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}