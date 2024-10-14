import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { CloudArrowUp as CloudUploadIcon } from "@phosphor-icons/react/dist/ssr/CloudArrowUp";

interface FileUploadProps {
    name: string;
    label: string;
    accept?: string;
    onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    name,
    label,
    accept,
    onChange,
}) => {
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFileName(file?.name || null);
        onChange(file);
    };

    return (
        <Box>
            <input
                {...(accept !== "*" ? { accept } : {})}
                style={{ display: "none" }}
                id={`file-upload-${name}`}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor={`file-upload-${name}`}>
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    {label}
                </Button>
            </label>
            {fileName && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {fileName}
                </Typography>
            )}
        </Box>
    );
};
