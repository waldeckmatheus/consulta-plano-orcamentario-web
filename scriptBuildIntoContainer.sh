# Para imagem docker: androidsdk/android-31

echo 'Installing JDK 11...'
java -version || apt update -y && apt install openjdk-11-jdk -y

echo 'Checking and installing nvm...'
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo 'Installing gradle and exporting gradle bin to path...'
[ -d /opt/gradle/gradle-7.1.1/ ] && export PATH=$PATH:/opt/gradle/gradle-7.1.1/bin && gradle -v || \ 
 rm -f /tmp/gradle-7.1.1-bin.zip && \
 wget https://downloads.gradle-dn.com/distributions/gradle-7.1.1-bin.zip -P /tmp/ && \
 mkdir -p /opt/gradle/ && \
 unzip /tmp/gradle-7.1.1-bin.zip -d /opt/gradle/ && \
 export PATH=$PATH:/opt/gradle/gradle-7.1.1/bin && \
 gradle -v

echo 'Installing node 16.10.0...'
node -v || nvm install 16.10.0

echo 'Installing ionic/cli...'
ionic -v || npm install -g @ionic/cli

echo 'Installing cordova...'
cordova -v || npm i -g cordova

echo 'Installing build-tools Android...'
sdkmanager "build-tools;30.0.3"

echo 'Building...'
cd /consulta-plano-orcamentario-web && \
 nvm use 16.10.0 && \
 echo Y | ionic cordova platform rm android || echo 'ok' && \ 
 echo Y | cordova platform add android@10.1.2 && \ 
 ionic cordova build android --prod --release --packageType=bundle && \
 cordova build android --buildConfig --release --prod -- --packageType=apk
