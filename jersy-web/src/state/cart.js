import { useMemo, useState } from 'react'

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function useCart() {
  const [items, setItems] = useState([])

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  }, [items])

  const addItem = ({ productId, title, variantLabel, unitPrice, imageSrc, quantity }) => {
    const q = Math.max(1, Number(quantity) || 1)
    setItems((prev) => {
      const idx = prev.findIndex(
        (x) => x.productId === productId && x.variantLabel === variantLabel,
      )
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + q }
        return next
      }
      return [...prev, { productId, title, variantLabel, price: unitPrice, imageSrc, quantity: q }]
    })
  }

  const removeItem = (productId, variantLabel) => {
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.variantLabel === variantLabel)))
  }

  const setQuantity = (productId, variantLabel, quantity) => {
    const q = Math.max(1, Number(quantity) || 1)
    setItems((prev) =>
      prev.map((x) => (x.productId === productId && x.variantLabel === variantLabel ? { ...x, quantity: q } : x)),
    )
  }

  const clear = () => setItems([])

  return {
    items,
    subtotal,
    subtotalLabel: formatMoney(subtotal),
    addItem,
    removeItem,
    setQuantity,
    clear,
  }
}

