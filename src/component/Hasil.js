import axios from "axios";
import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL, numberWithCommas } from "../utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);
    this.getData = props.getListKeranjang;
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menu) => {
    this.setState({
      showModal: true,
      keranjangDetail: menu,
      jumlah: menu.jumlah,
      keterangan: menu.keterangan,
      totalHarga: menu.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  plus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  minus = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (e) => {
    this.setState({
      keterangan: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleClose();
    const keranjang = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(`${API_URL}keranjangs/${this.state.keranjangDetail.id}`, keranjang)
      .then((res) => {
        this.getData();
        Swal.fire({
          title: "Update Pesanan",
          text: "sukses Update Pesanan" + keranjang.product.nama,
          icon: "success",
          button: false,
        });
      })
      .catch((err) => console.log(err));
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(`${API_URL}keranjangs/${id}`)
      .then((res) => {
        this.getData();
        Swal.fire({
          title: "Hapus Pesanan",
          text: "sukses Hapus Pesanan" + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
        });
      })
      .catch((err) => console.log(err));
  };
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
                <ListGroup.Item key={menu.id} onClick={() => this.handleShow(menu)}>
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
            <ModalKeranjang handleClose={this.handleClose} {...this.state} plus={this.plus} minus={this.minus} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
