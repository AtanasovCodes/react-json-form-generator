import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';

import JsonModal from './json-modal';

describe('JsonModal', () => {
    const mockOnClose = vi.fn();
    const mockJsonData = { key: 'value', nested: { anotherKey: 'anotherValue' } };

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the modal when open is true', () => {
        render(<JsonModal open={true} onClose={mockOnClose} jsonData={mockJsonData} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/key/i)).toBeInTheDocument();
        expect(screen.getByText(/value/i)).toBeInTheDocument();
    });

    it('does not render the modal when open is false', () => {
        render(<JsonModal open={false} onClose={mockOnClose} jsonData={mockJsonData} />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        render(<JsonModal open={true} onClose={mockOnClose} jsonData={mockJsonData} />);

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('renders JSON data correctly', () => {
        render(<JsonModal open={true} onClose={mockOnClose} jsonData={mockJsonData} />);

        const preElement = screen.getByLabelText('JSON Data');
        expect(preElement).toBeInTheDocument();
        expect(preElement).toHaveTextContent('"key": "value"');
        expect(preElement).toHaveTextContent('"anotherKey": "anotherValue"');
    });
});
