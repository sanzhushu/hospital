/**
 * SVG 图标
 */
import React from "react";
import PropTypes from "prop-types";
// 为保证测试用例运行，不使用webpack内置utils模块，单独引入
import utils from "../../js/common/utils/index.js";
import "./SvgIcon.scss";

// 动态加载svg图标文件
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./icon", false, /.svg$/);
requireAll(req);

/**
 * SVG 图标组件
 */
export default class SvgIcon extends React.Component {
  // 入参类型检查
  static propTypes = {
    // 图标名称(必须与icon目录下文件名一致)
    iconName: PropTypes.string.isRequired,
    // 最外层元素样式
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.objectOf(PropTypes.bool),
    ]),
  };

  constructor(props) {
    super(props);
  }

  /**
   * 选择框最外层需要的class
   * @returns {string}
   */
  getSvgClassName() {
    return utils.clasx(this.props.className, {
      "svg-icon": true,
    });
  }

  render() {
    return (
      <svg className={this.getSvgClassName()} aria-hidden="true">
        <use xlinkHref={"#icon-" + this.props.iconName}></use>
      </svg>
    );
  }
}
