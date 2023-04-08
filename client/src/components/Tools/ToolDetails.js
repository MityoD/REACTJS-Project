import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOne } from '../../services/toolService';
import { addItemToCart } from '../../services/orderService';

export const ToolDetails = () => {
    const { toolId } = useParams();
    const [tool, setTool] = useState({});
    const { userId, isAuthenticated, token, displayToast } = useAuthContext();
    const userIsOwner = userId === tool._ownerId;
    useEffect(() => {
        getOne('tools', toolId).then(x => { setTool(x) });
    }, [toolId]);

    const addItemHandler = async () => {
        const result = await addItemToCart('tools', userId, toolId, token);
        if (result.status === 'existing') {
            displayToast({ title: "This tool is already in your cart!", show: true, bg: 'warning' })
        } else {
            displayToast({ title: "Tool added to cart!", show: true, bg: 'success' })
        }
    }


    return (
        <Card style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Img style={{ width: '50%' }} variant="top" src={tool.imageUrl} />
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
                {(isAuthenticated && !userIsOwner) &&
                    <Button style={{ width: '100%' }} variant="success" onClick={addItemHandler}>Add to Cart</Button>
                }

            </Card.Body>
        </Card>
    );
}