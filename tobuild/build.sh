CONTAINER_ID=ce3

echo 'Cleaning old tar.gz...'
rm -f /tmp/consulta-plano-orcamentario-web.tar.gz
echo 'Compressing project to tar.gz'
tar -czf /tmp/consulta-plano-orcamentario-web.tar.gz -C /home/waldeck/git/ consulta-plano-orcamentario-web/
echo 'Copying tar.gz to container...'
docker cp /tmp/consulta-plano-orcamentario-web.tar.gz $CONTAINER_ID:/
echo 'Copying scriptBuildIntoContainer.sh...'
docker cp scriptBuildIntoContainer.sh $CONTAINER_ID:/
echo 'Removing old app folder...'
docker exec -it $CONTAINER_ID bash -c 'rm -Rf /consulta-plano-orcamentario-web'
echo 'Uncompressing tar.gz in container...'
docker exec -it $CONTAINER_ID bash -c 'tar -zxf /consulta-plano-orcamentario-web.tar.gz --directory /' 
echo 'Setting permissions to current user of container and flag of execution on script...'
docker exec -it $CONTAINER_ID bash -c 'chown root:root /scriptBuildIntoContainer.sh && chmod a+x /scriptBuildIntoContainer.sh && chown root:root -R /consulta-plano-orcamentario-web'
echo 'Installing build-essential (contains dependencies for node 18.5.0 and application)'
docker exec -it $CONTAINER_ID bash -c 'apt-get update && apt-get install build-essential -y && ldconfig'
echo 'building...'
docker exec -it $CONTAINER_ID bash -c '/scriptBuildIntoContainer.sh'
docker cp $CONTAINER_ID:/consulta-plano-orcamentario-web/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk .
echo 'Copying app bundle...'
docker cp $CONTAINER_ID:/consulta-plano-orcamentario-web/platforms/android/app/build/outputs/bundle/release/app-release.aab .
echo 'Signing apk...'
/home/waldeck/git/consulta-plano-orcamentario-web/tobuild/signApk.sh
echo 'Signing aab...'
/home/waldeck/git/consulta-plano-orcamentario-web/tobuild/signAab.sh
