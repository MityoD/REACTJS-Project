import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOne } from '../../services/toolService';

export const ToolDetails = () => {
    const { toolId } = useParams();
    const [tool, setTool] = useState({});
    const { userId } = useAuthContext();
    const userIsOwner = userId === tool._ownerId;
    useEffect(() => {
        getOne('tools', toolId).then(x => { setTool(x) });
    }, [toolId]);

    return (
        // style={{ width: '18rem', margin: '40px auto', padding:'0', display:'flex' }}
        <Card style={{ width: '80%',margin:'auto', display: 'flex',flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Img variant="top" src={tool.imageUrl} />
            <Card.Body>
                <Card.Title>{tool.title}</Card.Title>
                <Card.Text>
                    Category: {tool.category}
                </Card.Text>
                <Card.Text>
                    Type: {tool.type}
                </Card.Text>
                <Card.Text>
                    Description: {tool.summary}
                </Card.Text>
                <Card.Text>
                    Price: {tool.price}
                </Card.Text>
                {userIsOwner &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/tools/edit/${tool._id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/tools/delete/${tool._id}`}>Delete</Button>
                    </>
                }
            </Card.Body>
        </Card>
    );
}