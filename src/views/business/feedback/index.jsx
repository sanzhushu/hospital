import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { getFeedbackList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "Id",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "提交时间",
    dataIndex: "phone",
  },
  {
    title: "建议内容",
    dataIndex: "nickname",
  },
  {
    title: "操作",
    dataIndex: "name",
    render: (text) => (
      <div className="flex items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <PaperClipOutlined />
          详情
        </div>
        <div className="p-[5px]">
          <DeleteOutlined />
          删除
        </div>
      </div>
    ),
  },
];

const Feedback = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [proposal, setProposal] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getFeedbackList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setProposal(data?.data?.data?.result);
  }, [data]);
  console.log(data);
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
          <Row className="mt-[20px]">
            <Col>
              <Form.Item label="建议内容" name="phone">
                <Input />
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
            dataSource={proposal}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
