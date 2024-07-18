Access to the database was granted, and a Postman collection was also shared with you to execute the endpoints ( https://api.postman.com/collections/17783225-36bb1541-16c4-4480-b674-aa3adec836bc?access_key=PMAT-01HVPQMV7P5336XDSDGX4D2SZK ) .

Follow the steps below to execute the application correctly:

1 - First, run the command "npm install" to install the necessary packages for the proper functioning of the app. Then, execute "npm start" to start running the program.

2 - It is necessary to register via the "/auth/register" endpoint to create an User. This endpoint registers a user in the database with an encrypted password and returns a token.

3 - After registering, you need to log in using the "/auth/login" endpoint, and in the request header, you need to add the "x-access-token" field, with the value being the token received from the registration endpoint. Both tokens have a duration of 1 hour.

Queries can now be made to the different endpoints, always adding the "x-access-token" field in the header.

The endpoint to generate the RefreshToken with a duration of 6 hours is also available.


