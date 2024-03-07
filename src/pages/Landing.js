import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import dotenv from "dotenv";
import { Carousel, Row, Col } from "react-bootstrap";
import Student from "../assests/library.jpg";
import Student1 from "../assests/mobile.jpg";
import Student2 from "../assests/study.jpg";
import Library from "../assests/SchoolLibrary.jpg";
import "./Landing.css"; // Import custom styles


function Landing({ isAuth }) {
  const [notices, setNotices] = useState();
  useEffect(() => {
    if (!isAuth) {
      toast.warning("Login to see the announcements!!!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isAuth]);

  return (
    <div className="landing-container">
      <Carousel>
        <Carousel.Item>
          <img src={Library} alt="Student" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Student1} alt="Student1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Student2} alt="Student2" />
        </Carousel.Item>
      </Carousel>

      <Row>
        <Col md={8} className="about-section">
          <h2>About the Site</h2>
          <p>
            This platform provides a unique educational environment where
            students can log in using Google Sign-In to access posts shared by
            their teachers. Teachers have the capability to create a variety of
            content, including posts, announcements, and homework assignments.
            They can also share e-books with their students, cleverly concealing
            the source URL of the document. A standout feature of this platform
            is its ability to allow only one student at a time to access a
            book, effectively disabling content download or offline viewing.
            This ensures the exclusive availability of resources and promotes
            disciplined usage. Another distinctive feature is the ability for
            teachers to embed Google Docs or online documents directly into
            their posts. This allows students to access the content without
            seeing the source link, thereby enhancing privacy and preventing
            unauthorized sharing. These features collectively make this platform
            a robust and secure tool for modern education.
          </p>
        </Col>
        <Col>
  <div className="notice-container">
    <h2 className="notice">Important Notice</h2>
    <p>
      <a
        href="https://docs.google.com/document/d/e/2PACX-1vSr6lJ6Wtg6anxw_hDzDTegfDdPnrQ7fIBQftZlNVMYkojhXKGvqgHiTtAKB3SFk9Snx0Af8hOtYeyB/pub?urp=gmail_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here to learn More.
      </a>
    </p>
  </div>
</Col>

      </Row>
    </div>
  );
}

export default Landing;
