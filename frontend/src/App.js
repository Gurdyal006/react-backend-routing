// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// complete
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// complete
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// complete
// 4. Add properly working links to the MainNavigation
// complete
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// complete
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
//complete
// 7. Output the ID of the selected event on the EventDetailPage
// complete
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
// complete

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";

import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EditEventPage from "./pages/EditEvent";
import NewEventPage from "./pages/NewEvent";
import EventDetailPage, {
  loader as EventDetailLoader,
} from "./pages/EventDetail";
import EventNavigationLayout from "./pages/EventNavigationLayout";
import ErrorPage from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,

      children: [
        { index: true, element: <HomePage /> },

        {
          path: "events",
          element: <EventNavigationLayout />,

          children: [
            { index: true, element: <EventsPage />, loader: eventsLoader },
            {
              path: ":eventId",
              id: "event-detail",
              loader: EventDetailLoader,
              children: [
                { index: true, element: <EventDetailPage /> },
                { path: "edit", element: <EditEventPage /> },
              ],
            },

            { path: "new", element: <NewEventPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
