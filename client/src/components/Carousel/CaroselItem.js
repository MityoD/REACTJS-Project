import Carousel from 'react-bootstrap/Carousel';


export const CarouselItem = (
    title,
    imageUrl,
    _id,
    price
) => {

    return (
        <Carousel.Item>
            <img
                className="d-block w-70 m-auto pb-50"
                src={imageUrl}
                alt="First slide"
            />
            <Carousel.Caption>
                <h5>{title}</h5>
                <p>{price}</p>
            </Carousel.Caption>
        </Carousel.Item>
    )
}