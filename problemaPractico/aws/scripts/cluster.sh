#!/bin/sh
echo "********************************************************************************************"
echo Creando Cluster ripleyCluster

aws eks create-cluster \
--region us-east-1 \
--name ripleyCluster \
--kubernetes-version 1.21 \
--role-arn arn:aws:iam::250359480282:role/kubernetesRole \
--resources-vpc-config subnetIds=subnet-25d2ec42,subnet-a9636787,securityGroupIds=sg-e9ce4aba \
--profile personal

echo "********************************************************************************************"
echo Esperando a que se encuentre en estado ACTIVADO
aws eks wait cluster-active --name ripleyCluster
echo ESTADO = ACTIVADO