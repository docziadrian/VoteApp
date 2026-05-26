const express = require("express");
const router = express.Router();
const pool = require("../database/db");

// POST A OPTION
router.post("/", (req, res) => {
  try {
    const poll_id = req.body.poll_id; //id
    const name = req.body.name; //id
    if (poll_id == undefined || !name) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    // Ha van title...
    const newOption = pool.query(
      `INSERT INTO options(poll_id,name) VALUES (?, ?)`,
      [poll_id, name],
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

// DELETE /options/:id
router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    const deletedInstance = pool.query(
      `DELETE FROM options WHERE id=?`,
      [id],
      (error, data) => {
        if (error) {
          return res.status(401).json({
            error: "Hiba lépett fel a lekérdezés során. Próbáld újra!",
          });
        }
      },

      // Ki lett torolve
      res.status(200).json({ message: "Instance sikeresen törölve lett!" }),
    );
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

module.exports = router;
