---
title: "Archlinux 激活 Navicat"
pubDate: "2022-10-08"
description: "使用 Navicat-keygen 生成激活密钥并完成激活 Navicat"
heroImage: ""
---

## 第一步下载激活软件

下载我编译好的激活软件：[下载地址](https://github.com/zzwtsy/navicat-keygen/actions)
或者自行编译激活软件：[仓库地址](https://notabug.org/doublesine/navicat-keygen)、[编译教程](https://notabug.org/doublesine/navicat-keygen/src/linux/doc/how-to-build.zh-CN.md)

## 第二步 patch Navicat

yay 安装的 Navicat 在 opt 目录下的 Navicat 目录里
在 navicat-patcher 目录运行以下命令：

```bash
chmod +x navicat-patcher

./navicat-patcher /opt/"你的 Navicat 目录"
```

## 第三步生成激活密钥

1. 在 navicat-keygen 目录运行以下命令：

   ```bash
   chmod +x navicat-keygen

   ./navicat-keygen --text ./RegPrivateKey.pem
   ```

2. 选择你下载的 Navicat 版本

   ```plaintext
      [*] Select Navicat product:
       0. DataModeler
       1. Premium
       2. MySQL
       3. PostgreSQL
       4. Oracle
       5. SQLServer
       6. SQLite
       7. MariaDB
       8. MongoDB
       9. ReportViewer

      (Input index)> 1
   ```

3. 选择你下载的 Navicat 语言版本

   ```plaintext
      [*] Select product language:
       0. English
       1. Simplified Chinese
       2. Traditional Chinese
       3. Japanese
       4. Polish
       5. Spanish
       6. French
       7. German
       8. Korean
       9. Russian
       10. Portuguese

      (Input index)> 1
   ```

4. 输入你的 Navicat 主版本号（11 至 16）回车为版本 16

   ```plaintext
      [*] Input major version number:
      (range: 11 ~ 16, default: 16)> 16
   ```

5. 复制 Serial number

   ```plaintext
      [*] Serial number:
      NAVB-EZF4-7T7X-9MPG
   ```

6. 输入你的名字随便输（英文）不要太长

   ```plaintext
     [*] Your name:
   ```

7. 输入你的组织随便输（英文）不要太长

   ```plaintext
   [*] Your organization:
   ```

8. 断网开始激活

   1. 将 Serial number 输入到 Navicat 里

   2. 选择手动激活

   3. 复制 Navicat 生成的请求码放入到控制台里，然后回车两次

      ```plaintext
      [*] Input request code in Base64: (Double press ENTER to end)
      ```

   4. 复制控制台里生成的激活码

      ```plaintext
      [*] Activation Code:
      xxxxxxxxxxxxxxxxxxxxxxxxxxxx
      ```

   5. 将激活码粘贴到 Navicat 里的激活码输入框里进行激活
