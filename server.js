const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Member = require('./models/member.model');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());


app.use(express.json());


app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });

// Membuat koneksi ke MongoDB Atlas
const uri = 'mongodb+srv://faeznz:faeznz@data.h3xudui.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB', error);
  });

// Mengatur rute untuk mengambil data member
app.get('/members', (req, res) => {
  Member.find()
    .then(members => {
      res.json(members);
    })
    .catch(error => {
      console.log('Failed to fetch members', error);
      res.status(500).json({ error: 'Failed to fetch members' });
    });
});

app.post('/members', (req, res) => {
  const newMember = new Member({
    nik: req.body.nik,
    nama: req.body.nama,
    alamat: req.body.alamat,
    noHp: req.body.noHp,
    email: req.body.email,
    instagram: req.body.instagram,
    tanggalKadaluarsa: req.body.tanggalKadaluarsa,
    jenisMember: req.body.jenisMember
  });

  newMember.save()
    .then(() => {
      res.status(201).json({ message: 'Member added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to add member' });
    });
});

// Mendapatkan detail member berdasarkan ID
app.get('/members/:id', (req, res) => {
  const memberId = req.params.id;
  Member.findById(memberId)
    .then(member => {
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json(member);
    })
    .catch(error => {
      console.log('Failed to fetch member', error);
      res.status(500).json({ error: 'Failed to fetch member' });
    });
});

// Mengupdate data member berdasarkan ID
app.put('/members/:id', (req, res) => {
  const memberId = req.params.id;
  Member.findByIdAndUpdate(memberId, req.body)
    .then(() => {
      res.status(200).json({ message: 'Member updated successfully' });
    })
    .catch(error => {
      console.log('Failed to update member', error);
      res.status(500).json({ error: 'Failed to update member' });
    });
});

// Menghapus member berdasarkan ID
app.delete('/members/:id', (req, res) => {
  const memberId = req.params.id;
  Member.findByIdAndRemove(memberId)
    .then(() => {
      res.status(200).json({ message: 'Member deleted successfully' });
    })
    .catch(error => {
      console.log('Failed to delete member', error);
      res.status(500).json({ error: 'Failed to delete member' });
    });
});
 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
