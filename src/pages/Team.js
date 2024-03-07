import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Subin from "../assests/subinss.png";
import Niraj from "../assests/nirajPhoto.png";
import DrMinh from "../assests/Dr.Minh.png";
import Aone from "../assests/aone.png";
import Aakash from "../assests/aakash.png";
import Satyam from "../assests/satyam.png";

function TeamCard({ name, image, description }) {
  const [text, setText] = useState(false);

  const viewText = () => {
    setText(!text);
  };

  const shortDescription = description.slice(0, 60);
  const displayDescription = text ? description : shortDescription;

  return (
    <Card
      style={{
        width: "18rem",
        marginLeft: "10px",
        marginTop: "20px",
        marginBottom: "10px",
        border: "2px solid #000",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#f0f0f0", // Add background color here
      }}
    >
      <Card.Header style={{ padding: 0 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%",
            border: "2px solid #000",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {displayDescription}
          {description.length > 50 && (
            <span
              onClick={viewText}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {text ? " View Less" : " View More"}
            </span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

const Team = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Meet Our Team</h1>
      <Row>
        <Col>
          <TeamCard
            name="Dr. Minh Huynh"
            description="Dr Minh Huynh is a professor"
            image={DrMinh}
          />
        </Col>
        <Col>
          <TeamCard
            name="Aone Shrestha"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image={Aone}
          />
        </Col>
        <Col>
          <TeamCard
            name="Subin Bista"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image={Subin}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TeamCard
            name="Aakash Poudel"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image={Aakash}
          />
        </Col>
        <Col>
          <TeamCard
            name="Niraj Bhatta"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.r"
            image={Niraj}
          />
        </Col>
        <Col>
          <TeamCard
            name="Satyam Pathak"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image={Satyam}
          />
        </Col>
      </Row>
    </>
  );
};

export default Team;
