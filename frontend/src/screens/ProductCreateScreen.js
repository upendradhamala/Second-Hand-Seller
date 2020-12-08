import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState('')

  const [images, setImages] = useState('')
  const [uploading, setUploading] = useState(false)

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [expiresOn, setExpiresOn] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingCharge, setShippingCharge] = useState('')

  const [price, setPrice] = useState(0)
  const [negotiable, setNegotiable] = useState(false)

  const dispatch = useDispatch()
  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, data, success } = productCreate
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  useEffect(() => {
    // if(!userData){

    // }
    if (success || !userData) {
      history.push('/')
    }
  }, [history, success, userData])
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    const formData = new FormData()

    formData.append('images', file)
    console.log(images)
    console.log(formData)
    setUploading(true)
    console.log('last line')
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/uploads', formData, config)
      console.log('data is')
      console.log(data)
      setImages(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct(
        name,
        images,
        description,
        category,
        expiresOn,
        shippingAddress,
        shippingCharge,
        price,
        negotiable
      )
    )
  }
  return (
    <>
      <FormContainer>
        <h1>Upload Your Property</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name of the property </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter what product do you have'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='images'>
              <Form.Label>
                Images <small> *Upload at least 1 image</small>{' '}
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url or Upload Image'
                value={images}
                onChange={(e) => setImages(e.target.value)}
                required
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category like: electronics, books, Furniture.. '
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Describe your property </Form.Label>
              {/* <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control> */}

              <Form.Control
                as='textarea'
                placeholder='Enter description'
                row='3'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='expiresOn'>
              <Form.Label>How long is your product for sale? </Form.Label>
              <Form.Control
                type='date'
                value={expiresOn}
                onChange={(e) => setExpiresOn(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='shippingaddress'>
              <Form.Label>Shipping Address </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter where can you deliver'
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='shippingCharge'>
              <Form.Label>Shipping Charge </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter how much will you charge for shipping'
                value={shippingCharge}
                onChange={(e) => setShippingCharge(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='negotiable'>
              <Form.Check
                type='checkbox'
                label='Is the price Negotiable?'
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Upload your property
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
