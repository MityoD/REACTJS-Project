import { Link } from "react-router-dom"
export const AccessDenied = () => {
    return (
        <div style={{textAlign: 'center' }}>
            <h2 style={{ textAlign: 'center', color: 'red' }}>Access denied!</h2>
            <Link style={{ color: "grey" ,textAlign: 'center' }} to={'/'}> Back to Home page</Link>
        </div>
    )
}