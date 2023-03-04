import React from "react";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import newRequest from "../../utils/axiosRequest";
import "./Message.scss";

const Message = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();
    const {id} = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
            newRequest.get(`/messages/${id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (message: any) => {
            return newRequest.post(`/messages/`, message);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["messages"])
        }
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate({
            conversationId: id,
            desc: e.target[0].value
        });
        e.target[0].value = '';
    };

    return (
        <div className="message">
            <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
                {
                    isLoading ? 'loading' : error ? 'Something went wrong' : (
                    <div className="messages">
                        {
                            data.map((message: any) => (
                                <div className={message.userId === currentUser._id ? 'owner item' : 'item'} key={message._id}>
                                    <img
                                        src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                        alt=""
                                    />
                                    <p>
                                        {message.desc}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                )}
                <hr />
                <form className="write" onSubmit={handleSubmit}>
                    <textarea placeholder="write a message" />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;