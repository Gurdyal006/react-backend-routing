import { Await, defer, json, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;

  // return <EventsList events={events} />;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading.....</p>}>
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loaderEvents(),
  });
}

// import { useEffect, useState } from "react";

// import EventsList from "../components/EventsList";

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch("http://localhost:8080/events99");
//       if (!response.ok) {
//         setError("Events data not fetched...");
//       }

//       try {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       } catch (error) {
//         setError(error || "Events data not fetched...");
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);

//   return (
//     <>
//       <div style={{ textAlign: "center" }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;
