import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

import type { ViewSwitcherProps } from './view-switcher.props';

const ViewSwitcher = ({ view, onChange }: ViewSwitcherProps) => {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', mb: 2 }}>
            <ToggleButtonGroup value={view} exclusive onChange={onChange} aria-label="View style">
                <ToggleButton
                    value="grid"
                    aria-label="Grid view"
                    sx={{
                        color: view === 'grid' ? 'white' : 'primary.main',
                        backgroundColor: view === 'grid' ? 'primary.main' : 'transparent',
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        },
                        '&.Mui-disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    Grid View
                </ToggleButton>
                <ToggleButton
                    value="row"
                    aria-label="Row view"
                    sx={{
                        color: view === 'row' ? 'white' : 'primary.main',
                        backgroundColor: view === 'row' ? 'primary.main' : 'transparent',
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        },
                        '&.Mui-disabled': {
                            opacity: 0.5,
                        },
                    }}
                >
                    Row View
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default ViewSwitcher;
