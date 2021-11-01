#!/bin/sh
echo "********************************************************************************************"
echo Creando NodeGroup ripley

aws eks create-nodegroup \
--region us-east-1 \
--cluster-name ripleyCluster \
--nodegroup-name ripley \
--scaling-config minSize=1,maxSize=3,desiredSize=1 \
--disk-size 20 \
--subnets subnet-25d2ec42 subnet-a9636787 \
--instance-types "t3.small" \
--ami-type "AL2_x86_64" \
--node-role arn:aws:iam::250359480282:role/kubernetesRole \
--tags Responsable=Gerardo,Criticidad=alta,Version=0.0.1,Funcionalidad=kubernetes \
--label host=ripley \
--profile personal

echo "********************************************************************************************"
echo Esperando a que se encuentre en estado ACTIVADO
aws eks wait nodegroup-active --cluster-name ripleyCluster --nodegroup-name ripley
echo ESTADO = ACTIVADO