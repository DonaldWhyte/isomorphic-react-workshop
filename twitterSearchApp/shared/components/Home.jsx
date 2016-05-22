import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <PageHeader>Welcome!</PageHeader>
      <Row>
        <Col xs={12}><p>Just a home page. Nothing to see here.</p></Col>
      </Row>
    </div>
  );
}
