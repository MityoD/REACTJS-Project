import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Product } from './Product.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Navigation test', () => {
    test('Show title', () => {
        const title = 'test title'
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Product _id={'id'} title={title} />
                </AuthProvider>
            </BrowserRouter>
        )
        expect(screen.queryByText(title)).toBeInTheDocument()
    });
    test('Load details', async () => {
        const id = 'test_id'
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Product _id={id} />
                </AuthProvider>
            </BrowserRouter>
        )
        await userEvent.click(screen.queryByText('Details'));
        expect(global.window.location.pathname).toContain(`/products/details/${id}`)
    });
    test('Load edit', async () => {
        const id = 'test_id'
        const role = true
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Product _id={id} role={role} />
                </AuthProvider>
            </BrowserRouter>
        )
        await userEvent.click(screen.queryByText('Edit'));
        expect(global.window.location.pathname).toContain(`/products/edit/${id}`)
    });
    test('Load delete', async () => {
        const id = 'test_id'
        const role = true
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Product _id={id} role={role} />
                </AuthProvider>
            </BrowserRouter>
        )
        await userEvent.click(screen.queryByText('Delete'));
        expect(global.window.location.pathname).toContain(`/products/delete/${id}`)
    });    
});