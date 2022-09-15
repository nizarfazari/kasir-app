import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils";

const Menus = ({ menu, insertBasket }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card variant="top" className="shadow" onClick={() => insertBasket(menu)}>
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
