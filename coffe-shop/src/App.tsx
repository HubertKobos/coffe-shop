import {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./client/components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offer from "./client/screens/Offer";
import Cart from "./client/screens/Cart";
import { CART_PAGE_PATH, MAIN_PAGE_PATH, MANAGEMENT_PAGE_PATH } from "./client/consts/consts";
import ManagementScreen from "./screens/ManagementScreen";
import ManagementLayout from "./management/components/ManagementLayout";
import { ADD_WORKER_PATH, CREATE_PRODUCT_PATH, EDIT_PRODUCT_PATH, EDIT_WORKER, LIST_PRODUCTS_PATH, LIST_WORKERS, LOGIN_PATH, REGISTER_PATH } from "./management/consts/managementconsts";
import CreateProductForm from "./management/components/forms/CreateProductForm";
import ListProductsTable from "./management/components/tables/ListProductsTable";
import AddWorkerForm from "./management/components/forms/AddWorkerForm";
import ListWorkersTable from "./management/components/tables/ListWorkersTable";
import LoginForm from "./management/components/forms/LoginForm";
import RegisterForm from "./management/components/forms/RegisterForm";
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../hooks";
import EditWorkerForm from "./management/components/forms/EditWorkerForm";
import EditProductForm from "./management/components/forms/EditProductForm";

function App() {
  const {token} = useAppSelector((state) => state.auth)
  
  const isAuthenticated = (): boolean =>{
    return token !== null && token !== ""
  }
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(isAuthenticated())

  
  useEffect(() =>{
    const isAuth: boolean = isAuthenticated()
    setIsUserAuthenticated(isAuth)
  }, [token, isUserAuthenticated])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes that doesn't require authentication */}
          <Route path={MAIN_PAGE_PATH} element={<Layout mainComponent={<Offer />} />} />
          <Route path={CART_PAGE_PATH} element={<Layout mainComponent={<Cart />} />} />
          <Route path={LOGIN_PATH} element={<LoginForm />} />
          <Route path={REGISTER_PATH} element={<RegisterForm />} />
          <Route path="*" element={<p>There is nothing here: 404 !</p>}></Route>

          {/* Management routes that require autentication */}
          <Route path={MANAGEMENT_PAGE_PATH} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen />} /></ProtectedRoute>} />
          <Route path={CREATE_PRODUCT_PATH} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<CreateProductForm />} />} /></ProtectedRoute>} />
          <Route path={LIST_PRODUCTS_PATH} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<ListProductsTable />} />} /></ProtectedRoute> } />
          <Route path={ADD_WORKER_PATH} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<AddWorkerForm />} />} /></ProtectedRoute> } />
          <Route path={LIST_WORKERS} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<ListWorkersTable />} />} /></ProtectedRoute> } />
          <Route path={EDIT_WORKER} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<EditWorkerForm />} />} /></ProtectedRoute> } />
          <Route path={EDIT_PRODUCT_PATH} element={<ProtectedRoute isAuthenticated={isUserAuthenticated}><ManagementLayout mainComponent={<ManagementScreen mainComponent={<EditProductForm />} />} /></ProtectedRoute> } />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;