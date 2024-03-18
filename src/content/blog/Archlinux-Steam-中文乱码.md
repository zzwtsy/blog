---
title: 'Archlinux Steam 中文乱码'
pubDate: '2022-09-18'
description: ''
heroImage: ''
---

## 第一种方法

```bash
yay -S lib32-fontconfig
```

## ~~第二种方法(不推荐)~~

### 新建 Steam-fonts.conf

随便那个文件夹都可以

```bash
vim Steam-fonts.conf
```

### 在文件内输入以下文本

如果不想用“WenQuanYi Zen Hei”可修改为其他字体

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <include ignore_missing="no">fonts.conf</include>

  <match target="pattern">
    <test qual="any" name="family">
      <string>Arial</string>
    </test>
    <edit name="family" mode="assign" binding="same">
      <string>WenQuanYi Zen Hei</string>
    </edit>
  </match>
</fontconfig>
```

### 修改 profile 文件

```bash
vim /etc/profile
```

在最后一行添加`export FONTCONFIG_FILE=你的Steam-fonts.conf文件地址`
