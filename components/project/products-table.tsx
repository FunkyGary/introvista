import React from 'react'

type ProductData = {
  id: string
  name: string
  amount: number
  estimatedPrice: number
}

interface ProductTableProps {
  data: ProductData[]
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-gray-700 bg-slate-200">
            <th className="py-2 px-4 text-left">商品編號</th>
            <th className="py-2 px-4 text-left">商品名稱</th>
            <th className="py-2 px-4 text-left">數量</th>
            <th className="py-2 px-4 text-left">預估單價</th>
            <th className="py-2 px-4 text-left">總價</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => {
            const totalPrice = product.amount * product.estimatedPrice

            return (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4 text-left">{product.id}</td>
                <td className="py-2 px-4 text-left">{product.name}</td>
                <td className="py-2 px-4 text-left">
                  {product.amount.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-left">
                  {product.estimatedPrice.toLocaleString()} 元
                </td>

                <td className="py-2 px-4 text-left">
                  {totalPrice.toLocaleString()} 元
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
