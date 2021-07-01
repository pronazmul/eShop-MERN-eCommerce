import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { addToCartAction } from '../../../redux/actions/cartActions'

const CartScreen = () => {
  const { id } = useParams()
  const { search } = useLocation()
  const qty = search ? Number(search.split('=')[1]) : 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addToCartAction(id, qty))
  }, [dispatch, id, qty])

  const { cartItems } = useSelector((item) => item.cart)

  return <div>{JSON.stringify(cartItems)}</div>
}

export default CartScreen
