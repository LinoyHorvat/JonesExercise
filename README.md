<h1>REST API Functions</h1>
<h2>GET all Orders</h2>
Send a get request to <a href="http://localhost:8000/api/" target="_blank">localhost:8000/api</a> 
<h2>GET all Last Day Orders</h2>
Send a get request to <a href="http://localhost:8000/api/lastDayOrders/" target="_blank">localhost:8000/api/lastDayOrders</a> 
<h2>POST new Order</h2>
Send a POST request to <a href="http://localhost:8000/api/" target="_blank">localhost:8000/api</a>  with the following parameters:
  first_name, last_name, phone, address, quantity, dish_name, comments (optional)

<h1>To get the app running locally:</h1>

1. Clone the the repository.
2. Install the node modules <code>npm install</code>.
3. Mongodb should run on your machine, visit [MongoDb](https://www.mongodb.com/docs/manual/administration/install-community/) for more information.
4. add a <code>.env</code> file with the following parameter: 
<code>MONGO_URL=mongodb+srv://YammieOrder:**Password**@yammieorder.42rhweg.mongodb.net/YammieOrder</code>
And replace the Password to the given password.
5. Run the <code>npm start</code>.
6. The app available at http://localhost:8000.
7. Access the paths mentioned above by using Postman.
