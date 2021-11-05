#!/bin/bash

DEPLOYMENTS="../aws/exports/deployments"

kubectl apply -f $DEPLOYMENTS/metrics/metrics-server.yaml
kubectl apply -f $DEPLOYMENTS/metrics/cluster-autoscaler-autodiscover.yaml

sh $DEPLOYMENTS/metrics/prometheus/hack.sh