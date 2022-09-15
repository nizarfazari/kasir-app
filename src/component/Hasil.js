import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menu) => {
              return (
                <ListGroup.Item key={menu.id}>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menu.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5> {menu.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menu.product.harga)}</p>
                    </Col>
                    <Col>
                      <p>Rp. {numberWithCommas(menu.total_harga)}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
