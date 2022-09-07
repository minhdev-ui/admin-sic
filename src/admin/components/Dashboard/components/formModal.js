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

const FormModal = (props) => {
  const { visible, onCancel, obj } = props;
  const [img, setImg] = useState(obj.image || "");
  const [msv, setMsv] = useState(obj.msv || "");
  const [name, setName] = useState(obj.name || "");
  const [gender, setGender] = useState(obj.gender || 0);
  const [classs, setClasss] = useState(obj.class || "");
  const [date, setDate] = useState(obj.date || "");
  const [unlock, setUnlock] = useState(true);
  const [imagePreview, setImagePreview] = useState("");


  const handleCreate = () => {
    const obj = {
      image: img,
      msv: msv.replace(/\n/g, ""),
      name: name,
      gender: gender,
      class: classs,
      date: date.toLocaleString(),
      entered: true,
    };

    axios
      .post(`${config.API_URL}/api/room/add`, obj)
      .then((res) => {
        createNotification("success", { message: "Đã Thêm" });
      })
      .catch((err) => {
        console.log(err);
        createNotification("error", { message: "Lỗi" });
      });
  };

  useEffect(() => {
    setMsv(obj.msv);
  }, [obj.msv]);
  console.log(visible);

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    file.preview = URL.revokeObjectURL(file);
    setImagePreview(file);
  }

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      onCancel={onCancel}
      onOk={handleCreate}
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
              value={msv}
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
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Giới Tính">
          <Radio.Group onChange={(e) => setGender(e.target.value)}>
            <Radio value={0} checked={gender === 0 ? true : false}>
              {" "}
              Nam{" "}
            </Radio>
            <Radio value={1} checked={gender === 1 ? true : false}>
              {" "}
              Nữ{" "}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ngày Sinh">
          <DatePicker
            size="small"
            onChange={(e) => setDate(e.date().toLocaleString())}
          />
        </Form.Item>
        <Form.Item label="Lớp">
          <Input
            maxLength={10}
            width={100}
            value={classs}
            onChange={(e) => setClasss(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
