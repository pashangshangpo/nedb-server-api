# 介绍

解决小型项目需要保存持久数据时需要单独开发一套数据库API接口，那是既没必要也浪费时间，因此希望实现一套通用的数据库解决方案。

不适合在需要用户权限的项目中使用，仅适合内部项目使用，因为任何人都可以调用所有接口API。

## 使用示例

```
POST /api/note/insert

{
    content: '今天是个好日子。',
}
```

## 使用说明

所有接口使用POST请求，格式为JSON，请求的接口固定格式为：

```
/api/:name/:type

name: 数据库名称
type: 要执行的类型
```

通用响应结果

```
{
    code: 0, // 0失败 1成功
    data: ..., // 根据情况返回
    msg: "ok" // 详细信息
}
```

所有API可以在 https://github.com/louischatriot/nedb 中查找。

## API接口

### 插入

```
/api/:name/insert

单条数据

{
    ...
}

多条数据

[
    {
        ...
    },
    ...
]
```

### 查询

```
/api/:name/find

查询所有

{}

查询单条

{
    _id: "...."
}
```

### 查询一条

```
/api/:name/findOne

{
    _id: "...."
}
```

### 更新

```
/api/:name/update

[
    参数1，
    参数2，
    ...
]

示例

[
	{
		name: "b"
	},
	{
		name: "b"
	}
]
```

更多用法参考 nedb update方法: https://github.com/louischatriot/nedb#updating-documents

### 删除

```
/api/:name/remove

删除所有

[
	{},
	{
		"multi": true
	}
]

删除单条

{
    _id: "..."
}
```

### 计数

```
/api/:name/count

获取总条数

{}

根据条件获取条数

{
    name: "..."
}
```
