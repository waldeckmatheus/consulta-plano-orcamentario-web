


## Consulta Plano Orçamentário App

Em construção...

### Tabela de conteúdo do readme
- [Publicações](#publicações)
	 - [Google Play](#google-play)
- [Instalação inicial](#instalação-inicial)
  - [Node Version Manager (NVM)](#node-version-manager-nvm)
  - [Ionic Client](#ionic-client)
  - [Cordova](#cordova)
    - [Android Version](#cordova-android-version)
  - [Build for Android](#build-for-android)
  - [Fontes](#fontes)

### Publicações
#### Google Play
- App: Autoestudo Plano Orçamentário
	- Disponível em: https://play.google.com/store/apps/details?id=br.com.waldeckmatheus.cpo

### Instalação inicial
#### Node version manager (NVM)
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    $ nvm install 18.3.0
    
#### Ionic client
    $ npm install -g @ionic/cli

#### Cordova
    $ npm i -g cordova
    $ ionic integrations disable capacitor

###### Cordova Android Version
    $ ionic cordova platform rm android
    $ cordova platform add android@8.0.0

###### Cordova Telemetria
    $ cordova telemetry [on|off]

#### Build for android
    $ ionic cordova build android --prod --release --verbose

#### Resumo do build em container
- https://github.com/waldeckmatheus/consulta-plano-orcamentario-web/blob/main/scriptBuildIntoContainer.sh

### Fontes
| Nome  | URL |
|--|--|
| NVM  | https://github.com/nvm-sh/nvm |
| Angular | https://angular.io/docs |
| Ionic/Cli | https://ionicframework.com/docs/intro/cli |
| Ionic Components | https://ionicframework.com/docs/components |
| Capacitor Build | https://ionicframework.com/docs/cli/commands/capacitor-build |
| Ionic Android | https://ionicframework.com/docs/developing/android |
| Apache Cordova | https://cordova.apache.org/docs/en/11.x/guide/overview/index.html |
| Cordova Android | https://github.com/apache/cordova-android/releases |
| Docker Android | https://hub.docker.com/r/androidsdk/android-31 |
| Docker Compose | https://docs.docker.com/compose/ |
| Gradle | https://gradle.org/install/ |

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
