import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { Button, Table, FormControl } from 'react-bootstrap';

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPdfs = pdfs.filter(pdf => pdf.title.toLowerCase().includes(searchQuery));

  const handleClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
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
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {filteredPdfs.map((pdf, index) => (
            <tr key={pdf.id}>
              <td>{index + 1}</td>
              <td>{pdf.title}</td>
              <td>{pdf.Author}</td>
              <td>
                <Button
                  style={{ fontSize: '8px' }}
                  onClick={() => {
                    handleClick(pdf.url);
                  }}
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
