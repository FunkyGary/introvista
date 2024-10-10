import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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
                        <Box>
                            {imageList.length > 0 ? (
                                <Box
                                    sx={{
                                        border: "1px solid #D9D9D9",
                                        width: "200px",
                                        height: "200px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "20px",
                                    }}
                                >
                                    <img
                                        src={imageList[0].data_url}
                                        alt=""
                                        width="200"
                                        height="200"
                                    />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        background: "#D9D9D9",
                                        width: "200px",
                                        height: "200px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "20px",
                                    }}
                                    // onClick={onImageUpload}
                                >
                                    <ImageIcon size={150} color="white" />
                                </Box>
                            )}
                            <Box
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    paddingTop: "10px",
                                }}
                            >
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onImageUpdate(0)}
                                    sx={{ marginRight: "10px" }}
                                >
                                    上傳
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
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
