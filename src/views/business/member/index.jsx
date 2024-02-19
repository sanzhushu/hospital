import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
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
} from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { membershipList } from "@/service/index";
// getMemberList
const { Option } = Select;
const { RangePicker } = DatePicker;
const onFinish = (values) => {
  console.log("Success:", values);
};

const columns = [
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "手机",
    dataIndex: "",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
  },
  {
    title: "姓名",
    dataIndex: "userName",
  },
  {
    title: "性别",
    dataIndex: "sex",
  },
  {
    title: "地区",
    dataIndex: "region",
  },
  {
    title: "openid",
    dataIndex: "openid",
  },
  {
    title: "unionid",
    dataIndex: "unionid",
  },
  {
    title: "图片",
    dataIndex: "headimgurl",
  },
  {
    title: "注册类型",
    dataIndex: "regtype",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
  },
  {
    title: "操作",
    dataIndex: "action",
    render: () => (
      <div className="flex items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <DeleteOutlined />
          编辑
        </div>
        <div className="p-[5px]">
          <DeleteOutlined />
          删除
        </div>
      </div>
    ),
  },
];

const Member = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [member, setMember] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const { data } = useRequest(getMemberList);
  const { data } = useRequest(membershipList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.userId));
    setMember(data?.data?.data?.result);
  }, [data]);

  return (
    <div className="p-[30px]">
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
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Col>
              <Form.Item label="手机" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="昵称" name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="地区" name="region">
                <Select style={{ width: 120 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="range-picker" label="注册时间">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right", paddingTop: "20px" }}>
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
          </div>
        </Form>
      </div>
      <div>
        <div className="mt-[20px] flex justify-between items-center ">
          <div className="w-[420px] flex justify-between items-center ">
            <Button icon={<PlusOutlined />}>新增</Button>
            <Button icon={<EditOutlined />}>修改</Button>
            <Button icon={<DeleteOutlined />}>删除</Button>
            <Button icon={<ToTopOutlined />}>导出</Button>
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
            dataSource={member}
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
