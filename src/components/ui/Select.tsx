import React from "react";
import Select, { components, type SingleValue, type StylesConfig } from "react-select";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder?: string;
    name: string;
    required?: boolean;
    onChange?: (option: Option | null) => void;
}

const customStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "var(--clr-dark-slate)",
        borderColor: state.isFocused
            ? "var(--clr-accent)"
            : "var(--clr-accent-invisible)",
        color: "var(--clr-light-text)",
        boxShadow: state.isFocused ? "0 0 0 2px var(--clr-accent)" : "none",
        borderRadius: "0.5rem",
        padding: "0.25rem 0.5rem",
        minHeight: "3rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": { borderColor: "var(--clr-accent)" },
        justifyContent: "flex-start" as const,
    }),

    valueContainer: (base) => ({
        ...base,
        justifyContent: "flex-start" as const,
        paddingLeft: "0.25rem",
    }),

    placeholder: (base) => ({
        ...base,
        color: "var(--clr-text-secundary)",
        fontSize: "0.9rem",
        textAlign: "left" as const,
        marginLeft: "0.25rem",
    }),

    singleValue: (base) => ({
        ...base,
        color: "var(--clr-light-text)",
        fontSize: "0.9rem",
        textAlign: "left" as const,
        marginLeft: "0.25rem",
    }),

    menu: (base) => ({
        ...base,
        backgroundColor: "var(--clr-dark-slate)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "0.5rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        marginTop: "0.5rem",
        zIndex: 99,
    }),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "var(--clr-accent)"
            : state.isFocused
                ? "rgba(255,255,255,0.1)"
                : "transparent",
        color: state.isSelected
            ? "var(--clr-light-text)"
            : "var(--clr-text-secundary)",
        cursor: "pointer",
        padding: "0.6rem 1rem",
        fontSize: "0.9rem",
        textAlign: "left" as const,
        transition: "all 0.2s ease",
    }),

    dropdownIndicator: (base) => ({
        ...base,
        color: "var(--clr-accent)",
        padding: "0 0.25rem",
        ":hover": { color: "var(--clr-accent)" },
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),

    menuList: (base) => ({
        ...base,
        padding: 0,
    }),
};

const fadeSlideStyle = `
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function CustomSelect({
    options,
    placeholder,
    name,
    required,
    onChange = () => { },
}: CustomSelectProps) {
    return (
        <>
            <style>{fadeSlideStyle}</style>
            <div className="w-full text-sm">
                <Select
                    inputId={name}
                    name={name}
                    required={required}
                    options={options}
                    placeholder={placeholder}
                    styles={customStyles}
                    classNamePrefix="custom-select"
                    isSearchable={false}
                    onChange={onChange}
                    components={{
                        DropdownIndicator: () => (
                            <ChevronDown className="w-4 h-4 opacity-70 mr-2 text-[var(--clr-accent)]" />
                        ),
                    }}
                />
            </div>
        </>
    );
}
