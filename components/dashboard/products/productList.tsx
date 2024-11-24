"use client"

import * as React from "react"
import Link from "next/link"
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  ButtonGroup,
  CardContent,
  Typography,
  Tabs,
  Tab,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material"
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass"
import { useSelection } from "@/hooks/use-selection"
import { getUserProducts } from "@/lib/actions/product"
import { ProductData, Product } from "@/types/product"
import { useUser } from "@/hooks/use-user" // Adjust based on your auth setup
import { categories, MainCategory } from "@/utils/categories"
import { useForm, Controller } from "react-hook-form"

const tabs = [
  { value: "all", label: "全部商品" },
  { value: "published", label: "上架中商品" },
  { value: "unpublished", label: "未上架商品" },
] as const

interface SearchFormData {
  mainCategory: string
  categoryID: string
  searchQuery: string
  priceStart: string
  priceEnd: string
  tags: string
  brands: string
  minLength: string
  maxLength: string
  minWidth: string
  maxWidth: string
  minHeight: string
  maxHeight: string
}

export function ProductList(): React.JSX.Element {
  const { user } = useUser()

  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState("all")
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const { control, handleSubmit, watch, reset } = useForm<SearchFormData>({
    defaultValues: {
      mainCategory: "all",
      categoryID: "",
      searchQuery: "",
      priceStart: "",
      priceEnd: "",
      tags: "",
      brands: "",
      minLength: "",
      maxLength: "",
      minWidth: "",
      maxWidth: "",
      minHeight: "",
      maxHeight: "",
    },
  })

  const mainCategoryWatch = watch("mainCategory")

  const onSubmit = (data: SearchFormData) => {
    console.log("Search form data:", data)
    // 實現搜索邏輯
  }

  const handleReset = () => {
    reset()
    // 重置搜索結果
  }

  // Selection handling
  const productIds = React.useMemo(
    () => products.map((p) => (p.type === "model" ? p.itemID : p.materialID)),
    [products]
  )
  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(productIds)

  // Fetch products
  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id) return

      try {
        const fetchedProducts = await getUserProducts(user.id)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [user?.id])

  // Filter products based on active tab
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      if (activeTab === "published") return product.isPublished
      if (activeTab === "unpublished") return !product.isPublished
      return true
    })
  }, [products, activeTab])

  // Handle pagination
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Card sx={{ maxWidth: "1000px", width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", paddingX: "25px" }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <CardContent>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
          <Controller
            name="searchQuery"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                placeholder="搜尋商品名稱"
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon />
                  </InputAdornment>
                }
                size="small"
                sx={{ maxWidth: "400px" }}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                placeholder="搜尋標籤"
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon />
                  </InputAdornment>
                }
                sx={{ maxWidth: "400px" }}
              />
            )}
          />
          <Controller
            name="brands"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                placeholder="搜尋品牌"
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon />
                  </InputAdornment>
                }
                sx={{ maxWidth: "400px" }}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>主分類</InputLabel>
            <Controller
              name="mainCategory"
              control={control}
              render={({ field }) => (
                <Select {...field} label="主分類">
                  {Object.keys(categories).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>子分類</InputLabel>
            <Controller
              name="categoryID"
              control={control}
              rules={{ required: "請選擇子分類" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    label="子分類"
                    error={!!error}
                    disabled={!mainCategoryWatch || mainCategoryWatch === "all"}
                  >
                    {mainCategoryWatch &&
                      mainCategoryWatch !== "all" &&
                      categories[
                        mainCategoryWatch as keyof typeof categories
                      ].map((subCategory) => (
                        <MenuItem
                          key={subCategory.value}
                          value={subCategory.value}
                        >
                          {subCategory.label}
                        </MenuItem>
                      ))}
                  </Select>
                  {error && (
                    <FormHelperText error>{error.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
          <Controller
            name="priceStart"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type="number"
                placeholder="最低價格"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            )}
          />
          <Controller
            name="priceEnd"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                fullWidth
                placeholder="最高價格"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
          <Controller
            name="minHeight"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type="number"
                placeholder="最小高"
              />
            )}
          />
          <Controller
            name="maxHeight"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                fullWidth
                placeholder="最大高"
              />
            )}
          />
          <Controller
            name="minWidth"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type="number"
                placeholder="最小寬"
              />
            )}
          />
          <Controller
            name="maxWidth"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                fullWidth
                placeholder="最大寬"
              />
            )}
          />
          <Controller
            name="minLength"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type="number"
                placeholder="最小長"
              />
            )}
          />
          <Controller
            name="maxLength"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="number"
                fullWidth
                placeholder="最大長"
              />
            )}
          />
          <Box sx={{ display: "flex" }}>
            <Button
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
              sx={{
                width: "80px",
                color: "#9900FF",
                borderColor: "#9900FF",
              }}
            >
              搜尋
            </Button>
          </Box>

          {/* <Button
                variant="outlined"
                color="info"
                onClick={handleReset}
                sx={{ width: "80px" }}
              >
                重設
              </Button> */}
        </Box>
        {/* Products Count and Export */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography>{filteredProducts.length} 件商品</Typography>
          <Button variant="outlined" size="small">
            匯出報表
          </Button>
        </Box>

        {/* Products Table */}
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.size === productIds.length}
                  indeterminate={
                    selected.size > 0 && selected.size < productIds.length
                  }
                  onChange={(event) => {
                    if (event.target.checked) selectAll()
                    else deselectAll()
                  }}
                />
              </TableCell> */}
              <TableCell>類型</TableCell>
              <TableCell>名稱</TableCell>
              <TableCell>價格</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>建立日期</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                const id =
                  product.type === "model" ? product.itemID : product.materialID
                const isSelected = selected.has(id)

                return (
                  <TableRow hover key={id}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) selectOne(id)
                          else deselectOne(id)
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      {product.type === "model" ? "物品" : "材質"}
                    </TableCell>
                    <TableCell>
                      {product.type === "model"
                        ? product.itemName
                        : product.materialName}
                    </TableCell>
                    <TableCell>
                      $
                      {product.type === "model"
                        ? product.price
                        : product.materialPrice}
                    </TableCell>
                    <TableCell>
                      {product.isPublished ? "已上架" : "未上架"}
                    </TableCell>
                    <TableCell>
                      {product.createdDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="text" size="small">
                        <Button href={`/admin/product/${id}`}>預覽</Button>
                        <Button>
                          <Link href={`/admin/product/${id}/edit`}>編輯</Link>
                        </Button>
                        <Button disabled>推廣</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardContent>
    </Card>
  )
}
