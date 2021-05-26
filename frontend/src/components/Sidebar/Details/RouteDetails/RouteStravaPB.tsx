import { ListItem } from "@react-md/list";
import { OpenInNewFontIcon, TimerFontIcon } from "@react-md/material-icons";
import { CircularProgress } from "@react-md/progress";
import React from "react";
import { useAsync } from "react-async-hook";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { fetchSegment } from "../../../../services/strava/api";
import { Route } from "../../../../types";
import { Time } from "../../../Time";

interface Props {
  route: Route;
}

export function RouteStravaPB({ route }: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  const { result: segment } = useAsync(
    async (loggedIn: boolean, segmentId?: number) => {
      if (!loggedIn || segmentId === undefined) {
        return null;
      }

      return await fetchSegment(segmentId.toString());
    },
    [isLoggedInStrava, route.stravaSegmentId]
  );

  if (segment === undefined) {
    return (
      <CircularProgress
        id={`strava-route-pb-${route.id}`}
        circleStyle={{ stroke: "black" }}
      />
    );
  }

  if (segment === null) {
    return null;
  }

  const handleClick = () => {
    window.open(`https://www.strava.com/segments/${segment.id}`, "_blank");
  };

  return (
    <ListItem
      leftAddon={<TimerFontIcon />}
      leftAddonType="icon"
      rightAddon={<OpenInNewFontIcon />}
      rightAddonType="icon"
      onClick={handleClick}
    >
      {segment.athlete_segment_stats.effort_count === 0 ? (
        <>No time set</>
      ) : (
        <Time seconds={segment.athlete_segment_stats.pr_elapsed_time!} />
      )}
    </ListItem>
  );
}
