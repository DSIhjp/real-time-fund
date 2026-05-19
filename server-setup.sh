#!/bin/bash
set -e

echo "============================================="
echo "  实时基金估值 - 云服务器环境初始化"
echo "============================================="
echo ""

echo "[1/6] 检测系统..."
if [ -f /etc/os-release ]; then
    . /etc/os-release
    echo "系统: $NAME $VERSION"
else
    echo "⚠️ 无法检测系统版本"
fi
echo "架构: $(uname -m)"
echo ""

echo "[2/6] 安装 Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker 已安装: $(docker --version)"
else
    if [ -f /etc/redhat-release ]; then
        sudo yum install -y yum-utils
        sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    else
        curl -fsSL https://get.docker.com | sh
    fi
    echo "✅ Docker 安装完成: $(docker --version)"
fi
echo ""

echo "[3/6] 启动 Docker 服务..."
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $(whoami) 2>/dev/null || true
echo "✅ Docker 服务已启动"
echo ""

echo "[4/6] 配置阿里云镜像加速..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "registry-mirrors": [
    "https://crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
echo "✅ 镜像加速已配置"
echo ""

echo "[5/6] 登录阿里云 ACR..."
ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"
ACR_USERNAME="542471884@qq.com"
ACR_PASSWORD="20121911hjp"

echo "${ACR_PASSWORD}" | sudo docker login --username="${ACR_USERNAME}" "${ACR_REGISTRY}" --password-stdin
echo "✅ ACR 登录成功"
echo ""

FULL_IMAGE="${ACR_REGISTRY}/mktyl/real-time-fund:latest"

echo "[6/6] 拉取并启动容器..."
sudo docker stop real-time-fund 2>/dev/null || true
sudo docker rm real-time-fund 2>/dev/null || true

sudo docker run -d \
  --name real-time-fund \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e TZ=Asia/Shanghai \
  "${FULL_IMAGE}"

sleep 3

if sudo docker ps | grep -q real-time-fund; then
    echo ""
    echo "============================================="
    echo "  ✅ 部署成功！"
    echo ""
    echo "  本地访问: http://localhost:3000"
    echo "  外网访问: http://$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}'):3000"
    echo "============================================="
    echo ""
    echo "常用管理命令:"
    echo "  sudo docker logs -f real-time-fund       # 查看日志"
    echo "  sudo docker restart real-time-fund        # 重启"
    echo "  sudo docker stop real-time-fund           # 停止"
    echo "  sudo docker rm -f real-time-fund          # 删除容器"
    echo ""
    echo "更新到最新版本:"
    echo "  sudo docker pull ${FULL_IMAGE}"
    echo "  sudo docker stop real-time-fund && sudo docker rm real-time-fund"
    echo "  sudo docker run -d --name real-time-fund --restart unless-stopped -p 3000:3000 ${FULL_IMAGE}"
else
    echo ""
    echo "❌ 容器启动失败，查看日志:"
    sudo docker logs real-time-fund 2>&1 | tail -30
    exit 1
fi
