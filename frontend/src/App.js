import './App.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Landing from '../src/screens/Landing'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from '../src/screens/ProductScreen'
import LoginScreen from '../src/screens/LoginScreen'

const App = () => {
  return (
    <Router>
      <>
        <Header />

        <main className='py-5'>
          <Container>
            <Route path='/' component={Landing} exact />
            <Route path='/login' component={LoginScreen} />

            <Route path='/product/:id' component={ProductScreen} />
          </Container>
        </main>
      </>
      <Footer />
    </Router>
  )
}

export default App
