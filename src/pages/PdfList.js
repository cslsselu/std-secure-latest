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
  const handleClick = async (pdfId) => {
    try{
    const selectedPdf= pdfs.find((pdf)=>pdf.id === pdfId)
    const postCollection = collection(db, 'posts')
    const querySnapShot = await getDocs(postCollection)
    const existingPost = querySnapShot.docs.find(data =>data.data().articleId === selectedPdf.id)
    if(existingPost){
      sessionStorage.setItem('postId', existingPost.id)
      window.open('/view','_blank')
    }
    else{
    const newPostRef = await addDoc(postCollection,{
      title:selectedPdf.title,
      postText: selectedPdf.url,
      password:'',
      articleId:selectedPdf.id

    })
    sessionStorage.setItem('postId', newPostRef.id)
    window.open('/view', '_blank')
  }
}
  catch(e){
    console.log("Error",e)
  }
  };
  


  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>PDF Lists</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Article</th>
            <th>Author</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf, index) => (
            <tr key={pdf.id}>
              <td>{index + 1}</td>
              <td>{pdf.title}</td>
              <td>{pdf.Author}</td>
              <td>
                <Button
                  style={{ fontSize: '8px' }}
                 onClick={()=>{
                  handleClick(pdf.id)
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