# Open Turbulence Database GitHub Pages Homepage

这是一个可直接部署到 GitHub Pages 的静态网站首页，版式、配色、卡片、页脚和视觉分布按照你提供的参考图制作。

## 文件结构

```text
open-turbulence-database-site/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    ├── favicon.svg
    ├── logo.svg
    ├── hero-flow.png
    └── visualization-isotropic.png
```

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

## 修改位置

- 网站标题和导航：`index.html`
- 颜色、字体、布局尺寸：`styles.css`
- 顶部背景图：`assets/hero-flow.png`
- 中部展示图：`assets/visualization-isotropic.png`
