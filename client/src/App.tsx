import "./App.css";
import Header from "./components/header";
import Users from "./pages/user";
import { GrGroup } from "react-icons/gr";
import { LuFilter } from "react-icons/lu";
import { FiUser, FiUserPlus } from "react-icons/fi";
import Roles from "./pages/roles";
import FilterDialogBox from "./components/filterDialogBox";
import useAppProvider from "./provider/hook";
import {NavLink, Route, Routes } from "react-router";
import AddNewDialogBox from "./components/addNewDialogBox";

function App() {
  const uAppProvider = useAppProvider();
  const menubarButtons = [
    {
      title: "Users",
      icon: <FiUser />,
      href: "/users",
    },
    {
      title: "Roles",
      icon: <GrGroup />,
      href: "/roles",
    },
  ];
  return (
    <>
      {uAppProvider?.toggleFilter && <FilterDialogBox/>}
      {uAppProvider?.toggleAddNew && <AddNewDialogBox/>}
      <Header />
      <main className="relative w-full h-dvh text-white px-5 lg:px-10">
        <section className=" w-full my-5 flex justify-between flex-wrap gap-2">
          <div className="flex gap-2 w-fit bg-zinc-800 p-1 rounded-md">
            {menubarButtons?.map((btn) => (
              <NavLink
                to={btn?.href}
                key={btn?.title}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "black" :"transparent",
                  color: isActive ? "white" :"#71717a"
                })}
                className={` flex gap-2 items-center transition justify-center w-full rounded-md text-base p-1 px-2`}
              >
                {btn?.icon}
                <p>{btn?.title}</p>
              </NavLink>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => uAppProvider.setToggleFilter(true)}
              disabled={uAppProvider?.priorityfnRunning}
              className={`h-fit flex gap-2 items-center border border-zinc-800 transition justify-center w-full rounded-md text-base p-1 px-2 ${"text-zinc-400"}`}
            >
              <LuFilter />
              <p>Filter</p>
            </button>
            <button
            disabled={uAppProvider?.priorityfnRunning}
              onClick={() => uAppProvider?.setToggleAddNew(true)}
              className={`h-fit text-nowrap flex gap-2 items-center border border-zinc-800 transition justify-center w-full rounded-md text-base p-1 px-2 ${"text-zinc-400"}`}
            >
              <FiUserPlus />
              <p>Add {uAppProvider?.toggleMenu}</p>
            </button>
          </div>
        </section>
        <section className="relative w-full h-full rounded-md">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
