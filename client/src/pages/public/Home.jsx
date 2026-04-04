import React from "react";
import BlogListsComponents from "../../components/ui/BlogListsComponents";

const Home = () => {
  
  return (
    <>
      <BlogListsComponents headContent={'Welcome to BlogForge'} title={'Your gateway to insightful articles and engaging stories.'} limit={6}/>
    </>
  );
};

export default Home;