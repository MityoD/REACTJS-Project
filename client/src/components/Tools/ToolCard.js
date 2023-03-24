import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ToolCard = ({
    _id,
    title,
    imageUrl,
    category,
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://media.screwfix.com/is/image/ae235/412XT_P?wid=414&hei=414&dpr=on" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary" href={`/details/${_id}`}>Details</Button>
            </Card.Body>
        </Card>
    );
}
