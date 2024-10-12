"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { ModelForm } from "./modelForm";
import { MaterialForm } from "./materialForm";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { ModelImage } from "./modelImage";
import { MaterialImage } from "./materialImage";
import { MaterialFile } from "./materialFile";
import { ModalFile } from "./modalFile";
import {
  MaterialProductCreateDto,
  materialProductSchema,
  ModelProductCreateDto,
  modelProductSchema,
  ProductCreateDto,
} from "@/lib/product/product-create.dto";
import { useInjection } from "inversify-react";
import ModelProductCreateUseCase from "@/lib/product/model-product-create-use-case";
import MaterialProductCreateUseCase from "@/lib/product/material-product-create-use-case";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProductCreation } from "@/hooks/use-product-creation";

const categories = [
  { value: "furnitureModel", label: "家具" },
  { value: "material", label: "材質" },
] as const;

export function Product(): React.JSX.Element {
  const [category, setCategory] = React.useState("furnitureModel");
  const methods = useForm<ProductCreateDto>({
    resolver: zodResolver(
      category === "furnitureModel" ? modelProductSchema : materialProductSchema
    ),
    mode: "onBlur",
  });

  const router = useRouter();
  const { createProduct, isCreatingProduct } = useProductCreation();
  const onSubmit = async (data: ProductCreateDto) => {
    const { error } = await createProduct(category, data);
    if (error) {
      console.error("Error submitting form:", error);
    } else {
      router.push("/admin/products");
    }
  };

  React.useEffect(() => {
    methods.reset(); // Reset form when category changes
  }, [category, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid md={4} xs={12}>
            <FormControl fullWidth>
              <InputLabel>新增品類</InputLabel>
              <Select
                label="新增品類"
                name="category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Card>
              <CardHeader title="屬性" />
              <Divider />
              <CardContent>
                {category === "furnitureModel" ? (
                  <ModelForm />
                ) : (
                  <MaterialForm />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Card>
              <CardHeader title="圖片" />
              <Divider />
              <CardContent>
                {category === "furnitureModel" ? (
                  <ModelImage />
                ) : (
                  <MaterialImage />
                )}
              </CardContent>
              <Divider />
            </Card>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Card>
              <CardHeader title="檔案" />
              <Divider />
              <CardContent>
                {category === "furnitureModel" ? (
                  <ModalFile />
                ) : (
                  <MaterialFile />
                )}
              </CardContent>
              <Divider />
            </Card>
          </Grid>

          <Grid sx={{ width: "100%" }}>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                type="submit"
                endIcon={
                  isCreatingProduct ? <CircularProgress size={20} /> : null
                }
              >
                新增
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
