import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../common/Loader';

const ManageProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Organic Basmati Rice', farmer: 'Singh Farms', price: 120, stock: 50, status: 'approved' },
        { id: 2, name: 'Alphonso Mangoes', farmer: 'Patel Orchards', price: 350, stock: 25, status: 'approved' },
        { id: 3, name: 'Fresh Spinach', farmer: 'Green Valley', price: 30, stock: 100, status: 'pending' },
        { id: 4, name: 'Organic Turmeric', farmer: 'Spice Gardens', price: 180, stock: 15, status: 'rejected' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="py-5">
      <h1 className="display-6 fw-bold mb-4">Manage Products</h1>
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Product Name</th>
                <th>Farmer</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="fw-bold">{product.name}</td>
                  <td>{product.farmer}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td><Badge bg={product.status === 'approved' ? 'success' : product.status === 'pending' ? 'warning' : 'danger'}>{product.status}</Badge></td>
                  <td>
                    {product.status === 'pending' && (
                      <>
                        <Button variant="outline-success" size="sm" className="me-1"><FaCheck /></Button>
                        <Button variant="outline-danger" size="sm" className="me-1"><FaTimes /></Button>
                      </>
                    )}
                    <Button variant="outline-primary" size="sm" className="me-1"><FaEdit /></Button>
                    <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageProducts;