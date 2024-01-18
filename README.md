
Server-Side APIs Readme
This readme file provides an overview of the server-side APIs implemented in the codebase. The server is built using Express.js, and it consists of three main modules: authentication, notes, and user management.

Authentication APIs
1. Login
Endpoint: /login
Method: POST
Controller: authController.login
Description: Authenticates a user based on provided credentials.
2. Register
Endpoint: /register
Method: POST
Controller: authController.registerUser
Description: Registers a new user by creating an account.

Notes APIs
1. Fetch All Notes
Endpoint: /
Method: GET
Controller: noteController.fetchAllNotes
Description: Retrieves all notes.
2. Create Note
Endpoint: /
Method: POST
Controller: noteController.createNote
Description: Creates a new note.
3. Fetch Note by ID
Endpoint: /:id
Method: GET
Controller: noteController.fetchNote
Description: Retrieves a specific note by ID.
4. Update Note
Endpoint: /:id
Method: PUT
Controller: noteController.updateNote
Description: Updates a specific note by ID.
5. Delete Note
Endpoint: /:id
Method: DELETE
Controller: noteController.deleteNote
Description: Deletes a specific note by ID.
6. Search Note
Endpoint: /search
Method: POST
Controller: noteController.searchNote
Description: Searches for notes based on provided criteria.


User APIs
1. Fetch User
Endpoint: /
Method: GET
Controller: userController.fetchUser
Description: Retrieves user information.
2. Update User
Endpoint: /
Method: PUT
Controller: userController.updateUser
Description: Updates user information.
