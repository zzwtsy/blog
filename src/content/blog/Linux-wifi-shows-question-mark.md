---
title: "linux wifi 显示问号"
pubDate: "2022-08-27"
description: "解决 ArchLinux GNOME 桌面中 WiFi 图标显示问号的问题"
heroImage: ""
---

安装 archlinux gnome 桌面后 WIFI 图标总是显示问号，在网上找了好久解决方法，总算找到了，记录一下。

## 第一步

打开 20-connectivity.conf 文件

```bash
vim /etc/NetworkManager/conf.d/20-connectivity.conf
```

## 第二步

向文件内添加以下内容

```plaintext
[connectivity]
enabled=false
```

## 第三步

重启电脑

## 用到的网站

[wiki.archlinux.org](https://wiki.archlinux.org/title/NetworkManager#Checking_connectivity)
