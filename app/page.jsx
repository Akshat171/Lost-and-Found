import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http:localhost:3000/api/Tickets", {
      cache: "no-store", //we don't want to store the data
    });

    return res.json();
  } catch (error) {
    console.log("Error getting tickets", error);
  }
};

const DashBoard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      ticket={filteredTicket}
                      id={_index}
                      key={_index}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
