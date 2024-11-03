'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  CircularProgress,
} from '@mui/material'

import { ProductFormValues, productFormSchema } from '@/lib/validations/product'
import { createProductWithoutFiles } from '@/lib/actions/product'
import { useUser } from '@/hooks/use-user'

type ProductType = 'models' | 'materials'

export default function ProductForm() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = React.useState(false)
  const [productType, setProductType] = React.useState<ProductType>('models')

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      modelName: '',
      modelDescription: '',
      price: 0,
      userId: user?.id,
    },
  })

  const handleTypeChange = (newType: 'models' | 'materials') => {
    setProductType(newType)
  }

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      console.log('Form data:', data)

      await createProductWithoutFiles(productType, data)
      toast.success('Product created successfully')
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Product Type</InputLabel>
            <Select
              label="Product Type"
              value={productType}
              onChange={(e) => handleTypeChange(e.target.value as ProductType)}
            >
              <MenuItem value="models">3D Model</MenuItem>
              <MenuItem value="materials">Material</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {productType === 'models' ? (
              <>
                <Card>
                  <CardHeader title="Model Properties" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Model Name</InputLabel>
                          <input
                            {...methods.register('modelName')}
                            className="p-2 w-full rounded border"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Description</InputLabel>
                          <textarea
                            {...methods.register('modelDescription')}
                            className="p-2 w-full rounded border"
                            rows={4}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Price</InputLabel>
                          <input
                            type="number"
                            {...methods.register('price', {
                              valueAsNumber: true,
                            })}
                            className="p-2 w-full rounded border"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader title="Material Properties" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Material Name</InputLabel>
                          <input
                            {...methods.register('materialName')}
                            className="p-2 w-full rounded border"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Description</InputLabel>
                          <textarea
                            {...methods.register('materialDescription')}
                            className="p-2 w-full rounded border"
                            rows={4}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Price</InputLabel>
                          <input
                            type="number"
                            {...methods.register('materialPrice', {
                              valueAsNumber: true,
                            })}
                            className="p-2 w-full rounded border"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </>
            )}

            <Card sx={{ mt: 3 }}>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Saving...'  : 'Create'}
                </Button>
              </CardActions>
            </Card>

            {/* Debug information */}
            <pre className="p-4 mt-4 bg-gray-100 rounded">
              Form Type: {productType}
              {'\n'}
              Errors: {JSON.stringify(methods.formState.errors, null, 2)}
            </pre>
          </form>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
