## 專案名稱 [熱門餐廳搜尋網站]
藉由NodeJS平台使用後端Express框架以及前端Bootstrap框架, 打造簡易的熱門餐廳搜索網站, 其中可以針對目前熱門餐廳進行排名, 搜尋, 以及獲得各熱門餐廳介紹...

### 專案畫面
![image](https://github.com/LettuceLu751103/restaurant_remote/blob/master/restaurant-login.png)
![image](https://github.com/LettuceLu751103/restaurant_remote/blob/master/%E9%A4%90%E5%BB%B3%E6%B8%85%E5%96%AEv2.png)



### 產品功能
1. 使用者可以針對熱門餐廳進行瀏覽(簡介圖片, 餐廳名稱, 評分等級...)
2. 使用者可以針對熱門餐廳進行搜索 Search (中, 英文名稱模糊搜索...)
3. 使用者可以查看熱門餐廳詳細資料 Detail 連結(包含類別, 地址, 電話, 介紹說明...)
4. 使用者可以新增單一筆熱門餐廳資訊
5. 使用者可以刪除單一筆熱門餐廳資訊
6. 使用者可以更改單一筆熱門餐廳資訊
7. 使用者可以註冊帳號
8. 使用者可以使用Facebook進行登入
9. 使用者可以進行登出

### 建置環境
```
1. express : 4.17.1,
2. express-handlebars : 5.3.0,
3. node.JS : v10.15.0,
4. bootstrap : 4.2
5. mongo DB : 4.2.5
```

### 專案安裝流程

1. 下載專案
```
git clone https://github.com/LettuceLu751103/restaurant_remote.git
```


2. 切換目錄
```
cd ./restaurant_remote
```

3. 安裝套件
```
npm install
```

4. 啟動服務器
```
npm run dev
```
5. 匯入初始資料到資料庫
```
npm run seed
```

6. 啟動成功
```
出現以下字樣
The Server is running at: http://localhost:3000
```

### 專案開發人員
Lettuce Lu
