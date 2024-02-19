import { useState, useEffect } from "react";
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
  DeleteOutlined,
} from "@ant-design/icons";
import { getOrderList } from "@/service/index";
const { Option } = Select;
const { RangePicker } = DatePicker;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "微信订单号",
    dataIndex: "id",
  },
  {
    title: "订单号",
    dataIndex: "orderNumber",
  },
  {
    title: "金额",
    dataIndex: "money",
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
  },
  {
    title: "会员id",
    dataIndex: "memberId",
  },
  {
    title: "时间",
    dataIndex: "time",
  },
  {
    title: "操作",
    dataIndex: "openid",
    render: (text) => (
      <div className="flex items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <DeleteOutlined />
          删除
        </div>
      </div>
    ),
  },
];

const Payorder = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [orderList, setOrderList] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getOrderList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setOrderList(data?.data?.data?.result);
  }, [data]);
  console.log(data, "1");
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
              <Form.Item label="微信订单号" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="订单号" name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="订单类型" name="region">
                <Select style={{ width: 180 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className="mt-[20px]">
            <Col>
              <Form.Item name="range-picker" label="时间">
                <RangePicker />
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
            <Button icon={<DeleteOutlined />}>导出</Button>
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
            dataSource={orderList}
          />
        </div>
      </div>
    </div>
  );
};

export default Payorder;
