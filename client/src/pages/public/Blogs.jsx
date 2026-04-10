import React from "react";
import BlogListsComponents from "../../components/ui/BlogListsComponents";

const Blogs = () => {
  return (
    <>
      <BlogListsComponents headContent={'Our Blogs'} title={'Discover the latest news and updates from our blog.'} limit={6}/>
    </>
  );
};

export default Blogs;