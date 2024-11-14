"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createProduct,
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
import {
  ProductFormValues,
  materialFormSchema,
  modelFormSchema,
  modelInitialData,
  materialInitialData,
} from "@/lib/validations/product"
import { paths } from "@/paths"
import { useUser } from "@/hooks/use-user"

const CATEGORIES = [
  { value: "item", label: "物品" },
  { value: "material", label: "材質" },
] as const

interface ProductFormProps {
  initialData?: ProductFormValues
  productId?: string
  readOnly?: boolean
}

export default function ProductForms({
  initialData,
  productId,
  readOnly = false,
}: ProductFormProps): React.JSX.Element {
  const [category, setCategory] = React.useState(
    productId && initialData?.type === "materials" ? "material" : "item"
  )
  const router = useRouter()
  const { user } = useUser()
  const getDefaultValue = (category: string) => {
    const baseData =
      productId && initialData
        ? initialData
        : category === "item"
          ? modelInitialData
          : materialInitialData
    return { ...baseData, userId: user?.id }
  }

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(
      category === "item" ? modelFormSchema : materialFormSchema
    ),
    defaultValues: getDefaultValue(category),
  })

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
    methods.reset(getDefaultValue(newCategory))
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
        <Button type="submit" variant="contained">
          {productId ? "更新" : "新增"}
        </Button>
      </CardActions>
    </Grid>
  )

  const onFormSubmit = async () => {
    try {
      const formData = methods.getValues()
      const collectionType = category === "item" ? "models" : "materials"

      if (collectionType === "models") {
        modelFormSchema.parse(formData)
      } else {
        materialFormSchema.parse(formData)
      }

      if (productId) {
        // Update existing product
        const result = await updateProduct(productId, collectionType, formData)
        if (result.success) {
          enqueueSnackbar("產品更新成功！", { variant: "success" })
          router.push(paths.dashboard.products)
        }
      } else {
        // Create new product
        const result = await createProduct(collectionType, formData)
        if (result.id) {
          enqueueSnackbar("產品上架成功！", { variant: "success" })
          router.push(paths.dashboard.products)
        }
      }
    } catch (error) {
      console.error("Error handling product:", error)
      console.log(methods.getValues())
      enqueueSnackbar(error instanceof Error ? error.message : "操作失敗", {
        variant: "error",
      })
    }
  }

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
            disabled={!!productId}
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
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          {category === "item" ? (
            <>
              {renderFormSection(
                "家具模型屬性",
                <ModelForm readOnly={readOnly} />
              )}
              {renderFormSection("圖片", <ModelImage />)}
              {renderFormSection("檔案", <ModelFile readOnly={readOnly} />)}
            </>
          ) : (
            <>
              {renderFormSection(
                "材質屬性",
                <MaterialForm readOnly={readOnly} />
              )}
              {renderFormSection("圖片", <MaterialImage />)}
              {renderFormSection("檔案", <MaterialFile readOnly={readOnly} />)}
            </>
          )}
          {!readOnly && renderActionButtons()}
        </form>
      </FormProvider>
    </Grid>
  )
}
