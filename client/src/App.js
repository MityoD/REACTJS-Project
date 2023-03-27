import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { CarouselSlide } from './components/Carousel/CarouselSlide';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { AddTool } from './components/Tools/AddTool'
import { AllTools } from './components/Tools/AllTools';
import { ToolDetails } from './components/Tools/ToolDetails';
import { EditTool } from './components/Tools/EditTool';
import { DeleteTool } from './components/Tools/DeleteTool';
import { Tabs } from './components/Products/Tabs';
import { AllProducts } from './components/Products/AllProducts';
import { AddProduct } from './components/Products/AddProduct';
import { ProductDetails } from './components/Products/ProductDetails';
import { EditProduct } from './components/Products/EditProduct';
import { DeleteProduct } from './components/Products/DeleteProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserCartTable } from './components/User/UserCartTable';
import { UserOrders } from './components/User/UserOrders';
import { Projects } from './components/Projects/Projects';

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Tabs />
                <Routes>
                    <Route path='/' element={<CarouselSlide />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/tools/add' element={<AddTool />} />
                    <Route path='/products/all' element={<AllProducts />} />
                    <Route path='/products/add' element={<AddProduct />} />
                    <Route path='/products/details/:productId' element={<ProductDetails />} />
                    <Route path='/products/edit/:productId' element={<EditProduct />} />
                    <Route path='/products/delete/:productId' element={<DeleteProduct />} />
                    <Route path='/products/panels' element={<AllProducts />} />
                    <Route path='/products/invertors' element={<AllProducts />} />
                    <Route path='/products/constructions' element={<AllProducts />} />
                    <Route path='/tools' element={<AllTools />} />
                    <Route path='/tools/my-tools' element={<AllTools />} />
                    <Route path='/tools/details/:toolId' element={<ToolDetails />} />
                    <Route path='/tools/edit/:toolId' element={<EditTool />} />
                    <Route path='/tools/delete/:toolId' element={<DeleteTool />} />
                    <Route path='/user-cart-table' element={<UserCartTable />} />
                    <Route path='/user-orders' element={<UserOrders />} />
                    <Route path='/projects' element={<Projects />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
