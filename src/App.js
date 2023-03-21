import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Post from "./components/Post";
import { getPost } from "./backend/backend";
import ErrorDlg from "./components/ErrorDlg";

function App() {
  const POST_ID = "63dbaf9412e514c68d95c4ba";

  const [post, setPost] = useState({
    title: "...Loading",
    author: {
      username: "...Loading",
    },
    content: [],
  });

  const [errors, setErrors] = useState([]);

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  async function fetchPost(id) {
    try {
      const response = await getPost(id);
      const { success, post, errors } = response;
      if (!success) {
        setErrors(errors);
      } else {
        setPost(post);
      }
    } catch (err) {
      setErrors([{ msg: err.message }]);
    }
  }

  useEffect(() => {
    fetchPost(POST_ID);
  }, []);

  useEffect(() => {
    if (errors.length === 0) return;
    setOpen(true);
  }, [errors]);

  return (
    <div className="App">
      <Post
        post={post}
        submit={() => {}}
        updateBlock={() => {}}
        errors={[]}
        setPost={() => {}}
        token={""}
        edit={false}
      />

      <ErrorDlg
        open={open}
        close={close}
        error={errors.length > 0 ? errors[0] : { msg: "" }}
      />
    </div>
  );
}

export default App;
