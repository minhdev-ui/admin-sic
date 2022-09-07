import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import "./../../assets/css/style.css";
import Button from "../elements/Button";
import ButtonGroup from "../elements/ButtonGroup";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import config from '../../db.config';
import axios from "axios";
import createNotification from "../elements/Nofication";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
  center: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
  center: false,
};

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Mục này không được bỏ trống"),
  email: Yup.string()
    .email("E-mail không hợp lệ")
    .required("Mục này không được bỏ trống"),
  content: Yup.string().max(200, "Đã vượt qua số kí tự cho phép"),
});

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  center,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split",
    center && "cta-center"
  );

  const handleSubmit = (obj) => {
    axios.post(`${config.API_URL}/api/contact/add`, obj)
    .catch((err) => {
      createNotification('error', {message: 'Lỗi!', duration: 2, placement: 'bottomRight'})
      console.log(err);
    })
    .then(createNotification('success', {message: 'Cảm ơn bạn đã góp ý cho CTV :3', duration: 2, placement: 'bottomRight'}))
  };


  return (
    <section {...props} className={outerClasses}>
      <div className="">
        <div className={innerClasses}>
          <div className="cta-slogan">
            <h3 className="m-0">Liên Hệ Với Chúng Tôi</h3>
          </div>
          <div className="cta-action">
            <Formik
              initialValues={{ email: "", name: "", message: "" }}
              validationSchema={ContactSchema}
              onSubmit={(values, {resetForm}) => {
                resetForm()
                handleSubmit({...values, readed: false})
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="cta-group-input">
                    <div className="group-input">
                      <Field
                        name="name"
                        className="form-input"
                        placeholder="Họ tên *"
                      />
                      {errors.name && touched.name ? (
                        <div className="errorMessage">{errors.name}</div>
                      ) : null}
                    </div>
                    <div className="group-input">
                      <Field
                        name="email"
                        className="form-input"
                        placeholder="Email của bạn *"
                      />
                      {errors.email && touched.email ? (
                        <div className="errorMessage">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="group-input">
                      <Field name="message">
                        {({ field, meta }) => {
                          return (
                            <>
                              <textarea
                                style={{
                                  // width: "inherit !important",
                                  display: "block",
                                }}
                                rows={7}
                                placeholder="Nội dung... (Tối đa 200 kí tự)"
                                {...field}
                              ></textarea>
                              {meta.touched && meta.error ? (
                                <div className="errorMessage">{meta.error}</div>
                              ) : null}
                            </>
                          );
                        }}
                      </Field>
                    </div>
                    <ButtonGroup className="cta-group-btn">
                      <Button
                        color="primary"
                        className="cta-btn"
                        wideMobile
                        submit
                      >
                        Gửi Tin Nhắn
                      </Button>
                    </ButtonGroup>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
