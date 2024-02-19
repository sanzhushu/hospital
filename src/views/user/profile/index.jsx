import { useEffect } from "react";
import { getInfo } from "@/service/index";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Tabs, Button, Form, Input, Radio } from "antd";

const UL = styled("ul")`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid #e7eaec;
    font-size: 16px;
  }
`;
const User = () => {
  // ...
  // ...
  const { data } = useRequest(getInfo);
  const personalData = data?.data?.data?.user;
  const [form] = Form.useForm();
  console.log(personalData);
  const onChange = (key) => {
    console.log(key);
  };

  const BasicInformation = () => {
    useEffect(() => {
      form.setFieldsValue({
        username: personalData?.nickName,
      });
    }, []);

    return (
      <div>
        <Form
          form={form}
          labelAlign="right"
          labelCol={{
            flex: "100px",
          }}
          style={{
            fontWeight: 600,
            fontSize: 18,
          }}
          onFinish={onFinish}
          initialValues={{ username: personalData?.nickName }}
        >
          <Form.Item label="用户昵称" name="username" required="true">
            <Input />
          </Form.Item>

          <Form.Item label="手机号码" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value="nan">男 </Radio>
              <Radio value="nv"> 女 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
            }}
          >
            <Button
              className=" mr-[10px] text-[white] bg-[#13c2c2]"
              htmlType="submit"
            >
              保存
            </Button>
            <Button type="primary" danger onClick={() => form.resetFields()}>
              关闭
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
  const items = [
    {
      key: "1",
      label: "基本资料",
      children: <BasicInformation></BasicInformation>,
    },
    {
      key: "2",
      label: "修改密码",
      children: "Content of Tab Pane 2",
    },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className=" flex  ">
      <div className=" w-[420px] p-[40px]">
        <h1 className=" text-[20px]">个人信息</h1>
        <div className="h-[220px] flex justify-center items-center border-b-[1px] border-color-[#e7eaec] ">
          <img
            src="https://pe.xzzl120.com/assets/logo.1c4bdeb5.png"
            alt=""
            className="w-[136px] h-[136px] rounded-full bg-[#009b86]"
          />
        </div>
        <div>
          <UL>
            <li>
              <div>用户名称</div>
              <div>{personalData?.createBy}</div>
            </li>
            <li>
              <div>手机号码</div>
              <div>{personalData?.phonenumber}</div>
            </li>
            <li>
              <div>用户邮箱</div>
              <div>{personalData?.email}</div>
            </li>
            <li>
              <div>所属部门</div>
              <div>{personalData?.deptName}</div>
            </li>
            <li>
              <div>所属角色</div>
              <div>{personalData?.nickName}</div>
            </li>

            <li>
              <div>创建日期</div>
              <div>{personalData?.loginDate}</div>
            </li>
          </UL>
        </div>
      </div>
      <div className="p-[40px] w-[100%]">
        <h1 className=" text-[20px]">基本信息</h1>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      {/* ... */}
    </div>
  );
};

export default User;
