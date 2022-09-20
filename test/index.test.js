//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { SaveNewOrder } = require("../controllers/order");
const app = require("../app");
const dayjs = require("dayjs");


const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const mongoose = require("mongoose");
const Order = require("../models/Order");

//Our parent block
describe("Orders Unit Tests", () => {
    beforeEach((done) => {
        // empty the database before each test.
        Order.deleteMany({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET all route
     */
    describe("/GET all orders", () => {
        it("it should GET all the Orders (because currently there aren't orders it should return an empty array", (done) => {
            chai
                .request(app)
                .get("/api/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
     * Test the /GET all last day orders route
     */
    describe("/GET all last day orders", () => {
        it("it should GET all last day orders - add new order with today date - expect GET last day order to be an empty array ", (done) => {
            const newOrder = new Order({
                first_name: "Shay",
                last_name: "Mor",
                phone: "05478372635",
                address: "TLV",
                quantity: 1,
                dish_name: "Salad",
                date: dayjs().startOf("day").toDate()
            });
            newOrder.save((err, newOrder) => {
                chai.request(app)
                    .get("/api/lastDayOrders")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.be.eql(0);
                        done();
                    });

            });
        });
        it("it should GET all last day orders - add new order with yesterday date - expect GET last day order to get this order ", (done) => {
            const newOrder = new Order({
                first_name: "Shay",
                last_name: "Mor",
                phone: "05478372635",
                address: "TLV",
                quantity: 1,
                dish_name: "Salad",
                date: dayjs().startOf("day").subtract(1, "day").toDate()
            });
            newOrder.save((err, newOrder) => {
                chai.request(app)
                    .get("/api/lastDayOrders")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.be.eql(1);
                        res.body[0].first_name.should.eql("Shay");
                        res.body[0].last_name.should.eql("Mor");
                        res.body[0].phone.should.eql("05478372635");
                        res.body[0].address.should.eql("TLV");
                        res.body[0].quantity.should.eql(1);
                        res.body[0].dish_name.should.eql("Salad");
                        done();
                    });

            });
        });
    });

    /*
     * Test the /POST route
     */
    describe("Save new order functionality", function() {
        it("should POST an order", (done) => {
            const newOrder = {
                first_name: "Shay",
                last_name: "Mor",
                phone: "05478372635",
                address: "TLV",
                quantity: "1",
                dish_name: "Salad",
            };
            chai
                .request(app)
                .post("/api/")
                .send(newOrder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("first_name");
                    res.body.should.have.property("last_name");
                    res.body.should.have.property("phone");
                    res.body.should.have.property("address");
                    res.body.should.have.property("quantity");
                    res.body.should.have.property("dish_name");
                    done();
                });
        });
        it("should not POST an order when there are no parameters", (done) => {
            const newOrder = {};
            chai
                .request(app)
                .post("/api/")
                .send(newOrder)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    console.log(res.error.text);
                    res.error.text.should.eql("OrderSchema validation failed: first_name: Path `first_name` is required., last_name: Path `last_name` is required., phone: Path `phone` is required., address: Path `address` is required., quantity: Path `quantity` is required., dish_name: Path `dish_name` is required.")
                    done();
                });
        });
        it("should not POST an order if the parameters aren't valid", (done) => {
            const newOrder = {
                first_name: "Shay5",
                last_name: "Mor5",
                phone: "linoy05478372635",
                address: "TLV",
                quantity: "0",
                dish_name: "Salad5555",
            };
            chai
                .request(app)
                .post("/api/")
                .send(newOrder)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    console.log(res.error.text);
                    res.error.text.should.eql("OrderSchema validation failed: first_name: Validator failed for path `first_name` with value `Shay5`, last_name: Validator failed for path `last_name` with value `Mor5`, phone: Validator failed for path `phone` with value `linoy05478372635`, quantity: Path `quantity` (0) is less than minimum allowed value (1)., dish_name: Validator failed for path `dish_name` with value `Salad5555`")
                    done();
                });
        });
    });
});