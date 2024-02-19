import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Select, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getDoctorList } from "@/service/index";
import "./doctor.css";
const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "专家名称",
    dataIndex: "doctorName",
  },
  {
    title: "职称",
    dataIndex: "title",
  },
  {
    title: "医生代码",
    dataIndex: "doctorCode",
  },
  {
    title: "排序ID",
    dataIndex: "orderNum",
  },
  {
    title: "头像",
    dataIndex: "images",
    // eslint-disable-next-line jsx-a11y/alt-text
    render: (text) => <img src={text} className="w-[60px]" />,
  },
  {
    title: "科室",
    dataIndex: "deptid",
  },
  {
    title: "操作",
    dataIndex: "unionid",
    render: (text) => (
      <div className="flex items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <EditOutlined />
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

const Doctor = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [expert, setExpert] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getDoctorList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setExpert(data?.data?.data?.result);
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
              <Form.Item label="专家名称" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="医生代码" name="username">
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="科室" name="region">
                <Select style={{ width: 180 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
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
            <Button icon={<DeleteOutlined />}>删除</Button>
            <Button icon={<DeleteOutlined />}>清空</Button>
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
            dataSource={expert}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default Doctor;
