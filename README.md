# Installation Guide
1.  Clone or download the source code.
2. Create a **constants.ts** file in the **src/auth** path to be used as a key for Jwt authentication token. The file template should look like this:
	```
	export  const  jwtConstants  =  {
		secret:  'YOUR_SECRET_VALUE',
	};
	```
	The value of the secret in the jwtConstants object is a user-defined secret and must be kept confidential.
3. We need to [install Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-npm) to use the command line for Firebase. If we use npm (Node Package Manager), we can follow these steps:
	```
	npm install -g firebase-tools
	```
4. Create a Project in the [Firebase console](https://console.firebase.google.com/) and upgrade the project from Spark plan to Blaze plan (remember to set a maximum budget to avoid unexpected charges from using Firebase services).
  The image shows the Firebase console:
  ![firebase-console](/assets/firebase-console.jpeg)
  Image showing project creation:
  ![create-project-1](/assets/create-project-1.jpeg)
  ![create-project-2](/assets/create-project-2.jpeg)
  ![create-project-3](/assets/create-project-3.jpeg)
  ![create-project-success](/assets/create-project-success.jpeg)
  ![in-project](/assets/in-project.jpeg)
  Image showing project upgrade from Spark plan to Blaze plan:
  ![upgrade-plan](/assets/upgrade-plan.jpeg)
5. Run the command `firebase login`.
6. Run the command `firebase init functions` to create Firebase function.
  An example of running the command `firebase init functions` is shown in the following image:
  ![firebase-init-1](/assets/firebase-init-1.png)
  ![firebase-init-2](/assets/firebase-init-2.png)
	After that, the functions folder, firebase.json file, and .firebaserc file will be added.
7. Delete the functions folder.
8. Modify the firebase.json file as follows:
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
9. Connect Firebase Admin to our Nest to use various Firebase services by downloading the JSON file of the Service Account, as shown in the example:
  ![create-service-account](/assets/create-service-account.jpeg)
	Example of the Service Account file:
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
10. Then set the functions config using the following template command:
	```
	firebase functions:config:set admin_firebase_config.property=value
	```
	For example, if we want to set the type of the service account, we can do it as follows:
	```
	firebase functions:config:set admin_firebase_config.type="service_account"
	```
	The result can be viewed by running the command `firebase functions:config:get`.
	```
	{                                            
		"admin_firebase_config": {                                  	
		"type": "service_account"                               		
		}
	}
	```
	Then do this for every property of the service account.
11. Functions can only be used in the cloud, not on localhost. Therefore, run the following command:
	```
	firebase functions:config:get > .runtimeconfig.json
	```
	Then, we will get the .runtimeconfig.json file, which stores information about the configured service account.
12. Run the command `npm i` to install relevant packages.
13. Run the command `npm run serve` to run the server on localhost.
	If the following message appears, the server is running normally:
	```
	functions[us-central1-api]: http function initialized (http://127.0.0.1:5001/my-project-e2bea/us-central1/api).
	```
14. If we want to deploy, run the command `npm run deploy`.
