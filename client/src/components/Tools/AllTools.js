import { ToolCard } from "./ToolCard"
import { useState, useEffect } from "react"
import { getAll } from "../../services/toolService";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { useAuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export const AllTools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        getAll('/tools')
            .then(result => {
                setTools(result)
            })
    }, []);
    const { userId, token } = useAuthContext();

    var data = useLocation().pathname.split('/').slice(-1).toString();

    return (
        <Container fluid={"sm"} >
            <Row className="g-0" style={{justifyContent:'space-between', rowGap:'30px'}}>
                {data === "my-tools"
                    ?
                    tools.filter(x => x._ownerId === userId).length !== 0
                        ?
                        tools.filter(x => x._ownerId === userId).map(x => <ToolCard key={x._id} {...x} isOwner={x._ownerId === userId} userId={userId} token={token} />)
                        : <h5>No Tools! <Link to={'/tools/add'}>Add</Link> one now.</h5>
                    : tools.map(x => <ToolCard key={x._id} {...x} isOwner={x._ownerId === userId} userId={userId} token={token} />)
                }
            </Row>
        </Container>
    )
}