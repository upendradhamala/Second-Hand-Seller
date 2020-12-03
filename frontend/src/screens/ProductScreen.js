import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Carousel from 'react-bootstrap/Carousel'
import { listProductDetails } from '../actions/productActions'
import { sendEmail } from '../actions/userActions'

const ProductScreen = ({ match, history }) => {
  const [text, setText] = useState('')
  const [sendMail, setSendMail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const dispatch = useDispatch()
  const emailReducer = useSelector((state) => state.emailReducer)
  const {
    loading: loadingEmail,
    error: errorEmail,
    data: dataEmail,
  } = emailReducer
  // console.log(responses)
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match.params.id, dispatch])

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const emailSubmit = (e) => {
    e.preventDefault()
    setEmailSent(true)

    dispatch(
      sendEmail(
        product?.seller?.email,
        text,
        userData?.name,
        userData?.address,
        product?.name
      )
    )

    setText('')

    setSendMail(false)
    setTimeout(() => {
      setEmailSent(false)
    }, 10000)
  }
  const sendEMAIL = () => {
    setSendMail(true)
  }
  const cancelHandler = () => {
    setSendMail(false)
  }
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
          <Row className='row mb-2'>
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
                <Col className='product' md={4} sm={4} xs={4}>
                  <ul>
                    <li> Product Id:</li>
                    <li> Product:</li>
                    <li> Posted On:</li>
                    <li>Post Expires:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={8} sm={8} xs={8}>
                  <ul>
                    <li>{product._id}</li>
                    <li> {product.name}</li>
                    <li>{product?.createdAt?.substring(0, 10)}</li>
                    <li>{product?.expiresOn?.substring(0, 10)}</li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          {loadingEmail && <Loader />}
          {errorEmail && <Message variant='danger'>{errorEmail}</Message>}
          {/* {console.log(dataEmail?.response)} */}
          {dataEmail && emailSent && (
            <Message variant='success'>{dataEmail.response}</Message>
          )}
          {sendMail && userData && (
            <Row id='email' className='mt-5'>
              <Col md={10} sm={12} className='formAround'>
                <Form onSubmit={emailSubmit}>
                  <div className='text-area1'>
                    <span className='text-area2'>Send Email</span>

                    <p className='text-area3'>
                      Get in touch with {product?.seller?.name}
                    </p>
                  </div>
                  <Row>
                    <Col md={4} sm={4} xs={4}>
                      <ul className='marginshift'>
                        <p>{''}</p>
                        <br />
                        <li className='mt-2'>Your Name:</li>
                        <li>Your Email:</li>
                        <li>Your Phone No:</li>
                        <li>Your Message:</li>
                      </ul>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                      <p className='cross'>
                        <button
                          onClick={cancelHandler}
                          className=' cancel m-auto '
                        >
                          {' '}
                          <i className='far fa-window-close'></i>
                        </button>
                      </p>
                      <li>upendra</li>
                      <li>dhamalaupendra@gmail.com</li>
                      <li>9864421289</li>
                      <li>
                        <textarea
                          style={{ maxWidth: '100%', borderRadius: '5px' }}
                          id='w3review'
                          name='text'
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows='8'
                          cols='55'
                          required
                        />
                      </li>
                    </Col>
                    <button className='button ' type='submit'>
                      Send Email
                    </button>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
          <Row>
            <Col className='borderaround mt-5' md={10}>
              <p className='details'>
                <i className='fas fa-info'></i> Seller Details
              </p>

              <Row className='mb-2'>
                <Col className='product' md={5} sm={4} xs={1}>
                  <ul>
                    <li> Name:</li>

                    <li> Email:</li>
                    <li> Address:</li>
                    <li>Phone:</li>
                    <li></li>
                  </ul>
                </Col>
                <Col md={7} sm={8} xs={11}>
                  <ul>
                    <li>{product?.seller?.name}</li>

                    <li>
                      {product?.seller?.email}{' '}
                      <span>
                        <button
                          className='emailbutton btn-success'
                          onClick={sendEMAIL}
                        >
                          Send Email
                        </button>
                      </span>
                    </li>
                    <li>{product?.seller?.address}</li>
                    <li>
                      {product?.seller?.phoneNo?.mobile}{' '}
                      <span>
                        {product?.seller?.phoneNo?.isVerified ? (
                          <span>
                            <i className='fas fa-mobile-alt'></i>
                            <span className='underlined'>verified</span>
                          </span>
                        ) : (
                          <span>
                            <i className='fas fa-mobile-alt'></i>
                            <span className='underlined'>unverified</span>
                          </span>
                        )}{' '}
                      </span>
                    </li>
                    <li></li>
                  </ul>
                </Col>
              </Row>
              {sendMail && !userData && (
                <Message variant='danger'>
                  You need to be logged in to use this feature.{' '}
                  <span>
                    <Link to='/login'>Log In</Link> to Continue
                  </span>
                </Message>
              )}
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col className='borderaround mt-5 ' md={10}>
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
                  </ul>
                </Col>
                <Col md={6} sm={6} xs={7}>
                  <ul>
                    <li>{product?.shippingAddress?.address} </li>
                    <li>
                      {' '}
                      Rs {''}
                      {product?.shippingAddress?.shippingCharge}
                    </li>
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
