import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getSymptomsList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "适用性别",
    dataIndex: "sex",
    align: "center",
  },
  {
    title: "身体部位",
    dataIndex: "partId",
    align: "center",
  },
  {
    title: "症状",
    dataIndex: "symptom",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "gender",
    align: "center",
    render: (text) => (
      <div className="flex justify-center items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <EditOutlined />
          编辑伴随症状
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

const Symptoms = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [symptom, setSymptom] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getSymptomsList);
  useEffect(() => {
    // console.log(data?.data?.data?.result);
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setSymptom(data?.data?.data?.result);
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
              <Form.Item label="症状" name="phone">
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
            <Button icon={<PlusOutlined />} className=" text-[#26acc4]">
              新增
            </Button>
            <Button
              icon={<EditOutlined />}
              className="text-[#24c231] border-[#24c231]"
            >
              修改
            </Button>
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
            dataSource={symptom}
          />
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
