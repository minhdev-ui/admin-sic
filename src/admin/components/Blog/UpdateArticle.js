// const handleUpdatePost = async (e) => {
//     e.preventDefault();
//     const updateData = doc(db, "posts", postId);
//     await updateDoc(updateData, {
//       title: updateTitle,
//     });
//   };
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import createNotification from "../../../components/elements/Nofication";
import dbConfig from "../../../db.config";
import axios from "axios";

import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
let urlImg = "";

// const storage = getStorage();

// Create a reference to the file to delete

const UpdateArticle = ({ post }) => {
  console.log(post._id);
  const [postId, setPostId] = useState();
  const [oldUrlImg, setOldUrlImg] = useState(post.imageName || null);
  useEffect(() => {
    setPostId(post.id);
  }, []);

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
  const handleUploadImage = (image) => {
    // if (!image) return "";
    // else if (image) {
    //   image.preview = URL.createObjectURL(image);
    //   const file = image;
    //   const storageRef = ref(storage, "images/" + file.name);
    //   const uploadTask = uploadBytesResumable(storageRef, file);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress + "% done");
    //       switch (snapshot.state) {
    //         case "paused":
    //           console.log("Upload is paused");
    //           break;
    //         case "running":
    //           console.log("Upload is running");
    //           break;
    //         default:
    //           console.log("Nothing");
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       // Upload completed successfully, now we can get the download URL
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         console.log("File available at", downloadURL);
    //         if (downloadURL && downloadURL !== post.image) {
    //           setUrl(downloadURL);
    //         }
    //       });
    //     }
    //   );
    // }
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

      // const updateData = doc(db, "article", postId);
      // await updateDoc(updateData, {
      //   ...obj,
      //   tags,
      //   image: url,
      //   imageName: obj.image !== "" ? obj.image.name : post.imageName,
      //   author: "CLB Tin học sinh viên",
      // });
      axios
        .patch(`${dbConfig.API_URL}/api/article/${post._id}`, {
          ...obj,
          tags,
          image: url,
          imageName: obj.image !== "" ? obj.image.name : post.imageName,
          // author: "CLB Tin học sinh viên",
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

        // window.location.reload();
      }, 2000);
    } catch (err) {
      createNotification("error", "Cập nhật thất bại");
      console.log(err);
    }
  };

  const tags = post.tags.join(" ");
  return (
    <div>
      <Formik
        initialValues={{
          title: post.title || "",
          shortDes: post.shortDes || "",
          categorize: post.categorize || "",
          text: post.text || "",
          tags: tags || "",
          image: "",
          imageName: post.imageName || "",
          createdAt: post.createdAt || "",
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
                            handleUploadImage(e.target.files[0]);
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
