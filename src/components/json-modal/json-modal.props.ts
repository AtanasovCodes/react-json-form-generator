export interface JsonModalProps {
    open: boolean;
    onClose: () => void;
    jsonData: Record<string, unknown>;
}
