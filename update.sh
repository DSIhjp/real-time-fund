#!/bin/bash
set -e

ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"
FULL_IMAGE="${ACR_REGISTRY}/mktyl/real-time-fund:latest"

echo "============================================="
echo "  实时基金估值 - 一键更新到最新版本"
echo "============================================="
echo "目标镜像: ${FULL_IMAGE}"
echo ""

echo "[1/4] 拉取最新镜像..."
sudo docker pull "${FULL_IMAGE}"
echo ""

echo "[2/4] 停止旧容器..."
sudo docker stop real-time-fund 2>/dev/null || true
sudo docker rm real-time-fund 2>/dev/null || true
echo "✅ 旧容器已清理"
echo ""

echo "[3/4] 启动新容器..."
sudo docker run -d \
  --name real-time-fund \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e TZ=Asia/Shanghai \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  "${FULL_IMAGE}"
echo ""

sleep 3

echo "[4/4] 验证..."
if sudo docker ps | grep -q real-time-fund; then
    echo ""
    echo "============================================="
    echo "  ✅ 更新成功！"
    echo "  访问地址: http://localhost:3000"
    echo "============================================="

    OLD_IMAGES=$(sudo docker images -f "dangling=true" -q)
    if [ -n "$OLD_IMAGES" ]; then
        echo ""
        echo "清理旧镜像..."
        sudo docker rmi $OLD_IMAGES 2>/dev/null || true
        echo "✅ 旧镜像已清理"
    fi
else
    echo "❌ 启动失败，日志:"
    sudo docker logs real-time-fund 2>&1 | tail -30
    exit 1
fi
