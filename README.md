
# Sites to crawl

All the sites who will ber crawled are inserted in the sites.json file

# Output result

The result of the crawl will be saved on a file inside a folder named out/results_(timestamp).json


Example of the result file:

```json
[
   {
      "platform":true,
      "userAgent":true,
      "plugins":true,
      "mimeTypes":true,
      "doNotTrack":true,
      "languages":true,
      "productSub":true,
      "language":true,
      "vendor":true,
      "oscpu":false,
      "hardwareConcurrency":true,
      "cpuClass":false,
      "webdriver":true,
      "maxTouchPoints":true,
      "appVersion":false,
      "appCodeName":false,
      "cookieEnabled":true,
      "site":"http://amiunique.org/fp"
   }
]
```

# Building Docker container

> docker build -t node-doc .


# Running docker container and redirectiong file output out of docker

> docker run -v /home/lg/Documentos/doutorado/teste/out:/usr/src/app/out node-doc




