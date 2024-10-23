import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreatePost from "./pages/CreateEditPost";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import Landing from "./pages/Landing";
import Posts from "./pages/Posts";
import ViewPost from "./pages/ViewPost";
import ViewLogs from "./pages/ViewLogs";
import "./auth/create-admin";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs, updateDoc,doc} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Admin from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import Team from "./pages/Team";
import PdfList from "./pages/PdfList";
import ArticleList from "./pages/ArticleList";
import CategoryPdfList from "./pages/categoryPdfList";
import Logger from '../src/pages/Logger'
import PdfViewerPage from "./pages/PdfViewerPage";
import { useLocation } from "react-router-dom";
import DropdownComponent from '../src/Dropdown';
import CategoryDropdownComponent from '../src/CategoryDropdown';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const postId = sessionStorage.getItem("postId") ; 
  // const aceessTimer = 1000*5; // 20 sec
  const navigate = useNavigate();
  const AUTO_LOGOUT_TIME = 60 * 30 * 1000;
  
  const [isAuth, setIsAuth] = useState(false);// 30 min
  // const [isAuth, setIsAuth] = useState(() => {
  //   const storedAuth = localStorage.getItem("isAuth");
  //   return storedAuth ? JSON.parse(storedAuth) : false;
  // });

  useEffect(() => {
    // Function to handle authentication state change
    const handleAuthChange = (user) => {
      if (user && localStorage.getItem("isAuth")) {
        // User is authenticated
        setIsAuth(true);
        localStorage.setItem("isAuth", JSON.stringify(true));
      } else {
        // User is not authenticated
        setIsAuth(false);
        localStorage.setItem("isAuth", JSON.stringify(false));
       // Unauthorized()
      }
    };

    // Set up Firebase auth listener
    const unsubscribe = auth.onAuthStateChanged(handleAuthChange);

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);


  console.log(isAuth)
  console.log("########################")
  console.log("########################")
  console.log(auth)


  const [isAdmin, setisAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const uid = localStorage.getItem("uid") || "";
  const email = localStorage.getItem("email") || "";
  const [loading, setLoading] = useState(true); // Add loading state`
  const [isCollapsed, setIsCollapsed] = useState(true);
  // console.log("##########Approved or not ? #################")
  // console.log(isApproved)

  // const[active, setActive] = useState(false);
  // const postCollectionRef = collection(db, process.env.REACT_APP_ADMIN_DATABSE);
  // const postRef = doc(postCollectionRef, postId);

  
  // const updateIsActive =async ()=>{
    
  //   setActive(false);
  //   await updateDoc(postRef, {
      
  //     isActive: false
     
  //   });
  //   console.log("SUBIN ROCKSSSS")
  // }
  

  // const fetchGroups = async () => {
  //   try {
  //     const pdfsCollection = collection(db, 'pdfs');
  //     const pdfData = await getDocs(pdfsCollection);
  //     const pdfsArray = pdfData.docs.map((doc) => ({
  //       id: doc.id,
  //       group: doc.data().group,
  //     }));
  //     return pdfsArray;
  //   } catch (error) {
  //     console.error('Error fetching PDF groups:', error);
  //     return [];
  //   }
  // };

  const Unauthorized = () => {
    toast.error("Unauthorized!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const Unverified = () => {
    setIsAuth(false);
    localStorage.clear();

    toast.error(
      "USER NOT APPROVED!!! Please contact with the admin to get the approval !!!",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        theme: "colored",
      }
    );
  };
  const Footer =()=>{
    const location = useLocation()
    const isViewPost = location.pathname.includes('/view')
    return(
      <>
      {
        isViewPost ? null :(
          <footer className="footer">
          <p>Copyright © SRD 2024</p>
        </footer>
        )
      }
      </>
    )
  }


  const signUserOut = async () => {
    try {
      await Logger({ eventType: 'logout' }); //asyc because this call need to wait until the log is tracked
  
       signOut(auth);
  
      localStorage.clear();
      //sessionStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userDocRef = collection(db, process.env.REACT_APP_ADMIN_USERS);
        const getUserDocs = await getDocs(userDocRef);
        let userData = null;
  
        getUserDocs.forEach((doc) => {
          if (doc.data().email === email) {
            userData = doc.data();
          }
        });
  
        if (userData) {
          setisAdmin(userData.isAdmin);
          setIsApproved(userData.isApproved);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
  
    if (email) {
      checkUserStatus();
    } else {
      setLoading(false);
    }
  }, [email]);
  

  // useEffect(() => {
  //   let timer;
  //   const userSession = () => {
  //     timer = setTimeout(() => updateIsActive(), aceessTimer);
  //   };
  //   userSession(); 
  //   return () => {
  //     clearTimeout(timer); 
  //   };
  // }, [aceessTimer, updateIsActive]);
  
  // useEffect(() => {
  //   const worker = new Worker(URL.createObjectURL(new Blob([`
  //     self.onmessage = function(e) {
  //       setTimeout(function() {
  //         self.postMessage('Time is up!');
  //       }, e.data);
  //     }
  //   `], { type: 'text/javascript' })));

  //   worker.onmessage = function(e) {
  //     console.log(e.data); // 'Time is up!'
  //     updateIsActive(); // Call your function when the timer is up
  //   };

  //   worker.postMessage(aceessTimer); // Start the timer

  //   return () => {
  //     worker.terminate(); // Terminate the worker when the component unmounts
  //   };
  // }, [aceessTimer, updateIsActive]);

  useEffect(() => {
    let timer;
    const handleUserActivity = () => {
      clearTimeout(timer);
      timer = setTimeout(() => signUserOut(), AUTO_LOGOUT_TIME);
    };
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, [AUTO_LOGOUT_TIME]);

  if (loading) {
    return <div></div>; // Render loading state while checking admin status
  }

  {return (
    <>
   
      <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{position:'fixed'}}>
        <div className="container-fluid">
          <div className="logo" style={{ position: "absolute", top: "1px" }}>
            <img
              src="/secure.png"
              alt="Secure Logo"
              height="50px"
              width="50px"
            />
          </div>
          <Link
            className="navbar-brand"
            to="/"
            style={{ marginLeft: "55px", color: "orange" }}
          >
            E-Lib
          </Link>

          <button
            className="navbar-toggler"
            style={{ paddingBottom: "20px" }}
            type="button"
            onClick={handleToggle}
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`bg-dark collapse navbar-collapse${
              isCollapsed ? "" : " show"
            }`}
            id="navbarNavAltMarkup"
          >
            <div onClick={handleToggle} className="bg-dark navbar-nav ms-auto">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
              {/* <Link to='/team' className="nav-link" >
               Team
              </Link> */}
{/* 
              <Link className="nav-link">
        <DropdownComponent />
      </Link>

      <Link className="nav-link">
        <CategoryDropdownComponent />
      </Link> */}

      

              {/* <Link to='/pdfList' className="nav-link" >

               Article List


              </Link> */}

              <Link to="/posts" className="nav-link"> Featured Article </Link>

              {isAuth ? (
                <>
                  {isApproved && (
                    <>
                      {isAdmin && (
                        <>
                          <Link to="/createpost" className="nav-link">
                            Create Post
                          </Link>
                          <Link to="/admindashboard" className="nav-link">
                            Admin
                          </Link>
                        </>
                      )}
                    </>
                  )}

              <Link to='/team' className="nav-link" >
               Team
              </Link>

              
              <Link className="nav-link">
        <DropdownComponent />
      </Link>

      <Link className="nav-link">
        <CategoryDropdownComponent />

        
      </Link>

                <Link to='/articleList' className="nav-link" >

                Article List


                </Link>

                {/* {isAuth ? ( */}
                  <Link
                    className="nav-link"
                    onClick={signUserOut}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Link>

                  
                </>
              ) : (
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        hideProgressBar={true}
        closeOnClick={true}
      />
      {isAuth ? (
        <>
          {isApproved ? (
            <Routes>
              <Route path="/login" element={<PdfViewerPage setIsAuth={setIsAuth} />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/" element={<Landing isAuth={isAuth} />} />
              <Route path="/team" element={<Team isAuth={isAuth}/>}/>
              <Route path = '/pdfList' element={<PdfList isAuth={isAuth}/>}/>
              <Route path = '/articleList' element={<ArticleList isAuth={isAuth}/>}/>
              <Route path = '/categorypdfList' element={<CategoryPdfList isAuth={isAuth}/>}/>
              <Route
                path="/posts"
                element={<Posts isAuth={isAuth} isAdmin={isAdmin} />}
              />
              <Route path="/view" element={<ViewPost />} />
              <Route path="/viewLogs" element={<ViewLogs />} />
              {isAdmin ? (
                <>
                  <Route
                    path="/createpost"
                    element={<CreatePost isAuth={isAuth} />}
                  />
                  <Route
                    path="/admindashboard"
                    element={<Admin isAuth={isAuth} />}
                  />
                </>
              ) : (
                <Route path="/createpost" element={<Unauthorized />} />
              )}
            </Routes>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Landing isAuth={isAuth} />
                    <Unverified />
                  </>
                }
              />
               <Route
                path="/team"
                element={
                  <>
                    <Team isAuth={isAuth} />
                    <Unverified />
                  </>
                }
              />
               <Route path = '/pdfList' element={<><PdfList isAuth={isAuth}/> <Unverified/> </>}/>
               {/* <Route path="/pdfviewerpage" element={<><PdfList isAuth={isAuth}/> <Unverified/> </>} /> */}
              <Route
                path="/posts" 
                element={
                  <>
                    <Navigate to="/login" /> <Unverified />
                  </>
                }
              />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Landing isAuth={isAuth} />} />
          <Route path="/team" element={<Team isAuth={isAuth} />} />
          <Route path='/pdfList' element={<PdfList isAuth={isAuth}/>}/>
          <Route path = '/categorypdfList' element={<CategoryPdfList isAuth={isAuth}/>}/>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path='/PdfViewerPage' element={<PdfViewerPage isAuth={isAuth}/> } />
          <Route path="/posts" element={<Posts isAuth={isAuth} isAdmin={isAdmin} />}/>
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      )}
      <Footer/>
  

    </>
  )
     };
}


export default App;
