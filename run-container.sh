#!/bin/bash

# arquivo de exemplo para iniciar o container
#export SOURCE_DIR='/home/appcivico/projects/De-Olho-Nas-Metas-2017'
<<<<<<< HEAD
export SOURCE_DIR='/home/jordan-eokoe/Renovation'
=======
export SOURCE_DIR='/home/renova/'
>>>>>>> 13e105150183426690f65c9802aac81e5ab86dfa
export DATA_DIR='/tmp/renova/data/'

# confira o seu ip usando ifconfig docker0|grep 'inet addr:'
export DOCKER_LAN_IP=$(ifconfig docker0 | grep 'inet addr:' | awk '{ split($2,a,":"); print a[2] }')

# porta que será feito o bind
export LISTEN_PORT=2500

docker run --name renova \
 -v $SOURCE_DIR:/src -v $DATA_DIR:/data \
 -p $DOCKER_LAN_IP:$LISTEN_PORT:2049 \
 --cpu-shares=512 \
 --memory 1800m -dit --restart unless-stopped appcivico/renova
<<<<<<< HEAD

 
=======
>>>>>>> 13e105150183426690f65c9802aac81e5ab86dfa
