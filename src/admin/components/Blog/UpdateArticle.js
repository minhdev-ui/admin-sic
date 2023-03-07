import { Button } from "@mui/material";
import axios from "axios";
import { serverTimestamp } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import createNotification from "../../../components/elements/Nofication";
import dbConfig from "../../../db.config";

const UpdateArticle = ({ post }) => {
  const [oldUrlImg, setOldUrlImg] = useState(post.imageName || null);

  function deleteImage() {
    // const desertRef = ref(storage, `images/${oldUrlImg}`);
    // // Delete the file
    // deleteObject(desertRef)
    //   .then(() => {
    //     // File deleted successfully
    //     createNotification("success", "Xoá ảnh cũ thành công");
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //   });
  }

  const [image, setImage] = useState("");
  const [url, setUrl] = useState(post.image);
  const [targetInpuImage, setTargetInputImage] = useState("");
  const handleDeletePreviewImage = (image, targetInpuImage) => {
    // setImage("");
    // targetInpuImage.value = null;
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleSubmit = (obj) => {
    try {
      let tags = obj.tags;
      try {
        tags = obj.tags.split(" ");
      } catch (err) {
        console.log(err);
      }
      axios
        .patch(`${dbConfig.API_URL}/api/article/${post?._id}`, {
          ...obj,
          tags,
          image: url,
          imageName: obj.image !== "" ? obj.image.name : post.imageName,
        })
        .then((res) => {
          console.log(res.data);
        });
      createNotification("success", "Cập nhật thành công");
      if (obj.image && oldUrlImg && oldUrlImg !== obj.image) {
        deleteImage();
      }
      setTimeout(() => {
        setOldUrlImg(obj.imageName);
      }, 2000);
    } catch (err) {
      createNotification("error", "Cập nhật thất bại");
      console.log(err);
    }
  };

  const tags = post?.tags?.join(" ");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["link", "image"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [{ color: ["#FFFFFF", "#e60000", "#9ca9b3"] }],
          ["code-block"],
        ],
      },
    }),
    []
  );

  return (
    <div>
      <Formik
        initialValues={{
          title: post?.title || "",
          shortDes: post?.shortDes || "",
          categorize: post?.categorize || "",
          text: post?.text || "",
          tags: tags || "",
          image: "",
          imageName: post?.imageName || "",
          createdAt: post?.createdAt || "",
        }}
        onSubmit={(values) => {
          handleSubmit({ ...values, updatedAt: serverTimestamp() });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form>
              <div className="group_article">
                <div>
                  <label className="article_name_tag">Title</label>
                  <Field
                    className="input"
                    name="title"
                    placeholder="Enter Article's Title"
                  ></Field>
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    <label className="article_name_tag">Tags</label>
                    <p>(Mỗi 1 tag cách nhau bởi 1 khoảng trắng)</p>
                  </div>
                  <Field
                    className="input"
                    name="tags"
                    placeholder="Enter Your Tags . . ."
                  ></Field>
                </div>
              </div>
              <div>
                <label className="article_name_tag">Short Description</label>
                <Field
                  className="input"
                  name="shortDes"
                  placeholder="Enter Your Short Description . . ."
                ></Field>
              </div>
              <div>
                <label className="article_name_tag">Photo</label>
                <Field
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          type="file"
                          className="input file"
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                            setImage(e.target.files[0]);
                            setTargetInputImage(e.target); // for delete
                          }}
                        />
                      </>
                    );
                  }}
                />
                {image && (
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ marginBottom: "10px" }}
                    onClick={() => {
                      handleDeletePreviewImage(image, targetInpuImage);
                    }}
                  >
                    Delete Image
                  </Button>
                )}
                {/* {image && ( */}
                <div className="article_image_preview">
                  <img src={image.preview || post.image} alt="" width="300px" />
                </div>
                {/* )} */}
              </div>
              <div>
                <label className="article_name_tag">Categorize</label>
                <div
                  className="article_name_tag_group"
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  <label>
                    <Field type="radio" name="categorize" value="Blog" />
                    Blog
                  </label>
                  <label>
                    <Field type="radio" name="categorize" value="Event" />
                    Event
                  </label>
                </div>
              </div>
              <Field
                render={({ field }) => {
                  return (
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      style={{ color: "#fff" }}
                      value={field.value.text}
                      onChange={(value) => setFieldValue("text", value)}
                    />
                  );
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: "10px", margin: "0 auto" }}
              >
                Update
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateArticle;
