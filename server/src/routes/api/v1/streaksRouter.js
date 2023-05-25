import express from "express";
import { Streak } from "../../../models/index.js";

const streaksRouter = new express.Router();

streaksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const streak = await Streak.query().findById(id);
    if (streak) {
      return res.status(200).json({
        streakCount: streak.streakCount,
        active: streak.active,
      });
    } else {
      return res.status(404).json({ error: "Streak not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

streaksRouter.get("/:id/status", async (req, res) => { 
  const { id } = req.params;
  try {
    const streak = await Streak.query().findById(id);
    if (streak) {
      return res.status(200).json({
        active: streak.active,
      });
    } else {
      return res.status(404).json({ error: "Streak not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// streaksRouter.post("/", async (req, res) => {
//   try {
//     const { habitId } = req.body;
//     const userId = parseInt(req.user.id, 10);
//     const previousStreak = await Streak.query().findOne({ userId, habitId });

//     let updatedStreak;
// console.log("previousStreak", previousStreak)
//       updatedStreak = await Streak.query()
//         .patchAndFetchById(previousStreak.id, { active: true, streakCount: parseInt(previousStreak.streakCount) + 1 });
    
//       if (parseInt(updatedStreak.streakCount) > parseInt(updatedStreak.longestStreak)) {
//         updatedStreak = await Streak.query()
//           .patchAndFetchById(previousStreak.id, { longestStreak: parseInt(updatedStreak.streakCount, 10) });
//       }

//     console.log("New streak created:", updatedStreak);
//     return res.status(201).json({ streakCount: updatedStreak.streakCount });
//   } catch (error) {
//     console.error("Error creating new streak:", error);
//     return res.status(500).json({ errors: error });
//   }
// });

streaksRouter.post("/", async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = parseInt(req.user.id, 10);
    const previousStreak = await Streak.query().findOne({ userId, habitId });

    let updatedStreak;

    // use datefns somehow
    // if (previousStreak.updatedAt === previousStreak.updatedAt) {
    //   return response.json({ message: "You have already logged this habit today" })
    // }

    // streak is not active if they just created the habit
    if (previousStreak.active === false) {

      updatedStreak = await Streak.query().patchAndFetchById( previousStreak.id, {
        active: true,
        streakCount: parseInt(previousStreak.streakCount + 1),
      })
    } else {

      // they did the habit two days or more in a row
      if (previousStreak.isConsistent()) {

        updatedStreak = await Streak.query().patchAndFetchById( previousStreak.id, {streakCount: parseInt(previousStreak.streakCount + 1)})
     
      } else {
        // they goofed, and missed a day
        updatedStreak = await Streak.query().patchAndFetchById(previousStreak.id, {
          active: false,
          streakCount: 0,
        })
      }


      // streak is active 
    




    }







    if (parseInt(updatedStreak.streakCount) > parseInt(updatedStreak.longestStreak)) {
      updatedStreak = await Streak.query()
        .patchAndFetchById(updatedStreak.id, { longestStreak: updatedStreak.streakCount });
    }

    return res.status(201).json({ streakCount: updatedStreak.streakCount });
  } catch (error) {
    console.error("Error creating/updating streak:", error);
    return res.status(500).json({ error: error.message });
  }
});

//Nick's suggestion for setting up my Router
// need to check if I have never added a habitchain
// if I successfully done two consecutive days
// if I try to add a habit-chain but I missed a day (this is where will use my isActive() to tell wether or not I've missed a day)


export default streaksRouter;