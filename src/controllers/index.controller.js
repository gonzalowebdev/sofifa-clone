const path = require("path");
const mongoose = require("mongoose");

const indexCtrl = {};
const Player = require("../models/Player");
const Nateam = require("../models/Nateams");
const Team = require("../models/Team")

indexCtrl.renderIndex = async (req, res) => {
  /*const players = await Player.find({})
    .sort({ createdAt: "desc" })
    .lean();*/
  const players = await Player.aggregate([
    {
      $lookup:{
        from: "nateams",
        localField: "country",
        foreignField:"name",
        as: "national"
      }
    },
    {$unwind:"$national"},
    {
      $lookup:{
        from: "teams",
        localField: "team",
        foreignField:"name",
        as: "teaminfo"
      }
    },
    {$unwind:"$teaminfo"},
  ]).sort({ createdAt: "desc"});
  //console.log(players)
  res.render('index', {players});
};

indexCtrl.renderProfile = async (req, res) => {
  let id = mongoose.Types.ObjectId(req.params._id);
  const playerdata = await Player.aggregate([
    {
      $lookup:{
        from: "nateams",
        localField: "country",
        foreignField:"name",
        as: "national"
      }
    },
    {$unwind:"$national"},
    {
      $lookup:{
        from: "teams",
        localField: "team",
        foreignField:"name",
        as: "teaminfo"
      }
    },
    {$unwind:"$teaminfo"},
    {$match:{"_id":id}}
  ])
  res.render('profile', {playerdata});
}

indexCtrl.renderFormNew = (req, res)=>{
  res.render('new-player');
}

indexCtrl.createPlayer = (req, res) => {
  const { name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation } = req.body;

  if(!req.files){
    const newPlayer = new Player({  name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation });

    newPlayer.save();

    res.redirect("/");
  } else{
    playerpic = req.files.pic;
    playerpicname = playerpic.name;
    fileExtension = playerpic.mimetype.split('/')[1];
    pic = playerpicname +'.' + fileExtension;
    destino = path.join(__dirname, '../public/img/')+pic;

    playerpic.mv(destino, (err ) => {
      if (err) {
           res.send(err);
      }
      else {
        const newPlayer = new Player({  name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation, pic });
        newPlayer.save();
        res.redirect("/");
      }
  })
  }
};

indexCtrl.renderFormEdit = async (req, res)=>{
  const _id = req.params._id;
  const playerdata = await Player.find({ _id : _id })
    .lean();
  console.log(playerdata);
  res.render('edit-player',{playerdata});
}

indexCtrl.editPlayer = async (req, res)=>{
  _id = req.params._id
  const { name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation } = req.body;

  if(!req.files){
    await Player.findOneAndUpdate({_id : _id}, {  name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation });

    res.redirect("/");
  } else{
    playerpic = req.files.pic;
    playerpicname = playerpic.name;
    fileExtension = playerpic.mimetype.split('/')[1];
    pic = playerpicname +'.' + fileExtension;
    destino = path.join(__dirname, '../public/img/')+pic;

    playerpic.mv(destino, async (err ) => {
      if (err) {
           res.send(err);
      }
      else {
        await Player.findOneAndUpdate({_id : _id},{  name, lastname, shortname, age, country, pos1, pos2, pos3, altura, peso, rating, potential, value, salary, releaseclause, team, foot, skills, weakfoot, reputation, pic });
        res.redirect("/");
      }
  })
  }
}

indexCtrl.deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params._id);
  res.redirect("/");
};

indexCtrl.renderPanel = (req, res) =>{
  res.render("panel");
}
indexCtrl.renderPanelPlayers = async (req, res) =>{
  const players = await Player.find({})
    .sort({ createdAt: "desc" })
    .lean();
  res.render("panel-players", {players});
}

indexCtrl.newNateamForm = (req, res)=>{
  res.render("nateam");
}

indexCtrl.createNewNateam = (req, res) =>{
  const { name, rating } = req.body;

  if(!req.files){
    const newNateam = new Nateam({  name, rating });

    newNateam.save();

    res.redirect("/");
  } else{
    playerpic = req.files.pic;
    playerpicname = playerpic.name;
    fileExtension = playerpic.mimetype.split('/')[1];
    flag = playerpicname +'.' + fileExtension;
    destino = path.join(__dirname, '../public/img/')+flag;

    playerpic.mv(destino, (err ) => {
      if (err) {
           res.send(err);
      }
      else {
        const newNateam = new Nateam({  name, rating, flag });
        newNateam.save();
        res.redirect("/panel/nateams");
      }
  })
  }
}

indexCtrl.renderPanelNateams = async (req, res) =>{
  const teams = await Nateam.find({})
    .sort({ createdAt: "desc" })
    .lean();
  res.render("panel-teams", {teams});
}

indexCtrl.newTeamForm =(req, res)=>{
  res.render("team");
}

indexCtrl.createNewTeam = (req, res) =>{
  const { name, rating } = req.body;

  if(!req.files){
    const newTeam = new Team({  name, rating });

    newTeam.save();

    res.redirect("/");
  } else{
    playerpic = req.files.pic;
    playerpicname = playerpic.name;
    fileExtension = playerpic.mimetype.split('/')[1];
    shield = playerpicname +'.' + fileExtension;
    destino = path.join(__dirname, '../public/img/')+shield;

    playerpic.mv(destino, (err ) => {
      if (err) {
           res.send(err);
      }
      else {
        const newTeam = new Team({  name, rating, shield });
        newTeam.save();
        res.redirect("/panel/teams");
      }
  })
  }
}

indexCtrl.renderPanelTeams = async (req, res) =>{
  const teams = await Team.find({})
    .sort({ createdAt: "desc" })
    .lean();
  res.render("panel-teams", {teams});
}

module.exports = indexCtrl;