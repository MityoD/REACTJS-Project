import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOne } from '../../services/toolService';

export const ToolDetails = () => {
    const { toolId } = useParams();
    const [tool, setTool] = useState({});
    const { userId, isAuthenticated } = useAuthContext();
    const userIsOwner = userId === tool._ownerId;
    console.log(userId);
    console.log(isAuthenticated)
    useEffect(() => {
        getOne(toolId).then(x => { setTool(x) });
    }, [toolId]);
    
    return (
        <Card style={{ width: '18rem', margin: '40px auto' }}>
            <Card.Img variant="top" src="https://media.screwfix.com/is/image/ae235/412XT_P?wid=414&hei=414&dpr=on" />
            <Card.Body>
                <Card.Title>{tool.title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                {userIsOwner && 
                <>
                    <Button variant="primary" href={`/edit/${tool._id}`}>Edit</Button>
                    <Button variant="primary" href={`/delete/${tool._id}`}>Delete</Button>
                </>
                }
                {/* <Button variant="primary" href={`/details/${_id}`}>Details</Button> */}
            </Card.Body>
        </Card>
    );
}