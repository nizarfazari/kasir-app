import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../utils";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((i) => {
          return axios
            .delete(API_URL + "keranjangs/" + i.id)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("Erro : ", err);
            });
        });
      })
      .catch((err) => console.log("Erro : ", err));
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>Sukses Pesanan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary">Kembali</Button>
      </div>
    );
  }
}
