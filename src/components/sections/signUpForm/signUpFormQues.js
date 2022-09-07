import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const textMainBase = {
  // Định dạng mẫu: 2022-12-24T00:00:00, input dạng chuỗi 2 kí tự 2=>02
    title: <h3>BECOME OUR TEAMMATE</h3>,
    dayEnd: '05',
    monthEnd: '09',
    yearEnd: '2022',
    messageTitle: 'Mong muốn của bạn khi vào CLB'
}
const infoContact = [
  {
    href: "mailto:sic@wru.vn",
    icon: <SiGmail className="contact__icon"></SiGmail>,
    data: "sic@wru.vn",
  },
  // {
  //   href: "tel:0123456789",
  //   icon: <FaPhoneAlt className="contact__icon"></FaPhoneAlt>,
  //   data: "0123456789",
  // },
  {
    href: "https://goo.gl/maps/B6F5v82rMN1ViEF88",
    icon: <MdLocationOn className="contact__icon"></MdLocationOn>,
    data: "175 Tây Sơn Đống Đa",
  },
];
const basicQues = [
  {
    quesName: "fullName",
    quesTitle: "Họ và tên",
    quesExample: "Nguyễn Văn A",
  },
  {
    quesName: "phone",
    quesTitle: "Số điện thoại",
    quesExample: "0123456789",
  },
  {
    quesName: "email",
    quesTitle: "Email",
    quesExample: "example@gmail.com",
  },
  {
    quesName: "class",
    quesTitle: "Lớp",
    quesExample: "63CNTT01",
  },
];

const chooseQues = {
  quesTitle: "Bạn muốn đăng kí vào (những) ban nào?",
  quesName: "answer",
  ans: ["Ban truyền thông", "Ban học tập", "Ban kỹ thuật", "Ban hỗ trợ"],
};
export { infoContact, textMainBase, basicQues, chooseQues };
