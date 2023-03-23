import Carousel from 'react-bootstrap/Carousel';

export const CarouselItems = () => {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-70 m-auto pb-50"
          src="https://media.screwfix.com/is/image/ae235/412XT_P?wid=414&hei=414&dpr=on"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-70 m-auto pb-50"
          src="https://media.screwfix.com/is/image/ae235/881KP_P?wid=414&hei=414&dpr=on"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-70 m-auto pb-50"
          src="https://media.screwfix.com/is/image/ae235/355JJ_P?wid=414&hei=414&dpr=on"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

