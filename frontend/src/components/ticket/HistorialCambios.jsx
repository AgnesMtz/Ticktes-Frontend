import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Fragment } from "react";

export function HistorialCambios() {
  return (
    <Fragment>
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-0">
              <Avatar size="sm" src="/img/team-1.jpg" alt="user 1" withBorder />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray">
              Diego Ruiz.
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography color="gray" className="font-normal text-gray-600">
              Correciones
            </Typography>
            <Typography className="text-right">19/02/2022</Typography>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </Fragment>
  );
}
