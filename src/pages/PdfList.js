import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button, Table, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const pdfsCollection = collection(db, 'pdfs');
        const pdfData = await getDocs(pdfsCollection);
        const pdfsArray = pdfData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched PDFs:', pdfsArray);
        setPdfs(pdfsArray);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };
    fetchPdfs();
  }, []);

  
  const viewpdf = (pdfUrl, access) => {
    sessionStorage.setItem("url", pdfUrl);

    access = String(access).toLowerCase();
    if (access === "restricted") {
        window.open("/PdfViewerPage");
    } else if (access === "unrestricted") {   
        window.open(pdfUrl, '_blank');
    } else {
        console.error("Invalid access type provided.");
    }
};


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>PDF Lists</h2>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl
          type="text"
          placeholder="Search PDFs..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '200px', marginRight: '10px', borderRadius: '20px' }}
        />
        <Button
          variant="secondary"
          style={{ fontSize: '14px', padding: '6px 12px' }}
        >
          <i className="bi bi-search"></i>
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Article</th>
            <th>Author</th>
            <th>Access</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.filter(pdf => pdf.title.toLowerCase().includes(searchQuery)).map((pdf, index) => (
            <tr key={pdf.id}>
              <td>{index + 1}</td>
              <td>{pdf.title}</td>
              <td>{pdf.Author}</td>
              <td>{pdf.access}</td>
              <td>
                
                  <Button
                    style={{ fontSize: '8px' }}
                     onClick={() => viewpdf(pdf.url, pdf.access)}
                  >
                    View
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PdfList;
