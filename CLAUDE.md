# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ IMPORTANT: Development Rules

**BEFORE starting ANY development task, you MUST read and follow:**
- **[docs/DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md)** - 开发规范、Skills 集成、美学指导（待创建）

---

## 🎯 商业项目工作流（Skill 驱动）

> 本项目采用 Skill 驱动的开发流程

### Skill 调用规则

#### 开始前必须调用

| Skill | 调用方式 | 作用 |
|-------|----------|------|
| superpowers | `/superpowers` | 设计+执行+调试+测试 |
| planning-with-files | `/planning-with-files-zh` | 任务拆解与进度跟踪 |
| openspec | `/openspec` | API 规范统一 |
| pua | `/pua` | 失败兜底机制 |

#### 提交前必须调用

| Skill | 调用方式 | 作用 |
|-------|----------|------|
| verification-before-completion | `/verification-before-completion` | 质量检查 |

#### 条件调用

| Skill | 调用方式 | 触发条件 |
|-------|----------|----------|
| frontend-design | `/frontend-design` | 涉及前端代码时 |

#### 自动路由

| Skill | 调用方式 | 触发条件 |
|-------|----------|----------|
| deep-research | `/deep-research` | 技术选型、竞品分析 |
| academic-paper | `/academic-paper` | 学术研究 |
| brainstorming | `/brainstorming` | 设计探索 |
| writing-plans | `/writing-plans` | 实施计划 |
| executing-plans | `/executing-plans` | 按计划执行 |
| systematic-debugging | `/systematic-debugging` | 问题定位 |
| test-driven-development | `/test-driven-development` | TDD 开发 |

### 任务路由

```
新功能 → superpowers → planning-with-files → openspec → 编码 → verification-before-completion
Bug修复 → systematic-debugging → 修复 → verification-before-completion
重构 → deep-research → writing-plans → executing-plans → verification-before-completion
UI优化 → frontend-design → 编码 → 截图验证
```

### 文件结构

```
vintage-order-system/
├── docs/
│   ├── superpowers/
│   │   ├── specs/           ← 设计文档（brainstorming 产出）
│   │   └── plans/           ← 实施计划（writing-plans 产出）
│   └── DEVELOPMENT_RULES.md ← 开发规范
├── .planning/               ← 任务规划（planning-with-files 自动生成）
│   ├── task_plan.md
│   ├── findings.md
│   └── progress.md
├── ruoyi-admin/             ← Spring Boot 主应用
├── ruoyi-system/            ← 业务模块
└── sql/                     ← 数据库脚本
```

### Key Requirements

- 每完成一个 step 必须自测 + commit & push
- 任务失败 2 次后触发 PUA 模式强制解决
- 若依框架必须遵循官方约定（命名、分层、权限）

---

## 📄 文档输出规范

### 双格式输出规范

**docs 目录中的所有 .md 文件都必须同时生成对应的 .html 文件**：

| 格式 | 文件扩展名 | 存放目录 | 说明 |
|------|------------|----------|------|
| Markdown | `.md` | `docs/` | 适合代码仓库查看、版本控制 |
| HTML | `.html` | `docs/` | 适合浏览器打开、视觉呈现 |

### 文档清单

| 文档名称 | Markdown | HTML | 状态 |
|----------|----------|------|------|
| 开发规范 | `docs/DEVELOPMENT_RULES.md` | `docs/DEVELOPMENT_RULES.html` | ⏳ 待创建 |
| API 文档 | `docs/api.md` | `docs/api.html` | ⏳ 待创建 |
| 数据库设计 | `docs/database.md` | `docs/database.html` | ⏳ 待创建 |
| 部署指南 | `docs/deployment.md` | `docs/deployment.html` | ⏳ 待创建 |

**规则**: 
- 每次创建或更新 `.md` 文件时，必须同步生成或更新对应的 `.html` 文件
- HTML 文件必须遵循项目设计规范（见下方）

### HTML 文档规范

HTML 文档应遵循以下设计规范：

```css
/* 主色调 - Deep Indigo + Amber */
--color-primary: #1a1b41;
--color-accent: #ffbf00;

/* 背景色 */
--bg-dark: #0f1029;
--bg-card: rgba(255, 255, 255, 0.95);

/* 文字颜色 */
--text-primary: #333;
--text-secondary: #a0a0c0;
```

### 文档更新流程

1. 修改文档内容
2. 运行 HTML 生成工具：`node generate-html.js`
3. 提交到 Git 仓库
4. 推送到远程仓库

### HTML 生成工具

项目根目录下的 `generate-html.js` 脚本用于批量生成 HTML 文档：

