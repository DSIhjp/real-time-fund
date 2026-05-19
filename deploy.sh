#!/bin/bash
set -e

ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"
NAMESPACE="mktyl"
REPO="real-time-fund"
IMAGE_TAG="${1:-latest}"
FULL_IMAGE="${ACR_REGISTRY}/${NAMESPACE}:${REPO}-${IMAGE_TAG}"

echo "============================================="
echo "  实时基金估值 - 云服务器一键部署脚本"
echo "============================================="
echo ""
echo "目标镜像: ${FULL_IMAGE}"
echo ""

echo "[1/3] 登录阿里云 ACR..."
docker login --username=${ACR_USERNAME} "${ACR_REGISTRY}" <<EOF
${ACR_PASSWORD}
EOF
echo "✅ 登录成功"
echo ""

echo "[2/3] 拉取最新镜像..."
docker pull "${FULL_IMAGE}"
echo "✅ 镜像拉取完成"
echo ""

echo "[3/3] 启动容器..."
docker stop real-time-fund 2>/dev/null || true
docker rm real-time-fund 2>/dev/null || true

docker run -d \
  --name real-time-fund \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e TZ=Asia/Shanghai \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  "${FULL_IMAGE}"

sleep 3

if docker ps | grep -q real-time-fund; then
  echo ""
  echo "============================================="
  echo "  ✅ 部署成功！"
  echo "  访问地址: http://$(curl -s ifconfig.me):3000"
  echo "============================================="
  echo ""
  echo "常用命令:"
  echo "  docker logs -f real-time-fund    # 查看日志"
  echo "  docker restart real-time-fund     # 重启"
  echo "  docker stop real-time-fund        # 停止"
else
  echo "❌ 容器启动失败，请检查日志:"
  docker logs real-time-fund 2>&1 | tail -30
  exit 1
fi
