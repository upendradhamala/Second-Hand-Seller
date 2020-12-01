import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Carousel from 'react-bootstrap/Carousel'
// import {PRODUCT_DETAILS_RESET} from '../types/productConstants'
import { listProductDetails } from '../actions/productActions'
const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match.params.id, dispatch])
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  return (
    <>
      <Link to='/' className='btn btn-success my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='row'>
            <Col md={6} className='image-area'>
              <Carousel>
                {product.images.map((image) => (
                  <Carousel.Item key={image._id}>
                    <Image
                      className='d-block w-100'
                      src={image.image1}
                      alt='First slide'
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col className='borderaround' md={6}>
              <p className='details'>
                <i className='fas fa-info'></i> General Details
              </p>

              <Row>
                <Col className='product' md={3} sm={4} xs={3}>
                  <ul>
                    <li> Product Id:</li>
                    <li> Product:</li>
                    <li> Posted On:</li>
                    <li>Post Expires:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={9} sm={8} xs={9}>
                  <ul>
                    <li>{product._id}</li>
                    <li> {product.name}</li>
                    <li>2077-2-3</li>
                    <li>2077-4-6</li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Seller Details
              </p>

              <Row>
                <Col className='product' md={6} sm={6} xs={3}>
                  <ul>
                    <li> Sold By:</li>

                    <li> Email:</li>
                    <li> Address:</li>
                    <li>Phone No:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={9}>
                  <ul>
                    <li>{product?.seller?.name}</li>

                    <li>
                      {' '}
                      <a
                        href={`mailto:${product?.seller?.email}`}
                        target='_blank'
                      >
                        {product?.seller?.email}
                      </a>
                    </li>
                    <li>{product?.seller?.address}</li>
                    <li>
                      {product?.seller?.phoneNo?.mobile}{' '}
                      <span>
                        {product?.seller?.phoneNo?.isVerified ? (
                          <span>
                            <i className='fas fa-check-circle'></i>
                            <span className='underlined'>verified</span>
                          </span>
                        ) : (
                          <span>
                            <i className='fas fa-times'></i>
                            <span className='underlined'>unverified</span>
                          </span>
                        )}{' '}
                      </span>
                    </li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Pricing Details
              </p>
              <Row>
                <Col className='product' md={6} sm={6} xs={3}>
                  <ul>
                    <li>Total Price:</li>
                    {product?.Cost?.negotiable && <li>Negotiable:</li>}
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={9}>
                  <ul>
                    <li> Rs {product?.Cost?.price}</li>
                    {product?.Cost?.negotiable && <li>Yes</li>}
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='borderaround mt-5' md={10} sm={12} xs={12}>
              <p className='details'>
                <i className='fas fa-info'></i> Description
              </p>
              <p>{product.description}</p>
            </Col>
          </Row>

          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Delivery Information
              </p>
              <Row>
                <Col className='product' md={6} sm={6} xs={5}>
                  <ul>
                    <li>Delivery Area:</li>
                    <li>Delivery Charge:</li>
                    <li>Delivery Time:</li>

                    {/* {product?.Cost?.negotiable && <li>Negotiable:</li>} */}
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={7}>
                  <ul>
                    <li>{product?.shippingAddress?.address} </li>
                    <li> {product?.shippingAddress?.shippingCharge}</li>
                    <li> Within 3 days</li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
