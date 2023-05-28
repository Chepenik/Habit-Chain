const path = require("path");

module.exports = {
  connection: {
    host: "ec2-44-213-228-107.compute-1.amazonaws.com",
    user: "hmvnhklzdjqlvv",
    password: "7c7df2e86bf30732fc3114c368cd7c36297e9be858604a34f0a7045704a815bc",
    database: "ddlm1nm7b9ha45",
    port: 5432,
    ssl: { rejectUnauthorized: false } // Add this line for SSL configuration
  },
  client: "pg",
  migrations: {
    directory: path.join(__dirname, "src", "db", "migrations"),
    extension: "cjs",
    stub: path.join(__dirname, "src", "db", "migrations", "migration.stub.cjs"),
  },
};