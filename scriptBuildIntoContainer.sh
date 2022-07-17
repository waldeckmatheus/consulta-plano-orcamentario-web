# Para imagem docker: waldeckmatheusbelo/androidsdk-cordova-ionic:latest

PATH=$PATH:/opt/gradle/gradle-7.1.1/bin && \
 NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \ 
 cd /consulta-plano-orcamentario-web && \
 nvm use 18.5.0 && \
 echo Y | ionic cordova platform rm android || echo 'ok' && \ 
 echo Y | cordova platform add android@10.1.2 && \ 
 ionic cordova build android --prod --release --packageType=bundle && \
 cordova build android --buildConfig --release --prod -- --packageType=apk
