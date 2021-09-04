import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Node from "../components/Node";
import axios from 'axios'

const HomeScreen = () => {
  const [nodes, setNodes] = useState([])

  useEffect(() => {
      const fetchNodes = async() => {
        const { data: nodes } = await axios.get('/api/get_tree')
        console.log(nodes)
          setNodes(nodes)
      }

      fetchNodes()

  }, [])

  const createNodeHandler = () => {
      console.log("new node added")
  }

  const downloadCSVHandler = () => {
    console.log("downloaded")
  }


  return (
    <>
    <main className="homescreen">
        
    <div>
    <h1 style={{textAlign:'center'}} className="mr-5"> All Nodes
    <Button style={{float: 'left'}}  variant="success" className="btn-sm ml-5" onClick={createNodeHandler}>Create New Node</Button>
    <Button style={{float: 'right'}} className="btn-sm" onClick={downloadCSVHandler}>Download</Button>   
    </h1>
    </div>
   
      <Row>
          { nodes.map( node => (
              <Col key={node.id} sm={12} md={6} lg={4}>
                  <Node node={node} />
              </Col>

          ))}
      </Row>
        
    </main>
    
    </>
  )
}

export default HomeScreen
