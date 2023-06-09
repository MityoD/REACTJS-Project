import { Link } from "react-router-dom";

export const Footer = () => {

    return (
        <footer id="footer">
            <ul className="nav justify-content-center border-bottom mb-1">
                <li className="nav-item" ><Link style={{ color: "grey" }} to={'/'} className="nav-link px-2 text-body-secondary">Home</Link></li>
                <li className="nav-item"><Link style={{ color: "grey" }} to={'/products/all'} className="nav-link px-2 text-body-secondary">Products</Link></li>
                <li className="nav-item"><Link style={{ color: "grey" }} to={'/projects'} className="nav-link px-2 text-body-secondary">Projects</Link></li>
                <li className="nav-item"><Link style={{ color: "grey" }} to={'/tools'} className="nav-link px-2 text-body-secondary">Tools</Link></li>
            </ul>
            <p className="text-center text-body-secondary mb-1" style={{ color: "grey" }}>© 2023 Solar Solutions React-JS-Project</p>
        </footer >
    );
}


