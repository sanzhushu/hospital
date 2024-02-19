import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Select, Space, Table } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getDepartmentList } from "@/service/index";
const { Option } = Select;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "部门名称",
    dataIndex: "deptName",
    align: "center", // 设置列的对齐方式为居中
  },
  {
    title: "负责人",
    dataIndex: "leader",
    align: "center",
  },
  {
    title: "排序",
    dataIndex: "orderNum",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "region",
    align: "center",
    render: (text) => (
      <div className="flex justify-center items-center  text-[#13c2c2]">
        <div className="p-[5px]">
          <EditOutlined />
          修改
        </div>
        <div className="p-[5px]">
          <EditOutlined />
          新增
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
  const [department, setDepartment] = useState([]);
  const { data } = useRequest(getDepartmentList);
  useEffect(() => {
    if (data?.data?.data) {
      // console.log(toTree(data?.data?.data));
      setDepartment(toTree(data?.data?.data));
    }
    function toTree(list, parentId = 0) {
      const result = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].parentId === parentId) {
          result.push({
            key: list[i].deptId,
            ...list[i],
            children: toTree(list, list[i].deptId),
          });
        }
      }
      return result;
    }
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
          initialValues={{ state: "角色状态" }}
        >
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Col>
              <Form.Item label="部门名称" name="roleName">
                <Input />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="状态" name="state">
                <Select style={{ width: 120 }}>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                </Select>
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
          </div>
          <div className=" flex justify-between items-center w-[80px]">
            <Button icon={<SearchOutlined></SearchOutlined>}></Button>
            <Button icon={<RedoOutlined></RedoOutlined>}></Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={department} />
        </div>
      </div>
    </div>
  );
};

export default Dept;
