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

async function ListTasks(type) {
  let data = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  if (type === undefined) {
    data.forEach((element) => {
      console.log(
        `${element.id}- task: ${element.title}, ${element.done === true ? "done" : "to-do"}`,
      );
    });
  } else if (type === "complete") {
    data.forEach((element) => {
      if (element.done === true) {
        console.log(
          `${element.id}- task: ${element.title}, ${element.done === true ? "done" : "to-do"}`,
        );
      }
    });
  } else if (type === "incomplete") {
    data.forEach((element) => {
      if (element.done === false) {
        console.log(
          `${element.id}- task: ${element.title}, ${element.done === true ? "done" : "to-do"}`,
        );
      }
    });
  }
}

async function DeleteTask(taskId) {
  let data = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  let filteredData = data.filter((e) => e.id !== taskId);
  await fs.writeFile(
    "tasks.json",
    `${JSON.stringify(filteredData)}`,
    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
    },
  );
}

if (args[2] === "help") {
  console.log(`Usage: help: prints this message ,add "title": adds a task`);
} else if (args[2] === "add") {
  addTask();
} else if (args[2] === "list") {
  ListTasks(args[3]);
} else if (args[2] === "delete") {
  DeleteTask(Number.parseInt(args[3]));
} else {
  console.log(
    `Usage: help: prints this message | add "title": adds a task | list "complete | incomplete": lists tasks | delete "id": deletes a task`,
  );
}
