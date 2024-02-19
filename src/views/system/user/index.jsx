import { useState, useEffect } from "react";
// import { useRequest } from "ahooks";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Table,
  Switch,
  Modal,
  Radio,
} from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { getUser } from "@/service/index";
const { Option } = Select;
const { RangePicker } = DatePicker;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "用户编号",
    dataIndex: "userId",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
  },
  {
    title: "用户昵称",
    dataIndex: "nickName",
  },
  {
    title: "头像",
    dataIndex: "avatar",
    render: (text) => <img src={text} alt="" width={50} height={50} />,
  },
  {
    title: "部门",
    dataIndex: "deptName",
  },
  {
    title: "手机号码",
    dataIndex: "phonenumber",
  },
  {
    title: "用户状态",
    dataIndex: "status",
    render: (text) => (
      <Switch disabled defaultChecked onChange={text === "0" ? true : false} />
    ),
  },
  {
    title: "创建时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    dataIndex: "delFlag",
    render: (text) => (
      <div className=" text-blue-400">
        {" "}
        <div>
          <EditOutlined />
          修改
        </div>{" "}
        <div>
          <KeyOutlined />
          重置
        </div>
        {text !== 0 ? (
          ""
        ) : (
          <div>
            <DeleteOutlined />
            删除
          </div>
        )}
      </div>
    ),
  },
];

const User = () => {
  const [form] = Form.useForm();

  const [userData, setSerDate] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getUser().then((res) => {
      res.data.data.result.forEach((item) => (item.key = item.userId));
      // console.log(res.data.data.result);
      setSerDate(res.data.data.result);
    });
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishAdd = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <div className="p-[20px] flex justify-between ">
        <div className="w-[256px] mr-[20px]">
          <div className="pt-[20px]">
            <Input
              size="large"
              placeholder="large size"
              prefix={<SearchOutlined />}
            />
          </div>
        </div>
        <div className="">
          <div className="  flex items-center">
            <Form
              form={form}
              name="horizontal_login"
              layout="inline"
              labelAlign="right"
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col style={{ paddingTop: "20px" }}>
                  <Form.Item label="用户名称" name="username">
                    <Input />
                  </Form.Item>
                </Col>
                <Col style={{ paddingTop: "20px" }}>
                  <Form.Item label="手机号码" name="phone">
                    <Input />
                  </Form.Item>
                </Col>

                <Col style={{ paddingTop: "20px" }}>
                  <Form.Item label="状态" name="region">
                    <Select style={{ width: 120 }}>
                      <Option value="1">111</Option>
                      <Option value="2">222</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col style={{ paddingTop: "20px" }}>
                  <Form.Item name="range-picker" label="创建时间">
                    <RangePicker />
                  </Form.Item>
                </Col>
                <Col style={{ paddingTop: "20px" }}>
                  <Space>
                    <Button
                      icon={<SearchOutlined />}
                      className=" mr-[10px] text-[white] bg-[#13c2c2]"
                      htmlType="submit"
                    >
                      搜索
                    </Button>
                    <Button
                      icon={<RedoOutlined />}
                      type="primary"
                      danger
                      onClick={() => form.resetFields()}
                    >
                      重置
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </div>
          <div>
            <div className="mt-[20px] flex justify-between items-center ">
              <div className="w-[420px] flex justify-between items-center ">
                <Button onClick={showModal} icon={<PlusOutlined />}>
                  新增
                </Button>
                <Button icon={<EditOutlined />}>修改</Button>
                <Button icon={<DeleteOutlined />}>删除</Button>
              </div>
              <div className=" flex justify-between items-center w-[80px]">
                <Button icon={<SearchOutlined></SearchOutlined>}></Button>
                <Button icon={<RedoOutlined></RedoOutlined>}></Button>
              </div>
            </div>
            <div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={userData}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="添加用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={750}
      >
        <Form
          onFinish={onFinishAdd}
          {...formItemLayout}
          initialValues={{
            sex: "请选择",
            role: "请选择",
            departmentOfAffiliation: "请选择归属部门",
          }}
        >
          <div className="flex justify-between ">
            <div className="w-[50%]">
              <Row gutter={24}>
                <Col span={24}>
                  {" "}
                  <Form.Item
                    label="用户名"
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "请输入用户名",
                      },
                    ]}
                  >
                    <Input
                      placeholder="请输入用户名（用于登入）"
                      className="w-[100%]"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="用户昵称"
                    name="userNickname"
                    rules={[
                      {
                        required: true,
                        message: "请输入用户昵称",
                      },
                    ]}
                  >
                    <Input placeholder="请输入用户昵称" className="w-[100%]" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="手机号码" name="mobilePhoneNumber">
                    <Input placeholder="请输入手机号码" className="w-[100%]" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="用户性别" name="sex">
                    <Select
                      options={[
                        {
                          value: "男",
                          label: "男",
                        },
                        {
                          value: "女",
                          label: "女",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="角色" name="role">
                    <Select
                      options={[
                        {
                          label: "管理员",
                          value: "管理员",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="w-[50%]">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="用户密码"
                    name="userPassword"
                    rules={[
                      {
                        required: true,
                        message: "请输入密码",
                      },
                    ]}
                  >
                    <Input placeholder="请输入密码" className="w-[100%]" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="归属科室"
                    name="departmentOfAffiliation"
                    required="true"
                  >
                    <Select
                      options={[
                        {
                          label: "总院",
                          value: "总院",
                          options: [
                            {
                              label: "财务部",
                              value: "财务部",
                            },
                            {
                              label: "收费室",
                              value: "收费室",
                            },
                            {
                              label: "门诊部",
                              value: "门诊部",
                            },
                            {
                              label: "住院部",
                              value: "住院部",
                            },
                            {
                              label: "急诊部",
                              value: "急诊部",
                            },
                            {
                              label: "药房",
                              value: "药房",
                            },
                            {
                              label: "信息科",
                              value: "信息科",
                            },
                          ],
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="电子邮箱" name="email">
                    <Input placeholder="请输入邮箱"></Input>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="用户状态" name="userStatus">
                    <Radio.Group>
                      <Radio value={0}>正常</Radio>
                      <Radio value={1}>停用</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <Row>
              <Col span={12}>
                <Form.Item label="上级部门" name="superiorDepartment">
                  <Input.TextArea
                    allowClear
                    placeholder="请输入内容"
                    className="w-[600px]"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className=" flex justify-end ">
            <Space>
              <Button
                className=" mr-[10px] text-[white] bg-[#13c2c2]"
                htmlType="submit"
              >
                确定
              </Button>
              <Button type="primary" danger onClick={() => form.resetFields()}>
                取消
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default User;
