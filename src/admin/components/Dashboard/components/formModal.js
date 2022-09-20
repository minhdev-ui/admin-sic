import { LockFilled, PlusOutlined, UnlockFilled } from "@ant-design/icons";
import config from "../../../../db.config";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import createNotification from "../../../../components/elements/Nofication";
import handleUploadImage from "../../../../utils/uploadImage";
import moment from 'moment'

const FormModal = (props) => {
  const { visible, handleCreate, Msv = "", onClose, handleEntered } = props;
  const [obj, setObj] = useState({});
  const [img, setImg] = useState(obj?.image || "");
  const [msv, setMsv] = useState(Msv);
  const [name, setName] = useState(obj?.name || "");
  const [gender, setGender] = useState(obj?.gender || 0);
  const [classs, setClasss] = useState(obj?.class || "");
  const [date, setDate] = useState(obj?.date || null);
  const [unlock, setUnlock] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    setMsv(obj?.msv || Msv);
  }, [Msv, obj?.msv]);

  useEffect(() => {
    const getDetailData = async () => {
      await axios
        .get(`${config.API_URL}/api/room/`, {
          params: { msv: Msv },
        })
        .then((res) => setObj(...res.data));
    };
    if(Msv !== ""){
      getDetailData();
    }
  }, [Msv]);

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    file.preview = URL.revokeObjectURL(file);
    setImagePreview(file);
  }

  return (
    <Modal
      visible={visible}
      title={`Thông Tin Của Sinh Viên ${obj?.msv ? obj?.name : msv}`}
      okText="Create"
      onCancel={onClose}
      destroyOnClose
      closable={false}
      maskClosable={false}
      onOk={() => {
        if(obj?.msv === undefined) {
          handleCreate({
            image: img,
            msv: msv.replace(/\n/g, ""),
            name: name,
            gender: gender,
            class: classs,
            date: date,
            entered: true,
          });
        }else {
          handleEntered(obj?._id, {
            image: obj?.image || img,
            msv: msv.replace(/\n/g, ""),
            name: obj?.name || name,
            gender: obj?.gender || gender,
            class: classs,
            date: date,
          })
        }
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
      >
        <Form.Item label="Ảnh" valuePropName="fileList">
          <input
            type="file"
            className="input file"
            onChange={(e) => {
              handlePreviewImage(e);
              handleUploadImage(e.target.files[0], setImg);
            }}
          />
          {imagePreview && (
            <div className="article_image_preview">
              <img src={imagePreview.preview} alt="" width="300px" />
            </div>
          )}
        </Form.Item>
        <Form.Item label="Mã SV">
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Input
              value={msv || obj?.msv}
              disabled={unlock}
              onChange={(e) => setMsv(e.target.value)}
            />{" "}
            {unlock ? (
              <LockFilled
                style={{ fontSize: "20px" }}
                onClick={() => setUnlock(false)}
              />
            ) : (
              <UnlockFilled
                style={{ fontSize: "20px" }}
                onClick={() => setUnlock(true)}
              />
            )}
          </div>
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input value={name || obj?.name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Giới Tính">
          <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender || obj?.gender}>
            <Radio value={0}>
              {" "}
              Nam{" "}
            </Radio>
            <Radio value={1}>
              {" "}
              Nữ{" "}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ngày Sinh">
          <DatePicker
            size="small"
            onChange={(e) => setDate(e)}
            value={obj?.date ? moment(obj?.date) : date}
          />
        </Form.Item>
        <Form.Item label="Lớp">
          <Input
            maxLength={10}
            width={100}
            value={classs || obj?.class}
            onChange={(e) => setClasss(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
