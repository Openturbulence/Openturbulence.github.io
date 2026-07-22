# Open Turbulence Database GitHub Pages Site

这是一个可直接部署到 GitHub Pages 的静态网站文件包，已在原首页基础上新增 `datasets.html` 数据集页面。

## 文件结构

```text
open-turbulence-database-site/
├── index.html
├── datasets.html
├── styles.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    ├── favicon.svg
    ├── logo.svg
    ├── hero-flow.png
    ├── visualization-isotropic.png
    ├── dataset-channel-compressible.png
    ├── dataset-pipe-compressible.png
    ├── dataset-curved-compressible.png
    ├── dataset-channel-incompressible.png
    └── dataset-pipe-incompressible.png
```

## 本次新增内容

- 新增 `datasets.html`，采用左侧 Filter + 右侧 Dataset Library 的模板。
- Filter 保留：`Flow Type`、`Geometry`、`Solver`。
- 已删除 `Method` 过滤项，因为当前数据集均为 DNS。
- Solver 中仅保留：`HYVES`、`STREAmS`、`In-house Code`。
- 已删除你红框标出的 `OpenFOAM`、`SU2` 两个 Solver 选项。
- 已删除你红框标出的右下角 `Incompressible Curved Channel` 数据卡片。
- 当前页面展示 5 个数据卡片：
  - Compressible：Channel Flow、Pipe Flow、Curved Channel
  - Incompressible：Channel Flow、Pipe Flow

## 部署到 GitHub Pages

1. 新建仓库，例如：`你的用户名.github.io`
2. 将本文件夹内的全部文件上传到仓库根目录
3. 打开仓库 `Settings` → `Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，目录选择 `/root`
6. 保存后等待 GitHub Pages 自动部署

如果仓库名不是 `你的用户名.github.io`，也可以部署为项目页面，例如：

```text
https://你的用户名.github.io/仓库名/
```

## 在原文件包基础上添加的方法

如果你已经把第一版网站部署到了 GitHub 仓库里，本次不需要重新新建仓库。直接把本文件包里的内容覆盖到原仓库根目录即可。重点是：

1. 新增 `datasets.html`
2. 替换 `index.html`
3. 替换 `styles.css`
4. 替换 `script.js`
5. 将 `assets/` 中新增的 5 张 `dataset-*.png` 图片复制到原仓库的 `assets/` 文件夹中

## 修改位置

- 数据集页面内容：`datasets.html`
- 数据集页面布局、卡片、Filter 样式：`styles.css` 末尾 `Datasets page` 部分
- Filter 交互、排序、计数：`script.js`
- 首页和导航链接：`index.html`
- 数据卡片图片：`assets/dataset-*.png`
