import request from "../utils/http";

//登入
export function login(data) {
  return request.post("/api/Login", data);
}

// 获取路由
export function getRouters() {
  return request.get("/api/getRouters");
}

// 获取用户信息
export function getInfo() {
  return request.get("/api/getInfo");
}

// 查询会员表列表

export function membershipList() {
  return request.get("/api/business/Member/list");
}

//会员列表
export function getMemberList(params) {
  return request.get("/api/business/Member/export", { params });
}

// 用户管理 ---> 获取用户
export function getUser() {
  return request.get("/api/system/user/list");
}

// 查询身体部位列表
// /business/BodyPart/list
export function getBodyPartList() {
  return request.get("/api/business/BodyParts/list");
}

// 查询症状列表
// /business/Symptoms
export function getSymptomsList() {
  return request.get("/api/business/Symptoms/list");
}

// 查询医生列表
// business/Doctor
export function getDoctorList() {
  return request.get("/api/business/Doctor/list");
}

// 查询意见反馈列表s
// /business/Feedback/list
export function getFeedbackList() {
  return request.get("/api/business/Feedback/list");
}

// 查询问卷调查问题表列表
//  /business/Surveys/list
export function getSurveysquestionList() {
  return request.get("/api/business/Surveys/list");
}

//查询科室管理列表
// /business/Dept/list
export function getDeptList() {
  return request.get("/api/business/Dept/list");
}

// 查询楼层管理列表
export function getFloorList() {
  return request.get("/api/business/Foordata/list");
}

// 查询订单表列表
export function getOrderList() {
  return request.get("/api/business/Payorder/list");
}

// 查询订单详情表列表
export function getOrderDetailList() {
  return request.get("/api/business/OrderDetail/list");
}

// 查询订单状态表列表
export function getOrderStatusList() {
  return request.get("/api/business/OrderStatus/list");
}

// 查询就诊卡管理列表
export function getCardList() {
  return request.get("/api/business/Cards/list");
}

//获取角色管理表单
export function getRoleList() {
  return request.get("/api/system/role/list");
}

// 角色分配菜单
export function roleAssignmentMenu() {
  return request.put("/api/system/role/dataScope", {
    create_by: "string",
    create_time: "2024-01-24T03:06:21.777Z",
    update_by: "string",
    update_time: "2024-01-24T03:06:21.777Z",
    remark: "string",
    beginTime: "2024-01-24T03:06:21.777Z",
    endTime: "2024-01-24T03:06:21.777Z",
    roleId: 0,
    roleName: "string",
    roleKey: "string",
    roleSort: 0,
    status: "string",
    delFlag: "string",
    menuIds: [0],
    deptIds: [0],
  });
}

// 获取菜单列表
export function getMenuList() {
  return request.get("/api/system/menu/list");
}

// 获取树状菜单列表
export function getMenuTreeSelect() {
  return request.get("/api/system/menu/treeSelect");
}

// 获取部门列表
// system/dept/list
export function getDepartmentList() {
  return request.get("/api/system/dept/list");
}

// 查询操作日志
export function getOperationLogList(params) {
  // console.log(params);
  return request.get("/api/monitor/jobLog/list", { params });
}

// 登入日志
export function getLoginLogList(params) {
  console.log(params);
  return request.get("/api/monitor/logininfor/list", { params });
}

// 清空登入日志
export function cleanLoginLog() {
  return request.delete("/api/monitor/logininfor/clean");
}
// 删除登入日志
export function delLoginLog(params) {
  return request.delete(`/api/monitor/logininfor/${params.infoIds}`);
}

// 获取字典数据
export function getDictDataList(params) {
  return request.get("/api/system/dict/data/list", { params });
}

// 获取参数配置列表
export function getConfigList(params) {
  return request.get("/api/system/config/list", { params });
}
