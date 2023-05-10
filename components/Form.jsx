import React from "react";
import Link from "next/link.js";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient"> {type} Post </span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share your funny Pun with the world, and let your humor be teased...
      </p>

      <form 
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your Funny Pun
            </span>

          <textarea 
            value={post.prompt}
            onChange={(e)=>setPost({...post, pun: e.target.value})}
            placeholder="Write your text here"
            required
            className="form_textarea"
            ></textarea>
        </label>
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag {' '} <span className="font-normal">(#funny, #darkhumor)</span>
            </span>

          <input 
            value={post.tag}
            onChange={(e)=>setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
            />
        </label>
        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link
          href="/"
          className="text-sm text-gray-500" 
          >Cancel</Link>
          <button type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-gray-50">
            {submitting? `${type}...` : type}
          </button>
          
        </div>
      </form>
    </section>
  );
};

export default Form;
 