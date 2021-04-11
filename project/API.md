
# SiteCrawler



## Indices

* [Site](#site)

  * [Create Site](#1-create-site)
  * [Delete Site](#2-delete-site)
  * [Get Site](#3-get-site)
  * [Get Sites](#4-get-sites)
  * [Update Site](#5-update-site)

* [SiteCrawl](#sitecrawl)

  * [Create Site Crawl](#1-create-site-crawl)
  * [Delete Site Crawl](#2-delete-site-crawl)
  * [Get Site Crawl](#3-get-site-crawl)
  * [Get Site Crawls](#4-get-site-crawls)
  * [Update Site Crawl](#5-update-site-crawl)


--------


## Site



### 1. Create Site



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/sites/
```



***Body:***

```js        
{
    "site" : "http://example.com"
}
```



### 2. Delete Site



***Endpoint:***

```bash
Method: DELETE
URL: http://localhost:3000/api/v1/sites/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 | id of the site you want to update |



### 3. Get Site



***Endpoint:***

```bash
Method: GET
URL: http://localhost:3000/api/v1/sites/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 | id of the site you want to retrieve |



### 4. Get Sites



***Endpoint:***

```bash
Method: GET
URL: http://localhost:3000/api/v1/sites
```



### 5. Update Site



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:3000/api/v1/sites/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 1 | id of the site you want to update |



***Body:***

```js        
{
    "site" : "http://example.com"
}
```



## SiteCrawl



### 1. Create Site Crawl



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/sites/:site_id/site_crawls/
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| site_id | 1 | id of the site where you want to create a crawl |



***Body:***

```js        
{}
```



### 2. Delete Site Crawl



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/v1/sites/:site_id/site_crawls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| site_id | 1 | id of the site where the site crawl is on |
| id | 1 | id of the site crawl you want to delete |



### 3. Get Site Crawl



***Endpoint:***

```bash
Method: GET
URL: http://localhost:3000/api/v1/sites/:site_id/site_crawls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| site_id | 1 | id of the site where the site crawl is on |
| id | 1 | id of the site crawl |



### 4. Get Site Crawls



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/v1/sites/:site_id/site_crawls/
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| site_id | 1 | id of the site where the site crawl is on |



### 5. Update Site Crawl



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:3000/api/v1/sites/:site_id/site_crawls/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| site_id | 1 | id of the site where the site crawl is on |
| id | 1 | id of the site crawl you want to update |



***Body:***

```js        
{
    "platform": 0,
    "userAgent": 0,
    "plugins": 0,
    "mimeTypes": 0,
    "doNotTrack": 0,
    "languages": 0,
    "productSub": 0,
    "language": 0,
    "vendor": 0,
    "oscpu": 0,
    "hardwareConcurrency": 0,
    "cpuClass": 0,
    "webdriver": 1,
    "maxTouchPoints": 0,
    "appVersion": 0,
    "appCodeName": 0,
    "cookieEnabled": 0,
    "ready": true
}
```



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| url | http://localhost:3000/ |  |



---
[Back to top](#sitecrawler)
