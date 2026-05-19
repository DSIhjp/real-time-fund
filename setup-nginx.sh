#!/bin/bash
set -e

DOMAIN="${1:-}"
PORT="${2:-3000}"

echo "============================================="
echo "  安装 Nginx 反向代理"
echo "============================================="

if [ -z "$DOMAIN" ]; then
    echo "用法: $0 <域名> [端口]"
    echo "示例: $0 fund.example.com 3000"
    exit 1
fi

echo ""
echo "[1/4] 安装 Nginx..."
if command -v nginx &> /dev/null; then
    echo "✅ Nginx 已安装: $(nginx -v 2>&1)"
else
    sudo yum install -y nginx
    echo "✅ Nginx 安装完成"
fi
echo ""

echo "[2/4] 配置反向代理..."
sudo tee /etc/nginx/conf.d/fund-app.conf > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot)$ {
        proxy_pass http://127.0.0.1:${PORT};
        expires 7d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
EOF

sudo nginx -t && sudo systemctl enable nginx && sudo systemctl restart nginx
echo "✅ Nginx 配置完成"
echo ""

echo "[3/4] 放行防火墙..."
if command -v firewall-cmd &> /dev/null; then
    sudo firewall-cmd --permanent --add-service=http --add-service=https 2>/dev/null || true
    sudo firewall-cmd --reload 2>/dev/null || true
elif command -v iptables &> /dev/null; then
    sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || true
    sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || true
fi
echo "✅ 防火墙已放行 80/443 端口"
echo ""

echo "[4/4] 验证..."
sleep 1
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -qE "^(200|301|302|404)$"; then
    echo ""
    echo "============================================="
    echo "  ✅ Nginx 反向代理配置成功！"
    echo ""
    echo "  访问地址: http://${DOMAIN}"
    echo ""
    echo "  如需 HTTPS，可执行:"
    echo "  sudo yum install -y certbot python3-certbot-nginx"
    echo "  sudo certbot --nginx -d ${DOMAIN}"
    echo "============================================="
else
    echo "⚠️ Nginx 已启动但后端可能未就绪，请确认容器正在运行:"
    echo "  sudo docker ps | grep real-time-fund"
fi
