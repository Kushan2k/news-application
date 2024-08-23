import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListItem({ cat }) {
  return (
    <Link to={`news/${cat.id}`} >
      <li className="flex my-2 text-base text-body-color dark:text-dark-6 transition ease-in-out p-1 hover:cursor-pointer bg-gray-200 hover:scale-105">
        <span className="mr-2.5 mt-0.5 text-primary">
          <ArrowBigRight size={25} fill="blue" />
        </span>
        {cat.text}
      </li>
    </Link>
  );
}
