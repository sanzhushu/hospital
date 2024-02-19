import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getCardList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "卡号",
    dataIndex: "orderNumber",
  },
  {
    title: "卡类型",
    dataIndex: "money",
  },
  {
    title: "用户ID",
    dataIndex: "orderType",
  },
  {
    title: "绑定时间",
    dataIndex: "memberId",
  },

  {
    title: "操作",
    dataIndex: "openid",
    render: (text) => (
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

const Cards = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [cards, setCards] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getCardList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setCards(data?.data?.data?.result);
  }, [data]);
  console.log(data, "1212");
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
              <Form.Item label="卡号" name="phone">
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
            <Button icon={<DeleteOutlined />}>解绑</Button>
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
            dataSource={cards}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
