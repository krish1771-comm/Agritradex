import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCheckCircle, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const Terms = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef385e?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="text-center py-5">
          <FaShieldAlt className="mb-4" size={60} />
          <h1 className="display-3 fw-bold mb-4">Terms of Service</h1>
          <p className="lead mb-0 mx-auto fs-3" style={{ maxWidth: '800px' }}>
            Please read these terms carefully before using AgriTradeX
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                {/* Last Updated */}
                <div className="bg-light p-3 rounded-3 mb-5">
                  <p className="mb-0 text-center">
                    <strong>Last Updated:</strong> March 15, 2026
                  </p>
                </div>

                {/* Introduction */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">1. Introduction</h3>
                  <p className="mb-3">
                    Welcome to AgriTradeX ("Company," "we," "our," "us"). By accessing or using our platform, 
                    website, and services, you agree to be bound by these Terms of Service. If you do not agree 
                    to all the terms and conditions, you may not access or use our services.
                  </p>
                  <p>
                    AgriTradeX is an online marketplace that connects organic farmers directly with consumers. 
                    We provide a platform for farmers to list their certified organic products and for buyers 
                    to purchase fresh, chemical-free produce.
                  </p>
                </section>

                {/* Definitions */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">2. Definitions</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>"Platform"</strong> refers to the AgriTradeX website, mobile application, and related services.
                    </li>
                    <li className="mb-3">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>"Farmer"</strong> refers to any user who registers to sell organic products on our platform.
                    </li>
                    <li className="mb-3">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>"Buyer"</strong> refers to any user who purchases products on our platform.
                    </li>
                    <li className="mb-3">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>"Organic Products"</strong> refers to agricultural products certified as organic by recognized certifying bodies.
                    </li>
                    <li className="mb-3">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>"Content"</strong> refers to all text, images, data, information, and other materials posted on the platform.
                    </li>
                  </ul>
                </section>

                {/* User Accounts */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">3. User Accounts</h3>
                  <p className="mb-3">
                    To use certain features of our service, you must register for an account. You agree to:
                  </p>
                  <ul>
                    <li className="mb-2">Provide accurate, current, and complete information</li>
                    <li className="mb-2">Maintain and update your information to keep it accurate</li>
                    <li className="mb-2">Maintain the security of your account credentials</li>
                    <li className="mb-2">Notify us immediately of any unauthorized access</li>
                    <li className="mb-2">Be responsible for all activities under your account</li>
                  </ul>
                  <p className="mt-3">
                    Farmers must provide valid KYC documents (Aadhar, PAN) and organic certifications for verification.
                    We reserve the right to suspend or terminate accounts that violate these terms.
                  </p>
                </section>

                {/* Farmer Responsibilities */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">4. Farmer Responsibilities</h3>
                  <p className="mb-3">Farmers listing products on AgriTradeX must:</p>
                  <ul>
                    <li className="mb-2">Provide accurate product descriptions, prices, and images</li>
                    <li className="mb-2">Ensure all products are genuinely certified organic</li>
                    <li className="mb-2">Maintain product quality as described</li>
                    <li className="mb-2">Fulfill orders promptly within the promised timeframe</li>
                    <li className="mb-2">Communicate clearly with buyers about delivery</li>
                    <li className="mb-2">Comply with all applicable laws and regulations</li>
                    <li className="mb-2">Maintain valid organic certifications and provide updates</li>
                  </ul>
                  <p className="mt-3">
                    Failure to meet these responsibilities may result in account suspension, removal of listings, 
                    or permanent ban from the platform.
                  </p>
                </section>

                {/* Buyer Responsibilities */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">5. Buyer Responsibilities</h3>
                  <p className="mb-3">Buyers using AgriTradeX must:</p>
                  <ul>
                    <li className="mb-2">Provide accurate delivery information</li>
                    <li className="mb-2">Make timely payments for orders</li>
                    <li className="mb-2">Be available to receive deliveries</li>
                    <li className="mb-2">Not misuse the platform or engage in fraudulent activities</li>
                    <li className="mb-2">Provide honest reviews and feedback</li>
                    <li className="mb-2">Report any issues with orders promptly</li>
                  </ul>
                </section>

                {/* Organic Certification */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">6. Organic Certification</h3>
                  <p className="mb-3">
                    All farmers must provide valid organic certifications from recognized bodies such as:
                  </p>
                  <ul>
                    <li className="mb-2">India Organic (NPOP)</li>
                    <li className="mb-2">USDA Organic</li>
                    <li className="mb-2">EU Organic</li>
                    <li className="mb-2">Jaivik Bharat</li>
                    <li className="mb-2">Other government-recognized certifications</li>
                  </ul>
                  <p className="mt-3">
                    We reserve the right to verify certifications and conduct random quality checks. 
                    Misrepresentation of organic status will result in immediate account termination and legal action.
                  </p>
                </section>

                {/* Payments and Fees */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">7. Payments and Fees</h3>
                  <p className="mb-3">
                    <strong>For Farmers:</strong> AgriTradeX charges a commission of 5% on successful orders. 
                    This covers platform maintenance, payment processing, and customer support.
                  </p>
                  <p className="mb-3">
                    <strong>For Buyers:</strong> No additional fees. Buyers pay the listed product price plus 
                    applicable taxes and delivery charges (if any).
                  </p>
                  <p>
                    Payments are processed securely through our payment partners. Farmers receive payouts 
                    within 3-5 business days after successful delivery.
                  </p>
                </section>

                {/* Shipping and Delivery */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">8. Shipping and Delivery</h3>
                  <p className="mb-3">
                    Farmers are responsible for shipping products in a timely manner. Standard delivery times:
                  </p>
                  <ul>
                    <li className="mb-2">Same city: 24 hours</li>
                    <li className="mb-2">Same state: 24-48 hours</li>
                    <li className="mb-2">Inter-state: 48-72 hours</li>
                  </ul>
                  <p>
                    Buyers will receive tracking information once orders are shipped. Delivery times may vary 
                    based on location and weather conditions.
                  </p>
                </section>

                {/* Returns and Refunds */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">9. Returns and Refunds</h3>
                  <p className="mb-3">Buyers may request returns within 24 hours of delivery for:</p>
                  <ul>
                    <li className="mb-2">Damaged or spoiled products</li>
                    <li className="mb-2">Incorrect items received</li>
                    <li className="mb-2">Quality significantly below description</li>
                  </ul>
                  <p className="mt-3">
                    Refunds will be processed after verification and returned to the original payment method 
                    within 5-7 business days. Farmers may be charged for verified returns due to their fault.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">10. Intellectual Property</h3>
                  <p className="mb-3">
                    All content on AgriTradeX, including logos, designs, text, graphics, software, and the 
                    platform itself, is the property of AgriTradeX and is protected by intellectual property laws.
                  </p>
                  <p>
                    Users retain ownership of their content (product listings, reviews, etc.) but grant us a 
                    license to use, display, and distribute this content on the platform.
                  </p>
                </section>

                {/* Prohibited Activities */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">11. Prohibited Activities</h3>
                  <p className="mb-3">Users may not:</p>
                  <ul>
                    <li className="mb-2">List non-organic products as organic</li>
                    <li className="mb-2">Use false or misleading information</li>
                    <li className="mb-2">Harass other users or staff</li>
                    <li className="mb-2">Attempt to manipulate pricing or reviews</li>
                    <li className="mb-2">Use the platform for illegal purposes</li>
                    <li className="mb-2">Copy, modify, or distribute platform content without permission</li>
                    <li className="mb-2">Interfere with platform security or operations</li>
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">12. Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by law, AgriTradeX shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages arising out of or relating to your 
                    use of our services. Our total liability shall not exceed the amount paid by you through 
                    our platform in the past 12 months.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">13. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these terms at any time. We will notify users of material 
                    changes via email or through platform announcements. Continued use of the platform after 
                    changes constitutes acceptance of the new terms.
                  </p>
                </section>

                {/* Governing Law */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">14. Governing Law</h3>
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of India. 
                    Any disputes arising under these terms shall be subject to the exclusive jurisdiction 
                    of the courts in Rajkot, Gujarat.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">15. Contact Information</h3>
                  <p>For questions about these Terms, please contact us at:</p>
                  <Card className="bg-light border-0 p-4">
                    <p className="mb-2"><strong>Email:</strong> legal@agritradex.com</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-0"><strong>Address:</strong> 123 Organic Farm Street, Agricultural Hub, Rajkot, Gujarat - 360001</p>
                  </Card>
                </section>

                {/* Acceptance */}
                <section className="text-center border-top pt-5">
                  <FaHandshake className="text-success mb-3" size={48} />
                  <h4 className="fw-bold mb-3">By using AgriTradeX, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</h4>
                  <p className="text-muted">
                    Together, we're building a healthier, more sustainable future through organic farming.
                  </p>
                  <FaLeaf className="text-success mt-3" size={24} />
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Terms;