"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createProduct,
  createProductWithoutFiles,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/product"
import { enqueueSnackbar } from "notistack"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import MaterialImage from "./materialImage"
import MaterialFile from "./materialFile"
import { MaterialForm } from "./materialForm"
import { ModelImage } from "./ModelImage"
import { ModelForm } from "./ModelForm"
import { ModelFile } from "./ModelFile"
import { ProductFormValues, materialFormSchema, modelFormSchema } from "@/lib/validations/product"
import { paths } from "@/paths"
import { useUser } from "@/hooks/use-user"

const CATEGORIES = [
  { value: "item", label: "物品" },
  { value: "material", label: "材質" },
] as const

interface ProductFormProps {
  initialData?: ProductFormValues
  productId?: string
}

export default function Product({
  initialData,
  productId,
}: ProductFormProps): React.JSX.Element {
  const [category, setCategory] = React.useState(
    initialData?.type || "item"
  )
  const router = useRouter()
  const { user } = useUser()

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(
      category === 'item' ? modelFormSchema : materialFormSchema
    ),
    defaultValues: {
      userId: user?.id,
      ...initialData,
    },
  })

  const handleSubmit = async (formData: ProductFormValues) => {
    try {
      const files = {
        // For models
        ...(category === 'item' && {
          thumbnailImage: formData.thumbnailImage?.[0] || null,
          modelFileGLB: formData.modelFileGLB?.[0] || null,
          modelFileUSD: formData.modelFileUSD?.[0] || null,
        }),
        // For materials
        ...(category === 'material' && {
          previewImage: formData.previewImage?.[0] || null,
          baseColorMap: formData.baseColorMap?.[0] || null,
          normalMap: formData.normalMap?.[0] || null,
          roughnessMap: formData.roughnessMap?.[0] || null,
          metallicMap: formData.metallicMap?.[0] || null,
          ambientOcclusionMap: formData.ambientOcclusionMap?.[0] || null,
          heightMap: formData.heightMap?.[0] || null,
        }),
      }

      const collectionType = category === "item" ? "models" : "materials"

      if (productId) {
        // Handle update
        const result = await updateProduct(productId, formData)
        if (result.success) {
          enqueueSnackbar("產品更新成功！", { variant: "success" })
          router.push(paths.dashboard.products)
        }
      } else {
        // Handle create
        console.log(formData);
        
        const result = await createProduct(collectionType, formData, files)
        if (result.id) {
          enqueueSnackbar("產品上架成功！", { variant: "success" })
          router.push(paths.dashboard.products)
        }
      }
    } catch (error) {
      console.error("Error handling product:", error)
      enqueueSnackbar(error instanceof Error ? error.message : "操作失敗", {
        variant: "error",
      })
    }
  }

  const handleDelete = async () => {
    if (!productId) return

    try {
      const result = await deleteProduct(productId)

      if (result.success) {
        enqueueSnackbar("產品刪除成功！", { variant: "success" })
        router.push(paths.dashboard.products)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      enqueueSnackbar(error instanceof Error ? error.message : "刪除失敗", {
        variant: "error",
      })
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    methods.setValue("category", newCategory)
    // Reset form when changing category
    methods.reset({
      category: newCategory,
    })
  }

  React.useEffect(() => {
    if (initialData) {
      methods.reset(initialData)
    }
  }, [initialData, methods])

  const renderFormSection = (title: string, content: React.ReactNode) => (
    <Grid sx={{ width: "100%" }}>
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent sx={{ paddingX: title === "圖片" ? "30px" : undefined }}>
          {content}
        </CardContent>
      </Card>
    </Grid>
  )

  const onFormSubmit = async () => {
    const formData = methods.getValues()
    const collectionType = category === "item" ? "models" : "materials"

    if (productId) {
      // Update existing product
      const result = await updateProduct(productId, formData)
      if (result.success) {
        enqueueSnackbar("產品更新成功！", { variant: "success" })
        router.push(paths.dashboard.products)
      }
    } else {
      // Create new product
      const result = await createProductWithoutFiles(collectionType, formData)
      if (result.id) {
        enqueueSnackbar("產品上架成功！", { variant: "success" })
        router.push(paths.dashboard.products)
      }
    }
  }

  const renderActionButtons = () => (
    <Grid sx={{ width: "100%" }}>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {productId && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ mr: 2 }}
          >
            刪除
          </Button>
        )}
        <Button variant="contained" onClick={onFormSubmit}>
          {productId ? "更新" : "新增"}
        </Button>
      </CardActions>
    </Grid>
  )

  console.log(methods.getValues())

  return (
    <Grid container spacing={4}>
      <Grid md={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel>品類</InputLabel>
          <Select
            label="品類"
            name="category"
            variant="outlined"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          {category === "item" ? (
            <>
              {renderFormSection("家具模型屬性", <ModelForm />)}
              {renderFormSection('圖片', <ModelImage />)}
              {/* {renderFormSection('檔案', <ModelFile />)} */}
            </>
          ) : (
            <>
              {renderFormSection("材質屬性", <MaterialForm />)}
              {/* {renderFormSection('圖片', <MaterialImage />)} */}
              {/* {renderFormSection('檔案', <MaterialFile />)} */}
            </>
          )}
          {renderActionButtons()}
        </form>
      </FormProvider>
    </Grid>
  )
}
