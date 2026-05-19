#!/bin/bash
set -e

ACR_REGISTRY="crpi-i9hka019bndmsv9l.cn-guangzhou.personal.cr.aliyuncs.com"
ACR_USERNAME="542471884@qq.com"
ACR_PASSWORD="20121911hjp"
NAMESPACE="mktyl"
REPO="real-time-fund"
IMAGE_TAG="${1:-latest}"
FULL_IMAGE="${ACR_REGISTRY}/${NAMESPACE}:${REPO}-${IMAGE_TAG}"

echo "============================================="
echo "  实时基金估值 → 阿里云 ACR 推送"
echo "============================================="
echo "目标: ${FULL_IMAGE}"
echo ""

echo "[1/5] 构建 Docker 镜像..."
docker build -t "${REPO}:local" .
echo "✅ 构建完成"
echo ""

echo "[2/5] 打标签..."
docker tag "${REPO}:local" "${FULL_IMAGE}"
echo "✅ 标签: ${FULL_IMAGE}"
echo ""

echo "[3/5] 登录阿里云 ACR..."
echo "${ACR_PASSWORD}" | docker login --username="${ACR_USERNAME}" "${ACR_REGISTRY}" --password-stdin
echo "✅ 登录成功"
echo ""

echo "[4/5] 推送镜像..."
docker push "${FULL_IMAGE}"
echo "✅ 推送完成"
echo ""

echo "[5/5] 清理本地缓存..."
docker rmi "${REPO}:local" "${FULL_IMAGE}" 2>/dev/null || true
echo "✅ 缓存已清理"
echo ""

echo "============================================="
echo "  🎉 全部完成！"
echo ""
echo "  镜像地址:"
echo "  ${FULL_IMAGE}"
echo ""
echo "  在服务器上一键部署:"
echo "  docker login --username=${ACR_USERNAME} ${ACR_REGISTRY}"
echo "  docker run -d -p 3000:3000 --name fund-app --restart unless-stopped ${FULL_IMAGE}"
echo "============================================="
