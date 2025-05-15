import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import AboutPage from "./Pages/AboutPage";
import NotFound from "./Pages/NotFoundPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CustomerPage from "./Pages/CustomerPage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import AddProductPage from "./Pages/AddProductPage.jsx";
import UserState from "../usercontext.jsx";
import Layout from "./layout";
import ImageSlider from "./Pages/SingleProductPage.jsx";
import Daybook from "./Pages/daybook.jsx";
import ToDoJobs from "./Pages/todoJobs.jsx";
import AddCustomer from "./Pages/AddCustomerPage.jsx";
import SingleCustomerPage from "./Pages/SingleCustomerPage.jsx";
import ProtectedRoute from "../protectedRoutes.jsx";
function App() {
  return (
    <>
      <UserState>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={"/about"} element={<AboutPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route
              path={"/products"}
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/customers"}
              element={
                <ProtectedRoute>
                  <CustomerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/products/add"}
              element={
                <ProtectedRoute>
                  <AddProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/product/:id"}
              element={
                <ProtectedRoute>
                  <ImageSlider />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/daybook"}
              element={
                <ProtectedRoute>
                  <Daybook />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/jobs"}
              element={
                <ProtectedRoute>
                  <ToDoJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/customer/add"}
              element={
                <ProtectedRoute>
                  <AddCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/customers/:id"}
              element={
                <ProtectedRoute>
                  <SingleCustomerPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserState>
    </>
  );
}

export default App;
