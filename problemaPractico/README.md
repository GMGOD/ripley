ir a la carpeta ./aws/yml/ y ejecutarla, tomar el rol creado y pasarlo al archivo ./aws/scripts/cluster.sh donde corresponde, cambiar el --profile por el que corresponda

recordar que el perfil que coloques tiene que tener acceso a eks:CreateCluster si no dara error, por tal tambien se crea un rol kubernetesUserRole para asignarle al usuario, pero igual sera necesario agregar el eks:CreateCluster

Crear el nodegroup ./aws/scripts/nodegroup.sh

