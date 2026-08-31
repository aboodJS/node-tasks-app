import fs from "fs";

fs.readFile("tasks.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(JSON.parse(data));
});
