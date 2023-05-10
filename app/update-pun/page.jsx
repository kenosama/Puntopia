"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePun = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const punId = searchParams.get("id");
  const [post, setPost] = useState({ pun: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPunDetails = async () => {
      const response = await fetch(`/api/pun/${punId}`);
      const data = await response.json();
      console.log(data);
      setPost({
        pun: data.pun,
        tag: data.tag,
      });
     
    };

    if (punId) getPunDetails();
  }, [punId]);

  const updatePun = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!punId) return alert("Missing PuntId!");

    try {
      const response = await fetch(`/api/pun/${punId}`, {
        method: "PATCH",
        body: JSON.stringify({
          pun: post.pun,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePun}
    />
  );
};

export default UpdatePun;
