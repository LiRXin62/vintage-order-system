# Vintage Order System - 配置文档

## 数据库配置

### MySQL 配置
```yaml
host: 8.136.194.199
port: 3307
database: vintage_order
username: root
password: LiRXin_Mysql8_0620
charset: utf8mb4
collation: utf8mb4_general_ci
```

### 完整连接串
```
jdbc:mysql://8.136.194.199:3307/vintage_order?useUnicode=true&characterEncoding=UTF-8&connectionCollation=utf8mb4_general_ci&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
```

## Redis 配置

```yaml
host: 8.136.194.199
port: 6379
password: LiRXin_Redis_0620
database: 2
```

## MCP 工具配置

### vintage-db-readonly
- **功能**: MySQL 只读数据库访问
- **工具**:
  - `list_tables`: 列出所有表
  - `describe_table`: 查看表结构
  - `query_sql`: 执行 SQL 查询

### vintage-redis
- **功能**: Redis 数据访问
- **工具**:
  - `get`: 获取键值
  - `set`: 设置键值
  - `keys`: 列出键名
  - `del`: 删除键

## 前端配置

### 开发环境
```bash
端口: 80
API 代理: /dev-api -> http://localhost:8080
```

### 后端服务
```bash
端口: 8080 (若依框架默认)
访问地址: http://localhost:80
```

## Docker 配置

```yaml
服务端口映射: 8081:80
数据库: 8.136.194.199:3307
Redis: 8.136.194.199:6379
```

## 初始化 SQL 脚本

| 文件 | 说明 |
|------|------|
| `sql/ry_20260319.sql` | 若依框架基础表 |
| `sql/vintage_order.sql` | 订单业务表 |
| `sql/quartz.sql` | 定时任务表 |
| `sql/fix_charset.sql` | 字符集修复脚本 |

## 使用 MCP 工具示例

```bash
# 查看所有表
mcp__vintage-db-readonly__list_tables

# 查看表结构
mcp__vintage-db-readonly__describe_table --table vintage_order

# 执行查询
mcp__vintage-db-readonly__query_sql --sql "SELECT * FROM vintage_order LIMIT 10"
```

## 环境变量

### 开发环境 (.env.development)
```bash
VITE_APP_BASE_API=/dev-api
```

### 生产环境 (.env.production)
```bash
VITE_APP_BASE_API=/prod-api
```
