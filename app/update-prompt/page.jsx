"use client";

import { useState, useEffect } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [updating, setUpdating] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);

      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setUpdating(true);
    if (!promptId) return alert("Missing PromptId!");
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      updating={updating}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
