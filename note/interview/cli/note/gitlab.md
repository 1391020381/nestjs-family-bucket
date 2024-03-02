* @gitbeaker/rest
@gitbeaker/rest 是 GitLab 的 Node.js API 客户端库。它提供了许多方法来与 GitLab API 进行交互，包括项目管理、用户管理、仓库操作等等。

```
npm install @gitbeaker/rest
const { Gitlab } = require('@gitbeaker/rest');

const gitlab = new Gitlab({
  token: 'YOUR_GITLAB_ACCESS_TOKEN',
});

gitlab.Projects.all().then((projects) => {
  console.log(projects);
});

gitlab.Projects.create({ name: 'new-project' })
  .then(project => console.log(project))
  .catch(err => console.error(err));

// 组织中创建项目
api.Projects.create({
  name: 'new-repo',
  namespace_id: '<your group id>',
});

```