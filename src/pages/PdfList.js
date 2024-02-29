import React, { useEffect, useState, useMemo } from 'react';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Button, Table } from 'react-bootstrap';
import { Document, pdfjs } from 'react-pdf';



const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        // Firebase Firestore query
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
  }, [db]);

  return (
    <div>
        <p>There should be list of pdf..</p>
      {pdfs.map((pdf) => (
        <div key={pdf.id}>
          <a href={pdf.url} target="_blank" rel="noopener noreferrer">{pdf.title}</a>
        </div>
      ))}
    </div>
  );
};

export default PdfList;
