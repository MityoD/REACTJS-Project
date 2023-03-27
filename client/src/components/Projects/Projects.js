import Figure from 'react-bootstrap/Figure';

export const Projects = () => {
    return (
        <div >
            <Figure style={{ marginLeft:'50%', transform:'translate(-50%)'}}  >
                <Figure.Caption>
                    Project page is under development...
                </Figure.Caption>
                <hr/>
                <Figure.Image style={{borderRadius:'25px', overflow:'hidden'}}
                    width={630}
                    height={390}
                    alt="171x1z0"
                    src="https://www.indovance.com/knowledge-center/wp-content/uploads/2020/03/Picture3.jpg"
                />
            </Figure>
        </div>
    );
}