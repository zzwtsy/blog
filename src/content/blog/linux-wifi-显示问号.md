---
title: "linux wifi 显示问号"
pubDate: "2022-08-27"
description: ""
heroImage: ""
---

![截屏-20220827144819-166x58.png](https://static.yumdeb.top/img/2022-08-27_153645/cvYfJVo5ujDmNFT.png)

安装 archlinux gnome 桌面后 WIFI 图标总是显示问号，在网上找了好久解决方法，总算找到了，记录一下。

## 第一步

打开 20-connectivity.conf 文件

```bash
vim /etc/NetworkManager/conf.d/20-connectivity.conf
```

## 第二步

向文件内添加以下内容

```text
[connectivity]
enabled=false
```

## 第三步

重启电脑

## 用到的网站

https://wiki.archlinux.org/title/NetworkManager#Checking_connectivity
