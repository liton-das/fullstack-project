import React, { useRef, useState } from "react";
import { useCreateBlogMutation } from "../../services/api/api";
import Loading from "../../components/ui/Loading";
import Inputs from "../../components/ui/Inputs";
import Button from "../../components/ui/Button";
import showMsg from "../../utils/getMessage";
import { Navigate } from "react-router";
const INITIAL_VALUE = {
  title: "",
  content: "",
  tags: "",
  isActive: false,
};
const CreateBlog = () => {
  const [createBlog, { data, isLoading }] = useCreateBlogMutation();
  const [inputField, setInputField] = useState({ ...INITIAL_VALUE });
  const [slug, setSlug] = useState("");
  const [image, setImg] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const currentImg = useRef();
  // handle change for get input value
  const handleChange = (e) => {
    setInputField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    
  };
  // conver title to slug
  React.useEffect(() => {
    const generatedSlug = inputField.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  }, [inputField.title]);
  // handle image upload
  const handleImgUplod = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setThumbnail(file);
    setImg(imgUrl);
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputField.title);
    formData.append("content", inputField.content);
    formData.append("tags", inputField.tags);
    formData.append("isActive", inputField.isActive == "draft" ? false : true);
    formData.append("slug", slug);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await createBlog(formData).unwrap();
      console.log(res?.data?.message);
      setThumbnail("");
      setInputField(INITIAL_VALUE);
      setSlug("");
      // add sound for success
      if(res?.success){
        const audio = new Audio("/notify-sound.wav");
        audio.volume = 0.5;
        audio.play();
        showMsg.success(res?.message);
      }
      return <Navigate to={'/'}/>;
    } catch (e) {
      showMsg.error(e.data?.message);
    }
  };
  if (isLoading) return <Loading />;
  // validation for blog if user not login then redirect to login page
  if (data?.message === "Unauthorized") {
    showMsg.error("Please login to create a blog");
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Create New Blog</h1>
          <p className="text-gray-500 text-sm">Write and publish a new blog post</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Inputs
              label={"Blog Title"}
              onChange={handleChange}
              type={"text"}
              name={"title"}
              value={inputField.title}
              placeholder={"Enter blog title..."}
            />
          </div>

          {/* Slug */}
          <div>
            <Inputs
              label={"Slug"}
              onChange={handleChange}
              type={"text"}
              name={"slug"}
              value={slug}
              placeholder={"example: learn-react-in-10-days."}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Cover Image</label>
            <div
              onClick={() => currentImg.current.click()}
              className="border-2 overflow-hidden border-dashed cursor-pointer p-6 rounded-lg w-full h-87.5 text-gray-500 text-center flex justify-center items-center"
            >
              <img className=" text-center" src={image} alt="image" />
              <input ref={currentImg} type="file" hidden onChange={handleImgUplod} />
            </div>
          </div>

          {/* Content */}
          <div>
            <Inputs
              label={"Content"}
              onChange={handleChange}
              type={"text"}
              name={"content"}
              value={inputField.content}
              placeholder={"Write your blog content here..."}
            />
          </div>

          {/* Tags */}
          <div>
            <Inputs
              label={"Tags"}
              onChange={handleChange}
              type={"text"}
              name={"tags"}
              value={inputField.tags}
              placeholder={"e.g. react, javascript,express.js,node.js"}
            />
          </div>
          {/* Status */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              onChange={handleChange}
              name="isActive"
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value={inputField.isActive == true ? true : false}>Draft</option>
              <option value={inputField.isActive == false ? false : true}>Published</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type={'submit'} children={'Publish Blog'} variant="primary"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
