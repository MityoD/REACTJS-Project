// import { Button } from 'react-bootstrap';
import { ProjectCart } from './ProjectCart';
import { useState, useEffect } from "react"
import { getAll } from "../../services/toolService";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
// import { Button } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const { userId, token } = useAuthContext();

    useEffect(() => {
        getAll('/projects')
            .then(result => {
                setProjects(result)
            })
    }, []);
    
    var data = useLocation().pathname.split('/').slice(-1).toString();
    return (
        <Container fluid={"sm"} >
            <Row className="g-0" style={{ rowGap: '30px' }}>
                {data === "my-projects"
                    ?
                    projects.filter(x => x._ownerId === userId).length !== 0
                        ?
                        projects.filter(x => x._ownerId === userId).map(x => <ProjectCart key={x._id} {...x} isOwner={x._ownerId === userId} userId={userId} token={token} />)
                        : <h5>No Projects Yet! <Link to={'/projects-share'}>Share your project now!</Link></h5>
                    : projects.map(x => <ProjectCart key={x._id} {...x} isOwner={x._ownerId === userId} userId={userId} token={token} />)
                }
            </Row>
        </Container>





        // <Container fluid={"sm"} >
        //     <Row className="g-0" style={{justifyContent:'space-between', rowGap:'30px'}}>
        //         {projects.length === 0
        //             ?
        //             <h5>No Projects Yet! <Link to={'/projects-share'}>Share yours now!</Link></h5>
        //                 ?
        //                 projects.map(x => <ToolCard key={x._id} {...x} isOwner={x._ownerId === userId} userId={userId} token={token} />)
        //         }
        //     </Row>
        // </Container>





        // <div >




        //     <ProjectCart />
        // </div>
    );
}
