import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from './Context/AuthProvider';
import RouteGuard from './components/RouteGuard';

// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage.jsx";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties/:id" element={<PropertyPage />} />
              {/*<Route path="/add-property" element={<AddPropertyPage />} />*/}
              <Route path="/properties" element={<RouteGuard
                requireAuth={true}><AddPropertyPage/></RouteGuard>}/>
              {/*<Route path="/edit-property/:id" element={<EditPropertyPage />} />*/}
              <Route path="/edit-property/:id" element={<RouteGuard
                requireAuth={true}><EditPropertyPage/></RouteGuard>}/>
              {/*<Route path="/login" element={<LoginPage />} />*/}
              <Route path="/login" element={<RouteGuard
                requireAuth={false}><LoginPage/></RouteGuard>}/>
              {/*<Route path="/signup" element={<SignupPage />} />*/}
              <Route path="/signup" element={<RouteGuard
                requireAuth={false}><SignupPage/></RouteGuard>}/>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
  
  export default App;
