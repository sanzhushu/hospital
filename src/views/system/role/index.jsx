import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import {
  Switch,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
} from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getRoleList } from "@/service/index";
const { Option } = Select;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "编号",
    dataIndex: "roleId",
  },
  {
    title: "名称",
    dataIndex: "roleName",
  },
  {
    title: "权限字符",
    dataIndex: "roleKey",
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (text) => {
      <Switch defaultChecked onChange={text} />;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    dataIndex: "region",
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
        <div className="p-[5px]">
          <DeleteOutlined />
          数据权限
        </div>
      </div>
    ),
  },
];

const Role = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [role, setRole] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { data } = useRequest(getRoleList);
  // console.log(data);
  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.roleId));
    setRole(data?.data?.data?.result);
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
            fontWeight: "bold",
          }}
          onFinish={onFinish}
          initialValues={{ state: "角色状态" }}
        >
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Col>
              <Form.Item
                label="角色名称"
                className=" text-[24px]"
                name="roleName"
              >
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
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={role}
          />
        </div>
      </div>
    </div>
  );
};

export default Role;
