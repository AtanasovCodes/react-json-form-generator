import { Modal, Box, Typography, Button } from '@mui/material';
import { toast } from 'react-toastify';

import type { JsonModalProps } from './json-modal.props';

const JsonModal = ({ open, onClose, jsonData }: JsonModalProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
        toast.success('JSON copied to clipboard!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                role="dialog"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '80%', sm: '60%', md: '30%' },
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Submitted JSON
                </Typography>
                <pre
                    aria-label="JSON Data"
                    style={{
                        backgroundColor: '#f4f4f4',
                        padding: '10px',
                        borderRadius: '4px',
                        overflowX: 'auto',
                        maxHeight: '300px',
                        fontSize: '0.9rem',
                    }}
                >
                    {JSON.stringify(jsonData, null, 2)}
                </pre>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 },
                    }}
                    component="footer"
                >
                    <Button variant="contained" color="primary" onClick={handleCopy}>
                        Copy to Clipboard
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default JsonModal;
