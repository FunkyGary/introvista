'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'
import { ModelImage } from './modelImage'
import MaterialImage from './materialImage'
import MaterialFile from './materialFile'
import { MaterialForm } from './materialForm'
import { ModelForm } from './modelForm'
import { ModelFile } from './modelFile'
import {
  materialProductSchema,
  modelProductSchema,
  ProductCreateDto,
} from '@/lib/product/product-create.dto'
import { CircularProgress } from '@mui/material'
import { useProductCreation } from '@/hooks/use-product-creation'
import { paths } from '@/paths'
import { enqueueSnackbar } from 'notistack'

const categories = [
  { value: 'item', label: '物品' },
  { value: 'material', label: '材質' },
] as const

interface ProductFormProps {
  initialData?: ProductCreateDto
  productId?: string
}

export default function Product({
  initialData,
  productId,
}: ProductFormProps): React.JSX.Element {
  const [category, setCategory] = React.useState(
    initialData?.category || 'item'
  )
  const methods = useForm<ProductCreateDto>({
    resolver: zodResolver(
      category === 'item' ? modelProductSchema : materialProductSchema
    ),
    mode: 'onBlur',
    defaultValues: initialData,
  })

  const router = useRouter()
  const { createProduct, isCreatingProduct } = useProductCreation()

  const onSubmit = (data: ProductCreateDto) => {
    console.log(data)
    if (productId) {
      // updateProduct(productId, category, data).then(({ error }) => {
      //     if (error) {
      //         console.error("Error updating product:", error);
      //         enqueueSnackbar(error, { variant: "error" });
      //     } else {
      //         enqueueSnackbar("產品更新成功！", { variant: "success" });
      //         router.push(paths.dashboard.products);
      //     }
      // });
    } else {
      createProduct(category, data).then(({ error }) => {
        if (error) {
          console.error('Error creating product:', error)
          enqueueSnackbar(error, { variant: 'error' })
        } else {
          enqueueSnackbar('產品上架成功！', { variant: 'success' })
          router.push(paths.dashboard.products)
        }
      })
    }
  }

  const handleDelete = () => {
    // if (productId) {
    //     deleteProduct(productId).then(({ error }) => {
    //         if (error) {
    //             console.error("Error deleting product:", error);
    //             enqueueSnackbar(error, { variant: "error" });
    //         } else {
    //             enqueueSnackbar("產品刪除成功！", { variant: "success" });
    //             router.push(paths.dashboard.products);
    //         }
    //     });
    // }
  }

  React.useEffect(() => {
    if (initialData) {
      methods.reset(initialData)
    }
  }, [initialData, methods])

  return (
    <Grid container spacing={4}>
      <Grid md={4} xs={12}>
        {/* Category Selection */}
        <FormControl fullWidth>
          <InputLabel>品類</InputLabel>
          <Select
            label="品類"
            name="category"
            variant="outlined"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              methods.setValue('category', e.target.value)
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Model Form */}
      {category === 'item' && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="家具模型屬性" />
                <Divider />
                <CardContent>
                  <ModelForm />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="圖片" />
                <Divider />
                <CardContent sx={{ paddingX: '30px' }}>
                  <ModelImage />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="檔案" />
                <Divider />
                <CardContent>
                  <ModelFile />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                {productId && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    // disabled={isDeletingProduct}
                    sx={{ mr: 2 }}
                  >
                    刪除
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isCreatingProduct}
                  endIcon={
                    isCreatingProduct ? <CircularProgress size={20} /> : null
                  }
                >
                  {productId ? '更新' : '新增'}
                </Button>
              </CardActions>
            </Grid>
          </form>
        </FormProvider>
      )}

      {/* Material Form */}
      {category === 'material' && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="材質屬性" />
                <Divider />
                <CardContent>
                  <MaterialForm />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="圖片" />
                <Divider />
                <CardContent sx={{ paddingX: '30px' }}>
                  <MaterialImage />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Card>
                <CardHeader title="檔案" />
                <Divider />
                <CardContent>
                  <MaterialFile />
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                {productId && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    // disabled={isDeletingProduct}
                    sx={{ mr: 2 }}
                  >
                    刪除
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isCreatingProduct}
                  endIcon={
                    isCreatingProduct ? <CircularProgress size={20} /> : null
                  }
                >
                  {productId ? '更新' : '新增'}
                </Button>
              </CardActions>
            </Grid>
          </form>
        </FormProvider>
      )}
    </Grid>
  )
}
