"use client"

import * as React from "react"
import Link from "next/link"
import {
  Box,
  Card,
  Checkbox,
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
} from "@mui/material"
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass"
import { useSelection } from "@/hooks/use-selection"
import { getUserProducts } from "@/lib/actions/product"
import { ProductData, Product } from "@/types/product"
import { useUser } from "@/hooks/use-user" // Adjust based on your auth setup

const tabs = [
  { value: "all", label: "全部商品" },
  { value: "published", label: "上架中商品" },
  { value: "unpublished", label: "未上架商品" },
] as const

export function ProductList(): React.JSX.Element {
  const { user } = useUser()

  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [mainCategory, setMainCategory] = React.useState("all")
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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
          <OutlinedInput
            fullWidth
            placeholder="搜尋 商品標號、商品名稱"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon />
              </InputAdornment>
            }
            size="small"
            sx={{ maxWidth: "400px" }}
          />
          {/* Add your category filters here */}
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
              <TableCell padding="checkbox">
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
              </TableCell>
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) selectOne(id)
                          else deselectOne(id)
                        }}
                      />
                    </TableCell>
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
                        <Button>
                          <Link href={`/admin/product/${id}`}>預覽</Link>
                        </Button>
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
