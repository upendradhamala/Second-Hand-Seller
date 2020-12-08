import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUser, getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from '../types/userConstants'
const UserUpdateScreen = ({ history, match }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [phone_no, setPhone_no] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  const userUpdate = useSelector((state) => state.userUpdate)
  const { success, loading, error } = userUpdate

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading: loadingDetails } = userDetails
  useEffect(() => {
    if (!userData || success) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch({ type: USER_DETAILS_RESET })
      
      if (userData && userData.isAdmin) {
        history.push('/admin/userlist')
      } else {
        history.push('/')
      }
    } else {
      
      if (!user?.name) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setAddress(user.address)
        setPhone_no(user?.contact?.phone_no)
        setEmail(user.email)
      }
    }
  }, [history, userData, user, success, dispatch, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          password,
          address,

          phone_no,
        })
      )
    }
  }
  return (
    <FormContainer>
      <h1>Details</h1>

      {loadingDetails && <Loader />}
      <Form onSubmit={submitHandler} className='mt-5 mb-2'>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>
            Email Address{' '}
            <small className='slanted'>
              {' '}
              *Be sure to enter your valid email address
            </small>
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label> Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='contact No'>
          <Form.Label>
            Mobile No{' '}
            <small className='slanted'>
              * Be sure to enter a correct 10 digit number starting with 9
            </small>
          </Form.Label>
          <Form.Control
            type='contact'
            placeholder='Enter Mobile No'
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {loading && <Loader />}

        <Button type='submit' variant='primary'>
          Update Profile
        </Button>
      </Form>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message variant='success'>Profile updated successfully</Message>
      )}
    </FormContainer>
  )
}

export default UserUpdateScreen
