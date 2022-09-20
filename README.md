<h2>To get the app running locally:</h2>

1. Clone the the repository.
2. Install the node modules <code>npm install</code>.
3. Mongodb should run on your machine, visit [MongoDb](https://www.mongodb.com/docs/manual/administration/install-community/) for more information.
3. Run the <code>app npm start</code>.
4. The app available at http://localhost:8000.
5. Access the paths mentioned above by using Postman.

<h1>REST API Functions</h1>
<h2>GET all Orders</h2>
Send a get request to [http://localhost:8000/api/]
<h2>GET all Last Day Orders</h2>
Send a get request to [http://localhost:8000/api/lastDayOrders](http://localhost:8000/api/lastDayOrders)
<h2>POST new Order</h2>
Send a POST request to [http://localhost:8000/api/](http://localhost:8000/api/) with the following parameters:
  first_name, last_name, phone, address, quantity, dish_name, comments (optional)

