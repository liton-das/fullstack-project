import React, { useRef, useState } from 'react'
import { useCreateBlogMutation } from '../../services/api/api'
import Loading from '../../components/ui/Loading'
const INITIAL_VALUE={
    title:'',
    content:'',
    tags:'',
    isActive:false
}
const CreateBlog = () => {
const [createBlog,{data,isLoading}]=useCreateBlogMutation()
const [inputField,setInputField] = useState({...INITIAL_VALUE})
const [slug,setSlug]=useState('')
const [image,setImg]=useState('')
const [thumbnail,setThumbnail]=useState('')
const currentImg = useRef()
if(isLoading) return <Loading/>
// handle change for get input value
const handleChange=(e)=>{
    setInputField((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
    // convert from title to slug
    setSlug(
        inputField.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    );
}
// handle image upload 
const handleImgUplod = (e)=>{
    const file = e.target.files[0]
    const imgUrl = URL.createObjectURL(file)
    setThumbnail(file)
    setImg(imgUrl)
}
// handle submit 
const handleSubmit =async(e)=>{
    e.preventDefault();

  const formData = new FormData();

  formData.append("title", inputField.title);
  formData.append("content", inputField.content);
  formData.append("tags", inputField.tags);
  formData.append("isActive", inputField.isActive);
  formData.append("slug", slug);
  formData.append("thumbnail", thumbnail);

  try {
    const res = await createBlog(formData).unwrap();
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Create New Blog
        </h1>
        <p className="text-gray-500 text-sm">
          Write and publish a new blog post
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">
            Blog Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name='title'
            value={inputField.title}
            placeholder="Enter blog title..."
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>
          <input
            onChange={handleChange}
            type="text"
            name='slug'
            value={slug}
            placeholder="example: learn-react-in-10-days"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Cover Image
          </label>
          <div onClick={()=>currentImg.current.click()} className="border-2 border-dashed cursor-pointer p-6 rounded-lg w-full h-87.5 text-gray-500 text-center flex justify-center items-center">
            <img className=' text-center' src={image} alt="image" />
            <input ref={currentImg} type="file" hidden onChange={handleImgUplod} />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>
          <input
            onChange={handleChange}
            type="text"
            name='content'
            value={inputField.content}
            placeholder="Write your blog content here..."
            className="w-full border px-4 py-2 rounded-lg col-auto row-auto"
          ></input>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-medium">
            Tags
          </label>
          <input
            onChange={handleChange}
            type="text"
            name='tags'
            value={inputField.tags}
            placeholder="e.g. react, javascript,express.js,node.js"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>
          <select onChange={handleChange} name='isActive' className="w-full border px-4 py-2 rounded-lg">
            <option value={inputField.isActive}>Draft</option>
            <option value={inputField.isActive}>Published</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">

          <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>

          <button type='submit' className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Publish Blog
          </button>

        </div>

      </form>

    </div>
    </div>
  )
}

export default CreateBlog
