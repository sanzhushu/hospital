import { useEffect, useState } from "react";
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
import { getLoginLogList, cleanLoginLog, delLoginLog } from "@/service/index";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Logininfor = () => {
  const [form] = Form.useForm();
  const [loginLog, setLoginLog] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "访问编号",
      dataIndex: "infoId",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
    },
    {
      title: "登入地址",
      dataIndex: "loginLocation",
    },
    {
      title: "登入地点",
      dataIndex: "loginLocation",
    },
    {
      title: "浏览器",
      dataIndex: "browser",
    },
    {
      title: "操作系统",
      dataIndex: "os",
    },
    {
      title: "登入状态",
      dataIndex: "msg",
    },
    {
      title: "操作信息",
      dataIndex: "ipaddr",
    },
    {
      title: "登入日期",
      dataIndex: "loginTime",
    },
  ];

  const { data, runAsync } = useRequest(getLoginLogList);
  const { runAsync: delRunAsync } = useRequest(delLoginLog, {
    manual: true,
  });

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 删除
  const delLoginLogdian = () => {
    delRunAsync({ infoIds: selectedRowKeys[0] });
    runAsync();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    data?.data?.data?.result.map((item) => (item.key = item.infoId));
    setLoginLog(data?.data?.data?.result);
  }, [data]);

  const onFinish = (values) => {
    console.log("Success:", values);
    runAsync({
      userName: values.userName,
      status: values.status,
      loginLocation: values.loginLocation,
      // loginTime: values.loginTime[0],
      // createTime: values.loginTime[1],
    });
    console.log(data);
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
          <Row gutter={24} style={{ paddingTop: "20px" }}>
            <Col>
              <Form.Item label="登入地址" name="loginLocation">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="用户名称" name="userName">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="状态" name="status">
                <Select style={{ width: 130 }}>
                  <Option value="0">成功</Option>
                  <Option value="1">失败</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="loginTime" label="登入时间">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-[20px]">
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
            <Button icon={<DeleteOutlined />} onClick={delLoginLogdian}>
              删除
            </Button>
            <Button icon={<DeleteOutlined />} onClick={() => cleanLoginLog()}>
              清空
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
            dataSource={loginLog}
          />
        </div>
      </div>
    </div>
  );
};

export default Logininfor;