```bash
# 生成所有文档的 HTML 版本
node generate-html.js

# 输出示例
✅ DEVELOPMENT_RULES.html 生成成功
✅ api.html 生成成功
✅ database.html 生成成功
🎉 所有专业 HTML 文件生成完毕！
```

**脚本功能**：
- 自动读取 `docs/` 目录下的 Markdown 文件
- 使用项目主题色（Deep Indigo #1a1b41 + Amber #ffbf00）生成专业 HTML
- 为每个文档添加完整介绍（文档类型、目标读者、关联文档）
- 响应式布局，支持移动端/平板/桌面

---

## 🎯 项目概述

**Vintage Order System（二手古着店订单管理系统）** 是基于若依框架（RuoYi）开发的订单管理系统，采用 **单体架构** 和 **前后端不分离** 的传统模式。

**当前状态**: 初始化阶段

| 版本 | 状态 | 完成日期 |
|------|------|----------|
| v1.0.0 | 🚧 开发中 | - |

---

## 📁 仓库结构

```
vintage-order-system/
├── ruoyi-admin/        # 主应用模块（Spring Boot 启动类）
├── ruoyi-common/       # 通用工具类
├── ruoyi-framework/    # 框架核心配置
├── ruoyi-generator/    # 代码生成器
├── ruoyi-quartz/       # 定时任务
├── ruoyi-system/       # 系统模块（业务代码）
├── sql/                # 数据库脚本
└── doc/                # 文档
```

---

## 🛠️ 技术栈

### 后端
- **Spring Boot**: 4.0.x (JDK 17+)
- **持久层**: MyBatis
- **安全**: Shiro
- **模板引擎**: Thymeleaf
- **缓存**: Redis (8.136.194.199:6379, db=2)

### 前端
- **框架**: jQuery + Bootstrap + Thymeleaf
- **UI 组件**: Hplus 后台主题

---

## 🗄️ 数据库配置

### 数据库配置
```yaml
url: jdbc:mysql://8.136.194.199:3307/vintage_order
username: root
password: LiRXin_Mysql8_0620
```

### Redis 配置
```yaml
host: 8.136.194.199
port: 6379
password: LiRXin_Redis_0620
database: 2
```

### 核心表（规划中）
- `vintage_order` - 订单表
- `vintage_order_log` - 订单操作日志

**关键字段**:
- `order_code` - 订单编码（手动输入，唯一）
- `douyin_username` - 抖音用户名
- `recipient_name` - 收货人姓名
- `price` - 商品价格
- `address_detail` - 详细地址
- `status` - 订单状态（0-待发货，1-已发货，2-已完成）
- `logistics_no` - 物流单号

---

## 🚀 开发命令

### 后端启动
```bash
# 使用 Maven 启动
mvn clean spring-boot:run

# 或使用脚本（Windows）
ry.bat

# Linux/Mac
./ry.sh
```

### 访问地址
- **管理后台**: http://localhost:80
- **默认账号**: admin / admin123

---

## 📐 架构模式

### 分层架构
```
Controller (处理请求)
  → Service (业务逻辑)
    → Mapper (数据访问)
      → Database
```

### 若依框架规范

**实体类命名**:
- Domain 层: `XxxDO.java` (对应数据库表)
- Controller 层直接使用 Domain 对象

**Mapper 规范**:
```java
// Mapper 接口
public interface VintageOrderMapper {
    VintageOrder selectVintageOrderById(Long orderId);
    List<VintageOrder> selectVintageOrderList(VintageOrder order);
    int insertVintageOrder(VintageOrder order);
    int updateVintageOrder(VintageOrder order);
    int deleteVintageOrderByIds(Long[] orderIds);
}
```

**Service 规范**:
```java
// Service 接口
public interface IVintageOrderService {
    VintageOrder selectVintageOrderById(Long orderId);
    List<VintageOrder> selectVintageOrderList(VintageOrder order);
    int insertVintageOrder(VintageOrder order);
    int updateVintageOrder(VintageOrder order);
    int deleteVintageOrderByIds(String ids);
}

// Service 实现类
@Service
public class VintageOrderServiceImpl implements IVintageOrderService {
    @Autowired
    private VintageOrderMapper orderMapper;
    
    @Override
    public int insertVintageOrder(VintageOrder order) {
        return orderMapper.insertVintageOrder(order);
    }
}
```

