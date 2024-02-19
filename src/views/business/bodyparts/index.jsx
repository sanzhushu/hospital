import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Row, Col, Button, Form, Input, Space, Table, Modal } from "antd";

import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getBodyPartList } from "@/service/index";

const onFinish = (values) => {
  console.log("Success:", values);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "部位",
    dataIndex: "bodypart",
  },
  {
    title: "排序ID",
    dataIndex: "orderNum",
  },
  {
    title: "添加时间",
    dataIndex: "create_time",
  },
  {
    title: "操作",
    dataIndex: "operation",
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

const Bodyparts = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [part, setPart] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const { data } = useRequest(getBodyPartList);

  useEffect(() => {
    data?.data?.data?.result.forEach((item) => (item.key = item.id));
    setPart(data?.data?.data?.result);
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    // setIsModalOpen(false);
    console.log(values);
    console.log(11111);
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    console.log(22222);
  };

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
              <Form.Item label="部位" name="phone">
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
            <Button icon={<DeleteOutlined />} onClick={showModal}>
              新增
            </Button>
            <Button icon={<EditOutlined />} className=" text-[#4ebb57]">
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
            dataSource={part}
          />
        </div>
      </div>
      <Modal
        title="添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        okType="default"
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="部位"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="排序ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bodyparts;
