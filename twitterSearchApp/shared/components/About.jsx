import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';

const text = `
This is an example React application that talks to a custom RESTful API to
search Twitter for tweets that contain certain text.
`;

export default function About() {
  return (
    <div>
      <PageHeader>About</PageHeader>
      <Row>
        <Col xs={12}><p>{text}</p></Col>
      </Row>
    </div>
  );
}
