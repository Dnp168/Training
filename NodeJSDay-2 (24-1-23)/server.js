const express = require('express');
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require('path')

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  console.log(req.body);
});

app.post("/createfolder", async (req, res) => {
  console.log(req.body);
  const ans = create_folder(req.body.n1)
  console.log(ans);
})

app.post("/createfile", async (req, res) => {
  console.log(req.body);
  const ans1 = create_file(req.body.f1)
  console.log(ans1);
})

app.post("/writefile", async (req, res) => {
  console.log(req.body);
  const ans2 = file_content(req.body.f3, req.body.f2);
  console.log(ans2);
})

app.post("/appendfile", async (req, res) => {
  console.log(req.body);
  const ans3 = Append_content(req.body.f5, req.body.f4);
  console.log(ans3);
})

app.post("/readfile", async (req, res) => {
  console.log(req.body);
  const name = req.body.f6
  fs.readFile(name, 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    res.status(200).send(data);
    return;
  });
})

app.post("/deletefile", async (req, res) => {
  console.log(req.body);
  const ans4 = delete_file(req.body.f7);
  console.log(ans4);
})

app.listen(4000, () => {
  console.log(`Server is running on port 4000.`);
});

function create_folder(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log("Directory is created.");
    } else {
      console.log("Directory already exists.");
    }
  } catch (err) {
    console.log(err);
  }
}

function create_file(name) {
  try {
    if (!fs.existsSync(name)) {
      fs.writeFileSync(name, '');
      console.log("File is created.");
    } else {
      console.log("File already exists.");
    }
  } catch (err) {
    console.log(err);
  }
}

function file_content(name, content) {
  try {
    if (!fs.existsSync(name)) {
      fs.writeFileSync(name, content);
      console.log("File is created.");
    } else {
      fs.appendFile(name, content, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Data is Added.");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function Append_content(name, content) {
  fs.appendFile(name, content, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Data is Added.");
    }
  });
}

function delete_file(name){
  try {
    fs.unlinkSync(name)
  } catch(err) {
    console.error(err)
  }
}