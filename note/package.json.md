# package.json 中 peerDependency 作用

- 在 package.json 中 peerDependency 是用来声明一个包所依赖的其他包的版本范围,但是这些依赖包并不会被直接安装到当前包中,而是要求使用当前包的其他开发者在安装当前包时,也同时安装这些依赖包,并且保证这些依赖包的版本符合当前包的要求。

* peerDependency 的作用时为了避免不同版本的依赖包之间的冲突,例如,如果一个包 A 依赖于包 B 的版本 1.x,而另外一个包 C 依赖于包 B 的版本 2.x 那么在使用这两个包时就会出现冲突。为了解决这个问题,可以使用 peerDependency 来声明 B 的版本范围,让使用 A 和 C 的开发者自己决定安装哪个版本的 B。
* 在开发一个 npm 包时,如果你的依赖于其他包,但是这些依赖包不需要被直接安装到你的包中,可以使用 peerDependency 来声明这些依赖包,例如 如果你的包是一个 Vue 组件,依赖于 Vue,但是你不希望在你的包中直接安装 Vue,可以使用 peerDependency 来声明 Vue 的版本范围,让使用你的包的开发者自己决定要安装哪个版本的 Vue。

```
{
  "name": "my-package",
  "version": "1.0.0",
  "peerDependencies": {
    "vue": "^2.6.12"
  }
}

```

- 这里声明了 my-package 依赖于 Vue 的版本范围是 ^2.6.12。在使用 my-package 的开发者安装 my-package 时，npm 会提示安装 Vue，并且要求安装的 Vue 版本符合 ^2.6.12 的要求。
