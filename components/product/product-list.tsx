import React from 'react'
import ProductCard from '@/components/product/product-card'

const ProductList = () => {
  const fakeData = [
    {
      id: '1',
      name: '冰裂紋美耐板',
      price: 9999,
    },
    {
      id: '2',
      name: '木紋防火板',
      price: 7999,
    },
    {
      id: '3',
      name: '高光亮面板',
      price: 5999,
    },
    {
      id: '4',
      name: '金屬質感板',
      price: 10999,
    },
    {
      id: '5',
      name: '防指紋霧面板',
      price: 6999,
    },
  ]

  return (
    <div className="grid grid-cols-5 gap-4 w-full py-4">
      {fakeData.map((product) => (
        <div key={product.id}>
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
