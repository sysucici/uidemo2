Vercel 部署指南
一个展示如何在 Vercel 上部署静态网站的简单教程。适用于纯 HTML + CSS + JS 项目。

项目结构
your-project/
├── css/
│   └── styles.css          # 样式文件
├── js/
│   └── main.js             # JavaScript 文件
├── assets/
│   └── images/             # 图片资源
├── index.html              # 主页面
└── README.md               # 项目说明
功能特点
纯静态网站，无需构建工具
支持自动部署（连接 GitHub 后）
自动 HTTPS 证书
全球 CDN 加速
支持自定义域名
部署方式
方式一：GitHub 部署（推荐）
将代码推送到 GitHub 仓库
登录 Vercel
点击 Add New → Project
选择你的 GitHub 仓库
点击 Deploy
部署成功后，每次推送代码会自动触发重新部署。

方式二：Vercel CLI 部署
# 安装 CLI
npm i -g vercel

# 登录账号
vercel login

# 进入项目目录并部署
cd your-project
vercel

# 部署到生产环境
vercel --prod
方式三：拖拽部署
访问 vercel.com/new
将项目文件夹直接拖入页面
等待部署完成
配置文件（可选）
在项目根目录创建 vercel.json：

{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
自定义域名
进入项目 Settings → Domains
添加你的域名
按提示配置 DNS 记录：
A 记录：76.76.21.21
CNAME：cname.vercel-dns.com
相关链接
Vercel 官方文档
Vercel CLI 文档
vercel.json 配置参考
