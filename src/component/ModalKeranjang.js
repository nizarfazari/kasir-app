import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { numberWithCommas } from "../utils";

const ModalKeranjang = (props) => {
  console.log(props.keranjangDetail.product);
  if (props.keranjangDetail) {
    return (
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.keranjangDetail.product.nama} (<strong>Rp. {numberWithCommas(props.keranjangDetail.product.harga)}</strong>)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga</Form.Label>
              <p>Rp. {numberWithCommas(props.totalHarga)}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button size="sm" onClick={() => props.plus()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <strong className="mx-2">{props.jumlah}</strong>
              <Button size="sm" onClick={() => props.minus()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan </Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Contoh : Lombok 2, Nasi di kurangin" value={props.keterangan} onChange={props.changeHandler} />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Simpan Pesanan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="reset" onClick={() => props.hapusPesanan(props.keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
