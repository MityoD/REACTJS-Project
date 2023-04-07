import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
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
import { Tabs } from './components/Products/Tabs';
import { AllProducts } from './components/Products/AllProducts';
import { AddProduct } from './components/Products/AddProduct';
import { ProductDetails } from './components/Products/ProductDetails';
import { EditProduct } from './components/Products/EditProduct';
import { UserCartTable } from './components/User/UserCartTable';
import { UserOrders } from './components/User/UserOrders';
import { Projects } from './components/Projects/Projects';
import { ToastComponent } from './components/Toast/ToastComponent';
import { Footer } from './components/Footer/Footer';
import { AllOrdersDetails } from './components/User/AllOrdersDetails';
import { ShareProject } from './components/Projects/ShareProject';
import { ProjectDetails } from './components/Projects/ProjectDetails';
import { DeleteComponent } from './components/Shared/DeleteComponent';
import { EditProject } from './components/Projects/EditProject';


function App() {

    return (
        <AuthProvider>
            <div id='main-element'>
                <div>
                    <Navigation />
                    <ToastComponent />
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
                        <Route path='/products/delete/:itemId' element={<DeleteComponent  _item={'products'}/>} />
                        <Route path='/products/panels' element={<AllProducts />} />
                        <Route path='/products/invertors' element={<AllProducts />} />
                        <Route path='/products/constructions' element={<AllProducts />} />
                        <Route path='/tools' element={<AllTools />} />
                        <Route path='/tools/my-tools' element={<AllTools />} />
                        <Route path='/tools/details/:toolId' element={<ToolDetails />} />
                        <Route path='/tools/edit/:toolId' element={<EditTool />} />
                        <Route path='/tools/delete/:itemId' element={<DeleteComponent  _item={'tools'}/>} />
                        <Route path='/user-cart-table' element={<UserCartTable />} />
                        <Route path='/user-orders' element={<UserOrders />} />
                        <Route path='/projects' element={<Projects />} />\
                        <Route path='/project/details/:projectId' element={<ProjectDetails />} />
                        <Route path='/project/delete/:itemId' element={<DeleteComponent  _item={'projects'}/>} />
                        <Route path='/projects/share' element={<ShareProject />} />
                        <Route path='/projects/my-projects' element={<Projects />} />
                        <Route path='/project/edit/:projectId' element={<EditProject />} />
                        <Route path='/received-orders' element={<AllOrdersDetails />} />

                    </Routes>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
