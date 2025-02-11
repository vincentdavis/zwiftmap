import { Request, Response } from "express";
import { Record, String } from "runtypes";
import {
  readStravaToken,
  writeStravaToken,
} from "../../../shared/persistence/stravaToken";
import { stravaAppAPI } from "../../../shared/services/strava";
import { Session } from "../../types";

const Body = Record({
  refresh_token: String.withConstraint((t) => t.length > 0),
});

export async function handleStravaTokenRefresh(req: Request, res: Response) {
  if (!Body.guard(req.body)) {
    res.sendStatus(400);
    return;
  }

  const session = req.session as Session;

  let refreshToken = req.body.refresh_token;
  if (session.athleteId) {
    const token = await readStravaToken(session.athleteId);
    if (!token) {
      res.send(500);
      return;
    }
    refreshToken = token.refreshToken;
  }

  const response = await stravaAppAPI.post("/oauth/token", {
    grant_type: "refresh_token",
    refresh_token: req.body.refresh_token,
  });
  const responseData = response.data;

  if (session.athleteId) {
    await writeStravaToken({
      athleteId: session.athleteId,
      expiresAt: responseData.expires_at,
      refreshToken: responseData.refresh_token,
      token: responseData.access_token,
    });
  }

  res.send(responseData);
}
