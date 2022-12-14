import React, { Component } from "react";
import { ListCategories, Hasil, Menus } from "../component";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}products?category.nama=${this.state.categorySelected}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => console.log(err));
  }

  // componentDidUpdate(prevState) {
  //   console.log(prevState.keranjangs);
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(`${API_URL}keranjangs`)
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => console.log(err));
  };

  insertBasket = (value) => {
    axios
      .get(`${API_URL}keranjangs?product.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(`${API_URL}keranjangs`, keranjang)
            .then((res) => {
              this.getListKeranjang();
              Swal.fire({
                title: "Sukses",
                text: "sukses masuk keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((err) => console.log(err));
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(`${API_URL}keranjangs/${res.data[0].id}`, keranjang)
            .then((res) => {
              this.getListKeranjang();
              Swal.fire({
                title: "Sukses",
                text: "sukses masuk keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menu: [],
    });

    axios
      .get(`${API_URL}products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { menus, categorySelected, keranjangs } = this.state;
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categorySelected={categorySelected} />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => {
                    return <Menus menu={menu} key={menu.id} insertBasket={this.insertBasket} />;
                  })}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} getListKeranjang={this.getListKeranjang} />
          </Row>
        </Container>
      </div>
    );
  }
}
