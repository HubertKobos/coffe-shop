import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ManagementHeader from './ManagementHeader'

type managementLayoutProps = {
    mainComponent: React.ReactNode
} 

export default function ManagementLayout({mainComponent}: managementLayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "95vh" }}>
    <Container fluid>
      <Row className="align-items-start">
          {/* <Col xs={3} lg={2}>{headerComponent}</Col> */}
          <Col xs={3} lg={2}><ManagementHeader /></Col>
        <Col xs={6} lg={8} className="text-center">{mainComponent}</Col>
        <Col xs={3} lg={2}>
          {/* <ProductAppendedToCart show={showNewAddedProductToast} lastProductNameInTheCart={lastProductName} />
          <ProductDeletedFromCart show={showDeletedProductToast} /> */}
        </Col>
      </Row>
    </Container>
  
</div>
  )
}
