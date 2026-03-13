const { hashPassword, verifyPassword } = require("../backend/auth");
const pass = "student_secure_123";
const hashed = hashPassword(pass);
if (verifyPassword(pass, hashed)) {
  console.log(" Unit Test Passed: Password Hashing is functional.");
} else {
  console.log(" Unit Test Failed.");
  process.exit(1);
}
