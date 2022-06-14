import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Constants from '../services/constant'
import { getData } from '../services/http.service'

import img1 from 'src/assets/images/img1.png'
import img2 from 'src/assets/images/img2.png'
import img3 from 'src/assets/images/img3.png'
import img4 from 'src/assets/images/img4.png'
import iconBadge from 'src/assets/icons/check-circle.png'

export default function SubCategories(props) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const selectedcategory = useSelector((state) => state.selectedcategory)
  const selected = useSelector((state) => state.selectedProduct)

  useEffect(() => {
    getCategoryProducts()
    dispatch({ type: 'set', selectedProduct: null })
  }, [])

  const getCategoryProducts = () => {
    getData(
      Constants.END_POINT.GET_CAT_PRODUCTS +
        `?user_id=74&category_id=${selectedcategory.id}&page=1&items_per_page=10&lang_code=en`,
    )
      .then((res) => {
        if (res.success) {
          dispatch({ type: 'set', products: res.products })
          dispatch({ type: 'set', varients: res.varients })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderType = () => {
    return products.map((item, i) => (
      <div
        key={item.product_id}
        onClick={() => dispatch({ type: 'set', selectedProduct: item.product_id })}
        className="type-card badgeItem m-1"
      >
        <div className={selected === i ? 'img-card-active img-card' : 'img-card '}>
          <img src={item?.main_pair?.detailed?.image_path} alt="" width="100%" />
        </div>{' '}
        <div className="paragraph2 text-medium mt-1 text-black">
          <div className="text-dark">{selectedcategory.name?.slice(0, 10)}</div>
          {item?.product && item.product.length > 15 ? item.product.slice(0, 15) : item.product}
        </div>
        <img
          className={selected === item.product_id ? 'imgBadge' : 'd-none'}
          src={iconBadge}
          alt=""
          width="32px"
        />
      </div>
    ))
  }

  return (
    <div>
      <div className="paragraph2 text-medium my-1 text-black">
        <span className="text-dark">Category: </span>
        {selectedcategory.name}
      </div>
      <div className="paragraph1 text-medium my-1 text-black">Please Select Your Sub-category</div>
      <div className="d-flex flex-wrap">{renderType()}</div>
      <br />
      <div
        className="large-btn"
        onClick={() => {
          selected && props.setTab(2)
        }}
      >
        Continue
      </div>
      <br />
    </div>
  )
}
