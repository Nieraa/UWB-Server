# คู่มือการติดตั้งเพื่อใช้งาน
1.  Clone หรือ Download Source code
2. สร้าง file **constants.ts** ใน path **src/auth** เพื่อใช้เป็น key สำหรับ Jwt authentication token โดยรูปแบบของ file มี Template ดังนี้:
	```
	export  const  jwtConstants  =  {
		secret:  'YOUR_SECRET_VALUE',
	};
	```
	โดยที่ค่า secret ที่อยู่ใน jwtConstants object เป็นค่าที่กำหนดขึ้นเอง และต้องเป็นความลับ
3. เราต้อง [install Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm) เพื่อใช้ command line สำหรับ Firebase โดยถ้าหากใช้ npm (Node Package Manager) สามารถทำตามได้ดังนี้:
	```
	npm install -g firebase-tools
	```
4. สร้าง Project ใน [Firebase console](https://console.firebase.google.com/) และ upgrade project จาก Spark plan เป็น Blaze plan (อย่าลืมตั้งงบสูงสุด เพื่อกันการเสียเงินโดยไม่รู้ตัวจากการใช้บริการ firebase)
  ภาพแสดง โรพำิฟหำ console:
  ![firebase-console](/assets/firebase-console.jpeg)
  ภาพแสดงการสร้าง Project:
  ![create-project-1](/assets/create-project-1.jpeg)
  ![create-project-2](/assets/create-project-2.jpeg)
  ![create-project-3](/assets/create-project-3.jpeg)
  ![create-project-success](/assets/create-project-success.jpeg)
  ![in-project](/assets/in-project.jpeg)
  ภาพแสดงการ upgrade project จาก Spark plan เป็น Blaze plan:
  ![upgrade-plan](/assets/upgrade-plan.jpeg)
5. Run command `firebase login` 
6. Run command `firebase init functions` เพื่อสร้าง Firebase function
  ภาพแสดงตัวอย่างการ run command `firebase init functions`:
  ![firebase-init-1](/assets/firebase-init-1.png)
  ![firebase-init-2](/assets/firebase-init-2.png)
	จากนั้นจะมี folder functions, file firebase.json และ .firebaserc เพิ่มขึ้นมา
7. ลบ folder functions
8. แก้ไข file firebase.json  ดังนี้:
	```
	{
	  "functions": [
	    {
	      "source": ".",
	      "codebase": "default",
	      "ignore": [
	        "node_modules",
	        ".git",
	        "firebase-debug.log",
	        "firebase-debug.*.log"
	      ],
	      "predeploy": [
	        "npm --prefix \"$RESOURCE_DIR\" run build"
	      ]
	    }
	  ]
	}
	```
9. เชื่อมต่อระบบ Firebase Admin เข้ากับ Nest ของเราเพื่อใช้บริการต่าง ๆ ของ Firebase โดย Download file JSON ของ Service Account ดังตัวอย่าง:
  ![create-service-account](/assets/create-service-account.jpeg)
	ตัวอย่างของ file Service Account:
	```
	{
	  "type": "service_account",
	  "project_id": "my-project-e2bea",
	  "private_key_id": "your-private-key-id",
	  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
	  "client_email": "your-client-email.iam.gserviceaccount.com",
	  "client_id": "your-client-id",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://oauth2.googleapis.com/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-something.iam.gserviceaccount.com"
	}
	```
10. จากนั้น set functions config โดย command จะมี template ดังนี้:
	```
	firebase functions:config:set admin_firebase_config.property=value
	```
	เช่น ถ้าเราต้องการ set type ของ service account จะทำดังนี้:
	```
	firebase functions:config:set admin_firebase_config.type="service_account"
	```
	สามารถดูผลลัพธ์ได้จากการ run command `firebase functions:config:get`
	```
	{                                            
		"admin_firebase_config": {                                  	
		"type": "service_account"                               		
		}
	}
	```
	จากนั้นทำกับทุก property ของ service account
11. แต่ functions จะใช้ได้แค่บน cloud แต่ใช้ใน localhost ไม่ได้ จึงต้อง run command ดังนี้:
	```
	firebase functions:config:get > .runtimeconfig.json
	```
	จากนั้นจะได้ file .runtimeconfig.json มาซึ่งเก็บข้อมูลเกี่ยวกับ service account ที่เราได้ config ไป
12. Run command `npm i` เพื่อ install package ที่เกี่ยวข้อง
13. Run command `npm run serve` เพื่อ run server บน localhost
	ถ้าหากมีข้อความตามนี้อยู่ แสดงว่า server สามารถ run ได้ปกติ
	```
	functions[us-central1-api]: http function initialized (http://127.0.0.1:5001/my-project-e2bea/us-central1/api).
	```
14. ถ้าหากอยาก deploy ให้ run command `npm run deploy`
