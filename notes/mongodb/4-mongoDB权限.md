# mongodb权限

- Role-Based-Access-Control(RBAC)

```
// mongodb  shell

use admin

db.createUser({
    user:"app_user",
    pwd:"secure_password",
    roles:[
        { role: "readWrite", db: "mydatabase" },  # 授予 mydatabase 的读写权限
        { role: "read", db: "reporting" }         # 授予 reporting 的只读权限
    ]
})

// 在 MongoDB 的权限机制中，如果某个数据库或集合未被显式包含在用户的角色（roles）权限范围内，用户默认对该资源没有任何访问权限

// mongoose




const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, select: false } // 默认查询不返回密码字段
});


userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  // 添加密码加密逻辑
  this.password = encrypt(this.password);
  next();
});

UserModel.find().select('-__v -internal_notes'); // 排除版本号和内部备注字段


```
