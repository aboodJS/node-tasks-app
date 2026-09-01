import fs from "fs";

class Task {
  title;
  id;

  constructor(title, id) {
    this.title = title;
    this.id = id;
  }
}

async function addTask() {
  let data = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  data.push({ title: "buy milk", id: 1 });
  await fs.writeFile("tasks.json", `${JSON.stringify(data)}\n`, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

addTask();
