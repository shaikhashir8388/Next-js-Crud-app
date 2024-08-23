import React from "react";
import EditTopicForm from "@/components/EditTopicForm";

// Function to fetch topic data by ID
const getTopicsById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    const data = await res.json();
    console.log("API Response: ", data); // Log the API response to see what data we get
    return data;
  } catch (error) {
    console.log("Error fetching topic:", error);
    return null;
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;

  // Fetch the topic data by ID
  const topicData = await getTopicsById(id);
  console.log("Fetched Topic Data:", topicData);

  // If topicData or topic is undefined, return an error message
  if (!topicData || !topicData.topic) {
    return <div>Error: Topic not found or could not fetch the data.</div>;
  }

  const { topic } = topicData;
  const { title = "", discription = "" } = topic || {};

  console.log("Topic ID:", id, "Title:", title, "Discription:", discription);

  return <EditTopicForm id={id} title={title} discription={discription} />;
}
