import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';

export default function NotFound(props) {
  return (
    <div>
      <PageHeader>404 Not Found</PageHeader>
      <Row>
        <Col xs={12}><p>Requested page does not exist</p></Col>
      </Row>
    </div>
  );
}
