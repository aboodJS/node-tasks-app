import fs from "fs";

const args = process.argv;

async function addTask() {
  let data = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  if (args[3] === undefined) {
    console.log("you should enter a title for the task!");
    return;
  }
  data.push({ title: args[3], done: false, id: data.length });
  await fs.writeFile("tasks.json", `${JSON.stringify(data)}`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

if (args[2] === "help") {
  console.log(`Usage: help: prints this message ,add "title": adds a task`);
} else if (args[2] === "add") {
  addTask();
} else {
  console.log(`Usage: help: prints this message ,add "title": adds a task`);
}