**Controller 规范**:
```java
@Controller
@RequestMapping("/vintage/order")
public class VintageOrderController extends BaseController {
    
    @Autowired
    private IVintageOrderService orderService;
    
    @RequiresPermissions("vintage:order:view")
    @GetMapping()
    public String order() {
        return prefix + "/order";
    }
    
    @RequiresPermissions("vintage:order:list")
    @PostMapping("/list")
    @ResponseBody
    public TableDataInfo list(VintageOrder order) {
        startPage();
        List<VintageOrder> list = orderService.selectVintageOrderList(order);
        return getDataTable(list);
    }
}
```

---

## 🔐 权限管理

### Shiro 注解
- `@RequiresPermissions("vintage:order:view")` - 查看权限
- `@RequiresPermissions("vintage:order:add")` - 新增权限
- `@RequiresPermissions("vintage:order:edit")` - 编辑权限
- `@RequiresPermissions("vintage:order:remove")` - 删除权限

### 菜单配置
菜单权限通过 SQL 配置，位于 `sql/vintage_order.sql`：
```sql
INSERT INTO `sys_menu` VALUES (2000, '订单管理', 0, 5, 'vintage', ...);
INSERT INTO `sys_menu` VALUES (2001, '订单列表', 2000, 1, 'order', ...);
```

---

## 📝 开发规范

### 代码风格
- 遵循若依框架约定
- 使用 MyBatis XML 映射文件（不使用注解）
- Controller 返回视图路径或 JSON 数据

### 响应格式
```json
{
  "msg": "操作成功",
  "code": 0,
  "data": {}
}
```

### 分页查询
```java
// Controller 层
startPage();  // 启动分页
List<VintageOrder> list = orderService.selectVintageOrderList(order);
return getDataTable(list);  // 返回分页数据
```

---

## 🔄 Git 工作流

### 提交规范
格式: `<type>(<scope>): <subject>`

**类型**:
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式
- `refactor` - 重构
- `test` - 测试

**示例**:
```bash
git commit -m "feat(order): 添加订单列表查询功能"
git commit -m "fix(order): 修复订单编码重复问题"
```

---

## 📊 核心业务逻辑

### 订单状态流转
```
待发货 (0) → 已发货 (1) → 已完成 (2)
```

### 发货流程
1. 选择待发货订单
2. 录入物流单号
3. 批量标记为"已发货"
4. 记录操作日志（vintage_order_log）

### 数据隔离
- 若依框架自带多租户支持
- 通过 Shiro 实现用户数据隔离
- 每个用户只能看到自己创建的订单

---

## 🧪 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 管理员 |

---

## 🌐 服务器配置

### 生产环境
| 配置项 | 值 |
|--------|-----|
| 服务器 IP | 8.136.194.199 |
| 数据库 | vintage_order |
| Redis DB | 2 |

### 数据库配置
| 配置项 | 值 |
|--------|-----|
| Host | 8.136.194.199:3307 |
| Database | vintage_order |
| Username | root |
| Password | LiRXin_Mysql8_0620 |

### Redis 配置
| 配置项 | 值 |
|--------|-----|
| Host | 8.136.194.199 |
| Port | 6379 |
| Password | LiRXin_Redis_0620 |
| Database | 2 |

---

## ⚠️ 重要注意事项

1. **若依框架特性**
   - 前后端不分离，使用 Thymeleaf 模板
   - 表单使用 Bootstrap Table + jQuery
   - 权限通过 Shiro 注解控制

2. **订单编码唯一性**
   - `order_code` 字段必须唯一
   - 手动输入，需在插入前校验重复

3. **级联删除**
   - 删除订单时，同时删除相关操作日志

4. **缓存策略**
   - 订单列表缓存 5 分钟
   - 用户信息缓存 30 分钟

---

## 📚 相关文档

- [若依框架官方文档](http://doc.ruoyi.vip)
- [MyBatis 官方文档](https://mybatis.org/mybatis-3/zh/)
- [Shiro 官方文档](https://shiro.apache.org/)

---

## 🚧 开发计划

### v1.0.0 功能清单
- [ ] 订单 CRUD
- [ ] 订单列表查询（分页、搜索、筛选）
- [ ] 批量发货
- [ ] 物流单号录入
- [ ] 订单导出（Excel）
- [ ] 操作日志记录

---

## 🔧 故障排查

### 常见问题

**问题 1: 启动失败 - 数据库连接**
```bash
# 检查数据库配置
cat ruoyi-admin/src/main/resources/application-druid.yml
```

**问题 2: 权限不足**
```bash
# 检查菜单权限是否正确配置
SELECT * FROM sys_menu WHERE menu_name LIKE '%订单%';
```

**问题 3: Redis 连接失败**
```bash
# 测试 Redis 连接
redis-cli -h 8.136.194.199 -p 6379 -a LiRXin_Redis_0620 --no-auth-warning ping
```
