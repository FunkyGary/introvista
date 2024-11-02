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
import { createProduct, updateProduct } from '@/lib/actions/product'

const categories = [
  { value: 'item', label: '物品' },
  { value: 'material', label: '材質' },
] as const

interface ProductFormProps {
  initialData?: ProductCreateDto
  productId?: string
}

export default function ProductForm({
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

  const productType: 'models' | 'materials' =
    category === 'item' ? 'models' : 'materials'

  const onSubmit = async (data: ProductCreateDto) => {
    try {
      if (productId) {
        /* await updateProduct(category, productId, data) */
        /* enqueueSnackbar('產品更新成功！', { variant: 'success' }) */
      } else {
        await createProduct(productType, data)
        enqueueSnackbar('產品上架成功！', { variant: 'success' })
      }
      router.push(paths.dashboard.products)
    } catch (error) {
      console.error('Error:', error)
      enqueueSnackbar('操作失敗', { variant: 'error' })
    }
  }

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
                <Button
                  variant="contained"
                  type="submit"
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
