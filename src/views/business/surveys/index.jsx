import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getSurveysquestionList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "问卷调查标题",
    dataIndex: "title",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "开始时间",
    dataIndex: "start_time",
  },
  {
    title: "结束时间",
    dataIndex: "end_time",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
  },

  {
    title: "操作",
    dataIndex: "unionid",
    render: (text) => (
      <div className="flex items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <EditOutlined />
          编辑问题
        </div>
        <div className="p-[5px]">
          <EditOutlined />
          数据
        </div>
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

const Surveys = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [questionnaire, setQuestionnaire] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getSurveysquestionList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setQuestionnaire(data?.data?.data?.result);
    console.log(data);
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
          <Row className="mt-[20px]">
            <Col>
              <Form.Item label="问卷调查标题" name="phone">
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
          <div className="w-[200px] flex justify-between items-center ">
            <Button icon={<DeleteOutlined />}>新增</Button>
            <Button icon={<DeleteOutlined />}>修改</Button>
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
            dataSource={questionnaire}
          />
        </div>
      </div>
    </div>
  );
};

export default Surveys;
