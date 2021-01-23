import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id: ID!
    email: String!
    token: String!
}
input UserInput {
    email: String!
    password: String!
    confirm: String!
}

type Customer {
  id: ID!
  firstname: String
  lastname: String
  email: String
  projects: [Project]
}
input CustomerInput {
  firstname: String
  lastname: String
  email: String
}
type Project {
  id: ID!
  name: String
  tasks: [Task]
}
input ProjectInput {
  name: String
  UserId: ID!
}
type Task {
  id: ID!
  description: String
  ProjectId: ID!
}
input TaskInput {
  description: String
  ProjectId: ID!
}


type Buyer {
  _id: ID!
  title: String!,
  date: Date,
  content: String,
  address: String,
  emailId: String,
  contactNo:String,
  invoiceNo:String,
  deliveryNote:String,
  supplierRef:String,
  otherRef:String,
  buyersOrderNo:String,
  dispatchDocumentNo:String,
  deliveryNoteDate:String,
  dispatchedThrough:String,
  destination:String,
  termsOfDelivery:String,
  srNo:String,
  disriptionOfGoods:String,
  sirNo:String,
  modelNo:String,
  hsnsac:String,
  quantity:String,
  rate:String,
  per:String,
  discount:String,
  amount:String,
  totalAmount:String,
  totalAmountInWords:String
 }

 input BuyerInput {
  title: String!,
  content: String,
  address: String,
  emailId: String,
  contactNo:String
  invoiceNo:String,
  deliveryNote:String,
  supplierRef:String,
  otherRef:String,
  buyersOrderNo:String,
  dispatchDocumentNo:String,
  deliveryNoteDate:String,
  dispatchedThrough:String,
  destination:String,
  termsOfDelivery:String,
  srNo:String,
  disriptionOfGoods:String,
  sirNo:String,
  modelNo:String,
  hsnsac:String,
  quantity:String,
  rate:String,
  per:String,
  discount:String,
  amount:String,
  totalAmount:String,
  totalAmountInWords:String
}

 input BuyerUpdateInput {
  title: String
  content: String
  address: String
  emailId: String
  contactNo:String
  invoiceNo:String
  deliveryNote:String
  supplierRef:String
  otherRef:String
  buyersOrderNo:String
  dispatchDocumentNo:String
  deliveryNoteDate:String
  dispatchedThrough:String
  destination:String
  termsOfDelivery:String
  srNo:String
  disriptionOfGoods:String
  sirNo:String
  modelNo:String
  hsnsac:String
  quantity:String
  rate:String
  per:String
  discount:String
  amount:String
  totalAmount:String
  totalAmountInWords:String
 }

 scalar Date

type RootQuery {
    login(email: String!, password: String!): User
    verifyToken(token: String!): User
    getBuyer(_id: ID!):Buyer
    allBuyers: [Buyer]
    customer(id: ID): Customer
    customers: [Customer]
    project(id: ID!): Project
    projects: [Project]   
    task(id: ID!): Task
    tasks: [Task]
 
}
type RootMutation {
    createUser(userInput: UserInput): User
    createBuyer(input: BuyerInput) : Buyer
    updateBuyer(_id: ID!, input: BuyerUpdateInput): Buyer
    deleteBuyer(_id: ID!) : Buyer

   createCustomer(input: CustomerInput!): Customer
  updateCustomer(id: ID!, input: CustomerInput!): Customer
  removeCustomer(id: ID!): Customer
  createProject(input: ProjectInput!): Project
  updateProject(id: ID!, input: ProjectInput!): Project
  removeProject(id: ID!): Project
  createTask(input: TaskInput!): Task
  updateTask(id: ID!, input: TaskInput!): Task
  removeTask(id: ID!): Task
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
