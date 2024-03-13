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
import Anish from "../assests/anish2.png";
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
      }}
      border="secondary"
    >
      <Card.Header>
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "100%" }}
        >
          <img
            src={image}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            className="rounded-circle"
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Image />
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
            description="Dr Minh Huynh is a professor and the Director of the Project."
            image={DrMinh}
          />
        </Col>
        <Col>
          <TeamCard
            name="Aone Shrestha"
            description="I am a senior in computer science at Southeastern Louisiana University, where I am pursuing a scientific concentration that covers topics such as data structures, algorithms, operating systems, and software engineering. I have completed several courses and projects that have enhanced my knowledge and proficiency in various programming languages and technologies, such as Java, JavaScript, TypeScript, React, ASP.NET Core, Blazor, Entity Framework, and Git. I am eager to continue learning and growing in my field, and to explore the possibilities and challenges of AI and IoT."
            image={Aone}
          />
        </Col>
        <Col>
          <TeamCard
            name="Subin Bista"
            description="I am Sophomore Cs major at Southeastern Louisiana University. I am enthusiastic about learning new technology and currently, I am working as a Research Assistant and Math Tutor at the Southeastern Louisiana University. I am known for hard working and always longing to expand my knowledge.

            Learn More About me : https://subeen9-github-io.vercel.app/"
            image={Subin}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TeamCard
            name="Aakash Poudel"
            description="I am a Computer Science Sophomore at Southeastern. I love interacting with technology. "
            image={Aakash}
          />
        </Col>
        <Col>
          <TeamCard
            name="Niraj Bhatta"
            description="I'm a Junior pursuing a degree in Computer Science with a passion for embracing cutting-edge technologies. I thrive on collaboration and believe that teamwork fuels innovation. I'm eager to learn and grow in the dynamic world of technology. Let's connect and explore exciting opportunities together!"
            image={Niraj}
          />
        </Col>
        <Col>
          <TeamCard
            name="Satyam Pathak"
            description="I'm a sophomore at Southeastern Louisiana University, majoring in Computer Science with a minor in Mathematics. I have a strong interest in technology, particularly in the area of web application development. Currently, I'm involved in several roles on campus: I work as a Teaching Assistant in the Computer Science Department, a Student Developer at the Internet Resource Center, and a Tutor in the Mathematics Department. These positions allow me to explore my interests in both technology and education, contributing to my growth in these fields."
            image={Satyam}
          />
        </Col>
      </Row>
      <TeamCard
        name="Anish Malla"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        image={Anish}
      />
    </>
  );
};
export default Team;
