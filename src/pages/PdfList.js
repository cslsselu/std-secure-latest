import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button, Table, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const pdfsCollection = collection(db, 'pdfs');
        const pdfData = await getDocs(pdfsCollection);
        const pdfsArray = pdfData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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


  const handleSearch = (event) => {
    const search = event.target.value;
    setNewSearch(search);
  };

  // Filtering PDFs based on search term
  const showSearchResults = newSearch
    ? pdfs.filter((pdf) =>
        pdf.title.toUpperCase().includes(newSearch.toUpperCase()) ||
        (pdf.Author && pdf.Author.toUpperCase().includes(newSearch.toUpperCase()))
      )
    : pdfs;

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>PDF Lists</h2>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl
          type="text"
          placeholder="Search PDFs..."
          value={newSearch}
          onChange={handleSearch}
          style={{ width: '200px', marginRight: '10px', borderRadius: '20px' }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Access</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {showSearchResults.map((pdf, index) => (
            <tr key={pdf.id}>
              <td>{index + 1}</td>
              <td>{pdf.title}</td>
              <td>{pdf.Author || ''}</td>
              <td>
                <Button
                  style={{ fontSize: '12px' }}
                  onClick={() => window.open(pdf.url, '_blank')}
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
