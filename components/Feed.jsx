"use client";
import { useState, useEffect } from "react";
import PunCard from "./PunCard.jsx";

const PunCardList = ({data, handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=> (
        <PunCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
  }
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.prevenDefault();
  };
  useEffect(() => {
    const fetchPuns = async ()=>{
      await fetch('api/pun');
      const data = await response.json();

      setPosts(data);

    }
    fetchPuns();
  }, []);

  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PunCardList
        data={posts}
        handleTagClick={()=>{}} />
    </section>
  );
};

export default Feed;
