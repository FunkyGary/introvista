import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";

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
                        <Box sx={{ display: "flex" }}>
                            {imageList.length > 0 ? (
                                <Image
                                    src={imageList[0].data_url}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        background: "#D9D9D9",
                                        width: "120px",
                                        height: "120px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "20px",
                                    }}
                                    onClick={onImageUpload}
                                >
                                    <ImageIcon size={100} color="white" />
                                </Box>
                            )}
                            <Box>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => onImageUpdate(0)}
                                >
                                    更新
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onImageRemove(0)}
                                >
                                    刪除
                                </Button>
                            </Box>
                        </Box>
                    )}
                </ImageUploading>
            )}
        />
    );
}

export default ImageUpload;
