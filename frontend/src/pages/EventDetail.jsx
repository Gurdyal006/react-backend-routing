import { Link, useParams } from "react-router-dom";

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Event details</h1>
      <p>ID: {params.eventId}</p>
      <Link to=".." relative="path">
        back
      </Link>
    </>
  );
}

export default EventDetailPage;
