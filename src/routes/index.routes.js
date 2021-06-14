const express = require("express");
const router = express.Router();

// Controllers
const { 
    renderIndex, 
    renderProfile, 
    renderFormNew, 
    renderFormEdit, 
    createPlayer, 
    editPlayer,
    deletePlayer, 
    renderPanel, 
    renderPanelPlayers,
    newNateamForm,
    createNewNateam,
    renderPanelNateams,
    renderPanelTeams,
    newTeamForm,
    createNewTeam
    } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/profile/:_id", renderProfile);
router.get("/new", renderFormNew);
router.post("/new", createPlayer);
router.get("/edit/:_id", renderFormEdit);
router.put("/edit/:_id", editPlayer);
router.delete("/delete/:_id", deletePlayer);
router.get("/panel", renderPanel);
router.get("/panel/players", renderPanelPlayers);
router.get("/newnateam", newNateamForm);
router.post("/newnateam", createNewNateam);
router.get("/panel/nateams", renderPanelNateams);
router.get("/newteam", newTeamForm);
router.post("/newteam", createNewTeam);
router.get("/panel/teams", renderPanelTeams);

module.exports = router;
