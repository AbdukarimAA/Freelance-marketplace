import React from 'react';
import './Reviews.scss';
import Review from "../review/Review";
import {useQuery} from "@tanstack/react-query";
import newRequest from "../../utils/axiosRequest";

const Reviews = ({gigId}) => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => newRequest.get(`/reviews/${gigId}`)
            .then((res) => {return res.data})
    });

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {
                isLoading ? 'loading' : error ? 'Something went wrong' :
                data.map(review => (<Review key={review.id} review={review}/>))
            }
        </div>
    );
};

export default Reviews;