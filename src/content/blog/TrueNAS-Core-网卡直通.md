---
title: "TrueNAS Core 网卡直通"
pubDate: "2022-08-19"
description: "修改 TrueNAS Core 的 loader.conf 文件以支持虚拟化"
heroImage: ""
---

## 第一步

进入 Truenas core shell 使用文本编辑器打开 /boot 目录下的 loader.conf 文件  
代码：

```bash
vim /boot/loader.conf
```

## 第二步

### 加载 vmm.ko

```bash
vmm_load="YES"
```

### 添加网卡设备编号

```bash
pptdevs="4/0/0 4/0/1" #这行代码是添加网卡设备编号
```

这行代码中的 4/0/0 4/0/1 在 shell 中输入 pciconf -v -l 这条命令来查看，pci 设备编号就是下图红线部分。  
我的设备是 82576 双口网卡，编号是 0:4:0:0 和 0:4:0:1 那么我要添加的代码就是 4/0/0 和 4/0/1，多个 pci 编号用空格分开

![pciconf](https://static.yumdeb.top/img/2022-08-19_213146/gd9qRm7bwLpfPac.webp)

### AMD-Vi 直通支持

```bash
hw.vmm.amdvi.enable=1 #这行代码只有amd的设备需要添加
```

### 编辑完成

你的文件编辑完成后应该与下图相似

![loader.conf](https://static.yumdeb.top/img/2022-08-19_213146/XadRgk4GOWJ3ocL.webp)

## 用到的网站

[wiki.freebsd.org](https://wiki.freebsd.org/bhyve/pci_passthru)
