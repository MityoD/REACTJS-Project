import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import { getLastThree } from '../../services/toolService';
import { Link } from 'react-router-dom';

export const CarouselSlide = () => {
  const [tools, setTools] = useState([])
  useEffect(() => {
    getLastThree()
      .then(result => {
        setTools(result);
      });
  }, []);

  return (
    <Carousel pause="false" variant="dark" style={{ marginTop:'10%'}}>
      <Carousel.Item as={Link} to={`/tools/details/${tools[0]?._id}`}>
        <img 
          className="d-block w-40 m-auto"
          src={tools[0]?.imageUrl}
          alt="First slide"
        />
        <Carousel.Caption style={{backgroundColor:'lightgray', opacity:'0.7', width:'40%', margin:'auto', borderRadius:'25px', color:'black'}}>
          <h5>{tools[0]?.title}</h5>
          <p>{tools[0]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={Link} to={`/tools/details/${tools[1]?._id}`}>
        <img
          className="d-block w-40 m-auto"
          src={tools[1]?.imageUrl}
          alt="Second slide"
        />
        <Carousel.Caption style={{backgroundColor:'lightgray', opacity:'0.7', width:'40%', margin:'auto', borderRadius:'25px', color:'black'}}>
        <h5>{tools[1]?.title}</h5>
          <p>{tools[1]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={Link} to={`/tools/details/${tools[2]?._id}`}>
        <img
          className="d-block w-40 m-auto"
          src={tools[2]?.imageUrl}
          alt="Third slide"
        />
        <Carousel.Caption style={{backgroundColor:'lightgray', opacity:'0.7', width:'40%', margin:'auto', borderRadius:'25px', color:'black'}}>
        <h5>{tools[2]?.title}</h5>
          <p>{tools[2]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

