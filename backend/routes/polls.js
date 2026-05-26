const express = require("express");
const router = express.Router();
const pool = require("../database/db");

// STATUSZ KODOK:
// 401 -> szerver hiba
// 400 -> user hiba
// 201 -> uj instance
// 200 -> OK

// GET ALL POLLS
router.get("/", (req, res) => {
  try {
    pool.query(`SELECT * FROM polls`, (error, data) => {
      if (error) {
        return res
          .status(401)
          .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
      }

      // HA nincs hiba küldjük vissza a válasz
      res.status(200).json(data);
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

// GET A POLL
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "ID!!!" });
    }
    pool.query(`SELECT * FROM polls WHERE id=?`, [id], (error, data) => {
      if (error) {
        return res
          .status(401)
          .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
      }

      if (data.length === 0) {
        return res.status(404).json({
          error: "Hiba lépett fel a lekérdezés során. Nincs ilyen adat!",
        });
      }

      // HA nincs hiba küldjük vissza a válasz
      res.status(200).json(data);
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

// POST A POLL
router.post("/", (req, res) => {
  try {
    const title = req.body.title;
    if (!title || title.length === 0) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    // Ha van title...
    const newPoll = pool.query(
      `INSERT INTO polls(title) VALUES (?)`,
      [title],
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

// DELETE A POLL :id
router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    const deletedInstance = pool.query(
      `DELETE FROM polls WHERE id=?`,
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

// EZ MÉG IDE TARTOZIK, MERT
// /POLLS/:ID/OPTIONS
// GET /polls/:id/options
router.get("/:id/options", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    // Ha van id keressük meg
    const instance = pool.query(
      `SELECT * FROM options WHERE poll_id=?`,
      [id],
      (error, data) => {
        if (error) {
          return res.status(401).json({
            error: "Hiba lépett fel a lekérdezés során. Próbáld újra!",
          });
        }

        // HA nincs ilyen adat
        if (data.length === 0 || data == []) {
          if (error) {
            return res.status(401).json({
              error: "Hiba lépett fel! Nincs ilyen ID -jú adat!",
            });
          }
        }

        // megvan, van adata, nincs hiba ->
        res.status(200).json(data);
      },
    );
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

// ÉS EZ IS IDE JÖN, MERT INNEN KÉRDEZZÜK LE
router.get("/:id/stats", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Hiba! Nem adtál meg minden adatot!" });
    }

    // Ha van id kerjuk le a megfelelo poll_id -ju adatot a statsbol
    const instance = pool.query(
      `SELECT * FROM poll_stats WHERE poll_id=?`,
      [id],
      (error, data) => {
        if (error) {
          return res.status(401).json({
            error: "Hiba lépett fel a lekérdezés során. Próbáld újra!",
          });
        }

        if (data.length === 0) {
          if (error) {
            return res.status(401).json({
              error: "Hiba! Nincs ilyen ID -jú instance!",
            });
          }
        }

        res.status(200).json(data);
      },
    );
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Hiba lépett fel a lekérdezés során. Próbáld újra!" });
  }
});

module.exports = router;
