import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import dotenv from "dotenv";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import Student from "../assests/library.jpg";
import Student1 from "../assests/mobile.jpg";
import Student2 from "../assests/study.jpg";
import Library from '../assests/SchoolLibrary.jpg'

dotenv.config();
const API_Point = '';

function Landing({ isAuth }) {
  const[notices, setNotices] = useState();
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
    <div

    // style={{
    //   backgroundImage: `url(${process.env.REACT_APP_BG_IMAGE})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    //   width: "100%",
    //   height: "100%",
    //   position: "absolute",
    //   zIndex: "-1",
    // }}
    >
      <Carousel style={{ width: "100%" }}>
        <Carousel.Item style={{ height: "550px", width: "100%" }}>
          <img
            src={Library}
            alt="Student"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ height: "550px", width: "100%" }}>
          <img
            src={Student1}
            alt="Student1"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ height: "550px", width: "100%" }}>
          <img
            src={Student2}
            alt="Student2"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
    
      <Row>
        <Col>
        <h2 style={{marginLeft:'10px'}}>About the Site</h2>
         <p style={{marginLeft:'10px', marginBottom:'20px'}}>
          This platform provides a unique educational environment where students
          can log in using Google Sign-In to access posts shared by their
          teachers. Teachers have the capability to create a variety of content,
          including posts, announcements, and homework assignments. They can
          also share e-books with their students, cleverly concealing the source
          URL of the document. A standout feature of this platform is its
          ability to allow only one student at a time to access a book,
          effectively disabling content download or offline viewing. This
          ensures the exclusive availability of resources and promotes
          disciplined usage. Another distinctive feature is the ability for
          teachers to embed Google Docs or online documents directly into their
          posts. This allows students to access the content without seeing the
          source link, thereby enhancing privacy and preventing unauthorized
          sharing. These features collectively make this platform a robust and
          secure tool for modern education.
        </p>
</Col>
        <Col>
        <h2 style={{color:'red', textAlign:'center'}}>
          Important Notice
        </h2>
        <p style={{ textAlign: 'center' }}>
            <a href="https://docs.google.com/document/d/e/2PACX-1vSr6lJ6Wtg6anxw_hDzDTegfDdPnrQ7fIBQftZlNVMYkojhXKGvqgHiTtAKB3SFk9Snx0Af8hOtYeyB/pub?urp=gmail_link" target="_blank" rel="noopener noreferrer" style={{color:'blue', textDecoration:'underline'}}>
              Click here to learn More.
              </a>
          </p>
        </Col>
      </Row>
     
 
         
    </div>
  );
}

export default Landing;
