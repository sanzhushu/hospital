import { useState, useEffect } from "react";
// import { useRequest } from "ahooks";
import { Button, Input, Table } from "antd";

import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { roleAssignmentMenu } from "@/service/index";

const columns = [
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "用户账号",
    dataIndex: "userName",
  },
  {
    title: "用户昵称",
    dataIndex: "nickName",
  },
  {
    title: "邮箱",
    dataIndex: "avatar",
  },
  {
    title: "账号状态",
    dataIndex: "deptName",
  },
  {
    title: "备注",
    dataIndex: "phonenumber",
  },
  {
    title: "操作",
    dataIndex: "delFlag",
    render: (text) => (
      <div className=" text-blue-400">
        {" "}
        <div>
          <EditOutlined />
          修改
        </div>{" "}
        <div>
          <KeyOutlined />
          重置
        </div>
        {text !== 0 ? (
          ""
        ) : (
          <div>
            <DeleteOutlined />
            删除
          </div>
        )}
      </div>
    ),
  },
];

const Roleusers = () => {
  const [userData, setSerDate] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    roleAssignmentMenu().then((res) => {
      // res.data.data.result.forEach((item) => (item.key = item.userId));
      console.log(res);
      setSerDate();
    });
  }, []);

  return (
    <>
      <div className="p-[30px] flex justify-between ">
        <div className="w-[256px] mr-[20px]">
          <h1>角色名称</h1>
        </div>
        <div className="w-[100%]">
          <div className=" flex justify-between items-center ">
            <div className="w-[300px] flex justify-between items-center ">
              <Button icon={<PlusOutlined />}>添加用户</Button>
              <Button icon={<EditOutlined />}>批量取消授权</Button>
            </div>
            <div>
              <div>
                <Input
                  size="large"
                  placeholder="large size"
                  prefix={<SearchOutlined />}
                />
              </div>
            </div>
          </div>
          <div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={userData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Roleusers;
