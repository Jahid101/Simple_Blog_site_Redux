import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styling/blogs.css";

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=74da443369bd202a1f3146a275d761fc`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(blog_url)
            .then((response) => {
                dispatch(setBlogData(response.data));
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput]);



    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading">Loading...</h1> : ""}
            <div className="blogs">
                {blogs?.articles?.map((blog) => (
                    
                ))}

                {blogs?.totalArticles == 0 && (
                    <h1 className="no__blogs">
                        No blogs available 😞. Search something else to read blogs on the
                        greatest platform.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Blogs;
