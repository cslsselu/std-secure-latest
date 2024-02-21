import React, { useEffect, useState } from 'react';
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const pdfsCollection = collection(db, 'pdfs');
        const pdfData = await getDocs(pdfsCollection);
        const pdfsArray = pdfData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched PDFs:", pdfsArray);
        setPdfs(pdfsArray);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
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
