import Image from "next/image";

import { ServerUserReviews } from "../types";


interface ReviewItemsProps {
    reviews: ServerUserReviews;
    getItemDetails: (albumId: string, reviewId: string) => void;
    loadAlbumReviews: (albumId: string) => void;
};

function ReviewItems({
    reviews,
    getItemDetails,
    loadAlbumReviews,
} : ReviewItemsProps) {
    if (!reviews || Object.keys(reviews).length === 0) {
        return (
            <p className="reviews__title">No reviews yet. Write more reviews!</p>
        );
    };

    function loadAlbumDetails(albumId : string, reviewId : string) {
        getItemDetails(albumId, reviewId);
        loadAlbumReviews(albumId);
    };

    return (
        <section className="reviews">
            <h1 className="reviews__title">Reviews</h1>
            <ul className="reviews__content">
                {Object.keys(reviews).map((reviewId) => {
                    const { id, content, date, albumInfo } = reviews[reviewId];
                    const { id: albumId, images, name } = albumInfo;
                    return (
                        <li
                            key={id}
                            className="review__item"
                            onClick={() => loadAlbumDetails(albumId, id)}>
                            <div className="review__image">
                                <Image
                                    src={images[0].url}
                                    alt="album cover 300x300"
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="review__content">
                                <span className="review__album-name">{name}</span>
                                <span>Reviewed on: {date}</span>
                                <p>{content}</p>
                                <span className="content__instructions">Click to Read More</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );

};

export default ReviewItems;
