#!/bin/bash
set -e

ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"
NAMESPACE="mktyl"
REPO="real-time-fund"
IMAGE_TAG="${1:-latest}"
FULL_IMAGE="${ACR_REGISTRY}/${NAMESPACE}:${REPO}-${IMAGE_TAG}"

echo "============================================="
echo "  实时基金估值 - 阿里云 ACR 推送脚本"
echo "============================================="
echo ""
echo "目标镜像: ${FULL_IMAGE}"
echo ""

echo "[1/4] 构建 Docker 镜像..."
docker build -t "${REPO}:local" .
echo "✅ 构建完成"
echo ""

echo "[2/4] 打标签..."
docker tag "${REPO}:local" "${FULL_IMAGE}"
echo "✅ 标签: ${FULL_IMAGE}"
echo ""

echo "[3/4] 登录阿里云 ACR..."
docker login --username=${ACR_USERNAME} "${ACR_REGISTRY}" <<EOF
${ACR_PASSWORD}
EOF
echo "✅ 登录成功"
echo ""

echo "[4/4] 推送镜像到阿里云..."
docker push "${FULL_IMAGE}"
echo ""

echo "============================================="
echo "  ✅ 推送成功！"
echo "  镜像地址: ${FULL_IMAGE}"
echo "============================================="
echo ""
echo "在服务器上拉取运行:"
echo "  docker pull ${FULL_IMAGE}"
echo "  docker run -d -p 3000:3000 --name fund-app --restart unless-stopped ${FULL_IMAGE}"
