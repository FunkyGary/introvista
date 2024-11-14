import React from "react"
import { Button, Typography, Box } from "@mui/material"
import { CloudArrowUp as CloudUploadIcon } from "@phosphor-icons/react/dist/ssr/CloudArrowUp"
import { useFormContext } from "react-hook-form"

interface FileUploadProps {
  name: string
  label: string
  accept?: string
  onChange: (file: File | null) => void
  rules?: Record<string, any>
  disabled: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  accept,
  onChange,
  rules,
  disabled = false,
}) => {
  const { register } = useFormContext()
  const [fileName, setFileName] = React.useState<string | null>(null)

  // Register the field with validation rules
  React.useEffect(() => {
    register(name, rules)
  }, [register, name, rules])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFileName(file?.name || null)
    onChange(file)
  }

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
          disabled={disabled}
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
  )
}
