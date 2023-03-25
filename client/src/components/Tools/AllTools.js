import { ToolCard } from "./ToolCard"
import { useState, useEffect } from "react"
import { getAll } from "../../services/toolService";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { useAuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export const AllTools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        getAll('/tools')
            .then(result => {
                setTools(result)
            })
    }, []);
    const { userId } = useAuthContext();

    var data = useLocation().pathname.split('/').slice(-1).toString();

    return (
        // <div style={{display:'flex', justifyContent:'space-between'}} >
        // </div>
        <Container fluid>
            <Row xs={1} md={2} className="g-4">
                {data === "my-tools"
                    ? tools.filter(x=> x._ownerId == userId).map(x => <ToolCard key={x._id} {...x} isOwner = {x._ownerId === userId}  />)
                    : tools.map(x => <ToolCard key={x._id} {...x} isOwner = {x._ownerId === userId} />)
                }


            </Row>
        </Container>
    )
}