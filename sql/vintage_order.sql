-- ----------------------------
-- 古着订单管理系统 - 数据库初始化脚本
-- ----------------------------

-- ----------------------------
-- 1. 创建订单表
-- ----------------------------
DROP TABLE IF EXISTS `vintage_order`;
CREATE TABLE `vintage_order` (
    `order_id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
    `order_code` VARCHAR(32) NOT NULL COMMENT '订单编码',
    `douyin_username` VARCHAR(50) NOT NULL COMMENT '抖音用户名',
    `recipient_name` VARCHAR(50) NOT NULL COMMENT '收货人姓名',
    `price` DECIMAL(10, 2) NOT NULL COMMENT '商品价格',
    `address` VARCHAR(200) NOT NULL COMMENT '收货地址',
    `create_by` VARCHAR(64) DEFAULT '' COMMENT '创建者',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_by` VARCHAR(64) DEFAULT '' COMMENT '更新者',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `del_flag` CHAR(1) DEFAULT '0' COMMENT '删除标志（0存在 2删除）',
    PRIMARY KEY (`order_id`),
    UNIQUE KEY `uk_order_code` (`order_code`),
    KEY `idx_douyin_username` (`douyin_username`),
    KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='古着订单表';

-- ----------------------------
-- 2. 菜单权限 SQL
-- ----------------------------
-- 订单管理菜单 (menu_id, menu_name, parent_id, order_num, url, target, menu_type, visible, is_refresh, perms, icon, create_by, create_time, update_by, update_time, remark)
INSERT INTO `sys_menu` VALUES (2000, '订单管理', 0, 5, '#', '', 'M', '0', '1', '', 'fa fa-shopping-cart', 'admin', sysdate(), '', NULL, '古着订单管理菜单');

-- 订单列表菜单
INSERT INTO `sys_menu` VALUES (2001, '订单列表', 2000, 1, '/vintage/order', '', 'C', '0', '1', 'vintage:order:view', 'fa fa-list', 'admin', sysdate(), '', NULL, '订单列表菜单');

-- 订单查询按钮
INSERT INTO `sys_menu` VALUES (2002, '订单查询', 2001, 1, '#', '', 'F', '0', '1', 'vintage:order:list', '#', 'admin', sysdate(), '', NULL, '');

-- 订单新增按钮
INSERT INTO `sys_menu` VALUES (2003, '订单新增', 2001, 2, '#', '', 'F', '0', '1', 'vintage:order:add', '#', 'admin', sysdate(), '', NULL, '');

-- 订单修改按钮
INSERT INTO `sys_menu` VALUES (2004, '订单修改', 2001, 3, '#', '', 'F', '0', '1', 'vintage:order:edit', '#', 'admin', sysdate(), '', NULL, '');

-- 订单删除按钮
INSERT INTO `sys_menu` VALUES (2005, '订单删除', 2001, 4, '#', '', 'F', '0', '1', 'vintage:order:remove', '#', 'admin', sysdate(), '', NULL, '');

-- 订单导出按钮
INSERT INTO `sys_menu` VALUES (2006, '订单导出', 2001, 5, '#', '', 'F', '0', '1', 'vintage:order:export', '#', 'admin', sysdate(), '', NULL, '');

-- ----------------------------
-- 3. 测试数据（可选）
-- ----------------------------
INSERT INTO `vintage_order` (`order_code`, `douyin_username`, `recipient_name`, `price`, `address`, `create_by`)
VALUES
('VO20260608001', '古着爱好者小王', '王小明', 199.00, '广东省深圳市南山区科技园南区XX大厦', 'admin'),
('VO20260608002', '复古潮流', '李小红', 299.00, '北京市朝阳区三里屯SOHO', 'admin'),
('VO20260608003', 'vintage_lover', '张三', 159.00, '上海市浦东新区陆家嘴金融中心', 'admin');
