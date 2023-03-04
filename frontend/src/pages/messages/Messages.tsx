import React from "react";
import { Link } from "react-router-dom";
import newRequest from '../../utils/axiosRequest';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import moment from "moment";
import "./Messages.scss";

const Messages = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || null);
    const queryClient = useQueryClient();

    const { isLoading, error, data} = useQuery({
        queryKey: ['conversations'],
        queryFn: () => newRequest.get(`/conversations`)
            .then((res) => {return res.data})
    });

    const mutation = useMutation({
        mutationFn: (id: any) => {
            return newRequest.put(`/conversations/${id}`);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["conversations"])
        }
    })

    const handleRead = (id: string) => {
        mutation.mutate(id);
    };

    return (
        <div className="messages">
            {
                isLoading ? 'loading' : error ? 'Something went wrong' : (
                <div className="container">
                    <div className="title">
                        <h1>Messages</h1>
                    </div>
                    <table>
                        <tr>
                            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                            <th>Last Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {data.map((conv: any) => (
                            <tr className= {((currentUser.isSeller && !conv.readBySeller) || (!currentUser.isSeller && !conv.readByBuyer)) && "active"}
                                key={conv.id}
                            >
                                <td>{currentUser.isSeller ? conv.buyerId : conv.sellerId}</td>
                                <td>
                                    <Link to={`/message/${conv.id}`} className="link">
                                        {conv?.lastMessage?.substring(0, 100)}...
                                    </Link>
                                </td>
                                <td>{moment(conv.updatedAt).fromNow()}</td>
                                <td>
                                    {
                                        (currentUser.isSeller && !conv.readBySeller) || (!currentUser.isSeller && !conv.readBySeller &&
                                            (<button onClick={() => handleRead(conv.id)}>Mark as Read</button>)
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
};

export default Messages;