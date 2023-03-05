import React, {useEffect, useState} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/axiosRequest";
import {useParams} from "react-router-dom";
import CheckOutForm from "../../components/checkOutForm/CheckOutForm";
import './Payment.scss';

const stripePromise = loadStripe("pk_test_51MiEqGGL62LpUIsMCmokk7B62OWyAmG4aTyJrY9HBJAdiTyME8fUj1Yma0i8GIv4HK3SbnJFjVQlDJIudlE4vEsv00JRMnKy7Z");

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            } catch (e) {
                console.log(e)
            }
        }
        makeRequest();
    }, []);

    const appearance: object = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='pay'>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            )}
        </div>
    );
};

export default Payment;