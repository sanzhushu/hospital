import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Select, Space, Table } from "antd";

import {
  RedoOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getMenuList } from "@/service/index";
const { Option } = Select;
const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    align: "center",
  },
  {
    title: "图标",
    dataIndex: "icon",
    align: "center",
  },
  {
    title: "类型",
    dataIndex: "menuType",
    align: "center",
  },
  {
    title: "排序",
    dataIndex: "orderNum",
    align: "center",
  },
  {
    title: "权限标识",
    dataIndex: "isCache",
    align: "center",
  },
  {
    title: "路由地址",
    dataIndex: "path",
    align: "center",
  },
  {
    title: "路由组件",
    dataIndex: "isFrame",
    align: "center",
  },
  {
    title: "显示",
    dataIndex: "visible",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
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

const Menu = () => {
  const [form] = Form.useForm();
  const [menu, setMenu] = useState([]);

  const { data } = useRequest(getMenuList);
  useEffect(() => {
    console.log(data?.data?.data, "菜单管理");

    if (data?.data?.data) {
      console.log(toTree(data?.data?.data));
      setMenu(toTree(data?.data?.data));
    }
    function toTree(list, parentId = 0) {
      const result = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].parentId === parentId) {
          result.push({
            key: list[i].menuId,
            ...list[i],
            children: toTree(list, list[i].menuId),
          });
        }
      }
      return result;
    }
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
          initialValues={{ state: "菜单名称" }}
        >
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Col>
              <Form.Item label="角色名称" name="roleName">
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
            <Button icon={<PlusOutlined />}>新增</Button>
            <Button icon={<PlusOutlined />}>新增</Button>
          </div>
          <div className=" flex justify-between items-center w-[80px]">
            <Button icon={<SearchOutlined></SearchOutlined>}></Button>
            <Button icon={<RedoOutlined></RedoOutlined>}></Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={menu} bordered />
        </div>
      </div>
    </div>
  );
};

export default Menu;
