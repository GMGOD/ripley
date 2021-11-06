#!/bin/sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install loki --namespace=monitoring grafana/loki
kubectl patch statefulsets loki -p '{"spec": {"template": {"spec": {"nodeSelector": {"host": "ripley"}}}}}' -n monitoring