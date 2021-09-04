import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from "react-router-dom"

import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
    <main>
      <Container>
        <Switch>
          <Route path="/" exact component={HomeScreen}/>
        </Switch>

      </Container>
    </main>
   
    </>
    
  )
}

export default App



