import React from "react"
import { Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import ProductAppendedToCart from "./toasts/ProductAppendedToCart";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import ProductDeletedFromCart from "./toasts/ProductDeleteFromCart";
import OrderCompletedModal from "./modals/OrderCompletedModal";

type LayoutProps = {
  mainComponent: React.ReactNode;
  headerComponent?: React.ReactNode;
}

export default function Layout({mainComponent, headerComponent}: LayoutProps) {
  const {showNewAddedProductToast, showDeletedProductToast, showOrderPlacedModal,  products} = useAppSelector((state: RootState) => state.cart)
  
  const lastProductName = products.length > 0 ? products[products.length - 1].name : ""

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "95vh" }}>
      {showOrderPlacedModal && <OrderCompletedModal/>}
    <Container fluid>
      <Row className="align-items-start">
        {headerComponent ? (
          <Col xs={3} lg={2}>{headerComponent}</Col>
        ) : (
          <Col xs={3} lg={2}><Header /></Col>
        )}
        <Col xs={6} lg={8} className="text-center">{mainComponent}</Col>
        <Col xs={3} lg={2}>
          <ProductAppendedToCart show={showNewAddedProductToast} lastProductNameInTheCart={lastProductName} />
          <ProductDeletedFromCart show={showDeletedProductToast} />
        </Col>
      </Row>
    </Container>
  
</div>
  )
}
