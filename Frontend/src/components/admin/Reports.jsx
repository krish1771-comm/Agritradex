import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import Loader from '../common/Loader';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState({
    totalSales: 0,
    totalOrders: 0,
    topProducts: [],
    monthlySales: []
  });

  useEffect(() => {
    setTimeout(() => {
      setReports({
        totalSales: 456780,
        totalOrders: 892,
        topProducts: [
          { name: 'Organic Basmati Rice', sales: 245, revenue: 29400 },
          { name: 'Alphonso Mangoes', sales: 189, revenue: 66150 },
          { name: 'Organic Turmeric', sales: 156, revenue: 28080 },
        ],
        monthlySales: [
          { month: 'Jan', sales: 25000 },
          { month: 'Feb', sales: 32000 },
          { month: 'Mar', sales: 45000 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Reports & Analytics</h1>
      
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Total Sales</h5>
              <h2 className="text-success">₹{reports.totalSales.toLocaleString()}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="fw-bold">Total Orders</h5>
              <h2 className="text-success">{reports.totalOrders}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="fw-bold mb-0">Top Selling Products</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {reports.topProducts.map((p, i) => (
                <tr key={i}><td>{p.name}</td><td>{p.sales}</td><td>₹{p.revenue.toLocaleString()}</td></tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reports;