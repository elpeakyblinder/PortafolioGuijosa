import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MenuButton({ onClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        onClick();
    };

    return (
        <button onClick={handleClick} className="z-50 md:hidden">
            {isOpen ? <X /> : <Menu />}
        </button>
    );
}