- [关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)


# 硬连接
# 软连接
* pnpm store path
* pnpm add 
* 非扁平化的形式
    - bar@1.0.0
    - .pnpm 
        - foo@1.0.0
        - foo@2.0.0
        - bar@1.0.0
            - node_modules
                - foo@1.0.0
                - bar@1.0.0


* bar1.0.0 通过软连接的方式 执行 .pnpm  里层 bar@1.0.0
* bar@1.0.0 里层的 foo@1.0.0 软连接到 pnpm外层的 foo@1.0.0              
* vue 软连接的方式指向了 .pnpm 下面的 vue   .pnpm/vue 通过 硬连接 指向 全局的  .pnpm store

* [使用 pnpm workspace 管理 monorepo](https://www.bilibili.com/video/BV1qg4y157dv/?spm_id_from=333.788&vd_source=5d89147e1becc2b678eddced19b9d08e)

* 快速 pnpm 会将包缓存到本地 减少二次安装需要的时间
* 节省磁盘空间 它会把包软连接到项目本地 不需哟啊反复安装
* 节省网络带宽  同样道理
* 更好的依赖处理逻辑


* 使用 Monorepo的优势
    - 便于管理多个相互依赖的项目
    - 便于团队共享知识库
    - 减少项目管理的成本
* 使用 Monorepo的劣势
    - 版本管理混乱
    - 代码质量参差不齐 且相互影响
    - 技术栈升级困难
    - 难以进行权限管理


* 充分条件
    - 多个项目相互依赖
    - 功能 版本之间存在强关联
    - 项目中存在多个编译入口 且 构建条件存在差异
* 次要条件
    - 希望在团队中共享知识
    - 降低项目管理的成本    


* pnpm管理monorepo的最佳实践 
    - 速度快
    - 磁盘占用少
    - 项目依赖彼此独立 隔离
    - 有各种命令方便操作


 * 创建 pnpm-workspace.yaml   

 * 需要每个项目文件夹配置单独的入口文件

 * 每个项目文件夹下面执行pnpm i
 

 * 怎么打包 怎么启动开发环境
    - 对每个项目而言 跟以前一样 对整个项目 你可以自己写脚本

* 单个项目需要发布到 npm？
    - 不需要 对同一个 monorepo下的项目 它们就相当于已经发布了
    
