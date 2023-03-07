/* eslint-disable default-case */
import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import createNotification from "../../../components/elements/Nofication";
// import dbConfig from "../../../db.config";
import axios from "axios";
import dbConfig from "../../../db.config";
import handleUploadImage from "../../../utils/uploadImage";
import ImageUploader from "quill-image-uploader";

Quill.register("modules/imageUploader", ImageUploader);

function CreateArticle() {
  const [imagePreview, setImagePreview] = useState("");
  const [url, setUrl] = useState("");
  const quillRef = useRef(null);

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        const url = async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: "https://api.imgbb.com/1/upload?key=fbccfab96dc9f2c5249a9f2fe1ed677f",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        };
        url(file).then((ress) => {
          editor.insertEmbed(
            quillRef.current.getEditorSelection().index,
            "image",
            `${ress}`
          );
        });
      }
    };
  };

  const handleSubmit = async (obj) => {
    if (!obj) return null;
    try {
      let tags = obj.tags;
      try {
        tags = obj.tags.split(" ");
      } catch (err) {
        console.log(err);
      }
      axios.post(`${dbConfig.API_URL}/api/article/add`, {
        ...obj,
        tags: tags,
        imageName: obj.image.name || "",
        image: url || "",
        author: JSON.parse(localStorage.getItem("account")).name,
      });
      createNotification("success", "Tạo thành công");
      setTimeout(() => {
        window.location.replace('/Blog-Event');
      }, 2000);
    } catch (err) {
      createNotification("error", "Tạo thất bại");
      console.log(err);
    }
  };

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    file.preview = URL.revokeObjectURL(file);
    setImagePreview(file);
  }

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

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
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          shortDes: "",
          categorize: "",
          text: "",
          tags: [],
          image: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(),
          shortDes: Yup.string().required(),
          categorize: Yup.string().required().oneOf(["Event", "Blog"]),
          text: Yup.string().required(),
        })}
        onSubmit={(values) => {
          handleSubmit({ ...values });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form>
              <div className="group_article">
                <div className="">
                  <label className="article_name_tag">Title</label>
                  <Field
                    className="input"
                    name="title"
                    placeholder="Enter Article's Title"
                  ></Field>
                  {errors.title && touched.title ? (
                    <span className="errorMessage">{errors.title}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <label className="article_name_tag">Tags</label>
                    <p>(Mỗi 1 tag cách nhau bởi 1 khoảng trắng)</p>
                  </div>
                  <Field
                    className="input"
                    name="tags"
                    placeholder="Enter Your Tags . . ."
                  ></Field>
                  {errors.tags && touched.tags ? (
                    <span className="errorMessage">{errors.tags}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <label className="article_name_tag">Short Description</label>
                <Field
                  className="input"
                  name="shortDes"
                  placeholder="Enter Your Short Description . . ."
                ></Field>
                {errors.shortDes && touched.shortDes ? (
                  <span className="errorMessage">{errors.shortDes}</span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <div className="article_name_tag">Photo</div>
                <Field
                  render={({ field }) => {
                    return (
                      <>
                        <input
                          type="file"
                          className="input file"
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                            handlePreviewImage(e);
                            handleUploadImage(e.target.files[0], setUrl);
                          }}
                        />
                      </>
                    );
                  }}
                />
                {imagePreview && (
                  <div className="article_image_preview">
                    <img src={imagePreview.preview} alt="" width="300px" />
                  </div>
                )}
              </div>
              <div className="article_name_tag_container">
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
              {errors.categorize && touched.categorize ? (
                <span className="errorMessage">{errors.categorize}</span>
              ) : (
                ""
              )}
              <Field name="text">
                {({ field }) => (
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    modules={modules}
                    value={field.value}
                    onChange={field.onChange(field.name)}
                  />
                )}
              </Field>
              {errors.text && touched.text ? (
                <span className="errorMessage">{errors.text}</span>
              ) : (
                ""
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: "10px", margin: "0 auto" }}
              >
                Create
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateArticle;
