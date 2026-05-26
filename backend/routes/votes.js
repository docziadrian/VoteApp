const express = require("express");
const router = express.Router();
const pool = require("../database/db");

// POST VOTES
router.post("/", (req, res) => {
  try {
    const option_id = req.body.option_id; //OPTION ID
    if (option_id == undefined) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    // Ha van option id...
    const newVote = pool.query(
      `INSERT INTO votes(option_id) VALUES (?)`,
      [option_id],
      (error, data) => {
        if (error) {
          return res.status(401).json({
            error: "Hiba lépett fel a lekérdezés során. Próbáld újra!",
          });
        }
        // Ha nincs error, hozzuk létre/
        res.status(201).json({ message: "Sikeresen létrejött az adat!" });
      },
    );
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

module.exports = router;
