import React, {useReducer, useState} from "react";
import {gigReducer, INITIAL_STATE} from "../../reducer/gigReducer";
import upload from "../../utils/upload";
import "./Add.scss";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import newRequest from "../../utils/axiosRequest";
import {useNavigate} from "react-router-dom";

const Add = () => {
    const [imgFile, setImgFile] = useState<any>();
    const [files, setFiles] = useState<any>();
    const [uploading, setUploading] = useState(false);

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (gig: any) => {
            return newRequest.post('/gigs', gig);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["myGigs"])
        }
    })

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleFeature = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_FEATURE",
            payload: e.target[0].value
        });
        e.target[0].value = '';
    };

    const handleUpload = async (e) => {
        setUploading(true);
        try {
            const cover = await upload(imgFile);
            const images = await upload(files)

            // const images = Promise.all(
            //     [...files].map(async file => { //...files needed because we got FileList of our multiple files chosen, so it converts this object to an arr
            //         return await upload(file);
            //     })
            // );
            setUploading(false);
            dispatch({
                type: 'ADD_IMAGES',
                payload: {cover, images}
            })
        } catch (e) {
            console.log(e)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(state);
        // navigate('/myGigs');
    };

    console.log(state)

    return (
        <div className="add">
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="info">
                        <label htmlFor="">Title</label>
                        <input
                            type="text"
                            name='title'
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handleChange}
                        />
                        <label htmlFor="">Category</label>
                        <select name="cat" id="cat" onChange={handleChange}>
                            <option value="design">Design</option>
                            <option value="web">Web Development</option>
                            <option value="animation">Animation</option>
                            <option value="music">Music</option>
                        </select>
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="">Cover Image</label>
                                <input type="file" onChange={e => setImgFile(e.target.files[0])}/>
                                <label htmlFor="">Upload Images</label>
                                <input type='file' multiple onChange={e => setFiles(e.target.files[0])}/>
                            </div>
                            <button onClick={handleUpload}>{uploading ? 'uploading' : 'Upload'}</button>
                        </div>
                        <label htmlFor="">Description</label>
                        <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols={0} rows={16}
                                  onChange={handleChange}>
                        </textarea>
                        <button onClick={handleSubmit}>Create</button>
                    </div>
                    <div className="details">
                        <label htmlFor="">Service Title</label>
                        <input type="text" name='shortTitle' placeholder="e.g. One-page web design" onChange={handleChange}/>
                        <label htmlFor="">Short Description</label>
                        <textarea name="shortDesc" onChange={handleChange} id="" placeholder="Short description of your service" cols={30} rows={10}></textarea>
                        <label htmlFor="">Delivery Time (e.g. 3 days)</label>
                        <input type="number" name='deliveryTime' onChange={handleChange} min={1}/>
                        <label htmlFor="">Revision Number</label>
                        <input type="number" min={1} name='revisionNumber' onChange={handleChange}/>
                        <label htmlFor="">Add Features</label>
                        <form action="" className='add' onSubmit={handleFeature}>
                            <input type="text" placeholder="e.g. page design" />
                            <button type='submit'>add</button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map(feature => (
                                <div className="item" key={feature}>
                                    <button onClick={() => dispatch({
                                        type: 'REMOVE_FEATURE',
                                        payload: feature
                                    })}>
                                        {feature}
                                        <span>X</span>
                                    </button>
                                </div>
                            ))
                         }
                        </div>
                        <label htmlFor="">Price</label>
                        <input type="number" min={1} name='price' onChange={handleChange}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;