"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
const CreatePun  = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post , setPost ] = useState({
    pun:'',
    tag:'',
  });

  const createPun = async (e) =>{
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/pun/new', {
        method: 'POST',
        body: JSON.stringify({
          pun: post.pun,
          userId: session?.user.id,
          tag: post.tag
        })
      })
      if (response.ok){
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally{
      setSubmitting(false)
    }
  }
  return (
    <Form 
       type="Create"
       post={post}
       setPost={setPost}
       submitting={submitting}
       handleSubmit={createPun}
    />
  )
}

export default CreatePun 