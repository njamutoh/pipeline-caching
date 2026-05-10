const _ = require("lodash");
const dayjs = require("dayjs");
const validator = require("validator");

const users = [
  { name: "bertrand", email: "bertrand@example.com", role: "devops", lastLogin: "2026-05-01" },
  { name: "alice", email: "alice@example.com", role: "developer", lastLogin: "2026-04-29" },
  { name: "mike", email: "not-an-email", role: "devops", lastLogin: "2026-03-18" },
  { name: "sarah", email: "sarah@example.com", role: "qa", lastLogin: "2026-05-08" },
  { name: "john", email: "john@example.com", role: "developer", lastLogin: "2026-04-15" }
];

function formatUser(user) {
  return {
    name: _.startCase(user.name),
    email: user.email,
    role: _.upperCase(user.role),
    validEmail: validator.isEmail(user.email),
    daysSinceLogin: dayjs().diff(dayjs(user.lastLogin), "day")
  };
}

const formattedUsers = users.map(formatUser);

const groupedByRole = _.groupBy(formattedUsers, "role");

console.log("Pipeline Caching Lab");
console.log("====================");
console.log(`Total users: ${formattedUsers.length}`);
console.log("");

Object.entries(groupedByRole).forEach(([role, members]) => {
  console.log(`${role}: ${members.length} user(s)`);

  members.forEach((user) => {
    const emailStatus = user.validEmail ? "valid email" : "invalid email";
    console.log(`- ${user.name} | ${emailStatus} | Last login: ${user.daysSinceLogin} day(s) ago`);
  });

  console.log("");
});

const invalidUsers = formattedUsers.filter((user) => !user.validEmail);

if (invalidUsers.length > 0) {
  console.log("Users with invalid emails:");
  invalidUsers.forEach((user) => console.log(`- ${user.name}: ${user.email}`));
}
