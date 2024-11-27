import { memo, useEffect, useRef, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
// import users from "../data/users.json";
import { IRoles } from "../types/roles";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import useAppProvider from "../provider/hook";

interface IRolesRowProps extends IRoles {
  index: number;
}

function RolesRow({ name, permissions, index }: IRolesRowProps) {
  const uAppProvider = useAppProvider();

  const [toggleHamburger, setToggleHamburger] = useState(false);
  const userMenu = useRef<HTMLSpanElement>(null);

  function closeMenu(e: any) {
    if (toggleHamburger && !userMenu.current?.contains(e.target)) {
      setToggleHamburger(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, [userMenu, closeMenu]);

  return (
    <tr className=" border border-zinc-800 font-semibold transition-all hover:bg-zinc-800 rounded-md text-sm lg:text-lg">
      <td className=" p-2 ">
        <div className="flex gap-2 items-center">
          <p>{name} </p>{" "}
          <p className="text-xs text-zinc-700 font-bold border border-zinc-700 h-fit w-fit px-1 rounded-full">
            {uAppProvider?.users?.filter((u) => u?.role == name)?.length || 0}
          </p>
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
          {permissions?.includes("Read") ? <FaCheck /> : <FaXmark />}
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
          {permissions?.includes("Write") ? <FaCheck /> : <FaXmark />}
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
          {permissions?.includes("Delete") ? <FaCheck /> : <FaXmark />}
        </div>
      </td>
      <td className=" whitespace-nowrap text-center border border-zinc-800 p-1">
        <div className="">
          <button
            type="button"
            className="p-1 h-fit transition bg-zinc-700 rounded-sm "
            onClick={() => setToggleHamburger(!toggleHamburger)}
            aria-haspopup="dialog"
            aria-controls=":rg:"
          >
            <CiMenuKebab />
          </button>
        </div>
        {toggleHamburger && (
          <span
            ref={userMenu}
            role="dialog"
            id=":rg:"
            style={{
              position: "absolute",
              transform: `translate(0,${
                20 * (index + 1) + (20 * (index + 1)) / 2
              }px)`,
            }}
            className={`border border-zinc-800 top-5 right-12 lg:right-20 z-40 max-w-sm rounded-md bg-black p-2 shadow-medium transition-all duration-300 text-md`}
          >
            <button
              type="button"
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <FiEdit2 />
              <p>Edit</p>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <MdOutlineDelete />
              <p>Delete</p>
            </button>
          </span>
        )}
      </td>
    </tr>
  );
}

export default memo(RolesRow);
