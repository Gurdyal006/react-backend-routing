import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventNavigationLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventNavigationLayout;
