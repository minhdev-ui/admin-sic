import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import * as Yup from "yup";
import CountDown from "../../utils/CountDown";
import { SectionProps } from "../../utils/SectionProps";
import {
  basicQues,
  chooseQues, infoContact,
  textMainBase
} from "../sections/signUpForm/signUpFormQues";
import "./../../assets/css/style.css";
import createNotification from "./Nofication";
// import db from "../../db.config";
import emailjs from "@emailjs/browser";
import axios from "axios";
import config from '../../db.config';
import DateTime from "./Date";
const propTypes = {
  ...SectionProps.types,
  status: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  status: false,
};

const signUpFormVariants = {
  init: {
    y: "-100vh",
  },
  ani: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      duration: 0.2,
    },
  },
};

const SignUpForm = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  status,
  ...props
}) => {
  const outerClasses = classNames(
    ` signUpForm
    `
  );
  // Định dạng mẫu: 2022-12-24T00:00:00
  const dayOut =
    textMainBase.yearEnd +
    "-" +
    textMainBase.monthEnd +
    "-" +
    textMainBase.dayEnd +
    "T00:00:00";
  const dateData = CountDown(dayOut);
  const innerClasses = classNames("signUpForm-inner");
  const [data, setData] = useState([]);
  const [statusConn, setStatusConn] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useMemo(() => setDisabled(dateData.isTimeOut), [dateData.isTimeOut])

  const handleSubmit = async (obj) => {
    axios.post(`${config.API_URL}/api/ctv/add`, obj)
    .then(createNotification('success', {message: 'Cảm ơn bạn đã đăng ký CTV :3', duration: 2, placement: 'bottomRight'}))
    .catch((err) => {
      createNotification('error', {message: 'Lỗi Đăng Ký!', duration: 2, placement: 'bottomRight'})
      console.log(err);
    })
  };

  
  useEffect(() => {
    // getData()
  }, []);

  const sendEmail = (values) => {
    emailjs.send("gmail", "template_ol8vwc6", values, "iaJ4LMteT5H4R1l9d").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <section className={outerClasses}>
      <motion.div
        className="container"
        style={{ position: "relative" }}
        variants={signUpFormVariants}
        initial="init"
        animate="ani"
      >
        <span className="closeBtn" onClick={props.stateFunc}>
          <AiFillCloseCircle size="25px"></AiFillCloseCircle>
        </span>
        <div className={innerClasses}>
          <div className="signUpForm--left flex-col">
            <div className="flex-child">
              {textMainBase.title}

              <p>
                Hãy điền đầy đủ thông tin dưới đây để chúng mình có thể liên lạc
                với bạn trong khoảng thời gian sớm nhất nhé!
              </p>
              <div className="contact">
                {infoContact.map((info) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="contact__info"
                    key={info.data}
                    href={info.href || ""}
                  >
                    {info.icon}
                    <span>{info.data}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="signUpForm__footer flex-child">
              <DateTime time={dayOut}/>
            </div>
          </div>
          <div className="signUpForm--right flex-col">
            <Formik
              initialValues={{
                fullName: "",
                phone: "",
                email: "",
                class: "",
                answer: [],
                message: "",
              }}
              validationSchema={Yup.object({
                fullName: Yup.string().required("Vui Lòng Điền Trường Này"),
                phone: Yup.string().required("Vui Lòng Điền Trường Này"),
                email: Yup.string()
                  .email("E-mail của bạn không hợp lệ")
                  .required("Vui Lòng Điền Trường Này"),
                class: Yup.string().required("Vui Lòng Điền Trường Này"),
                answer: Yup.array()
                  .required()
                  .min(1, "Vui Lòng Chọn Trường Này"),
              })}
              onSubmit={(values) => {
                handleSubmit(values).then(() => sendEmail(values))
                props.stateFunc();
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form>
                    <div className="basic-info gridCol-2 flex-child">
                      {basicQues.map((item) => (
                        <div className="basic-info__item" key={item.quesTitle}>
                          <Field
                            type="text"
                            placeholder=" "
                            name={item.quesName}
                            id={item.quesName}
                          />
                          <label htmlFor={item.quesName} className="title">
                            {item.quesTitle}
                          </label>
                          {errors[item.quesName] && touched[item.quesName] ? (
                            <span className="errorMessage">
                              {errors[item.quesName]}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                    <div
                      className="choose-info flex-child"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <label htmlFor={chooseQues.quesName} className="title">
                        {chooseQues.quesTitle}
                      </label>
                      <div className="gridCol-2">
                        {chooseQues.ans.map((item) => (
                          <label style={{ color: "#000" }} key={item}>
                            <Field
                              type="checkbox"
                              name={chooseQues.quesName}
                              value={item}
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                      {errors.answer && touched.answer ? (
                        <span className="errorMessage">{errors.answer}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="message flex-col">
                      <label className="title flex-child">
                        {textMainBase.messageTitle}
                      </label>
                      <Field
                        className="message__text flex-child"
                        as="textarea"
                        name="message"
                        placeholder="Câu trả lời của bạn . . ."
                        rows={3}
                      ></Field>
                    </div>
                    <div className="signUpForm__footer ">
                      <button
                        className="button button-sm"
                        onClick={props.stateFunc}
                      >
                        HUỶ
                      </button>
                      <button
                        className="button button-primary button-sm"
                        disabled={disabled}
                        type="submit"
                      >
                        NỘP
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

export default SignUpForm;
