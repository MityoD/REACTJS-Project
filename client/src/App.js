// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import { CarouselSlide } from './components/Carousel/CarouselSlide';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { AddTool } from './components/Tools/AddTool'
import { AllTools } from './components/Tools/AllTools';
import { ToolDetails } from './components/Tools/ToolDetails';
import { EditTool } from './components/Tools/EditTool';
import { DeleteTool } from './components/Tools/DeleteTool';
import { ProductTabs } from './components/Products/ProductsTabs';
import { AllProducts } from './components/Products/AllProducts';
import { AddProduct } from './components/Products/AddProduct';
import { ProductDetails } from './components/Products/ProductDetails';
import { EditProduct } from './components/Products/EditProduct';

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <ProductTabs />
                <Routes>
                    <Route path='/' element={<CarouselSlide />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/tools/add' element={<AddTool />} />
                    {/* <Route path='/products' element={<ProductTabs />} /> */}
                    <Route path='/products/all' element={<AllProducts />} />
                    <Route path='/products/add' element={<AddProduct />} />
                    <Route path='/products/details/:productId' element={<ProductDetails />} />
                    <Route path='/products/edit/:productId' element={<EditProduct />} />
                    <Route path='/products/delete/:productId' element={<ProductDetails />} />
                    <Route path='/products/panels' element={<AllProducts />} />
                    <Route path='/products/invertors' element={<AllProducts />} />
                    <Route path='/products/constructions' element={<AllProducts />} />
                    <Route path='/tools' element={<AllTools />} />
                    <Route path='/tools/my-tools' element={<AllTools />} />
                    <Route path='/tools/details/:toolId' element={<ToolDetails />} />
                    <Route path='/tools/edit/:toolId' element={<EditTool />} />
                    <Route path='/tools/delete/:toolId' element={<DeleteTool />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
