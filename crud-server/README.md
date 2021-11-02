# To run 
For windows : npm run dev_for_windows
For linux : npm run dev_for_linux

# End Points
Fetch All users : GET http://localhost:9000/user/read

Fetch specific user : GET http://localhost:9000/user/{:userId}/read

Edit user : PUT http://localhost:9000/user/{:userId}/edit

Create user : POST http://localhost:9000/user/create

Delete user : DELETE http://localhost:9000/user/{:userId}/delete