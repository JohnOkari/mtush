# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.destroy_all
Cart.destroy_all
Product.destroy_all
#
testuser = User.create!(
  username: "test1user",
  password: "password1",
  name: "steven1"
)

testuser2 = User.create!(
  username: "test2user",
  password: "password2",
  name: "steven2"
)

# testuser = User.create!(username: "test1user", password_digest:BCrypt::Password.create('password'), name: "steven")
# testuser2 = User.create!(username: "test2user", password_digest:BCrypt::Password.create('password'), name: "steven2")

cart1 = Cart.create!(name: "testcart", quantity: 2, total_price: 15, ordered: false, user: testuser)
cart2 = Cart.create!(name: "testcart2", quantity: 1, total_price: 5, ordered: false, user: testuser2)

product1 = Product.create(image:"https://i.pinimg.com/564x/84/ef/11/84ef110854b5a070ea29c8a07e3baaa9.jpg" ,name: "vintage pants", title: "human made", description: "codrae", price: 300, quantity: 10 )
product2 = Product.create( image:"https://i.pinimg.com/564x/14/ef/30/14ef302062b926878c7855667d1cb270.jpg", name: "sweat shirt", title: "hard rock", description: "cotton", price: 200, quantity: 20 )
product3 = Product.create( image:"https://i.pinimg.com/564x/b3/9e/60/b39e6022d3c80a377b403066f95dd98d.jpg", name: "truck jacket", title: "nebraska", description: "nylon", price: 500, quantity: 100, cost: 5,  seller_id: 1 )

product4 = Product.create(image:"https://i.pinimg.com/564x/98/83/f7/9883f7664e18634f23debce1716bacc3.jpg" ,name: "vintage pants", title: "human made", description: "codrae", price: 450, quantity: 10 )