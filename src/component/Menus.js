import React from 'react'
import { Col,Card,Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const Menus = ({menu}) => {
  console.log(menu)
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card style={{ width: '18rem' }} className="shadow">
      <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
      <Card.Body>
        <Card.Title>{menu.nama} ({menu.kode})</Card.Title>
        <Card.Text>
          Rp. {numberWithCommas(menu.harga)}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Menus