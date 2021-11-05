#!/bin/sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install promtail --namespace=monitoring grafana/promtail --set "loki.serviceName=loki"
kubectl patch daemonsets promtail -p '{"spec": {"template": {"spec": {"nodeSelector": {"host": "ripley"}}}}}' -n monitoring