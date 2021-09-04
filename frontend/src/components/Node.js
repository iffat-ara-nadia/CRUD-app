import React from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

const Node = ({ node }) => {

    const deleteHandler = async(id) => {
    if(window.confirm('Are you sure?')) 
      
    console.log(await axios.delete(`/api/delete_node/${id}`))
       
    }

    const editHandler = async(node) => {
        if(node.read_only === '0') {
          const newNode = node.name;
          const res = await axios.put(`/api/update_node/${node.id}`, newNode);
          console.log(res);
        }   
        
    }

  return (
    <div>
    <Card className="my-3 card p-3 rounded">
      {/* <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top"/>
      </Link> */}

      <Card.Body>
      
         <Card.Title as="div">
           <strong>{node.name}</strong>
         </Card.Title>
      
        <Card.Text as="div">
          <div className="my-3">
            {node.description}
          </div>
        </Card.Text>

        <Card.Text as="h6">
            {`Parent: ${node.parent}`}
        </Card.Text>

        <Card.Text as="h6">
          {`Read-only: ${node.read_only}`}
        </Card.Text>

        <Button variant="success" style={{float: 'right'}} className="btn-sm" onClick={() => editHandler(node)}>
            Edit</Button>

        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(node.id)}>
           Delete</Button>
      </Card.Body> 
    </Card>
      
    </div>
  )
}

export default Node
