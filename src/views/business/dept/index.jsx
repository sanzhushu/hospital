import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getDeptList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "用户ID",
    dataIndex: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 3,
    },
  },
  {
    title: "科室代码",
    dataIndex: "deptCode",
  },
  {
    title: "科室名称",
    dataIndex: "deptName",
  },
  {
    title: "科室位置",
    dataIndex: "position",
  },
  {
    title: "排序ID",
    dataIndex: "orderNum",
  },
  {
    title: "科室类型",
    dataIndex: "deptType",
  },
  {
    title: "操作",
    dataIndex: "openid",
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

const Dept = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [department, setDepartment] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getDeptList);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setDepartment(data?.data?.data?.result);
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
              <Form.Item label="科室代码" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="科室名称" name="phone">
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
            <Button icon={<DeleteOutlined />}>新增</Button>
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
            dataSource={department}
          />
        </div>
      </div>
    </div>
  );
};

export default Dept;
