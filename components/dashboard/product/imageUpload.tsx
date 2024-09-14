import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ImageUpload({ name }: { name: string }): React.JSX.Element {
    const { control, setValue } = useFormContext(); // Access the form context provided by the parent

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
                <ImageUploading
                    multiple
                    value={field.value}
                    onChange={(imageList) => setValue(name, imageList)}
                    maxNumber={1}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <Box>
                            <Button
                                variant="contained"
                                style={
                                    isDragging ? { color: "red" } : undefined
                                }
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                上傳圖片
                            </Button>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                {imageList.map((image, index) => (
                                    <Grid key={index} xs={4}>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                textAlign: "center",
                                            }}
                                        >
                                            <img
                                                src={image.data_url}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 8,
                                                    right: 8,
                                                    display: "flex",
                                                    gap: 1,
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() =>
                                                        onImageUpdate(index)
                                                    }
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        onImageRemove(index)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </ImageUploading>
            )}
        />
    );
}

export default ImageUpload;
