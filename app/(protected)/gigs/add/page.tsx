import { Metadata } from "next";
import AddForm from "./AddForm";

export const metadata: Metadata = {
  title: "Add gig",
  description: "Add a gig",
};
const AddGig = () => {
  return <AddForm />;
};

export default AddGig;
