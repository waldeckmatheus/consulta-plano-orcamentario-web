#https://hub.docker.com/r/androidsdk/android-21
#https://ionicframework.com/docs/components
#https://angular.io/docs
#https://ionicframework.com/docs/cli/commands/capacitor-build
#https://cordova.apache.org/docs/en/11.x/guide/overview/index.html
#https://github.com/apache/cordova-android/releases
#https://ionicframework.com/docs/intro/cli
#https://github.com/nvm-sh/nvm
#https://ionicframework.com/docs/developing/android
#https://gradle.org/install/

#https://pixabay.com/photos/money-coin-investment-business-2724241/

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 16.10.0
npm install -g @ionic/cli
npm i -g cordova

ionic integrations disable capacitor

ionic cordova platform rm android
cordova platform add android@8.0.0

cordova telemetry off
ionic cordova build android --prod --release --verbose
