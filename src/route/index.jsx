// 引入所需的依赖文件
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
// 引入所需要路由的页面
import Login from "../views/Login";

let element = [
  {
    path: "/",
    element: <Navigate to="/login"></Navigate>,
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Login></Login>
      </React.Suspense>
    ),
    component: React.lazy(() => import(`@/views/Login`)),
  },
];
export const RoutesContext = createContext();
const Routes = () => {
  const [routes] = useContext(RoutesContext);
  return useRoutes(routes);
};

function flatten(arr, flay = true) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const Component = React.lazy(() => import(`@/views/${arr[i].component}`));
    const path = !flay
      ? arr[i].path.charAt() === "/"
        ? arr[i].path.slice(1)
        : arr[i].path
      : arr[i].path;
    result.push({
      path: path,
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component></Component>
        </React.Suspense>
      ),
      children: arr[i].children ? flatten(arr[i].children, false) : "",
    });
  }
  return result;
}

const Router = () => {
  console.log();
  let noewDate = sessionStorage.getItem("routers")
    ? JSON.parse(sessionStorage.getItem("routers"))
    : [];

  if (noewDate instanceof Array) {
    noewDate.unshift({
      path: "/home",
      component: "Layout",
      children: [{ path: "index", component: "home" }],
    });
    noewDate.push({
      path: "/user",
      component: "Layout",
      children: [{ path: "profile", component: "user/profile" }],
    });
  }

  // console.log(noewDate);
  noewDate = flatten(noewDate);
  const [routes, setRoutes] = useState([...element, ...noewDate]);
  return (
    <RoutesContext.Provider value={[routes, setRoutes]}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </RoutesContext.Provider>
  );
};

export default Router;
