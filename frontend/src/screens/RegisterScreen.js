import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { userData, loading, error } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userData) {
      history.push(redirect)
    }
  }, [history, userData, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(login(email, password))
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, contact, address))
    }
  }
  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='mt-5'>
        <Form.Group controlId='name'>
          <Form.Label>name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label> Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='contact No'>
          <Form.Label>Contact No </Form.Label>
          <Form.Control
            type='contact'
            placeholder='Enter Contact No'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>{' '}
      <Row className='py-3'>
        <Col>
          Already Have an Account?
          {/* here redirect is like storing previous request 
          if i am not logged in and then click on add to cart item then it will redirect me to 
          login page and if i am not registerd then i need to register and after registration i will be
          again redirected to shipping page  */}
          <Link
            className='underlined1 '
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            <span className='btn-primary'> Login</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
