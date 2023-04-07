import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "../../hooks/useForm";
import { getOne } from '../../services/toolService';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { edit } from '../../services/toolService';
import { AccessDenied } from '../Shared/AccessDenied';

export const EditProject = () => {
    const { token, displayToast, userId } = useAuthContext();
    const navigate = useNavigate();
    const { projectId } = useParams();

    const onEditProductSubmit = async () => {
        try {
            await edit('projects', projectId, values, token);
            displayToast({ title: "Project edited successfully!", show: true, bg: 'success' });
            navigate(`/project/details/${projectId}`);
        } catch (error) {
            displayToast({ title: "Something went wrong!", show: true, bg: 'danger' });
        }
    };

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        title: '',
        type: '',
        location: '',
        imageUrl: '',
        period: '',
        summary: '',
    }, onEditProductSubmit);

    useEffect(() => {
        getOne('projects', projectId).then(x => { changeValues(x) });
    }, [projectId]);// eslint-disable-line react-hooks/exhaustive-deps
    
    return (

        <>
            {userId === values._ownerId ?

                <div style={{ width: '40%', margin: '50px auto' }}>
                    <Form method="PUT" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={changeHandler}
                                placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="type"
                                name="type"
                                value={values.type}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={values.location}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control
                                required
                                type="Url"
                                name="imageUrl"
                                placeholder="imageUrl"
                                value={values.imageUrl}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="period">
                            <Form.Label>Period</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="period"
                                placeholder="Period"
                                value={values.period}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="summary"
                                placeholder="summary"
                                value={values.summary}
                                onChange={changeHandler} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit project
                        </Button>
                    </Form>
                </div>
                :
                <AccessDenied />
            }
        </>

    );
}