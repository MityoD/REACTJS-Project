import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import { getLastThree } from '../../services/toolService';
import { CarouselItem } from 'react-bootstrap';


export const CarouselSlide = () => {
  const [tools, setTools] = useState([])
  useEffect(() => {
    getLastThree()
      .then(result => {
        setTools(result);
      });
  }, []);

  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-40 m-auto"
          src={tools[0]?.imageUrl}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>{tools[0]?.title}</h5>
          <p>{tools[0]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-40 m-auto"
          src={tools[1]?.imageUrl}
          alt="Second slide"
        />
        <Carousel.Caption>
        <h5>{tools[1]?.title}</h5>
          <p>{tools[1]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-40 m-auto"
          src={tools[2]?.imageUrl}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h5>{tools[2]?.title}</h5>
          <p>{tools[2]?.price}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

