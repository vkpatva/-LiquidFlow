import { Sidebar } from "./Sidebar.component";

export const Home = () => {
  return (
    <div className="flex w-[100vw]">
        <div className="w-[15vw]">
         <Sidebar />
        </div>
        
        <div className="w-[85vw]">
         Main content
        </div>
    </div>
  );
};
