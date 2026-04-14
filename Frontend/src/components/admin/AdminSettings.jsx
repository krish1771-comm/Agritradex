import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const AdminSettings = () => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Admin Settings</h1>

      {success && (
        <Alert variant="success" className="mb-4">
          Settings saved successfully!
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">General Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSave}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Label>Platform Name</Form.Label>
                    <Form.Control type="text" defaultValue="AgriTradeX" />
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control type="email" defaultValue="support@agritradex.com" />
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Label>Contact Phone</Form.Label>
                    <Form.Control type="text" defaultValue="+91 98765 43210" />
                  </Col>
                  
                  <Col md={12} className="mb-3">
                    <Form.Label>Commission Rate (%)</Form.Label>
                    <Form.Control type="number" defaultValue="5" min="0" max="100" step="0.1" />
                    <Form.Text className="text-muted">
                      Commission charged to farmers on successful orders
                    </Form.Text>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Payment Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      label="Enable COD (Cash on Delivery)"
                      defaultChecked
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      label="Enable Online Payments"
                      defaultChecked
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      label="Enable UPI Payments"
                      defaultChecked
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Label>Minimum Order Amount for Free Delivery</Form.Label>
                    <Form.Control type="number" defaultValue="500" />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Security Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      label="Require Email Verification for New Users"
                      defaultChecked
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      label="Enable Two-Factor Authentication for Admins"
                      defaultChecked
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Label>Session Timeout (minutes)</Form.Label>
                    <Form.Control type="number" defaultValue="30" />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Save Changes</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Click save to apply all your settings changes.
              </p>
              <Button 
                variant="success" 
                className="w-100 mb-2"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  'Save All Settings'
                )}
              </Button>
              <Button variant="outline-secondary" className="w-100">
                Reset to Default
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;