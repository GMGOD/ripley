#!/bin/bash
source ./settings.conf

echo "init"
	docker login -u AWS -p $(aws ecr get-login-password --region $REGION) $AWS_EKS

	echo "==================== backend ===================="
	docker build -t backend $PATH_BACKEND/ -f $PATH_BACKEND/dockerfile --no-cache
	docker tag backend:latest $AWS_EKS/backend:latest
	docker push $AWS_EKS/backend:latest

	kubectl delete deploy/backend
	kubectl delete service/backend
	kubectl apply -f $EXPORTS/deployments/backend.yaml
	# kubectl --record deployment.apps/backend set image deployment.apps/backend backend=250359480282.dkr.ecr.us-east-1.amazonaws.com/backend:latest
	kubectl expose deployment backend --port=4502
	echo "success backend --port=4502 --host=ripley"

	echo "==================== frontend ===================="
	docker build -t backend $PATH_FRONTEND/ -f $PATH_FRONTEND/dockerfile --no-cache
	docker tag frontend:latest $AWS_EKS/frontend:latest
	docker push $AWS_EKS/frontend:latest

	kubectl delete deploy/frontend
	kubectl delete service/frontend
	kubectl apply -f $EXPORTS/deployments/frontend.yaml
	# kubectl --record deployment.apps/frontend set image deployment.apps/frontend frontend=250359480282.dkr.ecr.us-east-1.amazonaws.com/frontend:latest
	kubectl expose deployment frontend --port=80
	echo "success frontend --port=80 --host=ripley"

echo "====================="

