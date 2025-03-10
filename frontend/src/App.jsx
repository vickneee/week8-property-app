import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage.jsx";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/properties/:id" element={<PropertyPage />} />
              <Route path="/edit-property/:id" element={<EditPropertyPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
