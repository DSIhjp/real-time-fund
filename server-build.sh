#!/bin/bash
set -e

echo "============================================="
echo "  实时基金估值 - 服务器直接构建部署"
echo "  (无需预先推送镜像到 ACR)"
echo "============================================="

PROJECT_DIR="${1:-/opt/real-time-fund}"
ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"

echo ""
echo "项目目录: ${PROJECT_DIR}"

if [ ! -d "${PROJECT_DIR}" ]; then
    echo "❌ 项目目录不存在: ${PROJECT_DIR}"
    echo "请先将项目文件上传到服务器，或使用: $0 /你的项目路径"
    exit 1
fi

echo ""
echo "[1/5] 检查 Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker 未安装，正在安装..."
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo systemctl enable docker && sudo systemctl start docker
    echo "✅ Docker 安装完成"
else
    echo "✅ Docker 已就绪: $(docker --version)"
fi
echo ""

echo "[2/5] 配置镜像加速..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ],
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
EOF
sudo systemctl daemon-reload && sudo systemctl restart docker
echo "✅ 镜像加速已配置"
echo ""

echo "[3/5] 构建镜像..."
cd "${PROJECT_DIR}"
sudo docker build -t real-time-fund:local .
echo "✅ 构建完成"
echo ""

echo "[4/5] 启动容器..."
sudo docker stop real-time-fund 2>/dev/null || true
sudo docker rm real-time-fund 2>/dev/null || true

sudo docker run -d \
  --name real-time-fund \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e TZ=Asia/Shanghai \
  real-time-fund:local
echo "✅ 容器已启动"
echo ""

sleep 3

echo "[5/5] 验证运行状态..."
if sudo docker ps | grep -q real-time-fund; then
    echo ""
    echo "============================================="
    echo "  ✅ 部署成功！"
    echo "  访问地址: http://localhost:3000"
    echo "============================================="
else
    echo "❌ 启动失败，日志:"
    sudo docker logs real-time-fund 2>&1 | tail -30
    exit 1
fi
