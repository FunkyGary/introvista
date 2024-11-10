'use client'

import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import { stringValidation, numberValidation } from '@/utils/validationRules'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import { Autocomplete, Chip, FormHelperText } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import { categories, MainCategory } from '@/utils/categories'
import { Material } from '@/lib/product/material.entity'

export function MaterialForm(): React.JSX.Element {
  const [mainCategory, setMainCategory] = useState<string>('')
  const { control, getValues } = useFormContext()

  const mainCategoryFromId = React.useCallback((id: string): void => {
    const mainCat = Object.entries(categories).find(([_, subCategories]) =>
      subCategories.some((sub) => sub.value === id)
    )?.[0] as string

    setMainCategory(mainCat)
  }, [])

  React.useEffect(() => {
    const categoryId = getValues('categoryID')
    if (categoryId) {
      mainCategoryFromId(categoryId)
    }
  }, [mainCategoryFromId, getValues])

  return (
    <Grid container spacing={3}>
      <Grid md={6} xs={12}>
        <FormControl fullWidth required>
          <InputLabel>名稱</InputLabel>
          <Controller
            name="materialName"
            control={control}
            rules={stringValidation}
            render={({ field }) => <OutlinedInput {...field} label="名稱" />}
          />
        </FormControl>
      </Grid>
      <Grid md={3} xs={6}>
        <FormControl fullWidth required>
          <InputLabel>主分類</InputLabel>
          <Select
            value={mainCategory || ''}
            onChange={(e) => setMainCategory(e.target.value)}
            label="主分類"
          >
            {Object.keys(categories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid md={3} xs={6}>
        <FormControl fullWidth required>
          <Controller
            name="categoryID"
            control={control}
            defaultValue=""
            rules={{ required: '請選擇子分類' }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel>子分類</InputLabel>
                <Select
                  {...field}
                  label="子分類"
                  error={!!error}
                  disabled={!mainCategory}
                >
                  {mainCategory &&
                    categories[mainCategory as keyof typeof categories].map(
                      (subCategory) => (
                        <MenuItem
                          key={subCategory.value}
                          value={subCategory.value}
                        >
                          {subCategory.label}
                        </MenuItem>
                      )
                    )}
                </Select>
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      </Grid>

      <Grid md={6} xs={12}>
        <FormControl fullWidth required>
          <InputLabel>品牌名稱</InputLabel>
          <Controller
            name="brand"
            control={control}
            rules={stringValidation}
            render={({ field }) => (
              <OutlinedInput {...field} label="品牌名稱" />
            )}
          />
        </FormControl>
      </Grid>

      <Grid md={2} xs={12}>
        <FormControl fullWidth>
          <InputLabel>長</InputLabel>
          <Controller
            name="dimensions.length"
            control={control}
            defaultValue={0}
            rules={numberValidation}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                label="長"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid md={2} xs={12}>
        <FormControl fullWidth>
          <InputLabel>寬</InputLabel>
          <Controller
            name="dimensions.width"
            control={control}
            defaultValue={0}
            rules={numberValidation}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                label="寬"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid md={2} xs={12}>
        <FormControl fullWidth>
          <InputLabel>高</InputLabel>
          <Controller
            name="dimensions.height"
            control={control}
            defaultValue={0}
            rules={numberValidation}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                label="高"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </FormControl>
      </Grid>

      <Grid md={6} xs={12}>
        <FormControl fullWidth>
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={field.value}
                onChange={(_, newValue) => {
                  field.onChange(newValue)
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="標籤"
                    placeholder="新增標籤"
                  />
                )}
              />
            )}
          />
        </FormControl>
      </Grid>

      <Grid md={6} xs={12}>
        <FormControl fullWidth required>
          <InputLabel>價格 (TWD)</InputLabel>
          <Controller
            name="materialPrice"
            control={control}
            defaultValue={0}
            rules={numberValidation}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                label="價格 (TWD)"
                type="number"
                inputProps={{
                  min: '1',
                }}
                onChange={(e) => field.onChange(Number(e.target.value))}
                startAdornment={
                  <InputAdornment position="start">NT$</InputAdornment>
                }
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid md={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel>重量 (kg)</InputLabel>
          <Controller
            name="weight"
            control={control}
            defaultValue={0}
            rules={numberValidation}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                label="重量 (kg)"
                type="number"
                inputProps={{
                  min: '0',
                }}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl fullWidth>
          <Controller
            name="materialDescription"
            control={control}
            rules={stringValidation}
            render={({ field }) => (
              <TextField
                required
                label="描述"
                multiline
                maxRows={4}
                minRows={2}
                {...field}
              />
            )}
          />
        </FormControl>
      </Grid>

      <Grid md={6} xs={12}>
        <Controller
          name="isPublished"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="是否發布"
            />
          )}
        />
      </Grid>
    </Grid>
  )
}
