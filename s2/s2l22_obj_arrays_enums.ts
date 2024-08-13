// const person: {
//   name: string;
//   age: number;
// } = {

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; // this is a TUPLE - special kind of array;
// } = { name: "Peter", age: 36, hobbies: ["sports", "cooking"], role: [2, "author"] };

// This is the valilla JS option to store "roles" in enum-kind of way;
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// Same with the TS:

// default way:
// enum Role {
//   ADMIN, // 0
//   READ_ONLY, // 1
//   AUTHOR, // 2
// }

// IDs could be re-assigned:
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR = 200,
}

console.log(Role);

const person = { name: "Peter", age: 36, hobbies: ["sports", "cooking"], role: Role.READ_ONLY };

console.log(person.name);

// person.role.push("admin"); // it is an exception - it is allowed for TUPLES;
// person.role = [0, "admin"]; // that works

// person.role = [0, "admin", "other"]; // that DOES NOT work
// person.role[1] = 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let favActivities: any[] = [true];

favActivities = [...favActivities, "sport", 1];

console.log(favActivities);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) console.log("person is admin");

// const role = 200;

// if (Role[role] === Role.READ_ONLY) console.log("Another role is read only");
// else console.log("role is not read_only");

console.log(person.role, typeof person.role);
