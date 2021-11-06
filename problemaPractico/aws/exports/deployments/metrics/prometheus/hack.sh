#!/bin/sh
# kubectl apply -f ./setup
# kubectl apply -f ./manifests/prometheus
# kubectl apply -f ./manifests/node-exporter
# kubectl apply -f ./manifests/kube-state-metrics
# kubectl apply -f ./manifests/grafana
# kubectl apply -f ./manifests/alertManager

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm upgrade --install loki --namespace=monitoring grafana/loki

helm upgrade --install promtail --namespace=monitoring grafana/promtail --set "loki.serviceName=loki"

kubectl patch statefulsets loki -p '{"spec": {"template": {"spec": {"nodeSelector": {"host": "ripley"}}}}}' -n monitoring
kubectl patch daemonsets promtail -p '{"spec": {"template": {"spec": {"nodeSelector": {"host": "ripley"}}}}}' -n monitoring