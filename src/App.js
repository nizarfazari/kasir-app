import React, { Component } from "react";
import { NavbarComponent, ListCategories, Hasil, Menus } from "./component";
import { Row, Col } from "react-bootstrap";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}products`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { menus } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Row>
            <ListCategories />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.forEach((menu) => {
                    <Menus menu={menu} key={menu.id} />;
                  })}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </div>
      </div>
    );
  }
}
