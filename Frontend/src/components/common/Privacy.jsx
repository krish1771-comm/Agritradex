import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCheckCircle, FaShieldAlt, FaLock, FaEye, FaCookie } from 'react-icons/fa';

const Privacy = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 0, 0.8), rgba(0, 40, 0, 0.8)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="text-center py-5">
          <FaLock className="mb-4" size={60} />
          <h1 className="display-3 fw-bold mb-4">Privacy Policy</h1>
          <p className="lead mb-0 mx-auto fs-3" style={{ maxWidth: '800px' }}>
            How we collect, use, and protect your personal information
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
                    At AgriTradeX ("we," "our," "us"), we are committed to protecting your privacy and 
                    ensuring the security of your personal information. This Privacy Policy explains how 
                    we collect, use, disclose, and safeguard your information when you use our platform.
                  </p>
                  <p>
                    We adhere to the principles of transparency, security, and user control. By using 
                    AgriTradeX, you consent to the practices described in this policy.
                  </p>
                </section>

                {/* Information We Collect */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">2. Information We Collect</h3>
                  
                  <h5 className="fw-bold mb-3">2.1 Information You Provide</h5>
                  <ul className="mb-4">
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Account Information:</strong> Name, email address, phone number, password
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Profile Information:</strong> Profile picture, address, preferences
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>KYC Documents (Farmers):</strong> Aadhar number, PAN card, organic certifications
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Payment Information:</strong> Processed securely by our payment partners (we don't store card details)
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Communications:</strong> Messages, reviews, and feedback you send us
                    </li>
                  </ul>

                  <h5 className="fw-bold mb-3">2.2 Information Collected Automatically</h5>
                  <ul className="mb-4">
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Usage Data:</strong> Pages visited, time spent, actions taken
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Device Information:</strong> IP address, browser type, operating system
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Location Data:</strong> General location based on IP address
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Cookies:</strong> Small data files stored on your device
                    </li>
                  </ul>
                </section>

                {/* How We Use Your Information */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">3. How We Use Your Information</h3>
                  <p className="mb-3">We use your information to:</p>
                  <ul>
                    <li className="mb-2">✅ Provide, maintain, and improve our services</li>
                    <li className="mb-2">✅ Process transactions and send related information</li>
                    <li className="mb-2">✅ Verify farmer identities and organic certifications</li>
                    <li className="mb-2">✅ Communicate with you about orders, products, and updates</li>
                    <li className="mb-2">✅ Personalize your experience on the platform</li>
                    <li className="mb-2">✅ Detect and prevent fraud and abuse</li>
                    <li className="mb-2">✅ Comply with legal obligations</li>
                    <li className="mb-2">✅ Analyze usage patterns to improve our services</li>
                  </ul>
                </section>

                {/* Information Sharing */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">4. Information Sharing</h3>
                  <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
                  
                  <h5 className="fw-bold mb-3">4.1 To Facilitate Transactions</h5>
                  <ul className="mb-4">
                    <li className="mb-2">
                      <strong>Farmers:</strong> When you place an order, we share your delivery address and contact 
                      information with the farmer for fulfillment.
                    </li>
                    <li className="mb-2">
                      <strong>Buyers:</strong> When you list products, buyers can see your farm name, location, 
                      and contact information.
                    </li>
                  </ul>

                  <h5 className="fw-bold mb-3">4.2 Service Providers</h5>
                  <ul className="mb-4">
                    <li className="mb-2"><strong>Payment Processors:</strong> To process your payments securely</li>
                    <li className="mb-2"><strong>Delivery Partners:</strong> To facilitate order delivery</li>
                    <li className="mb-2"><strong>Analytics Providers:</strong> To help us understand platform usage</li>
                    <li className="mb-2"><strong>Cloud Storage:</strong> To store your data securely</li>
                  </ul>

                  <h5 className="fw-bold mb-3">4.3 Legal Requirements</h5>
                  <p>
                    We may disclose your information if required by law, regulation, or legal process, 
                    or to protect the rights, property, or safety of AgriTradeX, our users, or others.
                  </p>
                </section>

                {/* Data Security */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">5. Data Security</h3>
                  <p className="mb-3">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction:
                  </p>
                  <ul>
                    <li className="mb-2">🔒 SSL/TLS encryption for all data transmission</li>
                    <li className="mb-2">🔒 Encrypted storage of sensitive information</li>
                    <li className="mb-2">🔒 Regular security audits and updates</li>
                    <li className="mb-2">🔒 Access controls and authentication measures</li>
                    <li className="mb-2">🔒 Secure payment processing through PCI-DSS compliant partners</li>
                  </ul>
                  <p className="mt-3">
                    However, no method of transmission over the Internet is 100% secure. While we strive 
                    to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                {/* Your Rights */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">6. Your Rights</h3>
                  <p className="mb-3">You have the right to:</p>
                  <ul>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Access:</strong> Request a copy of your personal information
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Correction:</strong> Update or correct inaccurate information
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Deletion:</strong> Request deletion of your account and data
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Opt-out:</strong> Unsubscribe from marketing communications
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Data Portability:</strong> Receive your data in a structured format
                    </li>
                    <li className="mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <strong>Objection:</strong> Object to certain data processing
                    </li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, please contact us at privacy@agritradex.com.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">7. Cookies and Tracking Technologies</h3>
                  <FaCookie className="text-success mb-3" size={32} />
                  <p className="mb-3">
                    We use cookies and similar technologies to:
                  </p>
                  <ul>
                    <li className="mb-2">🍪 Keep you logged in</li>
                    <li className="mb-2">🍪 Remember your preferences</li>
                    <li className="mb-2">🍪 Understand how you use our platform</li>
                    <li className="mb-2">🍪 Improve your experience</li>
                  </ul>
                  <p className="mt-3">
                    You can control cookies through your browser settings. Disabling cookies may affect 
                    certain features of the platform.
                  </p>
                </section>

                {/* Third-Party Links */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">8. Third-Party Links</h3>
                  <p>
                    Our platform may contain links to third-party websites (payment processors, delivery partners, 
                    etc.). We are not responsible for the privacy practices or content of these sites. We encourage 
                    you to review their privacy policies.
                  </p>
                </section>

                {/* Children's Privacy */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">9. Children's Privacy</h3>
                  <p>
                    Our services are not directed to individuals under 18. We do not knowingly collect personal 
                    information from children. If we become aware that a child has provided us with personal 
                    information, we will take steps to delete it.
                  </p>
                </section>

                {/* Data Retention */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">10. Data Retention</h3>
                  <p>
                    We retain your information for as long as your account is active or as needed to provide 
                    services. After account deletion, we may retain certain information for legal compliance, 
                    fraud prevention, and legitimate business purposes.
                  </p>
                </section>

                {/* International Data Transfers */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">11. International Data Transfers</h3>
                  <p>
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your information in accordance 
                    with this policy.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">12. Changes to Privacy Policy</h3>
                  <p>
                    We may update this privacy policy from time to time. We will notify you of material changes 
                    by posting the new policy on this page and updating the effective date. Continued use of 
                    the platform after changes constitutes acceptance of the new policy.
                  </p>
                </section>

                {/* Contact Us */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">13. Contact Us</h3>
                  <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <Card className="bg-light border-0 p-4">
                    <p className="mb-2"><strong>Email:</strong> privacy@agritradex.com</p>
                    <p className="mb-2"><strong>Data Protection Officer:</strong> dpo@agritradex.com</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-0"><strong>Address:</strong> 123 Organic Farm Street, Agricultural Hub, Rajkot, Gujarat - 360001</p>
                  </Card>
                </section>

                {/* GDPR Compliance (for EU users) */}
                <section className="mb-5">
                  <h3 className="fw-bold mb-4">14. GDPR Compliance (For EU Users)</h3>
                  <p>
                    If you are located in the European Economic Area (EEA), you have additional rights under 
                    the General Data Protection Regulation (GDPR). Our legal basis for processing your data is:
                  </p>
                  <ul>
                    <li className="mb-2">Performance of a contract (when you use our services)</li>
                    <li className="mb-2">Legitimate interests (to improve our services)</li>
                    <li className="mb-2">Consent (for certain types of processing)</li>
                    <li className="mb-2">Legal obligations (compliance with laws)</li>
                  </ul>
                  <p className="mt-3">
                    To exercise your GDPR rights, contact us at gdpr@agritradex.com.
                  </p>
                </section>

                {/* Acceptance */}
                <section className="text-center border-top pt-5">
                  <FaShieldAlt className="text-success mb-3" size={48} />
                  <h4 className="fw-bold mb-3">Your privacy matters to us</h4>
                  <p className="text-muted mb-4">
                    We're committed to protecting your personal information and being transparent about how we use it.
                  </p>
                  <FaLeaf className="text-success" size={24} />
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Privacy;