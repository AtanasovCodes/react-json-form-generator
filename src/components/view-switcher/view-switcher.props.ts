export interface ViewSwitcherProps {
    view: string;
    // eslint-disable-next-line no-undef
    onChange: (event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'row') => void;
}
