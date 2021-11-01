# Esto es solo una guia a seguir, ejecutar cada comando por separado
cd ./yml
sls deploy --stage prod --aws-profile personal -v -c iamRoleK8s.yml 

# Ejecutar luego de crear el rol
./scripts/nodegroup.sh

# 

