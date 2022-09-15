import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas, API_URL } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TotalBayar = (props) => {
  const navigate = useNavigate();
  const totalBayar = props.keranjangs.reduce((a, b) => {
    return a + b.total_harga;
  }, 0);

  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      navigate("./sukses");
    });
  };
  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-2">
          <h4>
            Total harga : <strong className="float-end me-2">{numberWithCommas(totalBayar)}</strong>
          </h4>
          <Button variant="primary" className="ps-3 mb-2 mt-2 me-2" block size="lg" onClick={() => submitTotalBayar()}>
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TotalBayar;
