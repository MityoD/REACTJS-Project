import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { getOne } from '../../services/toolService';

export const ProjectDetails = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const { userId, isAuthenticated } = useAuthContext();
    const userIsOwner = userId === project._ownerId;
    useEffect(() => {
        getOne('projects', projectId).then(x => { setProject(x) });
    }, [projectId]);

    return (
        <Card style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Card.Img variant="top" src={project.imageUrl} style={{ width: '45%' }} />
            <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>
                    Type: {project.type}
                </Card.Text>
                <Card.Text>
                    Location: {project.location}
                </Card.Text>
                <Card.Text>
                    Period: {project.period}
                </Card.Text>
                <Card.Text>
                    Summary: {project.summary}
                </Card.Text>
                {(userIsOwner && isAuthenticated) &&
                    <>
                        <Button className='m-1' variant="secondary" as={Link} to={`/project/edit/${project._id}`}>Edit</Button>
                        <Button variant="danger" as={Link} to={`/project/delete/${project._id}`}>Delete</Button>
                    </>
                }
            </Card.Body>

        </Card>
    );
}