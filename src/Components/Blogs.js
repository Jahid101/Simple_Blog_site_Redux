import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../features/userSlice';
import '../styling/blogs.css';
import Spinner from './Spinner';

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=83fb0ab9beff19c8a75ae61745fc2f74`;
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
    <div className='blog__page'>
      {loading ? (
        <center>
          <Spinner />
        </center>
      ) : (
        ''
      )}
      <div className='blogs d-flex flex-wrap justify-content-center'>
        {blogs?.articles?.map((blog) => (
          <div className='card m-3' style={{ width: '20rem' }}>
            <a className='blog' target='_blank' rel='noreferrer' href={blog.url}>
              <img height='150px' className='card-img-top' src={blog.image} alt='...' />
              <div className='card-body '>
                <small className='sourceName'>
                  <span>{blog.source.name}</span>
                  <p>{blog.publishedAt}</p>
                </small>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
              </div>
            </a>
          </div>
        ))}

        {blogs?.totalArticles === 0 && (
          <h1 className='no__blogs'>
            No blogs available. Search something else to read blogs on the greatest
            platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
