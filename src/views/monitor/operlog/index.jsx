import { useState } from "react";
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
import { getOperationLogList } from "@/service/index";
const { Option } = Select;
const { RangePicker } = DatePicker;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "日志编号",
    dataIndex: "logNumber",
  },
  {
    title: "系统模块",
    dataIndex: "systemModules",
  },
  {
    title: "请求方式",
    dataIndex: "requestMethod",
  },
  {
    title: "操作人员",
    dataIndex: "operators",
  },
  {
    title: "主机",
    dataIndex: "mainEngine",
  },
  {
    title: "操作地点",
    dataIndex: "operationLocation",
  },
  {
    title: "操作状态",
    dataIndex: "operationStatus",
  },
  {
    title: "用时",
    dataIndex: "timeConsumption",
  },
  {
    title: "日志内容",
    dataIndex: "logContent",
  },
  {
    title: "操作日期",
    dataIndex: "operationDate",
  },
  {
    title: "操作",
    dataIndex: "operation",
    render: () => {
      return <Button type="primary">详情</Button>;
    },
  },
];

const Operlog = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getOperationLogList);
  console.log(data?.data?.data?.result);
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
            <Col span={6}>
              <Form.Item label="系统模块" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="操作人员" name="username">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="类型" name="typeID">
                <Select style={{ width: 180 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="状态" name="state">
                <Select style={{ width: 180 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-[20px]">
            <Col>
              <Form.Item name="range-picker" label="操作时间">
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
            dataSource={data?.data?.data?.result}
          />
        </div>
      </div>
    </div>
  );
};

export default Operlog;
